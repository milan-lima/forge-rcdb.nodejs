/////////////////////////////////////////////////////////
// Viewing.Extension.ScreenShotManager
// by Philippe Leefsma, March 2017
//
/////////////////////////////////////////////////////////
import './Viewing.Extension.ScreenShotManager.scss'
import ExtensionBase from 'Viewer.ExtensionBase'
import WidgetContainer from 'WidgetContainer'
import Toolkit from 'Viewer.Toolkit'
import React from 'react'

class ScreenShotManagerExtension extends ExtensionBase {

  /////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////
  constructor (viewer, options) {

    super (viewer, options)

    this.onScreenShot = this.onScreenShot.bind(this)

    this.react = options.react
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  get className() {

    return 'screenshot-manager'
  }

  /////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////
  static get ExtensionId() {

    return 'Viewing.Extension.ScreenShotManager'
  }

  /////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////
  load () {

    this.react.setState({


    }).then (() => {

      this.react.setRenderExtension(this)
    })

    //this.viewer.getScreenShot(400, 400, this.onScreenShot)

    console.log('Viewing.Extension.ScreenShotManager loaded')

    return true
  }

  /////////////////////////////////////////////////////////
  // Unload callback
  //
  /////////////////////////////////////////////////////////
  unload () {

    console.log('Viewing.Extension.ScreenShotManager unloaded')

    return true
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  onScreenShot (blob) {

    this.saveAs(blob, 'shot.png')
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  saveAs (blob, filename) {

    const link = document.createElement('a')

    link.setAttribute('download', filename)
    link.setAttribute('href', blob)
    link.click()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onStopResize () {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onResize () {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderTitle () {

    return (
      <div className="title">
        <label>
          Screenshot Manager
        </label>
      </div>
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render (opts = {showTitle: true}) {

    const state = this.react.getState()

    return (
      <WidgetContainer renderTitle={this.renderTitle}
        showTitle={opts.showTitle}
        className={this.className}>



      </WidgetContainer>
    )
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  ScreenShotManagerExtension.ExtensionId,
  ScreenShotManagerExtension)
