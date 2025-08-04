'use client';

import { useState } from 'react';

interface RiskAssessmentProps {
  data: Array<{
    protocol: string;
    asset: string;
    apy: string;
    tvl: string;
  }>;
}

export default function RiskAssessment({ data }: RiskAssessmentProps) {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(
    null
  );
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getRiskLevel = (protocol: string, apy: string) => {
    const apyNum = parseFloat(apy.replace('%', ''));

    if (apyNum > 8)
      return {
        level: 'High',
        color: '#f5576c',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        shadow: 'rgba(245, 87, 108, 0.3)',
        bgGradient:
          'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
        score: 85,
        icon: '⚠️',
      };
    if (apyNum > 5)
      return {
        level: 'Medium',
        color: '#ffc658',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        shadow: 'rgba(255, 198, 88, 0.3)',
        bgGradient:
          'linear-gradient(135deg, rgba(255, 154, 158, 0.1) 0%, rgba(254, 207, 239, 0.1) 100%)',
        score: 60,
        icon: '⚡',
      };
    return {
      level: 'Low',
      color: '#43e97b',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      shadow: 'rgba(67, 233, 123, 0.3)',
      bgGradient:
        'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)',
      score: 25,
      icon: '✅',
    };
  };

  const getRiskFactors = (protocol: string) => {
    const factors = {
      Compound: [
        {
          name: 'Smart Contract Risk',
          severity: 'Medium',
          description: 'Audited but complex contracts',
        },
        {
          name: 'Liquidation Risk',
          severity: 'High',
          description: 'Collateral can be liquidated',
        },
        {
          name: 'Interest Rate Risk',
          severity: 'Low',
          description: 'Rates can fluctuate',
        },
      ],
      Aave: [
        {
          name: 'Smart Contract Risk',
          severity: 'Low',
          description: 'Battle-tested protocols',
        },
        {
          name: 'Liquidation Risk',
          severity: 'High',
          description: 'Automatic liquidations',
        },
        {
          name: 'Oracle Risk',
          severity: 'Medium',
          description: 'Price feed dependencies',
        },
      ],
      Yearn: [
        {
          name: 'Smart Contract Risk',
          severity: 'High',
          description: 'Complex strategy contracts',
        },
        {
          name: 'Strategy Risk',
          severity: 'High',
          description: 'Automated yield strategies',
        },
        {
          name: 'Impermanent Loss',
          severity: 'Medium',
          description: 'LP token exposure',
        },
      ],
    };
    return (
      factors[protocol as keyof typeof factors] || [
        {
          name: 'Smart Contract Risk',
          severity: 'Medium',
          description: 'General protocol risk',
        },
      ]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return '#f5576c';
      case 'Medium':
        return '#ffc658';
      case 'Low':
        return '#43e97b';
      default:
        return '#64748b';
    }
  };

  const filteredData = selectedRiskLevel
    ? data.filter(
        (item) =>
          getRiskLevel(item.protocol, item.apy).level === selectedRiskLevel
      )
    : data;

  const riskLevels = ['Low', 'Medium', 'High'];
  const riskCounts = riskLevels.map(
    (level) =>
      data.filter(
        (item) => getRiskLevel(item.protocol, item.apy).level === level
      ).length
  );

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
        animation: 'fadeInUp 0.8s ease-out 0.4s both',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
          }}
        >
          🛡️ Risk Assessment
        </h3>
        <p
          style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.4' }}
        >
          Comprehensive risk analysis for each protocol and yield opportunity
        </p>
      </div>

      {/* Risk Level Filter */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2rem',
        }}
      >
        {/* Mobile Layout */}
        <div className="mobile-filter-layout">
          {/* All Risks Button */}
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setSelectedRiskLevel(null)}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background:
                  selectedRiskLevel === null
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                color: selectedRiskLevel === null ? 'white' : '#64748b',
                boxShadow:
                  selectedRiskLevel === null
                    ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                    : 'none',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              All Risks ({data.length})
            </button>
          </div>

          {/* Risk Level Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
            }}
          >
            {riskLevels.map((level, index) => {
              const risk = getRiskLevel(
                '',
                level === 'High' ? '10%' : level === 'Medium' ? '6%' : '3%'
              );
              return (
                <button
                  key={level}
                  onClick={() => setSelectedRiskLevel(level)}
                  style={{
                    padding: '1rem 0.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background:
                      selectedRiskLevel === level
                        ? risk.gradient
                        : 'rgba(255, 255, 255, 0.1)',
                    color: selectedRiskLevel === level ? 'white' : '#64748b',
                    boxShadow:
                      selectedRiskLevel === level
                        ? `0 4px 12px ${risk.shadow}`
                        : 'none',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{risk.icon}</span>
                  <div>
                    <div style={{ marginBottom: '0.25rem' }}>{level}</div>
                    <div style={{ fontSize: '0.625rem', opacity: 0.8 }}>
                      ({riskCounts[index]})
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="desktop-filter-layout">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '0.25rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                gap: '0.25rem',
              }}
            >
              <button
                onClick={() => setSelectedRiskLevel(null)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background:
                    selectedRiskLevel === null
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'transparent',
                  color: selectedRiskLevel === null ? 'white' : '#64748b',
                  boxShadow:
                    selectedRiskLevel === null
                      ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                      : 'none',
                }}
              >
                All Risks ({data.length})
              </button>
              {riskLevels.map((level, index) => {
                const risk = getRiskLevel(
                  '',
                  level === 'High' ? '10%' : level === 'Medium' ? '6%' : '3%'
                );
                return (
                  <button
                    key={level}
                    onClick={() => setSelectedRiskLevel(level)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background:
                        selectedRiskLevel === level
                          ? risk.gradient
                          : 'transparent',
                      color: selectedRiskLevel === level ? 'white' : '#64748b',
                      boxShadow:
                        selectedRiskLevel === level
                          ? `0 4px 12px ${risk.shadow}`
                          : 'none',
                    }}
                  >
                    {risk.icon} {level} ({riskCounts[index]})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Cards Grid */}
      <div className="risk-cards-grid">
        {filteredData.slice(0, 9).map((item, index) => {
          const risk = getRiskLevel(item.protocol, item.apy);
          const factors = getRiskFactors(item.protocol);

          return (
            <div
              key={index}
              style={{
                background:
                  hoveredCard === index
                    ? risk.bgGradient
                    : 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(15px)',
                borderRadius: '16px',
                padding: '1.5rem',
                border:
                  hoveredCard === index
                    ? `1px solid ${risk.color}`
                    : '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow:
                  hoveredCard === index
                    ? `0 12px 40px ${risk.shadow}, 0 0 0 1px ${risk.color}`
                    : '0 4px 20px rgba(0, 0, 0, 0.1)',
                transform:
                  hoveredCard === index
                    ? 'translateY(-4px) scale(1.01)'
                    : 'translateY(0) scale(1)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      background: risk.gradient,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: 'white',
                      boxShadow: `0 4px 12px ${risk.shadow}`,
                      flexShrink: 0,
                    }}
                  >
                    {item.protocol[0]}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4
                      style={{
                        fontWeight: '700',
                        fontSize: '1.125rem',
                        color: '#1e293b',
                        marginBottom: '0.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.protocol}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        fontWeight: '500',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.asset}
                    </p>
                  </div>
                </div>

                {/* Risk Badge */}
                <div
                  style={{
                    background: risk.gradient,
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '25px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    boxShadow: `0 4px 12px ${risk.shadow}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    flexShrink: 0,
                    marginLeft: '0.5rem',
                  }}
                >
                  {risk.icon} {risk.level}
                </div>
              </div>

              {/* Metrics */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: '700',
                      background: risk.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.apy}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>APY</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.tvl}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>TVL</p>
                </div>
              </div>

              {/* Risk Score Bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      fontWeight: '600',
                    }}
                  >
                    Risk Score
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: risk.color,
                    }}
                  >
                    {risk.score}/100
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${risk.score}%`,
                      height: '100%',
                      background: risk.gradient,
                      borderRadius: '3px',
                      transition: 'width 1s ease-out',
                      boxShadow: `0 0 8px ${risk.shadow}`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Risk Factors */}
              <div>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                  }}
                >
                  Risk Factors:
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {factors.map((factor, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#374151',
                          fontWeight: '500',
                          flex: 1,
                          marginRight: '0.5rem',
                        }}
                      >
                        {factor.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.675rem',
                          fontWeight: '700',
                          color: getSeverityColor(factor.severity),
                          background: `${getSeverityColor(factor.severity)}15`,
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          flexShrink: 0,
                        }}
                      >
                        {factor.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
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

        /* Mobile-first: Show mobile layout by default */
        .mobile-filter-layout {
          display: block;
        }

        .desktop-filter-layout {
          display: none;
        }

        .risk-cards-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1rem;
        }

        /* Desktop breakpoints */
        @media (min-width: 768px) {
          /* Hide mobile layout, show desktop layout */
          .mobile-filter-layout {
            display: none;
          }

          .desktop-filter-layout {
            display: block;
          }

          .risk-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .risk-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
