import React, { useState } from 'react';
import CategorySelector from '../../../components/CategorySelector';
// ...importy do address, date pickers, etc...

export default function Wizard() {
  const [step, setStep] = useState(1);
  // ...zustand draft state...

  return (
    <div>
      {step === 1 && (
        <CategorySelector /* ...props... */ />
      )}
      {step === 2 && (
        // Trasa: 2x address input, date pickers
        <div>{/* ... */}</div>
      )}
      {step === 3 && (
        // Szczegóły: weight, dimensions, quantity, description
        <div>{/* ... */}</div>
      )}
      {step === 4 && (
        // Podsumowanie + Publish
        <div>{/* ... */}</div>
      )}
      {/* Nawigacja między krokami */}
      <div>
        {step > 1 && <button onClick={() => setStep(step - 1)}>Wstecz</button>}
        {step < 4 && <button onClick={() => setStep(step + 1)}>Dalej</button>}
      </div>
    </div>
  );
}
