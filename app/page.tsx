import YieldTable from '@/components/dashboard/YieldTable';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">DeFi Yield Dashboard</h1>
      <YieldTable />
    </main>
  );
}
