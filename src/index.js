import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './js/exchange-service.js';
import InitialCallService from './js/initial-call-service.js';

function clearFields(){
  $('#baseCode').val("");
  $('#targetCode').val("");
  $('#input').val("");
}

$('#input').on('click', function(){
  $('#display-exchange').text('');
  $('#display-error').text('');
  clearFields();
});

function getElements(response, exchangeAmount) {
  if(response.result === "error") {
    $('#display-error').text(`We don't support the supplied currency code.`);
    //Couldn't use if(response.error-type === "unknown-code") because -type isn't allowed as a variable name.
  }else if (response) {
    const formattedTargetNumber = response.conversion_result.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const formattedBaseNumber = exchangeAmount.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ,");
    $('#display-exchange').text(`${formattedBaseNumber} ${response.base_code} is ${formattedTargetNumber} ${response.target_code}`);
  } else {
    $('#display-error').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(fromCode, toCode, number) {
  const response = await ExchangeService.getExchange(fromCode, toCode, number);
  getElements(response, number);
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
    $('#display-error').text(`There was an error: ${data}`);
  }
}

async function initialCall() {
  const response = await InitialCallService.getInitialResponse();
  createDropdownMenus(response);
}

initialCall();
$(document).ready(function() {
  clearFields();
  $('#btn').on('click', function() {
    const input = $('#input').val();
    const inputAmount = parseFloat($('#input').val());
    const fromCurrencyCode = $('#baseCode').val();
    const toCurrencyCode = $('#targetCode').val();
    
    if (isNaN(input) || input === ""){
      $('#display-error').text(`Please enter an amount.`);
    } else if(fromCurrencyCode === null || toCurrencyCode === null){
      $('#display-error').text(`Please select a currency.`);
    } else{
      makeApiCall(fromCurrencyCode, toCurrencyCode, inputAmount);
    }
  });
});