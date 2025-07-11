// Test Compound API
export async function getCompoundData() {
  try {
    const response = await fetch('https://api.compound.finance/api/v2/ctoken');
    const data = await response.json();
    console.log('Compound data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching Compound data:', error);
  }
}
