interface CompoundMarket {
  symbol: string;
  supply_rate: {
    value: string;
  };
  total_supply: {
    value: string;
  };
}

export async function getCompoundRates() {
  try {
    const response = await fetch('https://api.compound.finance/api/v2/ctoken');
    const data = await response.json();

    return (
      data.cToken?.map((token: CompoundMarket) => ({
        protocol: 'Compound',
        asset: token.symbol,
        apy: (parseFloat(token.supply_rate.value) * 100).toFixed(2) + '%',
        tvl:
          '$' +
          (parseFloat(token.total_supply.value) / 1000000).toFixed(1) +
          'M',
      })) || []
    );
  } catch (error) {
    console.error('Error fetching Compound data:', error);
    return [];
  }
}
