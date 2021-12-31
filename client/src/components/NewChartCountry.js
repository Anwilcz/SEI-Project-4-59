import Plotly from 'plotly.js'

const sortArray = (array, index) => {
  const sorted = array.sort((a, b) => a[index] - b[index])
  return sorted
}

const formatName = (array) => {
  const y = array.map(name => {
    name = name.split('_')
    name = name.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
    // console.log(name)
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
  // console.log(data)
  return data
}

const NewChartCountry = ({ tool, height, divId }) => {
  const div = document.getElementById(divId)
  let unsortedData = new Array

  let total = new Number
  if (divId === 'country-worked-with') {
    total = tool.worked_with
    unsortedData = createArray(tool.worked_with_country)
  }
  if (divId === 'country-want-to-work-with') {
    total = tool.wants_to_work_with
    unsortedData = createArray(tool.wants_to_work_with_country)
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
      t: 0,
      r: 125,
      l: 165,
    },
    yaxis: {
      xref: 'paper',
      yref: 'paper',
      ticks: 'outside',
      tickcolor: 'transparent',
      ticklen: 10,
      tickfont: {
        family: 'Readex Pro, sans-serif',
        size: 14,
        color: 'white',
      },
      automargin: true,
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
        size: 12,
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

  const colors = ['002b54', '0b3965', '174877', '21578a', '2b679c', '3577af', '3e87c2', '4799d6', '50aae9', '59bcfd']

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
export default NewChartCountry
