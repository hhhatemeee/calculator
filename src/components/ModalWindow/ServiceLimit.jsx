import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const ServiceLimit = ({
  handleShowUrl,
  showUrl,
  SERVICE_LIST,
  switchService,
  listLimit,
  url }) => {

  return (
    <>
      <p
        className='window-limit__info'>
        Сервис
        <a onClick={handleShowUrl} className='window-limit__link'>
          "{listLimit.at(-1)}"
        </a>
        <a className={cn('link', { 'link-open': showUrl })} href={`https://${url}`}>
          {url}
        </a>
        превысил лимит, вы автоматически будете переключены на другой. Или можете выбрать сами:
      </p>
      <div className='window-limit__service-line'>
        {
          SERVICE_LIST.map((service) => {
            if (listLimit.includes(service)) {
              return;
            }

            return <button
              onClick={switchService}
              key={service}
              className={`window-limit__service ${service}`}
            >
              {service}
            </button>
          })
        }
      </div>
    </>
  )
}

ServiceLimit.propTypes = {
  handleShowUrl: PropTypes.func,
  showUrl: PropTypes.bool,
  switchService: PropTypes.func,
  listLimit: PropTypes.array,
  url: PropTypes.string,
  SERVICE_LIST: PropTypes.array,
};

ServiceLimit.defaultProps = {
  handleShowUrl: () => console.log('Не указана функция handleShowUrl'),
  switchService: () => console.log('Не указана функция switchService'),
  showUrl: false,
  listLimit: [],
  url: '',
  SERVICE_LIST: [],
};

export default ServiceLimit;