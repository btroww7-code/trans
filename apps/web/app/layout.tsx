import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: {
    default: 'Transport Marketplace',
    template: '%s | Transport Marketplace',
  },
  description: 'Marketplace transportowy – zleć przewóz, znajdź przewoźnika, porównaj oferty.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <main className="min-h-screen">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}