import StyleVariables from './stylevariables';
import Base from '../base';

var Styles = {
  SCREEN_MODES: {
    SM: [0, 700],
    M: [700, 1000],
    L: [1000, 3000]
  },

  GET_SCREEN_MODE: () => {
    const w = appState.windowWidth;
    const modes = Styles.SCREEN_MODES;
    return Object.keys(modes).find(size => {
      return modes[size][0] < w && modes[size][1] > w;
    });
  },

  TEXT_SIZES: {
    small: {
      SM: 9,
      M: 11,
      L: 13
    },
    normal: {
      SM: 12,
      M: 14,
      L: 16
    },
    heading: {
      SM: 16,
      M: 24,
      L: 30
    }
  },

  GET_TEXT_SIZE: textSize => {
    const mode = Styles.GET_SCREEN_MODE();
    return Styles['TEXT_SIZES'][textSize][mode] + 'px';
  },

  PANEL_WRAPPER: () => {
    return {
      position: 'absolute',
      right: StyleVariables['PANEL_GAP'],
      opacity: StyleVariables['PANEL_OPACITY'],
      width: StyleVariables['PANEL_WIDTH'],
      top: StyleVariables['PANEL_GAP'],
      overflow: 'hidden',
      backgroundColor: StyleVariables['COLOR_WHITE'],
      zIndex: 1500,
      fontSize: Styles.GET_TEXT_SIZE('normal')
    };
  },

  PANEL_LIST: () => {
    return {
      padding: '5px 20px'
    };
  },

  MENU_WRAPPER: () => {
    return {
      width: '100%',
      height: StyleVariables['MENU_HEIGHT'],
      overflow: 'hidden'
    };
  },

  PANEL_HEADER_ROW: () => {
    return {
      display: 'inline-flex',
      cursor: 'pointer',
      width: '100%',
      marginBottom: '-15px'
    };
  },
  PANEL_EXPAND_BUTTON: () => {
    return {
      position: 'absolute',
      right: 27,
      marginTop: 5
    };
  },
  PANEL_HEADER_TITLE: () => {
    return {
      display: 'table-cell',
      marginBottom: 10,
      paddingBottom: 10,
      marginTop: 10
    };
  },
  PANEL_HELP_BUTTON: () => {
    return {
      float: 'right',
      marginRight: '20px',
      display: 'table-cell',
      cursor: 'pointer',
      marginTop: '-5px'
    };
  },
  PANEL_BUTTON_ROW: () => {
    return {
      display: 'table-row'
    };
  },
  PANEL_BUTTON_CELL: () => {
    return {
      display: 'table-cell',
      width: Styles.GET_TEXT_SIZE('normal')
    };
  },

  PANEL_BUTTON_CELL_LABEL: () => {
    return {
      width: '100%',
      marginLeft: -8,
      marginTop: 1.5
    };
  },

  MAP_WRAPPER: () => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      overflow: 'hidden'
    };
  },
  MAP: () => {
    return {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    };
  },

  INFO_WRAPPER: () => {
    return {
      position: 'absolute',
      left: StyleVariables['PANEL_GAP'],
      right: StyleVariables['PANEL_GAP'],
      bottom: StyleVariables['PANEL_GAP'],
      height: StyleVariables['INFO_HEIGHT'],
      overflow: 'hidden',
      backgroundColor: StyleVariables['COLOR_WHITE'],
      padding: '0px 30px',
      zIndex: 1500,
      opacity: StyleVariables['PANEL_OPACITY']
    };
  },
  INFO_TOGGLE_BUTTON: () => {
    return {
      position: 'absolute',
      right: 20,
      top: 20,
      height: 26
    };
  },
  INFO_TOGGLE_BUTTON_LABEL: () => {
    return {
      fontSize: 11
    };
  },
  INFO_TOGGLE_BUTTON_ICON: () => {
    return {
      fontSize: 20
    };
  },
  INFO_TEXT: () => {
    return {
      fontWeight: 200
    };
  },
  INFO_HEADING_WRAPPER: () => {
    return {
      position: 'absolute',
      left: 38,
      top: 30,
      display: 'inline-flex',
      marginRight: 150
    };
  },
  INFO_HEADING_H1: () => {
    return {
      fontSize: Styles.GET_TEXT_SIZE('heading'),
      fontWeight: 700
    };
  },

  INFO_CONTENT: () => {
    return {
      width: '100%',
      display: 'inline-flex',
      position: 'absolute',
      top: 40
    };
  },
  INFO_LEGEND: () => {
    return {
      margin: '25px 20px 0px 10px',
      width: '50%'
    };
  },
  INFO_CONTROL: () => {
    return {
      margin: '35px 20px 0px 10px',
      width: '50%'
    };
  },

  INFO_CONTROL_INPUT_WRAPPER: () => {
    return {
      height: 50
    };
  },
  INFO_CONTROL_RADIO_WRAPPER: () => {
    return {
      height: 50,
      marginTop: 10
    };
  },
  INFO_CONTROL_INPUT: () => {
    return {
      marginRight: '25px',
      top: '-15px',
      position: 'relative'
    };
  },
  INFO_CONTROL_INPUT_LABEL: () => {
    return {
      position: 'relative',
      top: 5
    };
  },
  INFO_CONTROL_CHECKBOX: () => {
    return {
      position: 'relative',
      top: 5
    };
  },

  HEADER4: () => {
    return {
      marginBottom: 0
    };
  },

  MODAL_WRAPPER: () => {
    return {};
  },
  MODAL_TITLE: () => {
    return {
      paddingBottom: 0
    };
  },
  MODAL: () => {
    return {
      overflowY: 'auto'
    };
  },

  MODAL_WELCOMETEXT: () => {
    return {
      paddingTop: 10
    };
  },

  LINK: () => {
    return {
      color: StyleVariables['COLOR_ORANGE']
    };
  },

  LOGO_WRAPPER: () => {
    return {
      height: StyleVariables['MENU_HEIGHT'],
      width: StyleVariables['PANEL_WIDTH'],
      top: 0,
      left: 0,
      position: 'absolute',
      backgroundColor: StyleVariables['COLOR_ORANGE'],
      borderWidth: 0,
      cursor: 'pointer'
    };
  },
  LOGO: () => {
    return {
      top: 15,
      left: 15,
      position: 'absolute',
      color: StyleVariables['COLOR_WHITE'],
      fontSize: 48
    };
  },
  LOGO_SUB: () => {
    return {
      position: 'absolute',
      fontSize: 10.5,
      fontWeight: 600,
      top: 24,
      left: 173,
      color: StyleVariables['COLOR_BLACK'],
      opacity: 1
    };
  }
};

module.exports = Styles;
