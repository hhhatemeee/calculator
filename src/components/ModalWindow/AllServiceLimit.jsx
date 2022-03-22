import React from 'react';
import PropTypes from 'prop-types';

import declinationNumber from '../../helpers/declinationNumber';

const AllServiceLimit = ({ showInfo, handleClick, SERVICE_LIST }) => {
  const daysLeftMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1 - 1)
    .getDate() - new Date().getDate();
  const MOCK_TIME = {
    MINUTE: ['минута', 'минуты', 'минут'],
    HOUR: ['час', 'часа', 'часов'],
    DAY: ['день', 'дня', 'дней'],
  };

  return (
    <>
      <a
        onClick={handleClick}
        className='window-limit__tap-info'
      >
        {showInfo ? 'Скрыть контент..' : 'См. больше...'}
      </a>
      <p
        className='window-limit__info'
        style={showInfo
          ? { whiteSpace: 'pre', opacity: 1, maxHeight: '100px' }
          : { whiteSpace: 'pre', opacity: 0, maxHeight: 0 }}
      >
        {
          SERVICE_LIST.map((service) => {
            if (service === 'OE') {
              return `Cервис ${service}: ${daysLeftMonth
                ? `${declinationNumber(daysLeftMonth, MOCK_TIME.DAY)} до обновления`
                : 'завтра обновится.'}.\r\n`
            }

            return `Сервис ${service}: ${declinationNumber(60 - new Date().getMinutes(), MOCK_TIME.MINUTE)} до обновления. \r\n`
          })
        }
      </p>
    </>
  )
}

AllServiceLimit.propTypes = {
  showInfo: PropTypes.bool,
  handleClick: PropTypes.func,
  SERVICE_LIST: PropTypes.array,
};

AllServiceLimit.defaultProps = {
  showInfo: false,
  handleClick: () => console.log('Не указана функция handleClick'),
  SERVICE_LIST: [],
};


export default AllServiceLimit;