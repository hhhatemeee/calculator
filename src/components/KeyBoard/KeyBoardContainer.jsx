import React from 'react'
import { connect } from 'react-redux'
import KeyBoard from './KeyBoard'

const KeyBoardContainer = (props) => {
  return (
    <KeyBoard buttonList={props.buttonList} />
  )
}

const mapStateToProps = (state) => {
  return {
    buttonList: state.buttonList
  }
}

export default connect(mapStateToProps)(KeyBoardContainer);