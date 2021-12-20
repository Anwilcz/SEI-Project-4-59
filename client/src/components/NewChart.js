import Plotly from 'plotly.js'

const NewChart = ({ x, y, type, height, divId }) => {
  const devsData = { pro: 59390, other: 24049, all: 83439 }
  const devs = devsData[type]
  const div = document.getElementById(divId)
  const data = [
    {
      x: x,
      y: y,
      type: 'bar',
      marker: {
        // color: '#3b9dff',
        line: {
          // color: 'lightblue',
          // width: 1,
        },
      },
      orientation: 'h',
      // textposition: 'top',
    }
  ]
  const layout = {
    autosize: false,
    responsive: false,
    width: 1200,
    height: height,
    xaxis1: {
      xref: 'paper',
      yref: 'paper',
      zeroline: false,
      showline: false,
      showticklabels: false,
      showgrid: false,
    },
    margin: {
      l: 120,
      t: 100,
    },
    yaxis: {
      xref: 'paper',
      yref: 'paper',
      ticks: 'outside',
      tickcolor: 'transparent',
      ticklen: 10,
      tickfont: {
        family: 'Readex Pro, sans-serif',
        size: 16,
        color: 'white',
      },
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    annotations: [
    ],
  }

  for (let i = 0; i < x.length; i++) {
    const result = {
      xref: 'x',
      yref: 'y',
      x: x[i],
      y: y[i],
      text: `${x[i]} votes (${(x[i] / devs * 100).toFixed(1)}%)`,
      font: {
        family: 'Readex Pro, sans-serif',
        size: 14,
        color: '#3b9dff',
        xshift: '20px',
      },
      xanchor: 'left',
      xshift: 10,
      textposition: 'top',
      showarrow: false,
      // ax: 80,
      // ay: 0,
    }
    layout.annotations.push(result)
  }
  let colors = new Array
  if (divId === 'chart-1') {
    colors = ['002b54', '00315b', '003762', '003c69', '00426f', '004975', '004f7b', '005580', '005b85', '006189', '00688d', '006e90', '007493', '007b95', '008197', '008798', '008d98', '009499', '009a98', '00a097', '00a696', '00ac94', '00b292', '00b890', '00be8d', '26c38a', '40c987', '54ce84', '66d380', '77d97d', '88dd7a', '98e277', 'a8e774', 'b8eb72', 'c8ef70', 'd9f36e', 'e9f76e', 'fafa6e']
  }
  if (divId === 'chart-2') {
    colors = ['002b54', '21315f', '393669', '513a71', '673e77', '7e417b', '94457c', 'a9497b', 'bd4f79', 'ce5774', 'de606f', 'eb6c68', 'f67a61', 'fd8959']
  }
  if (divId === 'chart-3') {
    colors = ['002b54', '05325d', '0c3a66', '134270', '184979', '1e5183', '235a8d', '286297', '2d6aa1', '3273ab', '377cb5', '3c85bf', '418dc9', '4697d3', '4ba0de', '50a9e8', '54b2f3', '59bcfd']
  }
  Plotly.newPlot(div, data, layout, { displayModeBar: false, staticPlot: true })
  const points = div.getElementsByClassName('point')
  for (let i = 0; i < x.length; i++) {
    const path = points[i].firstChild
    path.style = `fill: #${colors[i]}`
  }
  return (
    null
  )
}
export default NewChart
