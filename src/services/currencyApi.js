import axios from 'axios';

export const getCurrencies = async (token) => {
  try {
    const response = await axios.get('https://api.currencybeacon.com/v1/currencies', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return Object.values(response.data).filter(item => item.name);
  } catch (error) {
    console.error("Error fetching currencies: ", error);
    throw error;
  }
}

export const convertCurrency = async (token, from, to, amount) => {
  try {
    const response = await axios.get('https://api.currencybeacon.com/v1/convert', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        from: from.short_code,
        to: to.short_code,
        amount: amount
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error converting currency: ", error);
    throw error; 
  }
}
