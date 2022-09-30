const getCurrencyConverter = async (currency) => {
  const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${currency}`);
  const json = await response.json();

  return json;

  // return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getCurrencyConverter;
