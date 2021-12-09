import Plotly from 'plotly.js'


const NewPieChart = ({ tool, divId }) => {
  const div = document.getElementById(divId)
  const labels = ['Linux', 'Mac OS', 'Windows']
  let values = new Array

  if (divId === 'os-profesional') {
    values = [tool.linux_prof_dev, tool.mac_os_prof_dev, tool.windows_prof_dev]
  }
  if (divId === 'os-other') {
    values = [tool.linux_others, tool.mac_os_others, tool.windows_others]
  }


  const data = [
    {
      values: values,
      labels: labels,
      type: 'pie',
      hole: 0.75,
      textinfo: 'label+percent',
      textposition: 'outside',
      automargin: true,
      marker: {
        colors: ['#fd8959','#F25F5F','#FAFA6E'],
        line: {
          color: '#001a35',
          width: 15,
        },
      },
      hoverlabel: {
        align: 'right',
        textinfo: 'label+percent',
        bgcolor: '#3b9dff',
        bordercolor: 'transparent',
        font: {
          family: 'Readex Pro, sans-serif',
          size: 16,
          color: 'white',
        },
      },
      hovertemplate: ['<extra></extra>%{value} votes', '<extra></extra>%{value} votes', '<extra></extra>%{value} votes'],
      textfont: {
        family: 'Readex Pro, sans-serif',
        size: 16,
        color: 'white',
      },
    }
  ]
  const layout = {
    width: 450,
    height: 450,
    showlegend: false,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    values: {
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
  }

  // for (let i = 0; i < x.length; i++) {
  //   const result = {
  //     xref: 'x',
  //     yref: 'y',
  //     x: x[i],
  //     y: y[i],
  //     text: `${x[i]} votes (${(x[i] / total * 100).toFixed(1)}%)`,
  //     font: {
  //       family: 'Readex Pro, sans-serif',
  //       size: 14,
  //       color: '#3b9dff',
  //       xshift: '20px',
  //     },
  //     xanchor: 'left',
  //     xshift: 10,
  //     textposition: 'top',
  //     showarrow: false,
  //   }
  //   layout.annotations.push(result)
  // }

  // const colors = ['002b54', '0b3965', '174877', '21578a', '2b679c', '3577af', '3e87c2', '4799d6', '50aae9', '59bcfd']

  Plotly.newPlot(div, data, layout, { displayModeBar: false, staticPlot: true })
  // const points = div.getElementsByClassName('point')
  // for (let i = 0; i < x.length; i++) {
  //   const path = points[i].firstChild
  //   path.style = `fill: #${colors[i]}`
  // }
  return (
    null
  )
}
export default NewPieChart



