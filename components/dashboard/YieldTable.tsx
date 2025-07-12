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

export default function YieldTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState('all');

  useEffect(() => {
    async function fetchData() {
      const yieldData = await getAllYieldData();
      setData(yieldData);
      setFilteredData(yieldData);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
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
  }, [data, searchTerm, selectedProtocol]);

  const protocols = [...new Set(data.map((item) => item.protocol))];

  if (loading)
    return <div className="text-center py-8">Loading yield data...</div>;

  return (
    <div>
      <StatsCards data={filteredData} />

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
                <TableRow key={index}>
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
