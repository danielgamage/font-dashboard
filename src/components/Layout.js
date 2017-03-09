import React, {Component} from 'react'
import TextBox from './TextBox'
import AddButton from './AddButton'
import { connect } from 'react-redux'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x: false,
      y: false,
      w: false,
      h: false,
    }
    // keep out of state to avoid re-rendering
    this.xInit = false
    this.yInit = false
    this.offsetX = 0
    this.offsetY = 0
    this.mousedown = false
    this.mousemove = false

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }
  handleMouseDown (e) {
    this.mousedown = true
    const bounds = document.querySelector('.Layout').getBoundingClientRect()
    this.offsetX = bounds.left
    this.offsetY = bounds.top
    this.xInit = e.pageX
    this.yInit = e.pageY
  }
  handleMouseMove (e) {
    if (this.mousedown) {
      this.mousemove = true
      let x = this.xInit + Math.min(e.pageX - this.xInit, 0)
      let y = this.yInit + Math.min(e.pageY - this.yInit, 0)
      let w = Math.abs(e.pageX - this.xInit)
      let h = Math.abs(e.pageY - this.yInit)

      this.setState({
        x: x,
        y: y,
        w: w,
        h: h
      })
    }
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
    if (this.mousedown && this.mousemove) {
      // dragged click, select
      this.mousedown = false
      this.mousemove = false
      const elements = document.querySelectorAll('.TextItem')
      let matches = []
      ;[...elements].map((textBox, i) => {
        const box = textBox.getBoundingClientRect()
        if (this.state.x + this.state.w < box.left
         || box.left + box.width < this.state.x
         || this.state.y + this.state.h < box.top
         || box.top + box.height < this.state.y) {
          // selection doesn't intersect with element
        } else {
          // selection intersects with element
          matches.push(this.props.textBoxes.active[i].id)
        }
        return true
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
        x: false,
        y: false,
        w: false,
        h: false
      })
    }
  }
  render () {
    const width = `${this.props.page.width.value}${this.props.page.width.unit}`
    const pageStyles = this.props.page.writingMode === 'horizontal' ? { maxWidth: width } : { maxHeight: width }
    return (
      <div
        className={`Layout ${this.props.page.direction} ${this.props.page.writingMode}`}
        style={{
          backgroundColor: `${this.props.page.backgroundColor}`,
          padding: `${this.props.page.padding.value}${this.props.page.padding.unit}`
        }}
        onMouseDown={(e) => {
          this.handleMouseDown(e)
        }}
        onMouseMove={(e) => {
          this.handleMouseMove(e)
        }}
        onMouseUp={(e) => {
          this.handleMouseUp(e)
        }}
        onMouseLeave={(e) => {
          this.handleMouseUp(e)
        }}
        onDragEnter={(e) => {
          // console.log(e.pageY)
        }}
      >
        <div
          style={{
            display: (this.state.x) ? "block" : "none",
            position: "absolute",
            opacity: 0.2,
            border: "1px solid var(--color-accent-dull)",
            background: "var(--color-accent-bright)",
            left: this.state.x - this.offsetX, // correct for parent position
            top: this.state.y - this.offsetY,
            width: this.state.w,
            height: this.state.h
          }}
          className="rect">
        </div>
        <div
          className="dragged"
          >
          {this.props.textBoxes.dragged.map((textbox, i) => (
            <div key={i}>
              <TextBox
                key={textbox.id}
                textBox={textbox} />
              <AddButton index={i + 1} />
            </div>
          ))}
        </div>
        <div
          className='LayoutWrapper'
          style={pageStyles}
          >
          <AddButton index={0} solo={(this.props.textBoxes.active.length === 0)}/>
          {this.props.textBoxes.active.map((textbox, i) => (
            <div key={i}>
              <TextBox
                key={textbox.id}
                textBox={textbox} />
              <AddButton index={i + 1} />
            </div>
          ))}
          {(this.props.textBoxes.active.length === 0) &&
            <p className='Layout__instructions'>To get started, add a text block with the add button above. Then you can select it and change properties using the panel on the right ☞, or perform actions on the text block using the panel below ☟.</p>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  textBoxes: state.textBoxes,
  page: state.page
})

export default connect(mapStateToProps)(Layout)
