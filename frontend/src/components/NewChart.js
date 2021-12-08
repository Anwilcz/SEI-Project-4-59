import Plotly from 'plotly.js'

const NewChart = ({ x, y, type }) => {
  const devsData = { pro: 59390, other: 24049, all: 83439 }
  const devs = devsData[type]
  const div = document.getElementsByClassName('chart')[0]
  console.log(div)
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
    width: 1200,
    height: 2300,
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

  const colors = ['002b54', '00315b', '003762', '003c69', '00426f', '004975', '004f7b', '005580', '005b85', '006189', '00688d', '006e90', '007493', '007b95', '008197', '008798', '008d98', '009499', '009a98', '00a097', '00a696', '00ac94', '00b292', '00b890', '00be8d', '26c38a', '40c987', '54ce84', '66d380', '77d97d', '88dd7a', '98e277', 'a8e774', 'b8eb72', 'c8ef70', 'd9f36e', 'e9f76e', 'fafa6e']
  Plotly.newPlot(div, data, layout, { displayModeBar: false, staticPlot: true })
  const points = document.getElementsByClassName('point')
  console.log(points)
  for (let i = 0; i < x.length; i++) {
    const path = points[i].firstChild
    console.log(path)
    path.style = `fill: #${colors[i]}` 
  }
  return (
    null
  )
}
export default NewChart
