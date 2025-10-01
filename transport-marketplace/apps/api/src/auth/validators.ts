export function validateEmail(email: string): boolean {
  // ...email regex...
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  // ...min 8 znaków, 1 litera, 1 cyfra, 1 znak specjalny...
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(password);
}
