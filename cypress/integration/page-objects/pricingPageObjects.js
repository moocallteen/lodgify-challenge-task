module.exports = {
  //CSS selectors
  yearlyPeriodBtn: 'li[data-price-period="2"]',
  twoYearsPeriodBtn: 'li[data-price-period="3"]',
  rentalNumberInput: 'input[id="scroll-prop-plan"]',
  starterInfoCard: 'div[class$="card-starter"]',
  currencySelector: 'select[class^="price-currency"]',
  sliderRound: 'div[class="slider-handle min-slider-handle round"]',

  //XPath selectors
  proInfoCard: '//h6[text()="Professional"]/../../../div',
  ultimateInfoCard: '//h6[text()="Ultimate"]/../../../div',
  faqQest01:
    '//div[contains(@class, "faq-item")][1]//div[@class="faq-question"]',
  faqAnwer01:
    '//div[contains(@class, "faq-item")][1]//div[@class="faq-answer"]',
};
