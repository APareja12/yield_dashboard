'use client';

import './globals.css';
import { useState } from 'react';
import YieldTable from '@/components/dashboard/YieldTable';
import RiskAssessment from '@/components/dashboard/RiskAssessment';
import YieldCalculator from '@/components/dashboard/YieldCalculator';
import Filters from '@/components/dashboard/Filters';
import StatsCards from '@/components/dashboard/StatsCards';
import YieldChart from '@/components/dashboard/YieldChart';
import OpportunitiesTable from '@/components/dashboard/OpportunitiesTable';
import PortfolioTracker from '@/components/dashboard/PortfolioTracker';
import HeroSection from '@/components/sections/HeroSection';

const mockData = [
  {
    protocol: 'Yearn',
    asset: 'USDC',
    apy: '5.1%',
    tvl: '$200M',
  },
  {
    protocol: 'Yearn',
    asset: 'USDT',
    apy: '4.8%',
    tvl: '$150M',
  },
  {
    protocol: 'Compound',
    asset: 'USDC',
    apy: '3.2%',
    tvl: '$800M',
  },
  {
    protocol: 'Compound',
    asset: 'USDT',
    apy: '3.1%',
    tvl: '$600M',
  },
  {
    protocol: 'Aave',
    asset: 'USDC',
    apy: '2.8%',
    tvl: '$1.2B',
  },
  {
    protocol: 'Aave',
    asset: 'USDT',
    apy: '2.7%',
    tvl: '$900M',
  },
  {
    protocol: 'Curve',
    asset: 'USDC-USDT',
    apy: '6.5%',
    tvl: '$300M',
  },
  {
    protocol: 'Uniswap',
    asset: 'ETH-USDC',
    apy: '12.3%',
    tvl: '$120M',
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState('all');

  const uniqueProtocols = Array.from(
    new Set(mockData.map((item) => item.protocol))
  );

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section
        id="dashboard"
        className="bg-gradient-to-br from-slate-50 to-white py-20"
      >
        <div className="container mx-auto px-4">
          <StatsCards data={mockData} />

          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedProtocol={selectedProtocol}
            setSelectedProtocol={setSelectedProtocol}
            protocols={uniqueProtocols}
          />

          <PortfolioTracker />

          <YieldCalculator data={mockData} />

          <YieldChart />

          <RiskAssessment data={mockData} />

          <OpportunitiesTable data={mockData} />

          {/* <YieldTable /> */}
        </div>
      </section>
    </div>
  );
}
