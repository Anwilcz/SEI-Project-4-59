import Plotly from 'plotly.js'

const sortArray = (array, index) => {
  const sorted = array.sort((a, b) => a[index] - b[index])
  return sorted
}

const formatName = (array) => {
  const y = array.map(name => {
    name = name.split('_').join(' ')
    console.log(name)
    return name
  })
  return y
}

const sortData = (data) => {
  const x = []
  let y = []
  data.forEach(entry => {
    y.push(entry[0])
    x.push(entry[1])
  })
  y = formatName(y)
  return { x, y }
}

const createArray = (object) => {
  const data = Object.entries(object)
  data.pop()
  data.shift()
  console.log(data)
  return data
}

const NewChartCompanySize = ({ tool, height, divId }) => {
  const div = document.getElementById(divId)
  let unsortedData = new Array

  let total = new Number
  if (divId === 'company-worked-with') {
    total = tool.worked_with
    unsortedData = createArray(tool.worked_with_company_size)
  }
  if (divId === 'company-want-to-work-with') {
    total = tool.wants_to_work_with
    unsortedData = createArray(tool.wants_to_work_with_company_size)
  }

  const sortedArray = sortArray(unsortedData, 1)
  const { x, y } = sortData(sortedArray)



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
    width: window.innerWidth * 0.9,
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
      l: 200,
      t: 60,
      b: 0,
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
      text: `${x[i]} votes (${(x[i] / total * 100).toFixed(1)}%)`,
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

  const colors = ['002b54', '303466', '563b73', '7b417a', '9f477c', 'bf5078', 'da5e70', 'ef7165', 'fd8959']

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
export default NewChartCompanySize
