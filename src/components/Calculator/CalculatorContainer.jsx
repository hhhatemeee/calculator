import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import splittingNumber from '../../helpers/splittingNumber';
<<<<<<< HEAD
import { KEYS, KEYS_NAME, OPERATORS } from '../../variables';
=======
import { KEYS, OPERATORS } from '../../variables';
>>>>>>> 01fe2bc (release/CALC-22 - adding functional keyboard)
import Calculator from './Calculator';

const CalculatorContainer = (props) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [prevNumber, setprevNumber] = useState(0);
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState('0');
  const [operation, setOperation] = useState('');
  const [fontSize, setFontSize] = useState(96)
  const [isShow, setShown] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', onKeypress);

    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, [currentNumber]);


  const onKeypress = e => {
    if ((e.key >= '0' && e.key <= '9')
      || KEYS.CODES.includes(e.keyCode)
      || KEYS.NAMES.includes(e.key)) {
      operations(e.key);
    }

    if (e.ctrlKey && e.keyCode == 86) {
      navigator.clipboard.readText()
        .then(text => {
          if (!Number.isNaN(Number(text)))
            operations(text);
        })
    }
  };

  const onKeyDown = (e) => {
    if ((e.key >= 0 && e.key <= 9)
      || KEYS.CODES.includes(e.keyCode)
      || KEYS.NAMES.includes(e.key)) {
      operations(e.key);
    }

    if (e.ctrlKey && e.keyCode === 86) {
      navigator.clipboard.readText()
        .then(text => {
          if (!Number.isNaN(Number(text)))
            operations(text);
        })
    }
  };

  useEffect(() => onKeyDown(props.currentKey), [props.currentKey]);

  // Handle click
  const handleClick = (value) => {
    operations(value);
  };

  // Error Handler
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
  };

  /**
   * A method that calculates the font size using a dependency
   * @param {number} num - Accepts a number from which to calculate the size
   * @param {string} history - Accepts the history of calculations
   */
  const getFontSize = (num, history) => {
    let size = (22.6122 - num) / 0.2388;

    // If the line length is greater than 22 then show the buttons
    (history && history.length > 22) ? setShown(true) : setShown(false);

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
  }

  /**
   * Operation Calculation Method
   * @param {string} value - the currently pressed button
   * @param {string} num1 - prev number
   * @param {string} num2 - current number
   * @returns 
   */
  const calculating = (value, num1, num2) => {
    const calcStory = (num1.toString() + num2.toString());
    const storyArr = calcStory.slice(0, calcStory.includes('=') || calcStory.includes('%')
      ? calcStory.length - 1
      : calcStory.length)
      .split('');

    let res = Number(result);
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
          let prevNumber = result ? res : Number(storyArr.slice(0, i).join(''));
          let nextNumber = storyArr.slice(i + 1).length === 0 ? prevNumber : Number(storyArr.slice(i + 1).join(''));

          isOperation = true;

          if (nextNumber === 0 && element !== '÷') {
            nextNumber = prevNumber;
          }

          nextNumber = Number.isNaN(nextNumber) ? 0 : nextNumber;
          prevNumber = Number.isNaN(prevNumber) ? 0 : prevNumber;

          switch (element) {
            case '+':
              res = prevNumber + nextNumber
              break;
            case '-':
              res = prevNumber - nextNumber
              break;
            case '÷':
              if (nextNumber === 0) {
                res = 'Деление на 0 невозможно'
                break;
              }
              res = (prevNumber / nextNumber);

              break;
            case '×':
              res = prevNumber * nextNumber
              break;
            default:
              res = 0;
          }


          errorHandler();

          his = `${prevNumber}${element}${nextNumber}=`;
          setCurrentNumber(0);
          setHistory(his);
          setprevNumber(nextNumber);
          setOperation(element);
        }
      });

      if (res && num2 === '') {
        his = `${result}${operation}${prevNumber}=`;
        setHistory(his);

        switch (operation) {
          case '+':
            res = result + prevNumber
            break;
          case '-':
            res = result - prevNumber;
            break;
          case '÷':
            res = result / prevNumber;
            break;
          case '×':
            res = result * prevNumber;
            break;
          default:
            res = result;
        }
      }

      setCurrentNumber(0);

      if (res > Number.MAX_SAFE_INTEGER) {
        res = res.toExponential(15);
      }

      res.toString().includes('e') ? res = Number(res).toPrecision(13) : res = Number(res);

      setResult(res);

      if (res.toString().length >= 5) {
        if (typeof res === 'string') {
          getFontSize(res, his);
          return;
        }

        const resLength = splittingNumber(res).length;
        getFontSize(resLength, his);
      }

      return;
    }

    if (value === '%') {
      const convertNum = result
        ? result
        : num1.toString().slice(0, num1.toString().length - 1);

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

      setCurrentNumber(0);
      setResult(0);

      return;
    }

    if (num2.toString().includes('=')) {
      setprevNumber(0);
    }

  }

  /**
   * Method that displays calculations and their result
   * @param {string|number} value - Takes the value of the currently pressed button
   * @returns 
   */
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
      case '*':
        element = '×';
        break;
      case 'Enter':
        element = '=';
        break;
      case 'equal':
        element = '=';
        break;
      case 'division':
        element = '÷';
        break;
      case '/':
        element = '÷';
        break;
      case 'minus':
        element = '-';
        break;
      case '-':
        element = '-';
        break;
      case 'plus':
        element = '+';
        break;
      case '+':
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
    // If the length of the current number >= 5, then use the setFontSize()
    if (curNumLength >= 5) {
      getFontSize(curNumLength);
    }
    console.log(res);
    // Button for removing elements in a row
<<<<<<< HEAD
    if (element === 'delete' || element === KEYS_NAME.Backspace) {
=======
    if (element === 'delete' || element === 'Backspace') {
>>>>>>> 01fe2bc (release/CALC-22 - adding functional keyboard)
      const clone = curNum;

      if (history && result) {
        setHistory(0);
        setprevNumber(0);
        setResult(0);

        return;
      }

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

    // Can't put equal until there's a number
    if ((curNum === 0 && preNum === 0 && res === 0) && element === '=') {
      return;
    }
    /* If the current number = 0 and the "dot" button is not pressed,
         the current number is equal to " " */
    if (curNum === 0 && element !== '.') {
      curNum = '';
      setCurrentNumber(curNum);
    }

    // Button +/-
    if (element === '/') {
      if (Number(curNum) === 0) {
        return;
      }

      const opposite = -Number(curNum.toString().slice(0, curNum.length));
      curNum = opposite;
      setCurrentNumber(curNum);

      return;
    }

    // It is forbidden to repeat operations
    if ((curNum.toString().includes('.') && element === '.')
      || (OPERATORS.includes(element) && curNum.toString().includes(element !== '-'))
      || (element === '=' && curNum.toString().includes('='))) {
      return;
    }

    // It is forbidden to press buttons if there is an error on the screen
    if ((curNum === 'Ошибка' || res === 'Ошибка') && element !== 'c') {
      return;
    }

    // If the current result exists and = is pressed, then add the result to the previous value
    if (element === '=' && res && curNum === '') {
      calculating(element, prevNumber, curNum);
      return;
    }

    // Maximum string length 16 characters
    if (currentNumber.toString().length <= 16
      || OPERATORS.includes(element)
      || element === '/'
      || element === '=') {
      setCurrentNumber(`${curNum + element}`);
      curNum = `${curNum + element}`;
    }

    // If pressed equals immediately after the current number translate into Calculations
    if (element === '=' && preNum === 0) {
      setHistory(curNum);

      preNum = curNum;
      setprevNumber(preNum);

      curNum = 0;
      setCurrentNumber(curNum);

      return;
    }

    // If any operation is pressed, then assign the current number to the previous one and display
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

    // If the operator is pressed and there is a previous result, then connect them
    if (OPERATORS.includes(element) && Number(res !== 0)) {
      errorHandler();
      setHistory(res + element);
    }

    if (element === '=' || element === '%') {
      calculating(element, prevNumber, curNum);
    }

    // If the current number is 0 and 'dot' button is pressed, then sum
    if (element === '.' && curNum === 0) {
      curNum += '.';
      setCurrentNumber(curNum);
    }

    // Button 'C'
    if (element === 'c') {
      curNum = 0;
      preNum = 0;
      res = 0;
      setResult(res);
      setCurrentNumber(curNum);
      setHistory(curNum);
      getFontSize(curNum);

    }
  }

  return (
    <Calculator
      buttons={props.buttons}
      currentNumber={splittingNumber(currentNumber)}
      result={(typeof result == 'number' && result !== Infinity) ? splittingNumber(result) : result}
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
  currentKey: PropTypes.object,
};

CalculatorContainer.defaultProps = {
  buttons: [],
  currentKey: {}
};


export default connect(mapStateToProps)(CalculatorContainer);