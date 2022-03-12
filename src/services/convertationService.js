export default class ConvertationService {
  constructor(serviceName = 'CC', props) {
    this.hideInfo = props;
    this.limitList = [];
    this.currentService = serviceName;
    window.service = window.service || this;
  }

  #MOCK = {
    API_KEYS: {
      CC: '5fee4e51914caeb5c4c2',
      OE: '5df5a54c19b1495cbfa595eb8b707e43',
      FCA: 'c9a07820-85c3-11ec-a180-d59bc7ad8635',
    },
    CURRENCY: ['USD', 'RUB', 'EUR', 'KYD', 'COP', 'BND', 'ALL', 'XCD', 'EUR', 'BBD', 'BTN', 'BND', 'XAF', 'CUP', 'USD', 'FKP', 'GIP', 'HUF', 'IRR', 'JMD', 'AUD', 'LAK'],
    SERVICE_LIST: ['CC', 'OE', 'FCA'],
    SERVICE_URL: {
      CC: 'currencyconverterapi.com',
      OE: 'openexchangerates.org',
      FCA: 'freecurrencyapi.net',
    }
  }

  #apiKey = this.#MOCK.API_KEYS.CC;

  #currencyList = this.#MOCK.CURRENCY;

  #basicCurrency = 'RUB';

  showWindow() {
    this.limitList.push(this.currentService);
    this.hideInfo(true, this.limitList);

    this.#MOCK.SERVICE_LIST.forEach((serv) => {
      if (this.limitList.includes(serv)) {
        return;
      }

      this.switchService(serv);
    });

  }

  getServiceList() {
    console.log(`Список доступных сервисов: ${this.#MOCK.SERVICE_LIST.join(', ')}`);

    return `Список доступных сервисов: ${this.#MOCK.SERVICE_LIST.join(', ')}`;
  }

  checkService() {
    console.log(`Вы подключены к ${this.currentService}`);

    return `Вы подключены к ${this.currentService}`;
  }

  // #checkLimit(service) {
  //   this.limitList.push(service);
  //   this.hideInfo(true, this.limitList);

  //   MOCK.SERVICE_LIST.forEach((serv) => {
  //     if (this.limitList.includes(serv)) {
  //       return;
  //     }

  //     this.switchService(serv);
  //   });
  // }

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

    this.#basicCurrency = 'RUB';

    console.warn('Такой валюты нет в списке.\n Используйте метод getCurrencyList() для просмотра валют');
  }

  /**
   * Change service
   * @param {string} service name service in SERVICE_LIST array
   */
  switchService(service) {
    if (this.#MOCK.SERVICE_LIST.includes(service)) {
      this.currentService = service;
      switch (this.currentService) {
        case 'CC':
          this.#apiKey = this.#MOCK.API_KEYS.CC;
          break;
        case 'OE':
          this.#apiKey = this.#MOCK.API_KEYS.OE;
          break;
        case 'FCA':
          this.#apiKey = this.#MOCK.API_KEYS.FCA;
          break;
        default:
          this.#apiKey = this.#MOCK.API_KEYS.CC;
          break;
      }

      return;
    }

    this.currentService = 'CC';
    console.warn(`Такого сервиса не существует. Список: ${this.#MOCK.SERVICE_LIST}`);
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
            .then((res) => {
              if (res.status === 200) {
                // this.hideInfo(true, this.currentService);
                this.hideInfo(true);

                return res.json();
              }

              console.log(res);
              // this.#checkLimit(this.currentService);
            })
            .then((res) => {
              console.log(Object.values(res).toString());
            })
            .catch((err) => console.log(err));
          break;
        case 'OE':
          fetch(`https://openexchangerates.org/api/convert/1/${to}/${from}?app_id=${this.#apiKey}`)
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              }

              // this.#checkLimit(this.currentService);
            })
            .then((res) => {
              console.log(res.response);
            })
            .catch((err) => console.log(err));
          break;
        case 'FCA':
          fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${this.#apiKey}&base_currency=${from}`)
            .then((res) => {
              if (res.status === 200) {
                // this.limitList.push(this.currentService);
                return res.json();
              }
              this.hideInfo(true);

              // this.#checkLimit(this.currentService);
            })
            .then((res) => {
              let result;
              console.log(res);
              Object.keys(res.data).forEach((value) => {
                if (to === value) {
                  console.log(res.data[value]);
                  result = res.data[value];
                  return res.data[value];
                }
              });
              return result;
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

