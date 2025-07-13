import YieldTable from '@/components/dashboard/YieldTable';
import HeroSection from '@/components/sections/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section
        id="dashboard"
        className="bg-gradient-to-br from-slate-50 to-white py-20"
      >
        <div className="container mx-auto px-4">
          <YieldTable />
        </div>
      </section>
    </div>
  );
}
