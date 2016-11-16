import React, { PropTypes } from 'react'
import TextBox from './TextBox'
import AddButton from './AddButton'
import { connect } from 'react-redux'

const Layout = ({ textBoxes, dispatch, page }) => {
  const styles = {
    width: `${page.width}rem`
  }
  return (
    <div
      className="Layout"
      onClick={(e) => {
        dispatch({
          type: 'DESELECT_TEXTBOXES'
        })
      }}
      >
      <div
        className='LayoutWrapper'
        style={styles}
        >
        <AddButton index={0} solo={(textBoxes.length === 0)}/>
        {textBoxes.map((textbox, i) => (
          <div key={i}>
            <TextBox
              key={textbox.id}
              {...textbox} />
            <AddButton index={i + 1} />
          </div>
        ))}
      </div>
    </div>
  )
}

Layout.propTypes = {
  textBoxes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    tracking: PropTypes.number.isRequired,
    leading: PropTypes.number.isRequired,
    opentype: PropTypes.array.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = (state) => ({
  textBoxes: state.textBoxes.present,
  page: state.page.present
})

export default connect(mapStateToProps)(Layout)
