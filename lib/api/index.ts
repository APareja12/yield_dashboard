import { getCompoundRates } from './compound';
import { getAaveRates } from './aave';

export async function getAllYieldData() {
  try {
    console.log('Fetching yield data...');

    const [compoundData, aaveData] = await Promise.all([
      getCompoundRates().catch((err) => {
        console.error('Compound API error:', err);
        return [];
      }),
      getAaveRates().catch((err) => {
        console.error('Aave API error:', err);
        return [];
      }),
    ]);

    console.log('Compound data:', compoundData);
    console.log('Aave data:', aaveData);

    const allData = [...compoundData, ...aaveData];
    console.log('All data before sorting:', allData);

    // Sort by APY (highest first) - add safety check
    const sortedData = allData.sort((a, b) => {
      const apyA = parseFloat(a.apy.replace('%', ''));
      const apyB = parseFloat(b.apy.replace('%', ''));
      return apyB - apyA;
    });

    console.log('Sorted data:', sortedData);
    return sortedData;
  } catch (error) {
    console.error('Error in getAllYieldData:', error);
    return [];
  }
}
