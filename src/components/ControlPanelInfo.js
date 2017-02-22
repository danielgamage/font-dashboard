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
    return (
      <div role='tabpanel' className={`ControlPanelTab ${this.props.active ? 'active' : ''}`}>
        { this.props.fonts.length > 0 &&
          this.props.fonts.map(el => (
            <div
              className='Control full'
              key={el.names.fullName.en} >
              <div className='ControlTitle'>{el.names.fullName.en}</div>
              <div
                style={{
                  height: `${(el.tables.os2.sTypoAscender - el.tables.os2.sTypoDescender) / el.unitsPerEm * 10}em`
                }}
                className='metrics'>
                {[
                  { name: 'Ascender', value: el.tables.os2.sTypoAscender },
                  { name: 'Cap Height', value: el.tables.os2.sCapHeight },
                  { name: 'X-Height', value: el.tables.os2.sxHeight },
                  { name: 'Baseline', value: 0 },
                  { name: 'Descender', value: el.tables.os2.sTypoDescender }
                ].map(metric => (
                  <dl
                    key={metric.name}
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
                    lineHeight: el.unitsPerEm > (el.tables.os2.sTypoAscender - el.tables.os2.sTypoDescender)
                        ? el.tables.os2.sCapHeight / el.unitsPerEm
                        : (el.tables.os2.sTypoAscender - el.tables.os2.sTypoDescender) / el.unitsPerEm,
                    fontFamily: el.names.fullName.en
                }}>
                  Achg
                </div>
              </div>

              { el.numGlyphs &&
                <dl className='font-info'>
                  <dt>Glyph Count</dt>
                  <dd>{el.numGlyphs}</dd>
                </dl>
              }
              { el.unitsPerEm &&
                <dl className='font-info'>
                  <dt>UPM</dt>
                  <dd>{el.unitsPerEm}</dd>
                </dl>
              }
              { el.names.designer &&
                <dl className='font-info'>
                  <dt>Designer</dt>
                  <dd>
                    <a
                      href={el.names.designerURL && el.names.designerURL.en}
                      target='_blank'>
                      {el.names.designer && el.names.designer.en}
                    </a>
                  </dd>
                </dl>
              }
              { el.availableLanguages.length > 0 &&
                <dl className='font-info'>
                  <dt>Languages</dt>
                  {el.availableLanguages.map((language, i) => (
                    <dd>
                      {language.description}
                      {i < el.availableLanguages.length - 1 && ', '}
                    </dd>
                  ))}
                </dl>
              }
            </div>
          ))
        }
        { this.props.fonts.length === 0 &&
          <div className='Control full'>
            <div className='ControlTitle'>No font added</div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { fonts: state.fonts }
}

export default connect(mapStateToProps)(ControlPanelInfo)
