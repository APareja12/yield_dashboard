'use client';

interface StatsCardsProps {
  data: Array<{
    protocol: string;
    asset: string;
    apy: string;
    tvl: string;
  }>;
}

export default function StatsCards({ data }: StatsCardsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-2 lg-grid-cols-4 gap-6 mb-12">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative group"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '2rem',
              animation: 'pulse 2s infinite',
            }}
          >
            <div
              style={{
                height: '1rem',
                background:
                  'linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%)',
                borderRadius: '4px',
                marginBottom: '0.75rem',
                animation: 'shimmer 1.5s infinite',
              }}
            ></div>
            <div
              style={{
                height: '2rem',
                background:
                  'linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%)',
                borderRadius: '4px',
                width: '60%',
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  }

  const totalProtocols = new Set(data.map((item) => item.protocol)).size;
  const highestAPY = data.length > 0 ? data[0].apy : '0%';
  const totalOpportunities = data.length;

  const avgAPY =
    data.length > 0
      ? (
          data.reduce((sum, item) => {
            const apy = parseFloat(item.apy.replace('%', '')) || 0;
            return sum + apy;
          }, 0) / data.length
        ).toFixed(1) + '%'
      : '0%';

  const stats = [
    {
      label: 'Protocols',
      value: totalProtocols.toString(),
      icon: '🏛️',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadowColor: 'rgba(102, 126, 234, 0.3)',
    },
    {
      label: 'Best APY',
      value: highestAPY,
      icon: '📈',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      shadowColor: 'rgba(240, 147, 251, 0.3)',
    },
    {
      label: 'Avg APY',
      value: avgAPY,
      icon: '📊',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      shadowColor: 'rgba(79, 172, 254, 0.3)',
    },
    {
      label: 'Opportunities',
      value: totalOpportunities.toString(),
      icon: '💎',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      shadowColor: 'rgba(67, 233, 123, 0.3)',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg-grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: `0 8px 32px ${stat.shadowColor}`,
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 12px 40px ${stat.shadowColor}, 0 0 0 1px rgba(255, 255, 255, 0.3)`;
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 32px ${stat.shadowColor}`;
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          {/* Background gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: stat.gradient,
              opacity: 0.1,
              borderRadius: '20px',
              transition: 'opacity 0.3s ease',
            }}
            className="group-hover:opacity-20"
          ></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div
                style={{
                  fontSize: '2rem',
                  background: stat.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: stat.gradient,
                  borderRadius: '50%',
                  boxShadow: `0 0 10px ${stat.shadowColor}`,
                  animation: 'pulse 2s infinite',
                }}
              ></div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  background: stat.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  fontWeight: '500',
                  letterSpacing: '0.025em',
                }}
              >
                {stat.label}
              </div>
            </div>
          </div>

          {/* Animated border */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `conic-gradient(from 0deg, transparent, ${stat.shadowColor}, transparent)`,
              borderRadius: '20px',
              padding: '1px',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
            className="group-hover:opacity-100"
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '19px',
              }}
            ></div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }
      `}</style>
    </div>
  );
}
