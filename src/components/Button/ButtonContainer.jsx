import React, { useState } from 'react'
import Button from './Button'
import { connect } from 'react-redux'
import { clickButtonCreator, setCurrentNumberCreator, setOperationCreator, setPrevNumberCreator, setResultCreator } from '../../redux/calculationsReducer'
import { OPERATORS } from '../../variables'

const ButtonContainer = (props) => {
  const calculations = { ...props.calculations };

  const calculating = (value) => {
    const calcStory = (props.calculations.prevNumber.toString() + props.calculations.currentNumber.toString());
    const storyArr = calcStory.slice(0, calcStory.includes('=') || calcStory.includes('%')
      ? calcStory.length - 1
      : calcStory.length)
      .split('');

    if (value === '=') {
      let isOperation = false;
      storyArr.some((element, i) => {
        if (OPERATORS.includes(element) && i === 0
          && !props.calculations.result
          && props.calculations.prevNumber.toString().length > 1) {
          return;
        }

        if ((OPERATORS.includes(element) && !isOperation) || element === '=') {
          let prevNumber = props.calculations.result ? props.calculations.result : Number(storyArr.slice(0, i).join(''));
          let nextNumber = storyArr.slice(i + 1).length === 0 ? prevNumber : Number(storyArr.slice(i + 1).join(''));

          console.log(prevNumber, nextNumber);
          isOperation = true;

          if (nextNumber === 0 && element !== '÷') {
            nextNumber = prevNumber;
          }

          nextNumber = Number.isNaN(nextNumber) ? 0 : nextNumber;
          prevNumber = Number.isNaN(prevNumber) ? 0 : prevNumber;

          switch (element) {
            case '+':
              props.setResult(prevNumber + nextNumber);
              break;
            case '-':
              props.setResult(prevNumber - nextNumber);
              break;
            case '÷':
              if (nextNumber === 0) {
                props.setResult('Деление на 0 невозможно');
                // this.showResult(this.result);
                break;
              }
              props.setResult(Math.floor((prevNumber / nextNumber) * 10 ** 16) / 10 ** 16);
              break;
            case '×':
              props.setResult(prevNumber * nextNumber);
              break;
            default:
            // this.showResult(0);
          }


          // if (this.result > 10 ** 10) {
          //   this.result = this.result.toExponential(15);
          // }

          props.setCurrentNumber(0);
          props.setPrevNumber(nextNumber);
          props.setOperation(element);
        }
      });


      if (props.calculations.result && props.calculations.currentNumber === '') {
        // calculationScreenText.textContent = `${this.result}${this.operation}${this.prevNumber}=`;

        switch (props.calculations.operation) {
          case '+':
            props.setResult(props.calculations.result + props.calculations.prevNumber);
            break;
          case '-':
            props.setResult(props.calculations.result - props.calculations.prevNumber);
            break;
          case '÷':
            props.setResult(props.calculations.result / props.calculations.prevNumber);
            break;
          case '×':
            props.setResult(props.calculations.result * props.calculations.prevNumber);
            break;
          default:
          // this.result = this.result;
        }

        // if (this.result > 10 ** 10) {
        //   this.result = this.result.toExponential(15);
        // }

        // this.showResult(this.result);
      }

      return;
    }

    if (value === '%') {
      const convertNum = props.calculations.result
        ? props.calculations.result
        : props.calculations.prevNumber.toString().slice(0, props.calculations.prevNumber.toString().length - 1);

      // debugger;
      if (Number(convertNum)) {
        storyArr.forEach((element, i) => {
          if (OPERATORS.includes(element) && i === 0 && !props.calculations.result) {
            return;
          }

          if (OPERATORS.includes(element)) {
            const prevNumber = props.calculations.result ? props.calculations.result : Number(storyArr.slice(0, i).join(''));
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
                props.setResult(prevNumber + percentNumber);
                break;
              case '×':
                props.setResult(prevNumber * percentNumber);
                break;
              case '÷':
                props.setResult(prevNumber / percentNumber);
                break;
              case '-':
                props.setResult(prevNumber - percentNumber);
                break;
              default:
            }

            if (props.calculations.result.toString().length >= 5) {
              // const resultLength = splittingNumber(this.result).length;
              // Operations.#setFontSize(resultLength);
            }

            // this.#errorHandler();
            // this.showResult(this.result);
            props.setCurrentNumber(0);
            props.setPrevNumber(0);
            // calculationScreenText.textContent = `${prevNumber}${element}${percentNumber}=`;
          }
        });

        return;
      }

      // Operations.#showButtons(false);
      props.setCurrentNumber(0);
      // this.showResult(0);

      return;
    }

    if (props.calculations.prevNumber.toString().includes('=')) {
      props.setPrevNumber(0);
    }
  };

  const func = (value) => {
    let element = value;

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
        element = props.btnValue;
    }
    // debugger;

    if (element === 'delete') {
      const clone = props.calculations.currentNumber;

      if (props.calculations.currentNumber === 0 && props.calculations.result > 0) {
        // calculationScreenText.textContent = props.calculations.currentNumber;
        // Operations.#showButtons(false);

        return;
      }

      if (Number(props.calculations.currentNumber) === 0 || props.calculations.currentNumber.length < 2) {
        props.setCurrentNumber(0);
        // this.showResult(props.calculations.currentNumber);

        return;
      }

      props.setCurrentNumber(props.calculations.currentNumber.toString().slice(0, clone.length - 1))

      if (props.calculations.currentNumber !== clone) {
        console.log(props.calculations.currentNumber);
      }

      return
    }

    if ((props.calculations.currentNumber === 0
      && props.calculations.prevNumber === 0
      && props.calculations.result === 0)
      && element === '=') {
      return;
    }

    if (props.calculations.currentNumber === 0 && element !== '.') {
      props.setCurrentNumber('');
      console.log(props.calculations.currentNumber, element);
    }

    if (element === '/') {
      if (Number(props.calculations.currentNumber) === 0) {
        return;
      }
      // debugger;
      const opposite = -Number(props.calculations.currentNumber.toString().slice(0, props.calculations.currentNumber.length));
      props.setCurrentNumber(opposite);
      // this.#errorHandler();
      // this.showResult(this.currentNumber);

      return;
    }

    if ((props.calculations.currentNumber.toString().includes('.') && element === '.')
      || (OPERATORS.includes(element) && props.calculations.currentNumber.toString().includes(element !== '-'))
      || (element === '=' && props.calculations.currentNumber.toString().includes('='))) {
      return;
    }

    if ((props.calculations.currentNumber === 'Ошибка' || props.calculations.result === 'Ошибка') && element !== 'c') {
      return;
    }

    if (element === '=' && props.calculations.result && props.calculations.currentNumber === 0) {
      console.log(123123);
      calculating(element);
      props.setCurrentNumber('');
      return;
    }

    if (calculations.currentNumber.toString().length <= 16
      || OPERATORS.includes(element)
      || element === '/'
      || element === '=') {
      props.click(element);
    }

    if (element === '=' && props.calculationsprevNumber === 0) {
      // calculationScreenText.textContent = this.currentNumber;
      props.setPrevNumber(props.calculations.currentNumber);
      props.setCurrentNumber(0);

      return;
    }

    if (OPERATORS.includes(element)) {
      if ((props.calculations.prevNumber.length > 1 && props.calculations.prevNumber)
        || props.calculations.prevNumber.toString().includes('=')) {
        props.setPrevNumber(props.calculations.prevNumber.slice(0, props.calculations.prevNumber.length - 1));
        props.setPrevNumber(props.calculations.prevNumber + props.calculations.currentNumber);
        // this.#errorHandler();

        // calculationScreenText.textContent = this.prevNumber;
        props.setCurrentNumber(0);

        return;
      }

      if (props.calculations.prevNumber.toString().includes('=')) {
        props.setPrevNumber(props.calculations.prevNumber.toString(0, props.calculations.prevNumber.length - 1));
      }


      props.setPrevNumber(props.calculations.currentNumber);
      props.setCurrentNumber(0);

    }

    if (element === '=' || element === '%') {
      calculating(element);
      console.log(props.calculations.result)
    }

    if (element === '.' && props.calculations.currentNumber === 0) {
      props.setCurrentNumber(props.calculations.currentNumber + '.');
    }

    if (element === 'c') {
      props.setCurrentNumber(0);
      props.setPrevNumber(0);
      props.setResult(0);
      // this.showResult(0);
      // calculationScreenText.textContent = this.currentNumber;
      // Operations.#setFontSize(this.currentNumber);

      // calculationScreenResult.style.fontSize = '96px';
    }
    console.log(props.calculations);
  }

  return (
    <Button
      btnName={props.btnName}
      btnColor={props.btnColor}
      btnText={props.btnText}
      btnValue={props.btnValue}
      onClick={props.onClick} />
  )
}


const mapStateToProps = (state) => ({
  calculations: state.calculations,
})

let mapDispatchToProps = (dispatch) => {
  return {
    click: (value) => {
      dispatch(clickButtonCreator(value))
    },
    setPrevNumber: (value) => {
      dispatch(setPrevNumberCreator(value))
    },
    setCurrentNumber: (value) => {
      dispatch(setCurrentNumberCreator(value))
    },
    setResult: (value) => {
      dispatch(setResultCreator(value))
    },
    setOperation: (value) => {
      dispatch(setOperationCreator(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer);