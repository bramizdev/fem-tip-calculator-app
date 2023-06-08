'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $bill = $('#bill');
const $people = $('#people');
const $customTip = $('#custom-tip');
const $form = $('.form__form');
const $tipsContainer = $('.form__tips');
const $$tipBtns = $$('.btn');
const $reset = $('.reset__btn');

const $resultTip = $('#result-tip');
const $resultTotal = $('#result-total');

const getPercentage = () => {
  const percentage = $('.active')?.hasAttribute('data-tip')
    ? $('.active').getAttribute('data-tip')
    : $customTip.value;
  return percentage;
};

const formatCurrency = (amount) => {
  const options = { style: 'currency', currency: 'USD' };
  return amount.toLocaleString('en-US', options);
};

const calculateTip = (bill, percentage = 1, people = 1) => {
  const tip = (bill * percentage) / 100 / people;
  return tip;
};

const calculateTotal = (bill, percentage = 0, people = 1) => {
  const total = (bill + calculateTip(bill, percentage)) / people;
  return total;
};

const displayResults = (bill, percentage, people) => {
  $resultTip.textContent = formatCurrency(
    calculateTip(bill, percentage, people)
  );
  $resultTotal.textContent = formatCurrency(
    calculateTotal(bill, percentage, people)
  );
};

const displayError = (element, msg) => {
  const formControl = element.closest('.form__control');
  const errorMessage = formControl.querySelector('.error__msg');
  const input = formControl.querySelector('input');

  errorMessage.textContent = msg;
  input.classList.add('input__error');
};

const removeError = (element) => {
  const formControl = element.closest('.form__control');
  const errorMessage = formControl.querySelector('.error__msg');
  const input = formControl.querySelector('input');
  errorMessage.textContent = '';
  input.classList.remove('input__error');
};

const checkInput = (input, element) => {
  let isInputValid = false;
  if (Number(input) === 0) {
    return displayError(element, 'Type a valid number');
  } else {
    isInputValid = true;
  }
  return isInputValid;
};

$form.addEventListener('input', (e) => {
  removeError(e.target);
  const bill = Number($bill.value);
  const percentage = Number(getPercentage());
  const people = Number($people.value);
  if (!checkInput(bill, $bill) || !checkInput(people, $people)) return;
  displayResults(bill, percentage, people);
});

$customTip.addEventListener('input', () => {
  $$tipBtns.forEach((btn) => btn.classList.remove('active'));
});

$tipsContainer.addEventListener('click', (e) => {
  const selected = e.target;
  if (!selected.classList.contains('btn')) return;
  $$tipBtns.forEach((btn) => btn.classList.remove('active'));
  selected.classList.add('active');
  $customTip.value = '';
  const bill = Number($bill.value);
  const percentage = Number(selected.getAttribute('data-tip'));
  const people = Number($people.value) || 1;
  displayResults(bill, percentage, people);
});

$reset.addEventListener('click', () => {
  [$bill, $people].forEach((element) => {
    removeError(element);
    element.value = '';
  });
  $$tipBtns.forEach((btn) => btn.classList.remove('active'));
  $resultTotal.textContent = '$0.00';
  $resultTip.textContent = '$0.00';
});
