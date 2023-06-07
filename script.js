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

$form.addEventListener('input', () => {
  const bill = Number($bill.value);
  const percentage = Number(getPercentage()) || bill;
  const people = Number($people.value) || 1;
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
