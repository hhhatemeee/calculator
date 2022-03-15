import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import splittingNumber from '../../helpers/splittingNumber';
import { OPERATORS } from '../../variables';
import Calculator from './Calculator';

const CalculatorContainer = (props) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [prevNumber, setprevNumber] = useState(0);
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState('0');
  const [operation, setOperation] = useState('');
  const [fontSize, setFontSize] = useState(96)
  const [isShow, setShown] = useState(false);


  const handleClick = (value) => {
    operations(value);
  }

  const errorHandler = () => {
    if (Number.isNaN(currentNumber)) {
      setCurrentNumber(0);
    }

    if (Number.isNaN(result)) {
      setResult('Ошибка');
    }

    if (Number.isNaN(prevNumber)) {
      setprevNumber(0);
    }
  }

  const getFontSize = (num, history) => {
    let size = (22.6122 - num) / 0.2388;

    if (num >= 9) {
      size = (22.4433 - num) / 0.2497;
    }

    if (num >= 15) {
      size = (32.5000 - num) / 0.5000;
    }

    if (num >= 17) {
      size = (43.2143 - num) / 0.8571;
    }

    if (num >= 19) {
      size = 27;
    }

    if (num === 'Деление на 0 невозможно') {
      size = 42;
    }

    setFontSize(size)


    if (history && history.length > 21) {
      setShown(true);
      return;
    }

    setShown(false);

  }

  const calculating = (value, num1, num2) => {
    const calcStory = (num1.toString() + num2.toString());
    const storyArr = calcStory.slice(0, calcStory.includes('=') || calcStory.includes('%')
      ? calcStory.length - 1
      : calcStory.length)
      .split('');

    let res = result;
    let his = history;


    if (value === '=') {
      let isOperation = false;

      storyArr.some((element, i) => {
        if (OPERATORS.includes(element) && i === 0
          && !result
          && num1.toString().length > 1) {
          return;
        }

        if ((OPERATORS.includes(element) && !isOperation) || element === '=') {
          let prevNumber = result ? result : Number(storyArr.slice(0, i).join(''));
          let nextNumber = storyArr.slice(i + 1).length === 0 ? prevNumber : Number(storyArr.slice(i + 1).join(''));

          isOperation = true;

          if (nextNumber === 0 && element !== '÷') {
            nextNumber = prevNumber;
          }

          nextNumber = Number.isNaN(nextNumber) ? 0 : nextNumber;
          prevNumber = Number.isNaN(prevNumber) ? 0 : prevNumber;

          switch (element) {
            case '+':
              setResult(prevNumber + nextNumber);
              res = prevNumber + nextNumber
              break;
            case '-':
              setResult(prevNumber - nextNumber);
              res = prevNumber - nextNumber
              break;
            case '÷':
              if (nextNumber === 0) {
                res = 'Деление на 0 невозможно'
                setResult(res);
                break;
              }

              setResult(Math.floor((prevNumber / nextNumber) * 10 ** 16) / 10 ** 16);
              res = Math.floor((prevNumber / nextNumber) * 10 ** 16) / 10 ** 16
              break;
            case '×':
              setResult(prevNumber * nextNumber);
              res = prevNumber * nextNumber
              break;
            default:
              setResult(0);
          }

          errorHandler();

          if (res > 10 ** 10) {
            setResult(res.toExponential(15));
          }

          his = `${prevNumber}${element}${nextNumber}=`;
          setHistory(his);
          setCurrentNumber(0);
          setprevNumber(nextNumber);
          setOperation(element);
        }
      });


      if (res.toString().length >= 5) {
        if (typeof res === 'string') {
          getFontSize(res);
          return;
        }

        const resLength = splittingNumber(res).length;
        getFontSize(resLength)
      }

      if (his.toString().length >= 5) {
        getFontSize(his.toString().length, his)
      }

      if (res && num2 === '') {
        setHistory(`${result}${operation}${prevNumber}=`);

        switch (operation) {
          case '+':
            res = result + prevNumber
            setResult(res);
            break;
          case '-':
            res = result - prevNumber;
            setResult(res);
            break;
          case '÷':
            res = result / prevNumber;
            setResult(res);
            break;
          case '×':
            res = result * prevNumber;
            setResult(res);
            break;
          default:
            setResult(result);
        }

        setCurrentNumber(0);

        if (res > 10 ** 10) {
          res = res.toExponential(15);
        }
      }

      return;
    }

    if (value === '%') {
      const convertNum = result
        ? result
        : num1.toString().slice(0, num1.toString().length - 1);

      // debugger;
      if (Number(convertNum)) {
        storyArr.forEach((element, i) => {
          if (OPERATORS.includes(element) && i === 0 && !result) {
            return;
          }

          if (OPERATORS.includes(element)) {
            const prevNumber = result ? result : Number(storyArr.slice(0, i).join(''));
            const nextNumber = Number(storyArr.slice(i + 1).join(''));

            const operations = {
              percent: ['×', '÷'],
              fraction: ['+', '-'],
            };

            const percentNumber = operations.percent.includes(element)
              ? nextNumber / 100
              : (prevNumber * nextNumber) / 100;

            switch (element) {
              case '+':
                res = prevNumber + percentNumber;
                setResult(res);
                break;
              case '×':
                res = prevNumber * percentNumber;
                setResult(res);
                break;
              case '÷':
                res = prevNumber / percentNumber;
                setResult(res);
                break;
              case '-':
                res = prevNumber - percentNumber;
                setResult(res);
                break;
              default:
            }

            if (res.toString().length >= 5) {
              const resLength = splittingNumber(res).length;
              getFontSize(resLength);
            }

            errorHandler();
            setCurrentNumber(0);
            setprevNumber(0);
            setHistory(`${prevNumber}${element}${percentNumber}=`);
          }
        });

        return;
      }

      // Operations.#showButtons(false);
      setCurrentNumber(0);
      setResult(0);

      return;
    }

    if (num2.toString().includes('=')) {
      setprevNumber(0);
    }

  }

  const operations = (value) => {
    let element = value;
    let curNum = currentNumber;
    let preNum = prevNumber;
    let res = result;

    const curNumLength = splittingNumber(curNum).length;

    switch (element) {
      case 'reset':
        element = 'c';
        break;
      case 'multiplication':
        element = '×';
        break;
      case 'equal':
        element = '=';
        break;
      case 'division':
        element = '÷';
        break;
      case 'minus':
        element = '-';
        break;
      case 'plus':
        element = '+';
        break;
      case 'percent':
        element = '%';
        break;
      case 'plus-minus':
        element = '/';
        break;
      case 'dot':
        element = '.';
        break;
      default:
        element = value;
    }

    setFontSize(96);

    if (curNumLength >= 5) {
      getFontSize(curNumLength);
    }

    if (element === 'delete') {
      const clone = curNum;

      if (curNum === 0 && res > 0) {
        setHistory(curNum);
        // Operations.#showButtons(false);

        return;
      }

      if (Number(curNum) === 0 || curNum.length < 2) {
        curNum = 0;
        setCurrentNumber(curNum);
        setResult(curNum);

        return;
      }
      getFontSize(splittingNumber(curNumLength));

      curNum = curNum.toString().slice(0, curNum.length - 1);
      setCurrentNumber(curNum);

      if (curNum !== clone) {
        setCurrentNumber(curNum);
      }

      return;
    }

    if ((curNum === 0 && preNum === 0 && res === 0) && element === '=') {
      return;
    }

    if (curNum === 0 && element !== '.') {
      setCurrentNumber('');
      curNum = '';
    }

    if (element === '/') {
      if (Number(curNum) === 0) {
        return;
      }

      const opposite = -Number(curNum.toString().slice(0, curNum.length));
      curNum = opposite;
      setCurrentNumber(curNum);

      return;
    }

    if ((curNum.toString().includes('.') && element === '.')
      || (OPERATORS.includes(element) && curNum.toString().includes(element !== '-'))
      || (element === '=' && curNum.toString().includes('='))) {
      return;
    }

    if ((curNum === 'Ошибка' || res === 'Ошибка') && element !== 'c') {
      return;
    }

    if (element === '=' && res && curNum === '') {
      calculating(element, prevNumber, curNum);
      return;
    }

    if (currentNumber.toString().length <= 16
      || OPERATORS.includes(element)
      || element === '/'
      || element === '=') {
      setCurrentNumber(`${curNum + element}`);
      curNum = `${curNum + element}`;
    }

    if (element === '=' && preNum === 0) {
      setHistory(curNum);

      preNum = curNum;
      setprevNumber(preNum);

      curNum = 0;
      setCurrentNumber(curNum);

      return;
    }

    if (OPERATORS.includes(element)) {
      if ((preNum.length > 1 && preNum)
        || preNum.toString().includes('=')) {
        preNum = preNum.slice(0, preNum.length - 1);
        preNum += curNum;
        setprevNumber(preNum);
        errorHandler();

        setHistory(preNum);
        curNum = 0;
        setCurrentNumber(curNum);

        return;
      }

      if (preNum.toString().includes('=')) {
        preNum = preNum.toString(0, preNum.length - 1);
        setprevNumber(preNum);
      }

      preNum = curNum;
      setprevNumber(curNum);
      curNum = 0;

      setCurrentNumber(0);
      getFontSize(splittingNumber(res).length);
      setHistory(`${preNum}`);
    }

    if (OPERATORS.includes(element) && Number(res !== 0)) {
      errorHandler();
      setHistory(res + element);
    }
    if (element === '=' || element === '%') {
      calculating(element, prevNumber, curNum);
    }

    if (element === '.' && curNum === 0) {
      curNum += '.';
      setCurrentNumber(curNum);
    }

    if (element === 'c') {
      curNum = 0;
      preNum = 0;
      res = 0;
      setResult(res);
      setCurrentNumber(curNum);
      setHistory(curNum);
      getFontSize(curNum);

      // calculationScreenResult.style.fontSize = '96px';
    }
  }



  return (
    <Calculator
      buttons={props.buttons}
      currentNumber={splittingNumber(currentNumber)}
      result={typeof result === 'number' ? splittingNumber(result) : result}
      history={history}
      fontSize={fontSize}
      isShown={isShow}
      onClick={handleClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    buttons: state.buttonList,
  };
};

CalculatorContainer.propTypes = {
  buttons: PropTypes.array,
};

CalculatorContainer.defaultProp = {
  buttons: [],
};


export default connect(mapStateToProps)(CalculatorContainer);