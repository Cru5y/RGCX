const container = document.querySelector("#topchart_container");

function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
	var switcherElement = document.createElement('div');
	switcherElement.classList.add('switcher');

	var intervalElements = items.map(function(item) {
		var itemEl = document.createElement('button');
		itemEl.innerText = item;
		itemEl.classList.add('switcher-item');
		itemEl.classList.toggle('switcher-active-item', item === activeItem);
		itemEl.addEventListener('click', function() {
			onItemClicked(item);
		});
		switcherElement.appendChild(itemEl);
		return itemEl;
	});

	function onItemClicked(item) {
		if (item === activeItem) {
			return;
		}

		intervalElements.forEach(function(element, index) {
			element.classList.toggle('switcher-active-item', items[index] === item);
		});

		activeItem = item;

		activeItemChangedCallback(item);
	}

	return switcherElement;
}

const intervals = ['1W', '1M', '3M', '6M', '1Y', 'All'];

var switcherElement = createSimpleSwitcher(intervals, intervals[3], syncToInterval);

var chartElement = document.createElement('div');

var chart = LightweightCharts.createChart(chartElement, {
	width: 650,
  height: 275,
	layout: {
		backgroundColor: '#FFFFFF',
		textColor: '#d1d4dc',
	},
	grid: {
		vertLines: {
			visible: false,
		},
		horzLines: {
			color: 'rgba(42, 46, 57, 0.5)',
		},
	},
	rightPriceScale: {
		borderVisible: false,
	},
	timeScale: {
		borderVisible: false,
	},
	crosshair: {
		horzLine: {
			visible: false,
		},
	},
});

container.appendChild(switcherElement);
container.appendChild(chartElement);

var areaSeries = null;

function syncToInterval(interval) {
	if (areaSeries) {
		chart.removeSeries(areaSeries);
		areaSeries = null;
	}
	areaSeries = chart.addAreaSeries({
    topColor: '#e3eeea',
    bottomColor: 'rgba(76, 175, 80, 0.04)',
    lineColor: '#71aa99',
    lineWidth: 2,
	});
  switch (interval) {
    case '1W':
      fetch(`http://testapi.evotech.ro:8086/getHistoricalPricesWeekly/${currentSymbol}/1`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries.setData(data);
      });
      break;
    case '1M':
      fetch(`http://testapi.evotech.ro:8086/getHistoricalPricesWeekly/${currentSymbol}/4`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries.setData(data);
      });
      break;
    case '3M':
      fetch(`http://testapi.evotech.ro:8086/getHistoricalPricesWeekly/${currentSymbol}/12`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries.setData(data);
      });
      break;
    case '6M':
      fetch(`http://testapi.evotech.ro:8086/getHistoricalPricesWeekly/${currentSymbol}/26`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries.setData(data);
      });
    break;
    case '1Y':
      fetch(`http://testapi.evotech.ro:8086/getHistoricalPricesWeekly/${currentSymbol}/52`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries.setData(data);
      });
      break;
		case 'All':
			fetch(`http://testapi.evotech.ro:8086/getHistoricalPricesWeekly/${currentSymbol}/156`)
			.then((response) => response.json())
			.then((data) => {
				areaSeries.setData(data);
			});
			break;
    default:
      console.log("Error fetching price history");
      break;
  }
	// new ResizeObserver(entries => {
	// 	if (entries.length === 0 || entries[0].target !== container) { return; }
	// 	const newRect = entries[0].contentRect;
	// 	chart.applyOptions({ height: newRect.height, width: newRect.width });
	// }).observe(container);
	// chart.timeScale().fitContent();
}

syncToInterval(intervals[3]);