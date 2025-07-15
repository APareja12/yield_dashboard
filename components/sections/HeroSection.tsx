'use client';

import { Card } from '@/components/ui/card';

export default function HeroSection() {
  const scrollToDashboard = () => {
    document
      .getElementById('dashboard')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">DeFi Yields</span>
              <br />
              <span className="text-slate-900">Simplified</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover the highest yield opportunities across leading DeFi
              protocols. All in one beautiful, intuitive dashboard.
            </p>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            {[
              {
                label: 'Protocols Tracked',
                value: '12+',
                color: 'text-blue-600',
              },
              { label: 'Avg APY', value: '8.4%', color: 'text-green-600' },
              { label: 'Total TVL', value: '$2.1B', color: 'text-purple-600' },
            ].map((stat, index) => (
              <Card
                key={index}
                className="p-6 border-0 shadow-lg bg-white/60 backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-12">
            <button
              onClick={scrollToDashboard}
              className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
              style={{ backgroundColor: '#0f172a', color: 'white' }}
            >
              View Dashboard →
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
