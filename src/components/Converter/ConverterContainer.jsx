import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Converter from './Converter'

const ConverterContainer = (props) => {
  const options = [];

  useEffect(() => {
    props.currencyList.map((val) => {
      options.push({ name: val, value: val })
    })

  }, [props.currencyList]);

  return (
    <Converter currencyList={options} />
  )
}

const mapStateToProps = (state) => {
  return {
    currencyList: state.convertation.currencyList,
  }
}

export default connect(mapStateToProps)(ConverterContainer);