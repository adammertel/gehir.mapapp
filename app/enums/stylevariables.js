var StyleVariables = {
  'MENU_HEIGHT': 80,
  'PANEL_WIDTH': 300,
  'MENU_BUTTON_WIDTH': 150,
  'INFO_HEIGHT': 350,
  'INFO_HIDDEN_HEIGHT': 200,
  'INFO_MENU_HEIGHT': function (open) {
    if (open) {
      return this['INFO_HEIGHT']
    } else {
      return this['INFO_HIDDEN_HEIGHT']
    }
  },

  'COLOR_ORANGE': '#e74c3c',
  'COLOR_WHITE': 'white',
  'COLOR_BLACK1': '#333',
  'COLOR_BLACK2': '#666',
  'COLOR_GREY': '#e1e1e1',

  'COLOR_1A': '#a6cee3',
  'COLOR_1B': '#1f78b4',
  'COLOR_2A': '#b2df8a',
  'COLOR_2B': '#33a02c',
  'COLOR_3A': '#fb9a99',
  'COLOR_3B': '#e31a1c',
  'COLOR_4A': '#fdbf6f',
  'COLOR_4B': '#ff7f00',

  'FONT': '"Montserrat", sans-serif',
}

module.exports = StyleVariables
