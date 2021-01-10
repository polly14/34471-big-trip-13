import {TYPES} from "../const.js";
import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getTypeMoney, getTypeNumber, getTypeTime} from "../utils/statistics.js";

const BAR_HEIGHT = 55;

const renderMoneyChart = (moneyCtx, points) => {

  const typeMoney = TYPES.map((type) => getTypeMoney(points, type));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: TYPES,
      datasets: [{
        data: typeMoney,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTypeChart = (typeCtx, points) => {

  const typeNumber = TYPES.map((type) => getTypeNumber(points, type));

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: TYPES,
      datasets: [{
        data: typeNumber,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, points) => {

  const typeTime = TYPES.map((type) => getTypeTime(points, type));

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: TYPES,
      datasets: [{
        data: typeTime,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`
        }
      },
      title: {
        display: true,
        text: `TYME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {

  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>
    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>
    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends SmartView {

  constructor(points) {
    super();
    this._data = points;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;
    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null ||
        this._typeChart !== null ||
        this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {

    if (this._moneyChart !== null ||
        this._typeChart !== null ||
        this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyChartCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeChartCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeChartCtx = this.getElement().querySelector(`.statistics__chart--time`);

    moneyChartCtx.height = BAR_HEIGHT * TYPES.length;
    typeChartCtx.height = BAR_HEIGHT * TYPES.length;
    timeChartCtx.height = BAR_HEIGHT * TYPES.length;

    this._moneyChart = renderMoneyChart(moneyChartCtx, this._data);
    this._typeChart = renderTypeChart(typeChartCtx, this._data);
    this._timeChart = renderTimeChart(timeChartCtx, this._data);

  }
}
