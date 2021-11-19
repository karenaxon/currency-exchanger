import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-service.js';

function getElements(response) {
  if (response) {
    $('#display-exchange').text(`The exchange is ${response.conversion_result}%`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(fromCode, toCode, number) {
  const response = await ExchangeService.getExchange(fromCode, toCode, number);
  getElements(response);
}

$(document).ready(function() {
  $('#btn').click(function() {
    let inputAmount = parseFloat($('#input').val());
    // clearFields();
    makeApiCall("USD", "EUR", inputAmount);
  });
});