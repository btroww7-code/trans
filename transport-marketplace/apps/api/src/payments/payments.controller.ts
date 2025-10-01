import { Controller, Post, Body, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  async createIntent(@Body() dto) {
    return this.paymentsService.createPaymentIntent(dto.contract_id, dto.amount, dto.currency);
  }

  @Post('webhook')
  async webhook(@Req() req) {
    // Stripe webhook handler
    // Validate signature, handle payment_intent.succeeded/failed
    // ...implement logic...
    return { received: true };
  }
}
