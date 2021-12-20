import Plotly from 'plotly.js'

const sortArray = (array, index) => {
  const sorted = array.sort((a, b) => a[index] - b[index])
  return sorted
}

const sortData = (data) => {
  const x = []
  const y = []
  data.forEach(entry => {
    y.push(entry[0])
    x.push(entry[1])
  })
  return { x, y } 
}

const NewChartEmployment = ({ tool, height, divId }) => {
  const div = document.getElementById(divId)
  let unsortedData = new Array
  let total = new Number
  if (divId === 'employment-worked-with') {
    total = tool.worked_with
    unsortedData = [
      ['Independent', tool.worked_with_independent],
      ['Employed full-time', tool.worked_with_full_time],
      ['Employed part-time', tool.worked_with_part_time],
      ['Unemployed', tool.worked_with_unemployed],
      ['Student', tool.worked_with_student],
      ['Prefer not to say', tool.worked_with_prefer_not_to_say],
      ['Na', tool.worked_with_na]
    ]
  }
  if (divId === 'employment-want-to-work-with') {
    total = tool.wants_to_work_with
    unsortedData = [
      ['Independent', tool.wants_to_work_with_independent],
      ['Employed full-time', tool.wants_to_work_with_full_time],
      ['Employed part-time', tool.wants_to_work_with_part_time],
      ['Unemployed', tool.wants_to_work_with_unemployed],
      ['Student', tool.wants_to_work_with_student],
      ['Prefer not to say', tool.wants_to_work_with_prefer_not_to_say],
      ['Na', tool.wants_to_work_with_na]
    ]
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
    width: 1100,
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
  
  const colors = ['002b54',
    '00507b',
    '007693',
    '009d98',
    '19c18b',
    '95e177',
    'fafa6e']
  
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
export default NewChartEmployment
