'use client';

import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  data: Array<{
    protocol: string;
    asset: string;
    apy: string;
    tvl: string;
  }>;
}

export default function StatsCards({ data }: StatsCardsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="border-0 shadow-lg bg-white/60 backdrop-blur-sm"
          >
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-slate-200 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalProtocols = new Set(data.map((item) => item.protocol)).size;
  const highestAPY = data.length > 0 ? data[0].apy : '0%';
  const totalOpportunities = data.length;

  const avgAPY =
    data.length > 0
      ? (
          data.reduce((sum, item) => {
            const apy = parseFloat(item.apy.replace('%', '')) || 0;
            return sum + apy;
          }, 0) / data.length
        ).toFixed(1) + '%'
      : '0%';

  const stats = [
    {
      label: 'Protocols',
      value: totalProtocols.toString(),
      icon: '🏛️',
      color: 'text-blue-600',
    },
    {
      label: 'Best APY',
      value: highestAPY,
      icon: '📈',
      color: 'text-green-600',
    },
    {
      label: 'Avg APY',
      value: avgAPY,
      icon: '📊',
      color: 'text-purple-600',
    },
    {
      label: 'Opportunities',
      value: totalOpportunities.toString(),
      icon: '💎',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className="text-2xl opacity-60">{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
