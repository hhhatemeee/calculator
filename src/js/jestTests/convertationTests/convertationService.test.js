import ConvertationService from '../../convertationService';
import { MOCK_CURRENCY, SERVICE_LIST } from '../../variables';

describe('convertation service test', () => {
  const service = new ConvertationService('FCA');
  let MOCK_CUR;
  let MOCK_SERVICES;

  // jest.mock('../../convertationService');

  // const mockGetConvertation = jest.spyOn(service, 'getConvertation');

  beforeAll(() => {
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({
        data: {
          USD: 12.23,
        },
      }),
    }));
  });

  beforeEach(() => {
    MOCK_CUR = MOCK_CURRENCY;
    MOCK_SERVICES = SERVICE_LIST;
  });

  afterEach(() => {
    // mockGetConvertation.mockReturnValue(12.13);
  });

  // it('test', async () => {
  //   // service.hideInfo.mockReturnValue(12);
  //   service.switchService('FCA');

  //   const rate = await service.getConvertation('USD');

  //   expect(service.hideInfo).toBeCalledTimes(1);
  // });

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
