'use client';

import { useState, useEffect } from 'react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedProtocol: string;
  setSelectedProtocol: (protocol: string) => void;
  protocols: string[];
}

export default function Filters({
  searchTerm,
  setSearchTerm,
  selectedProtocol,
  setSelectedProtocol,
  protocols,
}: FiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Common crypto assets for suggestions
  const commonAssets = [
    'USDC',
    'USDT',
    'DAI',
    'ETH',
    'WBTC',
    'WETH',
    'AAVE',
    'COMP',
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = commonAssets.filter((asset) =>
        asset.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && searchTerm.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

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
    const gradients: { [key: string]: { gradient: string; shadow: string } } = {
      Compound: {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        shadow: 'rgba(102, 126, 234, 0.3)',
      },
      Aave: {
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        shadow: 'rgba(67, 233, 123, 0.3)',
      },
      Yearn: {
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        shadow: 'rgba(240, 147, 251, 0.3)',
      },
    };
    return (
      gradients[protocol] || {
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        shadow: 'rgba(79, 172, 254, 0.3)',
      }
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedProtocol('all');
  };

  const hasActiveFilters = searchTerm !== '' || selectedProtocol !== 'all';

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
        animation: 'fadeInUp 0.8s ease-out 0.6s both',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4
            style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.25rem',
            }}
          >
            🔍 Filter & Search
          </h4>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Find the perfect yield opportunities
          </p>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#ef4444',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ✕ Clear All
          </button>
        )}
      </div>

      <div className="flex flex-col lg-flex-row gap-6">
        {/* Search Section */}
        <div style={{ flex: 1, position: 'relative' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem',
            }}
          >
            🎯 Search Assets
          </label>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.125rem',
                color: isSearchFocused ? '#667eea' : '#64748b',
                transition: 'color 0.3s ease',
                zIndex: 2,
              }}
            >
              🔍
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search USDC, ETH, DAI..."
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                background: isSearchFocused
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: isSearchFocused
                  ? '2px solid #667eea'
                  : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#1e293b',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isSearchFocused
                  ? '0 0 0 4px rgba(102, 126, 234, 0.1), 0 8px 25px rgba(102, 126, 234, 0.15)'
                  : '0 4px 12px rgba(0, 0, 0, 0.05)',
                outline: 'none',
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                setIsSearchFocused(false);
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />

            {/* Search Suggestions */}
            {showSuggestions && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  marginTop: '0.5rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  animation: 'fadeInDown 0.3s ease-out',
                }}
              >
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setShowSuggestions(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#1e293b',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                      borderRadius:
                        index === 0
                          ? '12px 12px 0 0'
                          : index === searchSuggestions.length - 1
                          ? '0 0 12px 12px'
                          : '0',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'rgba(102, 126, 234, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    💰 {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Protocol Filters */}
        <div style={{ flex: 2 }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem',
            }}
          >
            🏛️ Filter by Protocol
          </label>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            {/* All Protocols Button */}
            <button
              onClick={() => setSelectedProtocol('all')}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '16px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background:
                  selectedProtocol === 'all'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                color: selectedProtocol === 'all' ? 'white' : '#64748b',
                boxShadow:
                  selectedProtocol === 'all'
                    ? '0 4px 15px rgba(102, 126, 234, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)',
                border:
                  selectedProtocol === 'all'
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                transform:
                  selectedProtocol === 'all'
                    ? 'translateY(-2px)'
                    : 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                if (selectedProtocol !== 'all') {
                  e.currentTarget.style.background =
                    'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.color = '#1e293b';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedProtocol !== 'all') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.color = '#64748b';
                }
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>🌐</span>
              All Protocols
            </button>

            {/* Individual Protocol Buttons */}
            {protocols.map((protocol) => {
              const config = getProtocolGradient(protocol);
              const isSelected = selectedProtocol === protocol;

              return (
                <button
                  key={protocol}
                  onClick={() => setSelectedProtocol(protocol)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '16px',
                    border: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: isSelected
                      ? config.gradient
                      : 'rgba(255, 255, 255, 0.1)',
                    color: isSelected ? 'white' : '#64748b',
                    boxShadow: isSelected
                      ? `0 4px 15px ${config.shadow}`
                      : '0 2px 8px rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: isSelected
                      ? 'none'
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    transform: isSelected
                      ? 'translateY(-2px)'
                      : 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background =
                        'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.color = '#1e293b';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${config.shadow}`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background =
                        'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.color = '#64748b';
                      e.currentTarget.style.boxShadow =
                        '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }
                  }}
                >
                  <span style={{ marginRight: '0.5rem' }}>
                    {getProtocolIcon(protocol)}
                  </span>
                  {protocol}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '0.75rem',
              fontWeight: '600',
            }}
          >
            🎯 Active Filters:
          </p>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                🔍 Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '10px',
                    color: 'white',
                  }}
                >
                  ✕
                </button>
              </span>
            )}
            {selectedProtocol !== 'all' && (
              <span
                style={{
                  background: getProtocolGradient(selectedProtocol).gradient,
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                {getProtocolIcon(selectedProtocol)} {selectedProtocol}
                <button
                  onClick={() => setSelectedProtocol('all')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '10px',
                    color: 'white',
                  }}
                >
                  ✕
                </button>
              </span>
            )}
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

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
