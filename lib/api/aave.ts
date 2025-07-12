interface AaveReserve {
  symbol: string;
  liquidityRate: string;
  totalLiquidity: string;
}

export async function getAaveRates() {
  try {
    // Aave V3 Ethereum mainnet
    const response = await fetch(
      'https://aave-api-v2.aave.com/data/reserves-incentives-v3?chainId=1'
    );
    const data = await response.json();

    return data.map((reserve: AaveReserve) => ({
      protocol: 'Aave',
      asset: reserve.symbol,
      apy: ((parseFloat(reserve.liquidityRate) / 1e25) * 100).toFixed(2) + '%',
      tvl: '$' + (parseFloat(reserve.totalLiquidity) / 1e6).toFixed(1) + 'M',
    }));
  } catch (error) {
    console.error('Error fetching Aave data:', error);
    return [];
  }
}
