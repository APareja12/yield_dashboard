import { getCompoundRates } from './compound';
import { getAaveRates } from './aave';

export async function getAllYieldData() {
  try {
    const [compoundData, aaveData] = await Promise.all([
      getCompoundRates(),
      getAaveRates(),
    ]);

    const allData = [...compoundData, ...aaveData];

    // Sort by APY (highest first)
    return allData.sort((a, b) => parseFloat(b.apy) - parseFloat(a.apy));
  } catch (error) {
    console.error('Error fetching all yield data:', error);
    return [];
  }
}
