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
    <div className="space-y-8">
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

      {/* Single Card for the table - no nesting */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Live Yield Opportunities
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Live data</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100 bg-slate-50/50">
                  <TableHead className="font-semibold text-slate-700">
                    Protocol
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Asset
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    APY
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    TVL
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow
                    key={`${item.protocol}-${item.asset}-${index}`}
                    className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <TableCell className="font-medium text-slate-900">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {item.protocol[0]}
                        </div>
                        <span>{item.protocol}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">
                      {item.asset}
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {item.apy}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {item.tvl}
                    </TableCell>
                    <TableCell>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                        Invest
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
