import StyleVariables from './stylevariables'
import Base from '../base'

var Styles = {
  'PANEL_WRAPPER': () => {
    return {
      position: 'absolute',
      right:  StyleVariables['PANEL_GAP'],
      opacity: StyleVariables['PANEL_OPACITY'],
      width: StyleVariables['PANEL_WIDTH'],
      top: StyleVariables['PANEL_GAP'],
      overflow: 'hidden',
      backgroundColor: StyleVariables['COLOR_WHITE'],
      zIndex: 1500
    }
  },

  'PANEL_LIST': () => {
    return {
      padding: '5px 10px'
    }
  },

  'MENU_WRAPPER': () => {
    return {
      width: '100%',
      height: StyleVariables['MENU_HEIGHT'],
      overflow: 'hidden'
    }
  },

  'PANEL_HEADER_ROW': () => {
    return {
      display: 'inline-flex',
      cursor: 'pointer',
      width: '100%',
      marginBottom: '-15px'
    }
  },
  'PANEL_EXPAND_BUTTON': () => {
    return {
      position: 'absolute',
      right: 27,
      marginTop: 5
    }
  },
  'PANEL_HEADER_TITLE': () => {
    return {
      display: 'table-cell',
      marginBottom: 10,
      paddingBottom: 10,
      marginTop: 10
    }
  },
  'PANEL_HELP_BUTTON': () => {
    return {
      float: 'right',
      marginRight: '20px',
      display: 'table-cell',
      cursor: 'pointer',
      marginTop: '-5px'
    }
  },
  'PANEL_BUTTON_ROW': () => {
    return {
      display: 'table-row',
      
    }
  },  
  'PANEL_BUTTON_CELL': () => {
    return {
      display: 'table-cell',
    }
  },  

  'PANEL_BUTTON_CELL_LABEL': () => {
    return {
      width: '100%',
      marginLeft: -8,
      marginTop: 1.5
    }
  },

  'MAP_WRAPPER': () => {
    return {
      position: 'absolute',
      left: 0,
      right: 0, 
      top: 0,
      bottom: 0,
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

  'INFO_WRAPPER': () => {
    return {
      position: 'absolute',
      left: StyleVariables['PANEL_GAP'],
      right: StyleVariables['PANEL_GAP'],
      bottom: StyleVariables['PANEL_GAP'],
      height:  StyleVariables['INFO_HEIGHT'],
      overflow: 'hidden',
      backgroundColor: StyleVariables['COLOR_WHITE'],
      padding: '0px 30px',
      zIndex: 1500,
      opacity: StyleVariables['PANEL_OPACITY'],
    }
  },
  'INFO_TOGGLE_BUTTON': () => {
    return {
      position: 'absolute',
      right: 20,
      top: 20,
      height: 26,
    }
  },
  'INFO_TOGGLE_BUTTON_LABEL': () => {
    return {
      fontSize: 11
    }
  },
  'INFO_TOGGLE_BUTTON_ICON': () => {
    return {
      fontSize: 20
    }
  },
  'INFO_TEXT': () => {
    return {
      fontWeight: 200,
    }
  },
  'INFO_HEADING_WRAPPER': () => {
    return {
      position: 'absolute',
      left: 38,
      top: 30,
      display: 'inline-flex',
      marginRight: 150
    }
  },
  'INFO_HEADING_H1': () => {
    return {
      fontSize: 28,
      fontWeight: 700,
      textDecoration: 'underline'
    }
  },
  'INFO_HEADING_H2': () => {
    return {
      fontSize: 23,
      margin: '4px 8px',
      fontWeight: 500
    }
  },

  'INFO_CONTENT': () => {
    return {
      width: '100%',
      display: 'inline-flex',
      position: 'absolute',
      top: 40
    }
  },
  'INFO_LEGEND': () => {
    return {
      margin: '35px 20px 0px 10px',
      width: '50%'
    }
  },
  'INFO_CONTROL': () => {
    return {
      margin: '35px 20px 0px 10px',
      width: '50%'
    }
  },

  'INFO_CONTROL_INPUT_WRAPPER': () => {
    return {
      height: 50
    }
  },
  'INFO_CONTROL_RADIO_WRAPPER': () => {
    return {
      height: 50,
      marginTop: 10
    }
  },
  'INFO_CONTROL_INPUT': () => {
    return {
      marginRight: '25px',
      top: '-15px',
      position: 'relative'
    }
  },
  'INFO_CONTROL_INPUT_LABEL': () => {
    return {
      position: 'relative',
      top: 5
    }
  },
  'INFO_CONTROL_CHECKBOX': () => {
    return {
      position: 'relative',
      top: 5
    }
  },


  'HEADER4': () => {
    return {
      marginBottom: 0
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
      borderWidth: 0,
      cursor: 'pointer'
    }
  },
  'LOGO': () => {
    return {
      top: 15,
      left: 15,
      position: 'absolute',
      color: StyleVariables['COLOR_WHITE'],
      fontSize: 48,
    }
  },
  'LOGO_SUB': () => {
    return {
      position: 'absolute',
      fontSize: 10.5,
      fontWeight: 600,
      top: 24,
      left: 173,
      color: StyleVariables['COLOR_BLACK'],
      opacity: 1
    }
  },
}

module.exports = Styles
