import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ contractId, amount, currency }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contract_id: contractId, amount, currency }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.client_secret));
  }, [contractId, amount, currency]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });
    setLoading(false);
    if (result.paymentIntent?.status === 'succeeded') {
      window.location.href = `/contracts/${contractId}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <CardElement />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full"
        disabled={!stripe || !elements || loading}
      >
        {loading ? 'Przetwarzanie...' : 'Opłać'}
      </button>
    </form>
  );
}

export default function PayPage({ params }) {
  // Pobierz szczegóły kontraktu z API
  const [contract, setContract] = useState(null);
  useEffect(() => {
    fetch(`/api/contracts/${params.id}`)
      .then(res => res.json())
      .then(setContract);
  }, [params.id]);

  if (!contract) return <div>Ładowanie...</div>;

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm contractId={contract.id} amount={contract.amount} currency={contract.currency} />
    </Elements>
  );
}
