import React, {Component} from 'react'
import TextBox from './TextBox'
import AddButton from './AddButton'
import { connect } from 'react-redux'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xInit: false,
      yInit: false,
      x: false,
      y: false,
      w: false,
      h: false
    }
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }
  handleMouseUp (e) {
    if (this.mousedown
    && !this.mousemove
    && !e.shiftKey
    && !e.altKey) {
      // basic click, deselect
      this.mousedown = false
      this.props.dispatch({
        type: 'DESELECT_TEXTBOXES'
      })
    }
    if (this.mousedown) {
      // dragged click, select
      this.mousedown = false
      this.mousemove = false
      const elements = document.querySelectorAll('.TextItem')
      let matches = []
      ;[...elements].map((textBox, i) => {
        const box = textBox.getBoundingClientRect()
        if (this.state.x + this.state.w < box.left || box.left + box.width < this.state.x || this.state.y + this.state.h < box.top || box.top + box.height < this.state.y) {
          // selection doesn't intersect with element
        } else {
          // selection intersects with element
          matches.push(this.props.textBoxes[i].id)
        }
      })
      let operation = false
      if (e.shiftKey) {
        operation = "ADD"
      } else if (e.altKey) {
        operation = "SUBTRACT"
      }
      this.props.dispatch({
        type: 'SELECT_TEXTBOXES',
        ids: matches,
        operation: operation
      })
      this.setState({
        xInit: false,
        yInit: false,
        x: false,
        y: false,
        w: false,
        h: false
      })
    }
  }
  render () {
    return (
      <div
        className="Layout"
        style={{
          backgroundColor: `${this.props.page.backgroundColor}`
        }}
        onMouseDown={(e) => {
          this.mousedown = true
        }}
        onMouseMove={(e) => {
          if (this.mousedown) {
            this.mousemove = true
            if (!this.state.xInit || !this.state.yInit) {
              this.setState({
                xInit: e.pageX,
                yInit: e.pageY
              })
            }
            let x = this.state.xInit + Math.min(e.pageX - this.state.xInit, 0)
            let y = this.state.yInit + Math.min(e.pageY - this.state.yInit, 0)
            let w = Math.abs(e.pageX - this.state.xInit)
            let h = Math.abs(e.pageY - this.state.yInit)

            this.setState({
              x: x,
              y: y,
              w: w,
              h: h
            })
          }
        }}
        onMouseUp={(e) => {
          this.handleMouseUp(e)
        }}
        onMouseLeave={(e) => {
          this.handleMouseUp(e)
        }}
        >
        <div
          style={{
            display: (this.state.x) ? "block" : "none",
            position: "absolute",
            opacity: 0.2,
            border: "1px solid var(--color-accent-dull)",
            background: "var(--color-accent-bright)",
            left: this.state.x,
            top: this.state.y,
            width: this.state.w,
            height: this.state.h
          }}
          className="rect">

        </div>
        <div
          className='LayoutWrapper'
          style={{
            width: `${this.props.page.width.value}${this.props.page.width.unit}`
          }}
          >
          <AddButton index={0} solo={(this.props.textBoxes.length === 0)}/>
          {this.props.textBoxes.map((textbox, i) => (
            <div key={i}>
              <TextBox
                key={textbox.id}
                textBox={textbox} />
              <AddButton index={i + 1} />
            </div>
          ))}
          {(this.props.textBoxes.length === 0) &&
            <p className='Layout__instructions'>To get started, add a text block with the add button above. Then you can select it and change properties using the panel on the right ☞, or perform actions on the text block using the panel below ☟.</p>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  textBoxes: state.textBoxes.present,
  page: state.page.present
})

export default connect(mapStateToProps)(Layout)
