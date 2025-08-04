'use client';
import { useState } from 'react';

interface YieldOpportunity {
  protocol: string;
  asset: string;
  apy: string;
  tvl: string;
  risk: 'Low' | 'Medium' | 'High';
  category: string;
}

const mockData: YieldOpportunity[] = [
  {
    protocol: 'Yearn',
    asset: 'USDC',
    apy: '5.1%',
    tvl: '$200M',
    risk: 'Medium',
    category: 'DeFi Protocol',
  },
  {
    protocol: 'Yearn',
    asset: 'USDT',
    apy: '4.8%',
    tvl: '$150M',
    risk: 'Low',
    category: 'DeFi Protocol',
  },
  {
    protocol: 'Compound',
    asset: 'USDC',
    apy: '3.2%',
    tvl: '$800M',
    risk: 'Low',
    category: 'DeFi Protocol',
  },
  {
    protocol: 'Compound',
    asset: 'USDT',
    apy: '3.1%',
    tvl: '$600M',
    risk: 'Low',
    category: 'DeFi Protocol',
  },
  {
    protocol: 'Aave',
    asset: 'USDC',
    apy: '2.8%',
    tvl: '$1.2B',
    risk: 'Low',
    category: 'DeFi Protocol',
  },
  {
    protocol: 'Aave',
    asset: 'USDT',
    apy: '2.7%',
    tvl: '$900M',
    risk: 'Low',
    category: 'DeFi Protocol',
  },
  {
    protocol: 'Curve',
    asset: 'USDC-USDT',
    apy: '6.5%',
    tvl: '$300M',
    risk: 'Medium',
    category: 'DeFi Protocol',
  },
  {
    protocol: 'Uniswap',
    asset: 'ETH-USDC',
    apy: '12.3%',
    tvl: '$120M',
    risk: 'High',
    category: 'DeFi Protocol',
  },
];

export default function YieldTable() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortField, setSortField] = useState<keyof YieldOpportunity>('apy');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return { color: '#f5576c', bg: 'rgba(245, 87, 108, 0.1)' };
      case 'Medium':
        return { color: '#ffc658', bg: 'rgba(255, 198, 88, 0.1)' };
      case 'Low':
        return { color: '#43e97b', bg: 'rgba(67, 233, 123, 0.1)' };
      default:
        return { color: '#64748b', bg: 'rgba(100, 116, 139, 0.1)' };
    }
  };

  const getProtocolIcon = (protocol: string) => {
    const icons: { [key: string]: { bg: string; text: string } } = {
      Yearn: {
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        text: 'Y',
      },
      Compound: {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        text: 'C',
      },
      Aave: {
        bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        text: 'A',
      },
      Curve: {
        bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        text: 'C',
      },
      Uniswap: {
        bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        text: 'U',
      },
    };
    return (
      icons[protocol] || {
        bg: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
        text: protocol[0],
      }
    );
  };

  const handleSort = (field: keyof YieldOpportunity) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...mockData].sort((a, b) => {
    let aVal: string | number = a[sortField];
    let bVal: string | number = b[sortField];

    if (sortField === 'apy') {
      aVal = parseFloat(a.apy.replace('%', ''));
      bVal = parseFloat(b.apy.replace('%', ''));
    }

    if (sortField === 'tvl') {
      const parseTV = (tvl: string) => {
        const num = parseFloat(tvl.replace(/[$BM]/g, ''));
        return tvl.includes('B') ? num * 1000 : num;
      };
      aVal = parseTV(a.tvl);
      bVal = parseTV(b.tvl);
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSelection = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === sortedData.length
        ? []
        : sortedData.map((_, index) => index)
    );
  };

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
      className="sm:p-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem',
            }}
            className="sm:text-xl"
          >
            💎 Live Yield Opportunities
          </h3>
          <p
            style={{
              color: '#64748b',
              fontSize: '0.8rem',
            }}
            className="sm:text-sm"
          >
            Live data • {sortedData.length} opportunities
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#64748b';
            }}
          >
            📊 Export
          </button>
          {selectedItems.length > 0 && (
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 16px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
            >
              🔄 Compare Selected
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="desktop-table">
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <th
                  style={{ padding: '1rem', textAlign: 'left', width: '40px' }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.length === sortedData.length}
                    onChange={toggleSelectAll}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                    }}
                  />
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => handleSort('protocol')}
                >
                  🏛️ Protocol{' '}
                  {sortField === 'protocol' &&
                    (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => handleSort('asset')}
                >
                  💰 Asset{' '}
                  {sortField === 'asset' &&
                    (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'right',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => handleSort('apy')}
                >
                  📈 APY{' '}
                  {sortField === 'apy' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'right',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => handleSort('tvl')}
                >
                  💎 TVL{' '}
                  {sortField === 'tvl' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => handleSort('risk')}
                >
                  🛡️ Risk{' '}
                  {sortField === 'risk' &&
                    (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => {
                const protocolIcon = getProtocolIcon(item.protocol);
                const riskColor = getRiskColor(item.risk);
                const isSelected = selectedItems.includes(index);
                return (
                  <tr
                    key={`${item.protocol}-${item.asset}-${index}`}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected
                        ? 'rgba(102, 126, 234, 0.1)'
                        : 'transparent',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background =
                          'rgba(255, 255, 255, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelection(index)}
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer',
                        }}
                      />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            background: protocolIcon.bg,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: 'white',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {protocolIcon.text}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: '600',
                              color: '#1e293b',
                              fontSize: '0.875rem',
                            }}
                          >
                            {item.protocol}
                          </div>
                          <div
                            style={{ fontSize: '0.75rem', color: '#64748b' }}
                          >
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ fontSize: '1.25rem' }}>💰</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>
                          {item.asset}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          background:
                            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {item.apy}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>
                        {item.tvl}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span
                        style={{
                          background: riskColor.bg,
                          color: riskColor.color,
                          padding: '0.375rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: `1px solid ${riskColor.color}20`,
                        }}
                      >
                        {item.risk}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {sortedData.map((item, index) => {
            const protocolIcon = getProtocolIcon(item.protocol);
            const riskColor = getRiskColor(item.risk);
            const isSelected = selectedItems.includes(index);
            return (
              <div
                key={`mobile-${item.protocol}-${item.asset}-${index}`}
                style={{
                  background: isSelected
                    ? 'rgba(102, 126, 234, 0.1)'
                    : 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: isSelected
                    ? '1px solid rgba(102, 126, 234, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: isSelected 
                    ? '0 8px 25px rgba(102, 126, 234, 0.2)' 
                    : '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  minHeight: '120px',
                  transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                }}
                onClick={() => toggleSelection(index)}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelection(index);
                      }}
                      style={{
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        background: protocolIcon.bg,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.125rem',
                        fontWeight: '700',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        flexShrink: 0,
                      }}
                    >
                      {protocolIcon.text}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontWeight: '700',
                          color: '#1e293b',
                          fontSize: '1.125rem',
                          marginBottom: '0.25rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.protocol}
                      </div>
                      <div
                        style={{
                          fontSize: '0.875rem',
                          color: '#64748b',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        💰 {item.asset}
                      </div>
                    </div>
                  </div>
                  {/* Risk Badge */}
                  <span
                    style={{
                      background: riskColor.bg,
                      color: riskColor.color,
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      border: `1px solid ${riskColor.color}20`,
                      flexShrink: 0,
                      marginLeft: '0.5rem',
                    }}
                  >
                    {item.risk}
                  </span>
                </div>
                {/* Metrics */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        background:
                          'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.apy}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                      APY
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.tvl}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                      TVL
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /* Mobile-first: Show cards by default */
        .mobile-cards {
          display: block;
        }
        .desktop-table {
          display: none;
        }
        /* Desktop breakpoints */
        @media (min-width: 768px) {
          .mobile-cards {
            display: none;
          }
          .desktop-table {
            display: block;
          }
        }
        /* Responsive classes */
        .flex {
          display: flex;
        }
        .flex-col {
          flex-direction: column;
        }
        .flex-row {
          flex-direction: row;
        }
        .justify-between {
          justify-content: space-between;
        }
        .items-center {
          align-items: center;
        }
        .gap-3 {
          gap: 0.75rem;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        @media (min-width: 640px) {
          .sm\\:flex-row {
            flex-direction: row;
          }
          .sm\\:justify-between {
            justify-content: space-between;
          }
          .sm\\:items-center {
            align-items: center;
          }
          .sm\\:mb-0 {
            margin-bottom: 0;
          }
          .sm\\:text-sm {
            font-size: 0.875rem;
          }
          .sm\\:text-xl {
            font-size: 1.25rem;
          }
          .sm\\:p-8 {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
