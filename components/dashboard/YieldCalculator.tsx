'use client';

import { useState, useEffect } from 'react';

interface YieldCalculatorProps {
  data: Array<{
    protocol: string;
    asset: string;
    apy: string;
    tvl: string;
  }>;
}

export default function YieldCalculator({ data }: YieldCalculatorProps) {
  const [investment, setInvestment] = useState('10000');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timeFrame, setTimeFrame] = useState('1');
  const [isAnimating, setIsAnimating] = useState(false);

  const selectedData = data[selectedIndex];

  const calculateYield = (): number => {
    if (!investment || !selectedData?.apy) return 0;
    const principal = parseFloat(investment);
    const rate = parseFloat(selectedData.apy.replace('%', '')) / 100;
    return principal * rate;
  };

  const totalReturn = (): string => {
    if (!investment) return '0';
    const principal = parseFloat(investment);
    const yieldAmount = calculateYield();
    return (principal + yieldAmount).toFixed(2);
  };

  const monthlyYield = (): string => {
    const yearlyYield = calculateYield();
    return (yearlyYield / 12).toFixed(2);
  };

  // Trigger animation when values change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [investment, selectedIndex, timeFrame]);

  const formatNumber = (num: string) => {
    return parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        animation: 'fadeInUp 0.8s ease-out 0.2s both',
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
          }}
        >
          💰 Yield Calculator
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Calculate your potential earnings across DeFi protocols
        </p>
      </div>

      {/* Input Section */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2rem',
        }}
      >
        <div className="grid grid-cols-1 md-grid-cols-3 gap-6">
          {/* Investment Amount */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}
            >
              💵 Investment Amount
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                }}
              >
                $
              </span>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#1e293b',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4facfe';
                  e.target.style.boxShadow =
                    '0 0 0 3px rgba(79, 172, 254, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              />
            </div>
          </div>

          {/* Protocol Selection */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}
            >
              🏛️ Protocol & Asset
            </label>
            <select
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#1e293b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4facfe';
                e.target.style.boxShadow = '0 0 0 3px rgba(79, 172, 254, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
              }}
            >
              {data.map((item, index) => (
                <option key={index} value={index}>
                  {item.protocol} - {item.asset} ({item.apy})
                </option>
              ))}
            </select>
          </div>

          {/* Time Frame */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}
            >
              ⏰ Time Frame
            </label>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#1e293b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4facfe';
                e.target.style.boxShadow = '0 0 0 3px rgba(79, 172, 254, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
              }}
            >
              <option value="0.25">3 Months</option>
              <option value="0.5">6 Months</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="5">5 Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {selectedData && investment && (
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(79, 172, 254, 0.2)',
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.15)',
            animation: isAnimating ? 'pulse 0.6s ease-in-out' : 'none',
          }}
        >
          <div className="grid grid-cols-1 md-grid-cols-4 gap-6 text-center">
            {/* Initial Investment */}
            <div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  💰
                </div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginBottom: '0.5rem',
                  }}
                >
                  Initial Investment
                </p>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    animation: isAnimating
                      ? 'numberChange 0.6s ease-in-out'
                      : 'none',
                  }}
                >
                  ${formatNumber(investment)}
                </p>
              </div>
            </div>

            {/* Monthly Yield */}
            <div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  📅
                </div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginBottom: '0.5rem',
                  }}
                >
                  Monthly Yield
                </p>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    background:
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: isAnimating
                      ? 'numberChange 0.6s ease-in-out'
                      : 'none',
                  }}
                >
                  ${formatNumber(monthlyYield())}
                </p>
              </div>
            </div>

            {/* Total Yield */}
            <div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  📈
                </div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginBottom: '0.5rem',
                  }}
                >
                  Total Yield ({timeFrame} year
                  {parseFloat(timeFrame) !== 1 ? 's' : ''})
                </p>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    background:
                      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: isAnimating
                      ? 'numberChange 0.6s ease-in-out'
                      : 'none',
                  }}
                >
                  ${formatNumber(calculateYield().toString())}
                </p>
              </div>
            </div>

            {/* Total Return */}
            <div>
              <div
                style={{
                  background:
                    'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(240, 147, 251, 0.3)',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 8px 24px rgba(240, 147, 251, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-4px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  🎯
                </div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginBottom: '0.5rem',
                  }}
                >
                  Total Return
                </p>
                <p
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    background:
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: isAnimating
                      ? 'numberChange 0.6s ease-in-out'
                      : 'none',
                  }}
                >
                  ${formatNumber(totalReturn())}
                </p>
              </div>
            </div>
          </div>

          {/* Protocol Info */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Investing in{' '}
              <strong style={{ color: '#1e293b' }}>
                {selectedData.protocol}
              </strong>{' '}
              -
              <strong style={{ color: '#1e293b' }}>
                {' '}
                {selectedData.asset}
              </strong>{' '}
              at
              <strong
                style={{
                  background:
                    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '700',
                }}
              >
                {' '}
                {selectedData.apy}
              </strong>{' '}
              APY
            </p>
          </div>
        </div>
      )}

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
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes numberChange {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
