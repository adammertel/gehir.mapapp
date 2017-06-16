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
      this.ctx.textAlign='right' 

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
      this.ctx.beginPath()
      this.ctx.arc(x, ny, 10, 0, Math.PI * 2, true)
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.arc(x + 30, ny, 15, 0, Math.PI * 2, true)
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.arc(x + 70, ny, 20, 0, Math.PI * 2, true)
      this.ctx.fill()
      this.ctx.stroke()

      // number of synagogues
      const ty = 135
      this._textBold('the oldest synagogue in cell', 30, ty - 20)
      this.ctx.beginPath()
      this.ctx.arc(x + 5, ty, 13, 0, Math.PI * 2, true)
      this.ctx.fillStyle = colorsS[0]
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.arc(x + 35, ty, 13, 0, Math.PI * 2, true)
      this.ctx.fillStyle = colorsS[1]
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.arc(x + 65, ty, 13, 0, Math.PI * 2, true)
      this.ctx.fillStyle = colorsS[2]
      this.ctx.fill()
      this.ctx.stroke()

      this.ctx.globalAlpha = 1
      this.ctx.fillStyle = 'black'
      this._text('200BC', x - 45, ty + 20)
      this._text('400AD', x + 75, ty + 20)
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

    }

    _visualiseChristrome () {

    }

    _visualiseMithorig () {

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
