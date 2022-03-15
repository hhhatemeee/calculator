import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import Converter from './Converter'

const ConverterContainer = (props) => {
  const options = [];
  const [currentNumber, setCurrentNumber] = useState(0);

  const handleCurNum = (value) => {
    let curNum = currentNumber.toString();
    console.log(value);
    curNum += value;
    setCurrentNumber(Number(curNum))


  }

  const generateList = () => {
    props.currencyList.map((val) => {
      options.push({ name: val, value: val })
    })

    return options;
  }

  const result = useMemo(() => generateList())


  return (
    <Converter currentNumber={currentNumber} currencyList={result} buttons={props.buttons} handleCurNum={handleCurNum} />
  )
}

const mapStateToProps = (state) => {
  return {
    currencyList: state.convertation.currencyList,
    buttons: state.buttonList,
  }
}

export default connect(mapStateToProps)(ConverterContainer);