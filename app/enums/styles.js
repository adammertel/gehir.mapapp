import StyleVariables from './stylevariables'
import Base from '../base'

var Styles = {
  'PANEL_WRAPPER': () => {
    return {
      position: 'absolute',
      left: '0px',
      width: parseInt(StyleVariables['PANEL_WIDTH']) - 20 + 'px',
      top: StyleVariables['MENU_HEIGHT'],
      bottom: '0px',
      overflow: 'hidden',
      backgroundColor: StyleVariables['COLOR_BLACK1'],
      color: StyleVariables['COLOR_WHITE'],
      padding: '10px'
    }
  },
  'PANEL_HELP_BUTTON': () => {
    return {
      float: 'right',
      marginRight: '20px',
      display: 'table-cell',
      cursor: 'pointer'
    }
  },
  'PANEL_BUTTON_ROW': () => {
    return {
      display: 'table-row'
    }
  },  
  'PANEL_BUTTON_CELL': () => {
    return {
      display: 'table-cell'
    }
  },  

  'MAP_WRAPPER': (infoOpen) => {
    let mapBottom = StyleVariables['INFO_MENU_HEIGHT'](infoOpen)
    return {
      position: 'absolute',
      left: StyleVariables['PANEL_WIDTH'],
      right: '0px', 
      top: '0px',
      bottom: mapBottom,
      overflow: 'hidden'
    }
  },
  'MAP': () => {
    return {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }
  },

  'MENU_WRAPPER': () => {
    return {
      position: 'absolute',
      left: '0px',
      width: '100%',
      bottom: StyleVariables['MENU_HEIGHT'],
      top: '0px',
      overflow: 'hidden',
      backgroundColor: StyleVariables['COLOR_BLACK1']
    }
  },

  'INFO_WRAPPER': (open, map) => {
    return {
      position: 'absolute',
      left: StyleVariables['PANEL_WIDTH'],
      right: '0px',
      bottom: '0px',
      height:  StyleVariables['INFO_MENU_HEIGHT'](open),
      overflow: 'hidden',
      backgroundColor: map.color1,
    }
  },
  'INFO_TOGGLE_BUTTON': () => {
    return {
      margin: '10px',
      color: StyleVariables['COLOR_WHITE'],
      backgroundColor: StyleVariables['COLOR_BLACK1'],
    }
  },
  'INFO_TEXT': () => {
    return {
      fontWeight: 200,
      position: 'relative',
      top: '50px',
      marginLeft: '10px'
    }
  },
  'INFO_HEADING': () => {
    return {
      marginLeft: 10,
      fontWeight: 600,
      fontSize: 23,
      position: 'absolute',
      right: 20,
      top: 10
    }
  },

  'LOGO_WRAPPER': () => {
    return {
      height: StyleVariables['MENU_HEIGHT'],
      width: StyleVariables['PANEL_WIDTH'],
      top: '0px',
      left: '0px',
      position: 'absolute',
      backgroundColor: StyleVariables['COLOR_ORANGE'],
      margin: '-4px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: StyleVariables['COLOR_BLACK1'],
    }
  },
  'LOGO': () => {
    return {
      top: '15px',
      left: '15px',
      position: 'absolute',
      color: StyleVariables['COLOR_WHITE'],
      fontSize: '38px',
    }
  },
  'LOGO_SUB': () => {
    return {
      position: 'absolute',
      fontSize: '10px',
      top: '20px',
      left: '140px',
      color: StyleVariables['COLOR_BLACK1']
    }
  },
}

module.exports = Styles
