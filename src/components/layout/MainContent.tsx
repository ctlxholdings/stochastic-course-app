'use client';

import { usePathname } from 'next/navigation';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStochasticPage = pathname.startsWith('/stochastic');

  return (
    <main className={`min-h-screen ${isStochasticPage ? 'ml-64' : ''}`}>
      {children}
    </main>
  );
}
