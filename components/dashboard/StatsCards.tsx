'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  data: Array<{
    protocol: string;
    asset: string;
    apy: string;
    tvl: string;
  }>;
}

export default function StatsCards({ data }: StatsCardsProps) {
  // Safety checks
  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalProtocols = new Set(data.map((item) => item.protocol)).size;
  const highestAPY = data.length > 0 ? data[0].apy : '0%';
  const totalOpportunities = data.length;

  // Safe APY calculation
  const avgAPY =
    data.length > 0
      ? (
          data.reduce((sum, item) => {
            const apy = parseFloat(item.apy.replace('%', '')) || 0;
            return sum + apy;
          }, 0) / data.length
        ).toFixed(2) + '%'
      : '0%';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Protocols</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProtocols}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Highest APY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{highestAPY}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average APY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgAPY}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Total Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOpportunities}</div>
        </CardContent>
      </Card>
    </div>
  );
}
