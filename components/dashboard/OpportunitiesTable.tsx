'use client';

import { useState } from 'react';

interface OpportunitiesTableProps {
  data: Array<{
    protocol: string;
    asset: string;
    apy: string;
    tvl: string;
  }>;
}

export default function OpportunitiesTable({ data }: OpportunitiesTableProps) {
  const [sortField, setSortField] = useState<
    'protocol' | 'asset' | 'apy' | 'tvl'
  >('apy');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const getProtocolIcon = (protocol: string) => {
    const icons: { [key: string]: string } = {
      Compound: '🏛️',
      Aave: '👻',
      Yearn: '🌾',
      Uniswap: '🦄',
      Curve: '🌊',
      Balancer: '⚖️',
    };
    return icons[protocol] || '🔮';
  };

  const getProtocolGradient = (protocol: string) => {
    const gradients: {
      [key: string]: { gradient: string; shadow: string; bg: string };
    } = {
      Compound: {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        shadow: 'rgba(102, 126, 234, 0.3)',
        bg: 'rgba(102, 126, 234, 0.1)',
      },
      Aave: {
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        shadow: 'rgba(67, 233, 123, 0.3)',
        bg: 'rgba(67, 233, 123, 0.1)',
      },
      Yearn: {
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        shadow: 'rgba(240, 147, 251, 0.3)',
        bg: 'rgba(240, 147, 251, 0.1)',
      },
    };
    return (
      gradients[protocol] || {
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        shadow: 'rgba(79, 172, 254, 0.3)',
        bg: 'rgba(79, 172, 254, 0.1)',
      }
    );
  };

  const getAPYColor = (apy: string) => {
    const apyNum = parseFloat(apy.replace('%', ''));
    if (apyNum > 8) return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    if (apyNum > 5) return 'linear-gradient(135deg, #ffc658 0%, #ff9a56 100%)';
    return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
  };

  const handleSort = (field: 'protocol' | 'asset' | 'apy' | 'tvl') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let valueA, valueB;

    switch (sortField) {
      case 'apy':
        valueA = parseFloat(a.apy.replace('%', ''));
        valueB = parseFloat(b.apy.replace('%', ''));
        break;
      case 'tvl':
        valueA = parseFloat(a.tvl.replace(/[$BM]/g, ''));
        valueB = parseFloat(b.tvl.replace(/[$BM]/g, ''));
        break;
      default:
        valueA = a[sortField].toLowerCase();
        valueB = b[sortField].toLowerCase();
    }

    if (sortDirection === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const toggleRowSelection = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↗️' : '↘️';
  };

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        animation: 'fadeInUp 0.8s ease-out 0.8s both',
      }}
    >
      {/* Table Header */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          padding: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="flex justify-between items-center">
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
              💎 Live Yield Opportunities
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    background:
                      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                  }}
                ></div>
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    fontWeight: '500',
                  }}
                >
                  Live data • {data.length} opportunities
                </span>
              </div>
              {selectedRows.length > 0 && (
                <div
                  style={{
                    background:
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                  }}
                >
                  {selectedRows.length} selected
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#1e293b';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📊 Export
            </button>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
            >
              🚀 Compare Selected
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          {/* Table Headers */}
          <thead>
            <tr
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <th style={{ padding: '1rem', textAlign: 'left', width: '60px' }}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(data.map((_, i) => i));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === data.length}
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#667eea',
                  }}
                />
              </th>

              {[
                { key: 'protocol', label: '🏛️ Protocol' },
                { key: 'asset', label: '💰 Asset' },
                { key: 'apy', label: '📈 APY' },
                { key: 'tvl', label: '💎 TVL' },
                { key: 'action', label: '⚡ Action' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => key !== 'action' && handleSort(key as any)}
                  style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: key !== 'action' ? 'pointer' : 'default',
                    transition: 'color 0.3s ease',
                    userSelect: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (key !== 'action') {
                      e.currentTarget.style.color = '#1e293b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (key !== 'action') {
                      e.currentTarget.style.color = '#374151';
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    {label}
                    {key !== 'action' && (
                      <span style={{ fontSize: '0.75rem' }}>
                        {getSortIcon(key)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedData.map((item, index) => {
              const config = getProtocolGradient(item.protocol);
              const isHovered = hoveredRow === index;
              const isSelected = selectedRows.includes(index);

              return (
                <tr
                  key={`${item.protocol}-${item.asset}-${index}`}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                      : isHovered
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'transparent',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    animation: `fadeInRow 0.6s ease-out ${index * 0.05}s both`,
                  }}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Checkbox */}
                  <td style={{ padding: '1rem' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRowSelection(index)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#667eea',
                      }}
                    />
                  </td>

                  {/* Protocol */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          background: config.gradient,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.125rem',
                          boxShadow: `0 4px 12px ${config.shadow}`,
                          transition: 'transform 0.3s ease',
                          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        {getProtocolIcon(item.protocol)}
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            color: '#1e293b',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {item.protocol}
                        </div>
                        <div
                          style={{
                            fontSize: '0.75rem',
                            color: '#64748b',
                          }}
                        >
                          DeFi Protocol
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Asset */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      <span style={{ fontSize: '0.875rem' }}>💰</span>
                      <span
                        style={{
                          fontWeight: '600',
                          fontSize: '0.875rem',
                          color: '#1e293b',
                        }}
                      >
                        {item.asset}
                      </span>
                    </div>
                  </td>

                  {/* APY */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div
                      style={{
                        background: getAPYColor(item.apy),
                        color: 'white',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '16px',
                        fontWeight: '700',
                        fontSize: '1rem',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.3s ease',
                        transform: isHovered
                          ? 'scale(1.1) translateY(-2px)'
                          : 'scale(1)',
                        display: 'inline-block',
                        minWidth: '80px',
                      }}
                    >
                      {item.apy}
                    </div>
                  </td>

                  {/* TVL */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div>
                      <div
                        style={{
                          fontWeight: '600',
                          fontSize: '0.875rem',
                          color: '#1e293b',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {item.tvl}
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: '#64748b',
                        }}
                      >
                        Total Value Locked
                      </div>
                    </div>
                  </td>

                  {/* Action */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <button
                      style={{
                        background: config.gradient,
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: `0 4px 12px ${config.shadow}`,
                        transform: isHovered
                          ? 'translateY(-2px) scale(1.05)'
                          : 'translateY(0) scale(1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 6px 20px ${config.shadow}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 4px 12px ${config.shadow}`;
                      }}
                    >
                      🚀 Invest
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Showing {data.length} of {data.length} opportunities
        </div>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Last updated: Just now • Auto-refresh: On
        </div>
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

        @keyframes fadeInRow {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
