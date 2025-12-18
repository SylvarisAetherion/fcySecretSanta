import './globals.css';

export const metadata = {
  title: 'Secret Santa',
  description: 'A simple Secret Santa application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
