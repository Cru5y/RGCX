const container1 = document.querySelector("#bottomchart_container");

function createSimpleSwitcher1(items, activeItem, activeItemChangedCallback) {
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

var intervals1 = ['2W', '4W', '3M', '6M', '1Y', 'All'];

var switcherElement1 = createSimpleSwitcher1(intervals1, intervals1[2], syncToInterval1);

var chartElement1 = document.createElement('div');

var chart1 = LightweightCharts.createChart(chartElement1, {
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
		// vertLine: {
		// 	visible: false
		// },
	},
	// crosshairMarkerVisible: false
});

chart1.timeScale().fitContent();

container1.appendChild(switcherElement1);
container1.appendChild(chartElement1);

var areaSeries1 = null;

function syncToInterval1(interval) {
	if (areaSeries1) {
		chart1.removeSeries(areaSeries1);
		areaSeries1 = null;
	}
	areaSeries1 = chart1.addAreaSeries({
    topColor: '#e3eeea',
    bottomColor: 'rgba(76, 175, 80, 0.04)',
    lineColor: '#71aa99',
    lineWidth: 2,
	});
  switch (interval) {
    case '2W':
      fetch(`http://testapi.evotech.ro:8086/getEstimatedPrices/${currentSymbol}/2`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries1.setData(data);
      });
      break;
    case '4W':
      fetch(`http://testapi.evotech.ro:8086/getEstimatedPrices/${currentSymbol}/4`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries1.setData(data);
      });
      break;
    case '3M':
      fetch(`http://testapi.evotech.ro:8086/getEstimatedPrices/${currentSymbol}/12`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries1.setData(data);
				// const numWeeks = 12;
				// const dt = new Date();
				// dt.setDate(dt.getDate() + numWeeks * 12);
				// chart.timeScale().setVisibleRange({ 
				// 	from: Date.now(), 
				// 	to: dt 
				// });
      });
      break;
    case '6M':
      fetch(`http://testapi.evotech.ro:8086/getEstimatedPrices/${currentSymbol}/26`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries1.setData(data);
      });
    break;
    case '1Y':
      fetch(`http://testapi.evotech.ro:8086/getEstimatedPrices/${currentSymbol}/52`)
      .then((response) => response.json())
      .then((data) => {
        areaSeries1.setData(data);
      });
      break;
    default:
      console.log("Error fetching price estimates");
      break;
  }
	// new ResizeObserver(entries => {
	// 	if (entries.length === 0 || entries[0].target !== container1) { return; }
	// 	const newRect = entries[0].contentRect;
	// 	chart.applyOptions({ height: newRect.height, width: newRect.width });
	// }).observe(container1);
  chart1.timeScale().fitContent();
}

syncToInterval1(intervals1[3]);