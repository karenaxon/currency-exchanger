// import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-service.js';

async function makeApiCall() {
  const response = await ExchangeService.getExchange("USD", "EUR", 10);
  alert(response);
}
makeApiCall();