import YieldTable from '@/components/dashboard/YieldTable';
import Header from '@/components/layout/Header';
import PortfolioTracker from '@/components/dashboard/PortfolioTracker';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        <PortfolioTracker />
        <YieldTable />
      </main>
    </div>
  );
}
