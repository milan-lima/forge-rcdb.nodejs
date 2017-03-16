/////////////////////////////////////////////////////////
// PieChart
// by Philippe Leefsma, April 2016
//
/////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import d3pie from 'd3pie'
import './PieChart.scss'
import d3 from 'd3'

class PieChart extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

    const {data} = this.props

    this.draw(data)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidUpdate (prevProps, prevState) {

    if (prevProps.guid !== this.props.guid) {

      const {data} = this.props

      $(this.container).empty()

      this.draw(data, {
        effects: {
          load: {
            effect: 'none'
          }
        }
      })
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  draw (data, opts= {}) {

    if (!data || !data.length) {

      return
    }

    const size = Math.min(
       $(this.container).height(),
       $(this.container).width())

    const options =  Object.assign({}, {

      size: {
        canvasHeight: size,
        canvasWidth: size,
        pieInnerRadius: '40%',
        pieOuterRadius: '98%'
      },

      data: {
        content: data
      },

      tooltips: {
        enabled: true,
        type: "placeholder",
        placeholderParser: (index, replacements) => {
          Object.assign(replacements, {
            unit: data[index].unit
          })
        },
        string: '{label}',
        styles: {
          fadeInSpeed: 250,
          backgroundColor: "#bababa",
          backgroundOpacity: 0.85,
          color: "#00",
          borderRadius: 2,
          font: "ArtifaktElementRegular",
          fontSize: 10,
          padding: 4
        }
      },

      labels: {
        outer: {
          format: 'none',
          hideWhenLessThanPercentage: 5,
          pieDistance: 32
        },
        inner: {
          hideWhenLessThanPercentage: 5
        }
      },

      callbacks: {
        onClickSegment: (event) => {

          if (this.props.onGroupClicked) {

            this.props.onGroupClicked (event)
          }
        }
      },

      misc: {
        gradient: {
          enabled: false,
          percentage: 100
        }
      }
    }, opts)

    this.pie = new d3pie(this.container, options)

    this.applyCustomProps()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  applyCustomProps () {

    $(this.container).find('svg').css({
      transform: `translate(0px, -2px)`,
      overflow: 'visible'
    })

    setTimeout(()=> {

      const $path = $(`g[class*="_arc"] > path`,
        $(this.container))

      $path.css({
        'stroke-width': '0'
      })
    }, 100)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    return (
      <div className="pie-chart"
        ref={ (div) => this.container = div }>
      </div>
    )
  }
}

export default PieChart
