export default class ExchangeService {  
  static async getExchange(baseCode, targeCode, amount) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_Key}/pair/${baseCode}/${targeCode}/${amount}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}