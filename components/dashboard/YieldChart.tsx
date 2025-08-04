'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';

// Enhanced historical data with more realistic trends
const historicalData = [
  { date: 'Jan 2024', Compound: 3.2, Aave: 2.8, Yearn: 4.1 },
  { date: 'Feb 2024', Compound: 3.5, Aave: 3.1, Yearn: 4.3 },
  { date: 'Mar 2024', Compound: 3.8, Aave: 3.4, Yearn: 4.6 },
  { date: 'Apr 2024', Compound: 4.1, Aave: 3.7, Yearn: 4.9 },
  { date: 'May 2024', Compound: 4.2, Aave: 3.8, Yearn: 5.1 },
  { date: 'Jun 2024', Compound: 3.9, Aave: 3.5, Yearn: 4.8 },
  { date: 'Jul 2024', Compound: 4.0, Aave: 3.6, Yearn: 4.9 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; dataKey: string; value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          fontSize: '0.875rem',
        }}
      >
        <p
          style={{
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#1e293b',
          }}
        >
          {label}
        </p>
        {payload.map((entry: { color: string; dataKey: string; value: number }, index: number) => (
          <p
            key={index}
            style={{
              color: entry.color,
              margin: '0.25rem 0',
              fontWeight: '500',
            }}
          >
            {entry.dataKey}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function YieldChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');
  const [hoveredProtocol, setHoveredProtocol] = useState<string | null>(null);

  const timeframes = ['1M', '3M', '6M', '1Y', 'ALL'];

  const protocolColors = {
    Compound: {
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadow: 'rgba(102, 126, 234, 0.3)',
    },
    Aave: {
      color: '#43e97b',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      shadow: 'rgba(67, 233, 123, 0.3)',
    },
    Yearn: {
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      shadow: 'rgba(240, 147, 251, 0.3)',
    },
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
        animation: 'fadeInUp 0.8s ease-out',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem',
            }}
          >
            Historical Yield Trends
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Track performance across leading DeFi protocols
          </p>
        </div>

        {/* Timeframe Selector */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '0.25rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background:
                  selectedTimeframe === timeframe
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'transparent',
                color: selectedTimeframe === timeframe ? 'white' : '#64748b',
                boxShadow:
                  selectedTimeframe === timeframe
                    ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                    : 'none',
              }}
              onMouseEnter={(e) => {
                if (selectedTimeframe !== timeframe) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#1e293b';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTimeframe !== timeframe) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#64748b';
                }
              }}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Protocol Legend */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-6">
          {Object.entries(protocolColors).map(([protocol, config]) => (
            <div
              key={protocol}
              className="flex items-center cursor-pointer transform transition-all duration-300"
              style={{
                opacity:
                  hoveredProtocol && hoveredProtocol !== protocol ? 0.5 : 1,
              }}
              onMouseEnter={() => setHoveredProtocol(protocol)}
              onMouseLeave={() => setHoveredProtocol(null)}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  background: config.gradient,
                  borderRadius: '50%',
                  marginRight: '0.5rem',
                  boxShadow: `0 0 10px ${config.shadow}`,
                  animation:
                    hoveredProtocol === protocol ? 'pulse 1s infinite' : 'none',
                }}
              ></div>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: hoveredProtocol === protocol ? '#1e293b' : '#64748b',
                  transition: 'color 0.3s ease',
                }}
              >
                {protocol}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={historicalData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148, 163, 184, 0.2)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              style={{ fontWeight: '500' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              style={{ fontWeight: '500' }}
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
            />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="Compound"
              stroke={protocolColors.Compound.color}
              strokeWidth={3}
              dot={{
                fill: protocolColors.Compound.color,
                strokeWidth: 2,
                r: 5,
                style: {
                  filter: `drop-shadow(0 0 6px ${protocolColors.Compound.shadow})`,
                },
              }}
              activeDot={{
                r: 7,
                stroke: protocolColors.Compound.color,
                strokeWidth: 2,
                fill: 'white',
                style: {
                  filter: `drop-shadow(0 0 10px ${protocolColors.Compound.shadow})`,
                },
              }}
              style={{
                filter: `drop-shadow(0 2px 4px ${protocolColors.Compound.shadow})`,
              }}
            />
            <Line
              type="monotone"
              dataKey="Aave"
              stroke={protocolColors.Aave.color}
              strokeWidth={3}
              dot={{
                fill: protocolColors.Aave.color,
                strokeWidth: 2,
                r: 5,
                style: {
                  filter: `drop-shadow(0 0 6px ${protocolColors.Aave.shadow})`,
                },
              }}
              activeDot={{
                r: 7,
                stroke: protocolColors.Aave.color,
                strokeWidth: 2,
                fill: 'white',
                style: {
                  filter: `drop-shadow(0 0 10px ${protocolColors.Aave.shadow})`,
                },
              }}
              style={{
                filter: `drop-shadow(0 2px 4px ${protocolColors.Aave.shadow})`,
              }}
            />
            <Line
              type="monotone"
              dataKey="Yearn"
              stroke={protocolColors.Yearn.color}
              strokeWidth={3}
              dot={{
                fill: protocolColors.Yearn.color,
                strokeWidth: 2,
                r: 5,
                style: {
                  filter: `drop-shadow(0 0 6px ${protocolColors.Yearn.shadow})`,
                },
              }}
              activeDot={{
                r: 7,
                stroke: protocolColors.Yearn.color,
                strokeWidth: 2,
                fill: 'white',
                style: {
                  filter: `drop-shadow(0 0 10px ${protocolColors.Yearn.shadow})`,
                },
              }}
              style={{
                filter: `drop-shadow(0 2px 4px ${protocolColors.Yearn.shadow})`,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

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
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
