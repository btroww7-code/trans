import * as React from 'react';

export function WelcomeEmail({ user }) {
  return (
    <div>
      <h1>Witaj {user.email}!</h1>
      <p>Dziękujemy za rejestrację w Transport Marketplace.</p>
    </div>
  );
}
