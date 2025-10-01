import { render, fireEvent, screen } from '@testing-library/react';
import AuthForm from './AuthForm';

describe('AuthForm', () => {
  it('shows error on invalid email', () => {
    render(<AuthForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText(/Zaloguj/i));
    expect(screen.getByText(/Nieprawidłowy email/)).toBeInTheDocument();
  });
});
