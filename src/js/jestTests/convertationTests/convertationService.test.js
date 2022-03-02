import ConvertationService from '../../convertationService';
import { MOCK_CURRENCY, SERVICE_LIST } from '../../variables';

describe('convertation service test', () => {
  const service = new ConvertationService('CC');
  let MOCK_CUR;
  let MOCK_SERVICES;

  jest.mock('../../convertationService');

  beforeAll(() => {
    window.fetch = jest.fn(() => {
      Promise.resolve({
        json: () => Promise.resolve({ data: { USD: 12.23 } }),
      });
    });
  });

  beforeEach(() => {
    MOCK_CUR = MOCK_CURRENCY;
    MOCK_SERVICES = SERVICE_LIST;
  });

  test('setBasicCurrency test', () => {
    MOCK_CUR.forEach((val) => {
      service.setBasicCurrency(val);

      expect(service.getBasicCurrency()).toBe(val);
    });

    service.setBasicCurrency('asdasd');
    expect(service.getBasicCurrency()).toBe('RUB');

    service.setBasicCurrency(null);
    expect(service.getBasicCurrency()).toBe('RUB');
  });

  test('switchService test', () => {
    SERVICE_LIST.forEach((val) => {
      service.switchService(val);

      expect(service.currentService).toBe(val);
    });

    service.switchService(null);
    expect(service.currentService).toBe('CC');
  });
});
