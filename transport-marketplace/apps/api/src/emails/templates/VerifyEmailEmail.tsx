import * as React from 'react';

export function VerifyEmailEmail({ user, verifyUrl }) {
  return (
    <div>
      <h1>Potwierdź swój adres email</h1>
      <p>Kliknij poniższy link, aby zweryfikować swój adres:</p>
      <a href={verifyUrl}>{verifyUrl}</a>
    </div>
  );
}
