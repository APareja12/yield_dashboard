'use client';

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToDashboard = () => {
    document
      .getElementById('dashboard')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroStats = [
    {
      label: 'Protocols Tracked',
      value: '12+',
      icon: '🏛️',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadow: 'rgba(102, 126, 234, 0.3)',
      delay: '0s',
    },
    {
      label: 'Avg APY',
      value: '8.4%',
      icon: '📈',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      shadow: 'rgba(67, 233, 123, 0.3)',
      delay: '0.2s',
    },
    {
      label: 'Total TVL',
      value: '$2.1B',
      icon: '💎',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      shadow: 'rgba(240, 147, 251, 0.3)',
      delay: '0.4s',
    },
  ];

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
          transition: 'background 0.3s ease',
        }}
      />

      {/* Floating Shapes - Hidden on mobile */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          top: '10%',
          right: '10%',
          animation: 'float 6s ease-in-out infinite',
          backdropFilter: 'blur(20px)',
          display: 'none',
        }}
        className="md:block"
      />
      <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
          borderRadius: '30%',
          bottom: '15%',
          left: '15%',
          animation: 'float 8s ease-in-out infinite reverse',
          backdropFilter: 'blur(15px)',
          display: 'none',
        }}
        className="md:block"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <div
            style={{
              marginBottom: '2rem',
              animation: isLoaded ? 'slideInUp 1s ease-out' : 'none',
            }}
            className="sm:mb-12"
          >
            <h1
              style={{
                fontSize: 'clamp(2rem, 8vw, 6rem)',
                fontWeight: '800',
                lineHeight: '1.1',
                marginBottom: '1rem',
                backgroundImage:
                  'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                letterSpacing: '-0.02em',
              }}
              className="sm:mb-6"
            >
              DeFi Yields
              <br />
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Simplified
              </span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '48rem',
                margin: '0 auto',
                lineHeight: '1.6',
                fontWeight: '400',
                padding: '0 1rem',
              }}
              className="sm:px-0"
            >
              Discover the highest yield opportunities across leading DeFi
              protocols. All in one beautiful, intuitive dashboard with
              real-time analytics.
            </p>
          </div>

          {/* Hero Stats Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
              maxWidth: '20rem',
              margin: '0 auto 3rem auto',
              animation: isLoaded
                ? 'fadeInScale 1.2s ease-out 0.3s both'
                : 'none',
            }}
            className="sm:grid-cols-3 sm:max-w-4xl sm:gap-8 lg:max-w-5xl"
          >
            {heroStats.map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  animation: isLoaded
                    ? `slideInUp 1s ease-out ${stat.delay} both`
                    : 'none',
                }}
                className="sm:p-8"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${stat.shadow}`;
                  e.currentTarget.style.background =
                    'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    backgroundImage: stat.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}
                  className="sm:text-5xl"
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '0.5rem',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  className="sm:text-4xl"
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '500',
                    letterSpacing: '0.025em',
                  }}
                  className="sm:text-base"
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div
            style={{
              animation: isLoaded ? 'slideInUp 1s ease-out 0.6s both' : 'none',
            }}
          >
            <div className="flex flex-col gap-4 justify-center items-center mb-8 sm:flex-row sm:gap-6 sm:mb-12">
              <button
                onClick={scrollToDashboard}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '16px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  maxWidth: '280px',
                }}
                className="sm:w-auto sm:px-8 sm:py-3 sm:text-lg"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-4px) scale(1.05)';
                  e.currentTarget.style.boxShadow =
                    '0 12px 40px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.background =
                    'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.borderColor =
                    'rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 32px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor =
                    'rgba(255, 255, 255, 0.3)';
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>
                  🚀 Explore Dashboard
                </span>
              </button>

              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  width: '100%',
                  maxWidth: '280px',
                }}
                className="sm:w-auto sm:text-lg"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📊 View Analytics →
              </button>
            </div>

            {/* Feature Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '2rem',
                maxWidth: '20rem',
                margin: '0 auto 2rem auto',
              }}
              className="sm:flex sm:justify-center sm:gap-8 sm:max-w-none sm:mb-12"
            >
              {[
                { icon: '⚡', text: 'Real-time Data' },
                { icon: '🛡️', text: 'Risk Analysis' },
                { icon: '📈', text: 'Yield Tracking' },
                { icon: '🔄', text: 'Auto-compound' },
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    animation: isLoaded
                      ? `fadeIn 1s ease-out ${0.8 + index * 0.1}s both`
                      : 'none',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  className="sm:bg-transparent sm:border-0 sm:p-0 sm:text-sm"
                >
                  <span style={{ fontSize: '1rem' }} className="sm:text-xl">
                    {feature.icon}
                  </span>
                  <span className="text-center sm:text-left">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator - Hidden on mobile */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: isLoaded ? 'bounceIn 1s ease-out 1s both' : 'none',
              display: 'none',
            }}
            className="md:block"
          >
            <div
              style={{
                width: '32px',
                height: '52px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={scrollToDashboard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '12px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '2px',
                  animation: 'scroll 2s infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.3);
          }
          50% {
            transform: translateX(-50%) scale(1.05);
          }
          70% {
            transform: translateX(-50%) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes scroll {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(16px);
          }
        }

        /* Mobile-first responsive design */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (min-width: 640px) {
          .sm\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }

          .sm\\:flex {
            display: flex;
          }

          .sm\\:flex-row {
            flex-direction: row;
          }

          .sm\\:gap-6 {
            gap: 1.5rem;
          }

          .sm\\:gap-8 {
            gap: 2rem;
          }

          .sm\\:mb-6 {
            margin-bottom: 1.5rem;
          }

          .sm\\:mb-12 {
            margin-bottom: 3rem;
          }

          .sm\\:max-w-4xl {
            max-width: 56rem;
          }

          .sm\\:w-auto {
            width: auto;
          }

          .sm\\:px-0 {
            padding-left: 0;
            padding-right: 0;
          }

          .sm\\:px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          .sm\\:px-8 {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          .sm\\:py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }

          .sm\\:py-16 {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }

          .sm\\:p-8 {
            padding: 2rem;
          }

          .sm\\:text-sm {
            font-size: 0.875rem;
          }

          .sm\\:text-base {
            font-size: 1rem;
          }

          .sm\\:text-lg {
            font-size: 1.125rem;
          }

          .sm\\:text-xl {
            font-size: 1.25rem;
          }

          .sm\\:text-4xl {
            font-size: 2.25rem;
          }

          .sm\\:text-5xl {
            font-size: 3rem;
          }

          .sm\\:max-w-none {
            max-width: none;
          }

          .sm\\:justify-center {
            justify-content: center;
          }

          .sm\\:text-left {
            text-align: left;
          }

          .sm\\:bg-transparent {
            background-color: transparent;
          }

          .sm\\:border-0 {
            border-width: 0;
          }
        }

        @media (min-width: 768px) {
          .md\\:block {
            display: block;
          }
        }

        @media (min-width: 1024px) {
          .lg\\:max-w-5xl {
            max-width: 64rem;
          }

          .lg\\:px-8 {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          .lg\\:py-20 {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
        }
      `}</style>
    </section>
  );
}
