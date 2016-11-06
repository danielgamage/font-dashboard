import { connect } from 'react-redux'
import { selectTextBox } from '../actions'
import Layout from '../components/Layout'

const getTextBoxes = (textBoxes) => {
  return textBoxes
}

const mapStateToProps = (state) => ({
  textBoxes: getTextBoxes(state.textBoxes)
})

const mapDispatchToProps = ({
  onTodoClick: selectTextBox
})

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default LayoutContainer
