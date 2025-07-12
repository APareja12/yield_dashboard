'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface YieldCalculatorProps {
  data: Array<{
    protocol: string;
    asset: string;
    apy: string;
    tvl: string;
  }>;
}

export default function YieldCalculator({ data }: YieldCalculatorProps) {
  const [investment, setInvestment] = useState('1000');
  const [selectedOption, setSelectedOption] = useState('');
  const [timeFrame, setTimeFrame] = useState('1');

  const selectedData = data.find(
    (item) => `${item.protocol}-${item.asset}` === selectedOption
  );

  const calculateYield = () => {
    if (!selectedData || !investment) return 0;
    const apy = parseFloat(selectedData.apy.replace('%', '')) / 100;
    const principal = parseFloat(investment);
    const years = parseFloat(timeFrame);
    return (principal * apy * years).toFixed(2);
  };

  const totalReturn = () => {
    if (!investment) return 0;
    return (parseFloat(investment) + parseFloat(calculateYield())).toFixed(2);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Yield Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="investment">Investment Amount ($)</Label>
            <Input
              id="investment"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <Label htmlFor="protocol">Protocol & Asset</Label>
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger>
                <SelectValue placeholder="Select protocol" />
              </SelectTrigger>
              <SelectContent>
                {data.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={`${item.protocol}-${item.asset}`}
                  >
                    {item.protocol} - {item.asset} ({item.apy})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timeframe">Time Frame (Years)</Label>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.25">3 Months</SelectItem>
                <SelectItem value="0.5">6 Months</SelectItem>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="2">2 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedData && investment && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Initial Investment</p>
                <p className="text-2xl font-bold">
                  ${parseFloat(investment).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Yield</p>
                <p className="text-2xl font-bold text-green-600">
                  ${parseFloat(calculateYield()).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Return</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${parseFloat(totalReturn()).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
