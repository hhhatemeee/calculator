import { MOCK_CURRENCY, API_KEYS, SERVICE_LIST } from './variables.js';

/**
 * Currency conversion in different services
 */
export default class ConvertationService {
  #apiKey = API_KEYS.CC;

  #currencyList = MOCK_CURRENCY;

  #basicCurrency = 'RUB';

  constructor(serviceName = 'CC') {
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

  /**
   * Change service
   * @param {string} service name service in SERVICE_LIST array
   */
  switchService(service) {
    if (SERVICE_LIST.includes(service)) {
      this.currentService = service;
      switch (this.currentService) {
        case 'CC':
          this.#apiKey = API_KEYS.CC;
          break;
        case 'OE':
          this.#apiKey = API_KEYS.OE;
          break;
        case 'FCA':
          this.#apiKey = API_KEYS.FCA;
          break;
        default:
      }

      return;
    }

    console.warn(`Укажите сервис, который хотите использовать. Список: ${SERVICE_LIST}`);
  }

  /**
   * Update the list of currencies from the server. By default from constants.
   */
  updateCurrencyList() {
    switch (this.currentService) {
      case 'СС':
        fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${this.#apiKey}`)
          .then((res) => res.json())
          .then((res) => {
            this.#currencyList = Object.keys(res.results);
          })
          .catch((err) => console.log(err));

        break;
      case 'FCA':
        fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${this.#apiKey}`)
          .then((res) => res.json())
          .then((res) => {
            this.#currencyList = Object.keys(res.data);
          })
          .catch((err) => console.log(err));

        break;
      case 'OE':
        fetch(`https://openexchangerates.org/api/latest.json?app_id=${this.#apiKey}`)
          .then((res) => res.json())
          .then((res) => {
            this.#currencyList = Object.keys(res.rates);
          })
          .catch((err) => console.log(err));

        break;
      default:
    }

    console.log('Список валют обновлен');
  }

  /**
   * Currency conversion
   * @param {string} from Currency to be converted
   * @param {stirng} to Currency to which to convert
   * @returns {sting | number} finished value
   */
  getConvertation(from, to = this.#basicCurrency) {
    if (this.#currencyList.includes(from)) {
      switch (this.currentService) {
        case 'CC':
          fetch(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${this.#apiKey}`)
            .then((res) => res.json())
            .then((res) => console.log(Object.values(res).toString()))
            .catch((err) => console.log(err));
          break;
        case 'OE':
          fetch(`https://openexchangerates.org/api/convert/1/${to}/${from}?app_id=${this.#apiKey}`)
            .then((res) => res.json())
            .then((res) => console.log(res.response))
            .catch((err) => console.log(err));
          break;
        case 'FCA':
          fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${this.#apiKey}&base_currency=${from}`)
            .then((res) => res.json())
            .then((res) => {
              Object.keys(res.data).forEach((value) => {
                if (to === value) {
                  console.log(res.data[value]);
                }
              });
            })
            .catch((err) => console.log(err));
          break;
        default:
      }

      return;
    }

    console.warn('Валюта в списке не найдена');
  }
}
