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
import { getAllYieldData } from '@/lib/api';
import StatsCards from './StatsCards';
import Filters from './Filters';
import YieldChart from './YieldChart';
import YieldCalculator from './YieldCalculator';
import RiskAssessment from './RiskAssessment';

export default function YieldTable() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const yieldData = await getAllYieldData();
        setData(yieldData);
        setFilteredData(yieldData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load yield data');
        setData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.asset.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProtocol !== 'all') {
      filtered = filtered.filter((item) => item.protocol === selectedProtocol);
    }

    setFilteredData(filtered);
  }, [data, searchTerm, selectedProtocol, mounted]);

  if (!mounted) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Loading yield data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const protocols = [...new Set(data.map((item) => item.protocol))];

  return (
    <div>
      <StatsCards data={filteredData} />

      <YieldChart />

      <YieldCalculator data={data} />

      <RiskAssessment data={filteredData} />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedProtocol={selectedProtocol}
        setSelectedProtocol={setSelectedProtocol}
        protocols={protocols}
      />

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
              {filteredData.map((item, index) => (
                <TableRow key={`${item.protocol}-${item.asset}-${index}`}>
                  <TableCell className="font-medium">{item.protocol}</TableCell>
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
    </div>
  );
}
