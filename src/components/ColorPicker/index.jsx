import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class ColorPicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      displayColorPicker: false,
    }
  }

  handleClick = () => {
    this.setState(preState => ({
      displayColorPicker: !preState.displayColorPicker
    }))
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    const c = color.rgb
    this.props.onChange(`rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`)
  };

  render() {

    const colorValues = this.props.value.match(/\d+/g)
    const colorKeys = 'rgba'
    const color = {}
    colorValues.forEach((c, i) => { color[colorKeys[i]] = c })
    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    })

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {
          this.state.displayColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} />
              <SketchPicker color={color} onChange={this.handleChange} />
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default ColorPicker
