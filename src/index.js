import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-service.js';
import InitialCallService from './js/initial-call-service.js';

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

function createDropdownMenus(data) {
  if (data) {
    const conversionRates = data.conversion_rates;
    
    for (const key in conversionRates) {
      console.log(key);
      $('#baseCode').append(`<option value="${key}"> ${key} </option>`);
      $('#targetCode').append(`<option value="${key}"> ${key} </option>`);
    } 
    
  } else {
    $('.showErrors').text(`There was an error: ${data}`);
  }
}

async function initialCall() {
  const response = await InitialCallService.getInitialResponse();
  createDropdownMenus(response);
}

initialCall();

$(document).ready(function() {
  $('#btn').click(function() {
    const inputAmount = parseFloat($('#input').val());
    const fromCurrencyCode = $('#baseCode').val();
    const toCurrencyCode = $('#targetCode').val();
    // clearFields();
    makeApiCall(fromCurrencyCode, toCurrencyCode, inputAmount);
  });
});