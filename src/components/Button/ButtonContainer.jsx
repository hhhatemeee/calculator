import React from 'react'
import Button from './Button'
import { clickBtn } from '../../redux/calculationsReducer'
import { connect } from 'react-redux'
import { clickButtonCreator } from '../../redux/calculationsReducer'

const ButtonContainer = (props) => {
  return (
    <Button
      btnName={props.btnName}
      btnColor={props.btnColor}
      btnText={props.btnText}
      btnValue={props.btnValue}
      clickBtn={props.click} />
  )
}

const mapStateToProps = (state) => ({
  calculations: state.calculations,
})

let mapDispatchToProps = (dispatch) => {
  return {
    click: (value) => {
      dispatch(clickButtonCreator(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer);