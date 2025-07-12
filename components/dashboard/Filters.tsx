'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedProtocol: string;
  setSelectedProtocol: (protocol: string) => void;
  protocols: string[];
}

export default function Filters({
  searchTerm,
  setSearchTerm,
  selectedProtocol,
  setSelectedProtocol,
  protocols,
}: FiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <Input
        placeholder="Search assets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="flex gap-2">
        <Button
          variant={selectedProtocol === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedProtocol('all')}
        >
          All
        </Button>
        {protocols.map((protocol) => (
          <Button
            key={protocol}
            variant={selectedProtocol === protocol ? 'default' : 'outline'}
            onClick={() => setSelectedProtocol(protocol)}
          >
            {protocol}
          </Button>
        ))}
      </div>
    </div>
  );
}
