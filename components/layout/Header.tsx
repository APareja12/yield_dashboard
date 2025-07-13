'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">DeFi Yield Dashboard</h1>
          <p className="text-sm text-gray-600">
            Track the best yield opportunities across DeFi
          </p>
        </div>
        <div className="hidden md:block">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
