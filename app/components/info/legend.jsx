import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'
import StyleVariables from '../../enums/stylevariables'
import MapStyles from '../../enums/mapstyles'

export default class InfoLegend extends React.Component {

    componentDidMount () {
      this.canvas = document.getElementById('canvas-legend')
      this.ctx = this.canvas.getContext('2d')
      this._update()
    }

    componentDidUpdate () {
      this._update()
    }

    _clear () {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    _update () {
      this.canvas.height = StyleVariables['INFO_HEIGHT'] - 80
      this.canvas.width = window.innerWidth / 2 - 80
      
      this.h = this.canvas.height
      this.w = this.canvas.width

      console.log('update legend')
      const topic = appState.activeMapTopic
      
      switch (topic) {
        case MapTopics['ISIS'].label:
          this._visualiseIsis()
          break

        case MapTopics['MARLUC'].label:
          this._visualiseMarluc()
          break

        case MapTopics['CHRISTROME'].label:
          this._visualiseChristrome()
          break

        case MapTopics['MITHORIG'].label:
          this._visualiseMithorig()
          break
        }
    }

    _text (text, x, y) {
      this.ctx.font = '12px Roboto, sans-serif'
      this.ctx.fillText(text, x, y)
    }

    _textBold (text, x, y) {
      this.ctx.font = 'bold 13px Roboto, sans-serif'
      this.ctx.fillText(text, x, y)
    }

    _textHead (text, x, y) {
      this.ctx.font = 'bold 16px Roboto, sans-serif'
      this.ctx.fillText(text, x, y)
    }

    _circleStroke (x, y, r, fillColor, strokeColor) {
      this.ctx.beginPath()
      this.ctx.arc(x, y, r, 0, Math.PI * 2, true)
      this.ctx.fillStyle = fillColor
      this.ctx.strokeStyle = strokeColor
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.fillStyle = 'black'
    }

    _visualiseIsis () {

      // triangle
      const ox = 50
      const oy = 40
      const w = this.h / 1.5
      const h = 0.866 * w
      const composition = 'overlay'

      const colors = Object.assign({}, MapStyles.isis.deitiesColors)

      const dColor = 255
      const defaultColor = 'rgba(' + dColor + ', ' + dColor + ', ' + dColor + ', 0)'

      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.moveTo(ox, oy)
      this.ctx.lineTo(ox + w, oy)
      this.ctx.lineTo(ox + w/2, oy + h)
      this.ctx.clip()
      this.ctx.globalCompositeOperation = composition;

      const gradient = (x, y, color) => {
        const grd = this.ctx.createRadialGradient(x, y, 0, x, y, w*2)
        grd.addColorStop(0, color)
        grd.addColorStop(1, defaultColor)

        this.ctx.fillStyle=grd
        this.ctx.fillRect(ox,oy,ox + w,oy + h)
      } 

      gradient(ox, oy, colors['Isis'])
      gradient(w + ox, oy, colors['Sarapis'])
      gradient(w/2 + ox, h + oy, colors['Apis'])

      this.ctx.restore()
      this.ctx.save()
      
      this._textHead('possesion to cult', ox - 10, oy - 25)
      this._text('isis', ox - 10, oy - 5)
      this._text('sarapis', w + ox - 10, oy - 5)
      this._text('other cults', w/2 + ox - 25, h + oy + 10)

      
      // circles
      const noCirclesA = parseInt(appState.controlOptions.isis.templeDistance / 20000) + 1
      this.ctx.globalAlpha = Math.pow(1 / noCirclesA, appState.controlOptions.isis.opacityDecrease)
      for (let i = 0; i !== noCirclesA; i++ ) {
        this.ctx.beginPath()
        this.ctx.arc(250, 80, appState.controlOptions.isis.templeDistance * i / 10000, 0, Math.PI * 2, true)
        this.ctx.fill()
      }

      const noCirclesT = parseInt(appState.controlOptions.isis.artefactDistance / 20000) + 1
      this.ctx.globalAlpha = Math.pow(1 / noCirclesT, appState.controlOptions.isis.opacityDecrease)
      for (let i = 0; i !== noCirclesT; i++ ) {
        this.ctx.beginPath()
        this.ctx.arc(350, 80, appState.controlOptions.isis.artefactDistance * i / 10000, 0, Math.PI * 2, true)
        this.ctx.fill()
      }
      this.ctx.globalAlpha = 1

      this.ctx.textAlign='center' 
      this._textHead('cult infulence', 300, oy - 25)
      this._text('temple', 250, oy)
      this._text('artefact', 350, oy)

      // isis symbols
      this.ctx.textAlign='right' 
      this._text('temple/artefact', 450, 130)
      this._circleStroke(470, 125, 2, 'black', 'black')
      this._text('more temples/artefacts', 450, 150)
      this._circleStroke(470, 145, 5, 'white', 'black')
      this._circleStroke(470, 145, 2, 'black', 'black')

    }

    

    _visualiseMarluc () {
      const colorsS = MapStyles.marluc.synagogueColors.slice()
      const colorsC = MapStyles.marluc.congregateColors.slice()

      const hy = 15
      this._textHead('jewish synagogues', 30, hy)

      this.ctx.globalAlpha = MapStyles.marluc.synagogueOpacity * 1.2
      const x = 70

      // number of synagogues
      const ny = 65
      this._textBold('number of synagogues in cell', 30, ny - 30)
      this._circleStroke(x, ny, 10, 'grey', 'black')
      this._circleStroke(x + 30, ny, 15, 'grey', 'black')
      this._circleStroke(x + 70, ny, 20, 'grey', 'black')

      // oldest synagogues
      const ty = 135
      this._textBold('the oldest synagogue in cell', 30, ty - 20)
      this._circleStroke(x, ty, 10, colorsS[0], 'black')
      this._circleStroke(x + 30, ty, 10, colorsS[1], 'black')
      this._circleStroke(x + 60, ty, 10, colorsS[2], 'black')
      this._circleStroke(x + 90, ty, 10, colorsS[3], 'black')

      this.ctx.globalAlpha = 1
      this.ctx.fillStyle = 'black'
      this._text('200BC', x - 45, ty + 20)
      this._text('400AD', x + 95, ty + 20)
      this._text('few', x - 20, ny + 30)
      this._text('lot', x + 80, ny + 30)

      // congregates
      this.ctx.globalAlpha = MapStyles.marluc.congregateOpacity * 1.2
      const xc = 300
      this.ctx.strokeStyle = 'white'
      this.ctx.fillStyle = colorsC[0]
      this.ctx.fillRect(xc + 10, hy + 30, 40, 40)
      this.ctx.strokeRect(xc + 10, hy + 30, 40, 40)
      this.ctx.fillStyle = colorsC[1]
      this.ctx.fillRect(xc + 70, hy + 30, 40, 40)
      this.ctx.strokeRect(xc + 70, hy + 30, 40, 40)
      this.ctx.fillStyle = colorsC[2]
      this.ctx.fillRect(xc + 130, hy + 30, 40, 40)
      this.ctx.strokeRect(xc + 130, hy + 30, 40, 40)

      this.ctx.globalAlpha = 1
      this.ctx.fillStyle = 'black'
      this._textHead('christian congregates', xc, hy)
      this._textBold('number of congregates in cell', xc, ny - 30)
      this._text('few', xc -20, ny)
      this._text('lot', xc + 180, ny)

      // symbols
      if (map) {
        if (map.getZoom() > 6) {
          this.ctx.textAlign='right' 
          this._text('synagogue', 350, 120)
          this._circleStroke(370, 115, 5, '#bd0026', '#bd0026')
          this._text('christian congregate', 350, 140)
          this._circleStroke(370, 135, 3, '#016c59', '#016c59')
        }
      }
    }

    _visualiseChristrome () {
      const xi = 20
      const yi = 20
      const line = 30
      const colors = MapStyles.christrome.colors

      if (appState.controlOptions.christrome.mode === 'regions') {
        // regions
        this._textHead('regions under the church influence', xi, yi)

        this.ctx.globalAlpha = MapStyles.christrome.regionOpacity * 1.2
        const xr = xi + 115
        const yr = yi -15
        this.ctx.strokeStyle = MapStyles.christrome.contourColor
        this.ctx.fillStyle = colors[1]
        this.ctx.fillRect(xr, yr + 1 * line, 40, 20)
        this.ctx.strokeRect(xr, yr + 1 * line, 40, 20)
        this.ctx.fillStyle = colors[2]
        this.ctx.fillRect(xr, yr + 2 * line, 40, 20)
        this.ctx.strokeRect(xr, yr + 2 * line, 40, 20)
        this.ctx.fillStyle = colors[3]
        this.ctx.fillRect(xr, yr + 3 * line, 40, 20)
        this.ctx.strokeRect(xr, yr + 3 * line, 40, 20)
        this.ctx.fillStyle = colors[0]
        this.ctx.fillRect(xr, yr + 4 * line, 40, 20)
        this.ctx.strokeRect(xr, yr + 4 * line, 40, 20)


      } else {
        // radii
        this._textHead('areas under the church influence', xi, yi)

        this.ctx.globalAlpha = MapStyles.christrome.radiusOpacity * 1.5
        const xr = xi + 125
        const yr = yi - 5

        this._circleStroke(xr, yr + 1 * line, 13, colors[1], colors[1])

        this._circleStroke(xr, yr + 2 * line, 13, colors[1], colors[1])
        this._circleStroke(xr, yr + 2 * line, 13, colors[2], colors[2])
        
        this._circleStroke(xr, yr + 3 * line, 13, colors[1], colors[1])
        this._circleStroke(xr, yr + 3 * line, 13, colors[2], colors[2])
        this._circleStroke(xr, yr + 3 * line, 13, colors[3], colors[3])
      
    }

      this.ctx.globalAlpha = 1
      this.ctx.fillStyle = 'black'
      this.ctx.textAlign='right' 
      this._text('before 313AD', xi + 100, yi + 1 * line)
      this._text('before 350AD', xi + 100, yi + 2 * line)
      this._text('after 350AD', xi + 100, yi + 3 * line)
      if (appState.controlOptions.christrome.mode === 'regions'){
        this._text('without influence', xi + 100, yi + 4 * line)
      }

      // church symbols
      this._text('church', 350, 100)
      this._circleStroke(370, 95, 2, 'black', 'black')
      this._text('more churches', 350, 120)
      this._circleStroke(370, 115, 5, 'white', 'black')
      this._circleStroke(370, 115, 2, 'black', 'black')

    }

    _visualiseMithorig () {
      const hy = 15
      // mithraic places
      const x1 = 20

      // sizes
      const sy = 65
      this.ctx.globalAlpha = MapStyles.mithorig.placeOpacity * 1.2
      this._circleStroke(x1 + 25, sy, 10, 'grey', 'black')
      this._circleStroke(x1 + 60, sy, 15, 'grey', 'black')
      this._circleStroke(x1 + 105, sy, 20, 'grey', 'black')

      // confidence
      const colorsC = MapStyles.mithorig.mithraicColors
      const cy = 130
      this._circleStroke(x1 + 45, cy, 11, colorsC[0], 'black')
      this._circleStroke(x1 + 75, cy, 11, colorsC[1], 'black')
      this._circleStroke(x1 + 105, cy, 11, colorsC[2], 'black')
      this._circleStroke(x1 + 135, cy, 11, colorsC[3], 'black')

      // forts
      const colorsF = MapStyles.mithorig.fortColors
      const x2 = 300
      const yf = 60

      const hex = (x, y, size) => {
        this.ctx.beginPath()
        this.ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
        for (let side = 0; side < 7; side++) {
          this.ctx.lineTo(x + size * Math.sin(side * 2 * Math.PI / 6), y + size * Math.cos(side * 2 * Math.PI / 6));
        }
        
        this.ctx.fill()
      }

      this.ctx.globalAlpha = MapStyles.mithorig.fortOpacity * 1.2
      this.ctx.fillStyle = colorsF[0]
      hex(x2 + 20, yf, 20)
      this.ctx.fillStyle = colorsF[1]
      hex(x2 + 65, yf, 20)
      this.ctx.fillStyle = colorsF[2]
      hex(x2 + 110, yf, 20)
      this.ctx.fillStyle = colorsF[3]
      hex(x2 + 155, yf, 20)


      this.ctx.globalAlpha = 1
      this.ctx.fillStyle = 'black'
      this._textHead('mithraic places', x1, hy)
      this._textHead('forts', x2, hy)
      this._textBold('number of mithraic places', x1, sy - 30)
      this._textBold('number of forts', x2, sy - 30)
      this._textBold('confidence level', x1, cy - 20)
      this._text('few', x1 - 10, sy + 20)
      this._text('lot', x1 + 135, sy + 20)
      this._text('few', x2 - 20, yf + 20)
      this._text('lot', x2 + 180, yf + 20)
      this._text('dubious', x1 - 10, cy + 20)
      this._text('definitive', x1 + 145, cy + 20)


      // symbols
      if (map) {
        if (map.getZoom() > 6) {
          this.ctx.textAlign='right' 
          this._text('fort', 350, 120)
          this._circleStroke(370, 115, 2, '#54278f', '#54278f')
          this._text('mithraic place', 350, 140)
          this._circleStroke(370, 135, 5, colorsC[0], 'white')
          this._circleStroke(380, 135, 5, colorsC[1], 'white')
          this._circleStroke(390, 135, 5, colorsC[2], 'white')
          this._circleStroke(400, 135, 5, colorsC[3], 'white')
        }
      }
        
    }

    render () {
      var that = this;
      return (
        <div style={Styles['INFO_LEGEND']()}>
          <canvas id="canvas-legend" />
        </div>
      );
    }
}
