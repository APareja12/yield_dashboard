'use client';

import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortfolioTracker() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  const [userPositions] = useState([
    {
      protocol: 'Compound',
      asset: 'USDC',
      amount: '1,500',
      value: '$1,500',
      apy: '4.2%',
    },
    {
      protocol: 'Aave',
      asset: 'USDT',
      amount: '800',
      value: '$800',
      apy: '3.8%',
    },
  ]);

  if (!isConnected) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="mb-4 text-gray-600">
            Connect your wallet to view your DeFi positions
          </p>
          <ConnectButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Your Portfolio</CardTitle>
          <ConnectButton />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <p className="text-2xl font-bold">
              {balance
                ? `${parseFloat(balance.formatted).toFixed(4)} ${
                    balance.symbol
                  }`
                : '0 ETH'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total DeFi Value</p>
            <p className="text-2xl font-bold text-green-600">$2,300</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Monthly Yield</p>
            <p className="text-2xl font-bold text-blue-600">$7.67</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Your Positions</h4>
          {userPositions.map((position, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {position.protocol} - {position.asset}
                </p>
                <p className="text-sm text-gray-600">
                  {position.amount} {position.asset}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{position.value}</p>
                <p className="text-sm text-green-600">{position.apy} APY</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
