// Fallback data in case APIs fail
const FALLBACK_DATA = [
  { protocol: 'Compound', asset: 'USDC', apy: '4.2%', tvl: '$1.2B' },
  { protocol: 'Compound', asset: 'USDT', apy: '3.9%', tvl: '$900M' },
  { protocol: 'Compound', asset: 'DAI', apy: '3.7%', tvl: '$400M' },
  { protocol: 'Aave', asset: 'USDC', apy: '3.8%', tvl: '$800M' },
  { protocol: 'Aave', asset: 'USDT', apy: '3.5%', tvl: '$600M' },
  { protocol: 'Aave', asset: 'DAI', apy: '3.3%', tvl: '$300M' },
  { protocol: 'Yearn', asset: 'USDC', apy: '5.1%', tvl: '$200M' },
  { protocol: 'Yearn', asset: 'USDT', apy: '4.8%', tvl: '$150M' },
];

export async function getAllYieldData() {
  try {
    console.log('Fetching yield data...');

    // Try to fetch real data with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      // You can uncomment this when you want to test real APIs
      // const response = await fetch('https://api.compound.finance/api/v2/ctoken', {
      //   signal: controller.signal
      // });
      // const data = await response.json();
      // ... process real data

      // For now, use enhanced mock data
      clearTimeout(timeoutId);
      return FALLBACK_DATA.sort(
        (a, b) =>
          parseFloat(b.apy.replace('%', '')) -
          parseFloat(a.apy.replace('%', ''))
      );
    } catch (apiError) {
      console.log('API failed, using fallback data:', apiError);
      clearTimeout(timeoutId);
      return FALLBACK_DATA.sort(
        (a, b) =>
          parseFloat(b.apy.replace('%', '')) -
          parseFloat(a.apy.replace('%', ''))
      );
    }
  } catch (error) {
    console.error('Error in getAllYieldData:', error);
    return FALLBACK_DATA;
  }
}
