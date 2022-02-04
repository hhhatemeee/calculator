import { MOCK_CURRENCY } from './variables.js';

export default class ConvertationService {
  #apiKey = '5fee4e51914caeb5c4c2';

  #currencyList = MOCK_CURRENCY;

  #basicCurrency = 'RUB';

  constructor(serviceName = 'Currency Converter') {
    this.currentService = serviceName;
  }

  checkService() {
    return `Вы подключены к ${this.currentService}`;
  }

  getBasicCurrency() {
    return this.#basicCurrency;
  }

  getCurrencyList() {
    return this.#currencyList;
  }

  setBasicCurrency(value) {
    if (this.#currencyList.includes(value)) {
      this.#basicCurrency = value;

      return;
    }

    console.warn('Такой валюты нет в списке.\n Используйте метод getCurrencyList() для просмотра валют');
  }

  switchService(service) {
    const serviceList = ['Currency Converter', 'Currate', 'Open Exange'];

    if (serviceList.includes(service)) {
      this.currentService = service;
    }

    switch (this.currentService) {
      case 'Currency Converter':
        this.apiKey = '5fee4e51914caeb5c4c2';
        break;
      default:
    }
    return (`Укажите сервис, который хотите использовать. Список: ${serviceList} `);
  }

  updateCurrencyList() {
    switch (this.currentService) {
      case 'Currency Converter':
        fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${this.#apiKey}`)
          .then((res) => res.json())
          .then((res) => {
            this.#currencyList = Object.keys(res.results);
          });
      case 'Currate':
        break;
      case 'Open Exange':
        break;
      default:
    }

    console.log('Список валют обновлен');
  }

  getConvertation(currency) {
    if (this.currencyList.includes(currency)) {
      switch (this.currentService) {
        case 'Currency Converter':
          fetch(`https://free.currconv.com/api/v7/convert?q=${currency}_${this.#basicCurrency}&compact=ultra&apiKey=${this.#apiKey}`)
            .then((res) => res.json())
            .then((res) => console.log(Object.values(res).toString()));
        case 'Currate':
          break;
        case 'Open Exange':
          break;
        default:
      }

      return;
    }

    console.warn('Такой валюты нет в списке');
  }
}
