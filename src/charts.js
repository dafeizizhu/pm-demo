import Highcharts from 'highcharts'

export function history(container, title, series) {
  return Highcharts.chart(container, {
    title: {
      text: title,
      x: -20
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series
  })
}
