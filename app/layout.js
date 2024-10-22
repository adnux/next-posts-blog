import Header from '@/components/header';
import './globals.css';
import { Suspense } from 'react';

export const metadata = {
  title: 'NextPosts',
  description: 'Browse and share amazing posts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
