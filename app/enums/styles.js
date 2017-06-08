import StyleVariables from './stylevariables'
import Base from '../base'

var Styles = {
  'PANEL_WRAPPER': () => {
    return {
      position: 'absolute',
      left: 0,
      width: parseInt(StyleVariables['PANEL_WIDTH']) - 20,
      top: StyleVariables['MENU_HEIGHT'],
      bottom: 0,
      overflow: 'hidden',
      backgroundColor: StyleVariables['COLOR_BLACK1'],
      color: StyleVariables['COLOR_WHITE'],
      padding: 10
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
      right: 0, 
      top: 0,
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
      left: 0,
      width: '100%',
      bottom: StyleVariables['MENU_HEIGHT'],
      top: 0,
      overflow: 'hidden',
      backgroundColor: StyleVariables['COLOR_BLACK1']
    }
  },

  'INFO_WRAPPER': (open, map) => {
    return {
      position: 'absolute',
      left: StyleVariables['PANEL_WIDTH'],
      right: 0,
      bottom: 0,
      height:  StyleVariables['INFO_MENU_HEIGHT'](open),
      overflow: 'hidden',
      backgroundColor: map.color1,
      paddingLeft: 15,
      paddingRight: 15
    }
  },
  'INFO_TOGGLE_BUTTON': () => {
    return {
      backgroundColor: StyleVariables['COLOR_WHITE'],
      color: StyleVariables['COLOR_1B'],
    }
  },
  'INFO_TEXT': () => {
    return {
      fontWeight: 200,
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
  'INFO_SUBHEADING': () => {
    return {
      marginLeft: 10,
      fontWeight: 500,
      fontSize: 20,
      position: 'absolute',
      right: 20,
      top: 40
    }
  },
  'INFO_LEGEND': () => {
    return {
      height: StyleVariables['INFO_HIDDEN_HEIGHT'] - 40,
      margin: '10px 0px'
    }
  },

  'LOGO_WRAPPER': () => {
    return {
      height: StyleVariables['MENU_HEIGHT'],
      width: StyleVariables['PANEL_WIDTH'],
      top: 0,
      left: 0,
      position: 'absolute',
      backgroundColor: StyleVariables['COLOR_ORANGE'],
      margin: -4,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: StyleVariables['COLOR_BLACK1'],
    }
  },
  'LOGO': () => {
    return {
      top: 15,
      left: 15,
      position: 'absolute',
      color: StyleVariables['COLOR_WHITE'],
      fontSize: 38,
    }
  },
  'LOGO_SUB': () => {
    return {
      position: 'absolute',
      fontSize: 10,
      top: 20,
      left: 140,
      color: StyleVariables['COLOR_BLACK1']
    }
  },
}

module.exports = Styles
