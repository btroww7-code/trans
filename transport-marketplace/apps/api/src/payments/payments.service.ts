import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' });

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPaymentIntent(contract_id: string, amount: number, currency: string) {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { contract_id },
    });
    await this.prisma.payment.create({
      data: {
        contract_id,
        amount,
        currency,
        provider: 'stripe',
        provider_transaction_id: intent.id,
        status: 'PENDING',
        metadata: {},
      },
    });
    return { client_secret: intent.client_secret };
  }

  async confirmPayment(payment_intent_id: string) {
    const intent = await stripe.paymentIntents.retrieve(payment_intent_id);
    if (intent.status === 'succeeded') {
      await this.prisma.payment.updateMany({
        where: { provider_transaction_id: payment_intent_id },
        data: { status: 'COMPLETED' },
      });
      await this.prisma.contract.updateMany({
        where: { id: intent.metadata.contract_id },
        data: { payment_status: 'PAID' },
      });
    }
    return intent;
  }

  async refund(payment_intent_id: string, amount: number) {
    await stripe.refunds.create({
      payment_intent: payment_intent_id,
      amount: Math.round(amount * 100),
    });
    await this.prisma.payment.updateMany({
      where: { provider_transaction_id: payment_intent_id },
      data: { status: 'REFUNDED' },
    });
  }
}
}
