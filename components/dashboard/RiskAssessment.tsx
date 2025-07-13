'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RiskAssessmentProps {
  data: Array<{
    protocol: string;
    asset: string;
    apy: string;
    tvl: string;
  }>;
}

export default function RiskAssessment({ data }: RiskAssessmentProps) {
  const getRiskLevel = (protocol: string, apy: string) => {
    const apyNum = parseFloat(apy.replace('%', ''));

    if (apyNum > 8) return { level: 'High', variant: 'destructive' };
    if (apyNum > 5) return { level: 'Medium', variant: 'secondary' };
    return { level: 'Low', variant: 'outline' };
  };

  const getRiskFactors = (protocol: string) => {
    const factors = {
      Compound: ['Smart Contract Risk', 'Liquidation Risk'],
      Aave: ['Smart Contract Risk', 'Liquidation Risk', 'Oracle Risk'],
      Yearn: ['Smart Contract Risk', 'Strategy Risk', 'Impermanent Loss Risk'],
    };
    return factors[protocol as keyof typeof factors] || ['Smart Contract Risk'];
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.slice(0, 6).map((item, index) => {
            const risk = getRiskLevel(item.protocol, item.apy);
            const factors = getRiskFactors(item.protocol);

            return (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{item.protocol}</h4>
                    <p className="text-sm text-gray-600">{item.asset}</p>
                  </div>
                  <Badge variant={risk.variant as any}>{risk.level}</Badge>
                </div>

                <div className="mb-2">
                  <p className="text-lg font-bold text-green-600">{item.apy}</p>
                  <p className="text-sm text-gray-600">{item.tvl} TVL</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Risk Factors:</p>
                  <div className="flex flex-wrap gap-1">
                    {factors.map((factor, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
