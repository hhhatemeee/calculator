import React, { useState } from 'react'
import declinationNumber from '../../helpers/declinationNumber';

import './ModalWindow.scss';


const ModalWindow = (props) => {
  console.log(props.url);
  const SERVICE_LIST = ['CC', 'OE', 'FCA'];
  const MOCK_TIME = {
    MINUTE: ['минута', 'минуты', 'минут'],
    HOUR: ['час', 'часа', 'часов'],
    DAY: ['день', 'дня', 'дней'],
  };
  const daysLeftMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1 - 1)
    .getDate() - new Date().getDate();

  const [showInfo, setShowInfo] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  }

  const handleCloseWindow = () => {
    props.onClick(false);
    setShowUrl(false);
  }

  const handleShowUrl = () => {
    setShowUrl(!showUrl);
  }

  const switchService = (e) => {
    props.switchService(e.target.innerText);
    props.onClick(false);
    setShowUrl(false);
  }

  return (
    <div className={`window-overlay ${props.showWindow ? 'open-window' : ''}`}>
      <div className={`window-limit ${props.showWindow ? 'open-window' : ''}`}>
        <div className='window-limit__header'>
          <h4 className='window-limit__title'>{props.listLimit.length >= 3 ? 'Достигнут лимит запров' : 'Лимит запросов у сервиса'}</h4>
          <span onClick={handleCloseWindow}>+</span>
        </div>
        {
          props.listLimit.length >= 3
            ? <>
              <a onClick={handleClick} className='window-limit__tap-info'>{showInfo ? 'Скрыть контент..' : 'См. больше...'}</a>
              <p
                className='window-limit__info'
                style={showInfo ? { whiteSpace: 'pre', opacity: 1, maxHeight: '100px' } : { whiteSpace: 'pre', opacity: 0, maxHeight: 0 }}
              >
                {SERVICE_LIST.map((service) => {
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
            : <>
              <p className='window-limit__info'>
                Сервис <a onClick={handleShowUrl} className='window-limit__link'>"{props.listLimit.at(-1)}" </a>
                <a className={`link ${showUrl ? 'link-open' : ''}`} href={`https://${props.url}`}>{props.url}</a>
                превысил лимит, вы автоматически будете переключены на другой. Или можете выбрать сами:
              </p>
              <div className='window-limit__service-line'>
                {SERVICE_LIST.map((service) => {
                  if (props.listLimit.includes(service)) {
                    return;
                  }
                  return <button
                    onClick={switchService}
                    key={service}
                    className={`window-limit__service ${service}`}
                  >
                    {service}
                  </button>
                })}
              </div>
            </>
        }
        <div className='window-limit__button-line'>
          <button className='window-limit__button' onClick={handleCloseWindow}>OK</button>
        </div>
      </div>
    </div >
  )
}

export default ModalWindow