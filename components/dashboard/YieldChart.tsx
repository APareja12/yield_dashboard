'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock historical data - in a real app, this would come from an API
const historicalData = [
  { date: '2024-01', Compound: 3.2, Aave: 2.8, Yearn: 4.1 },
  { date: '2024-02', Compound: 3.5, Aave: 3.1, Yearn: 4.3 },
  { date: '2024-03', Compound: 3.8, Aave: 3.4, Yearn: 4.6 },
  { date: '2024-04', Compound: 4.1, Aave: 3.7, Yearn: 4.9 },
  { date: '2024-05', Compound: 4.2, Aave: 3.8, Yearn: 5.1 },
  { date: '2024-06', Compound: 3.9, Aave: 3.5, Yearn: 4.8 },
];

export default function YieldChart() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Historical Yield Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}%`, 'APY']} />
            <Legend />
            <Line
              type="monotone"
              dataKey="Compound"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Aave"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Yearn"
              stroke="#ffc658"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
