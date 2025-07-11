'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function YieldTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We'll fetch real data here soon
    setTimeout(() => {
      setData([
        { protocol: 'Compound', asset: 'USDC', apy: '4.2%', tvl: '$1.2B' },
        { protocol: 'Aave', asset: 'USDC', apy: '3.8%', tvl: '$800M' },
        { protocol: 'Compound', asset: 'USDT', apy: '3.9%', tvl: '$900M' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading yield data...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Best Yield Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocol</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>APY</TableHead>
              <TableHead>TVL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.protocol}</TableCell>
                <TableCell>{item.asset}</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  {item.apy}
                </TableCell>
                <TableCell>{item.tvl}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
