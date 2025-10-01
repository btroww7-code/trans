import React, { useState } from 'react';

interface AddressAutocompleteProps {
  value: string;
  onSelect: (address: { formatted: string; lat: number; lng: number }) => void;
}

export default function AddressAutocomplete({ value, onSelect }: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (inputValue) {
      onSelect({
        formatted: inputValue,
        lat: 0,
        lng: 0,
      });
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Wpisz adres..."
      className="input w-full"
    />
  );
}
