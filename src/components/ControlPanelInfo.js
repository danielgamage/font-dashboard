import React, { Component } from 'react'
import { connect } from 'react-redux'

class ControlPanelInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      font: null
    }
  }
  render () {
    console.log(this.props.fonts)
    return (
      <div className='ControlPanelTab'>
        {this.props.fonts.map(el => (
          <div
            className='Control full'
            key={el.names.fullName.en} >
            <div className='ControlTitle'>{el.names.fullName.en}</div>
            <div
              className='metrics'>
              {[
                {name: 'Ascender', value: el.tables.os2.sTypoAscender},
                {name: 'Cap Height', value: el.tables.os2.sCapHeight},
                {name: 'X-Height', value: el.tables.os2.sxHeight},
                {name: 'Baseline', value: 0},
                {name: 'Descender', value: el.tables.os2.sTypoDescender}
              ].map(metric => (
                <dl
                  className='metric'
                  style={{
                  top: `${(-1 * metric.value + el.tables.os2.sTypoAscender) / el.unitsPerEm * 10}em`
                }}>
                  <dt
                    className='metrics__dt'
                    >{metric.name}</dt>
                  <dd
                    className='metrics__dd'
                    >{metric.value}</dd>
                </dl>
              ))}
              <div
                className='metrics__sample-text'
                style={{
                lineHeight: (el.tables.os2.sTypoAscender - el.tables.os2.sTypoDescender) / el.unitsPerEm,
                fontFamily: el.names.fullName.en
              }}>
                Achg
              </div>
            </div>

            <dl>
              <dt>Glyph Count</dt>
              <dd>{el.numGlyphs}</dd>
              <dt>UPM</dt>
              <dd>{el.unitsPerEm}</dd>
              <dt>Designer</dt>
              <dd>
                <a
                  href={el.names.designerURL && el.names.designerURL.en}
                  target='_blank'>
                  {el.names.designer && el.names.designer.en}
                </a>
              </dd>
            </dl>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { fonts: state.fonts }
}

export default connect(mapStateToProps)(ControlPanelInfo)
