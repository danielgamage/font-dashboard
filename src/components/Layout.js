import React from 'react'
import TextBox from './TextBox'
import AddButton from './AddButton'
import { connect } from 'react-redux'

const Layout = ({ textBoxes, dispatch, page }) => {
  return (
    <div
      className="Layout"
      style={{
        backgroundColor: `${page.backgroundColor}`
      }}
      onClick={(e) => {
        dispatch({
          type: 'DESELECT_TEXTBOXES'
        })
      }}
      >
      <div
        className='LayoutWrapper'
        style={{
          width: `${page.width.value}${page.width.unit}`
        }}
        >
        <AddButton index={0} solo={(textBoxes.length === 0)}/>
        {textBoxes.map((textbox, i) => (
          <div key={i}>
            <TextBox
              key={textbox.id}
              textBox={textbox} />
            <AddButton index={i + 1} />
          </div>
        ))}
        {(textBoxes.length === 0) &&
          <p className='Layout__instructions'>To get started, add a text block with the add button above. Then you can select it and change properties using the panel on the right ☞, or perform actions on the text block using the panel below ☟.</p>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  textBoxes: state.textBoxes.present,
  page: state.page.present
})

export default connect(mapStateToProps)(Layout)
