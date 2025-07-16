export async function getCompoundRates() {
  try {
    console.log('Fetching Compound data...');

    // Use environment variable instead of hardcoded URL
    const apiUrl =
      process.env.NEXT_PUBLIC_COMPOUND_API_URL ||
      'https://api.compound.finance/api/v2/ctoken';

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Compound API response:', data);

    // Check if data structure is what we expect
    if (!data.cToken || !Array.isArray(data.cToken)) {
      console.error('Unexpected Compound API response structure');
      return [];
    }

    return data.cToken.slice(0, 5).map((token: any) => ({
      protocol: 'Compound',
      asset: token.symbol || 'Unknown',
      apy: token.supply_rate
        ? (parseFloat(token.supply_rate.value) * 100).toFixed(2) + '%'
        : '0%',
      tvl: token.total_supply
        ? '$' +
          (parseFloat(token.total_supply.value) / 1000000).toFixed(1) +
          'M'
        : '$0M',
    }));
  } catch (error) {
    console.error('Error fetching Compound data:', error);
    return [];
  }
}
