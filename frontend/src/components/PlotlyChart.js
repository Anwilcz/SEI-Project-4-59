import React from 'react'
import Plot from 'react-plotly.js'

// export default class PlotlyChart extends React.Component {
const PlotlyChart = ({ width, height, x, y }) => {
  console.log(x)
  console.log(y)
  return (
    <Plot id='thisstupidchart'
      data={[
        {
          type: 'bar',
          marker: { color: 'red' },
          x: x,
          y: y,
          orientation: 'h',
        }
      ]}
      layout={{ width: width, height: height, title: 'A Fancy Plot' }}
    />
  )
}

export default PlotlyChart
