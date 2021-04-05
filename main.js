function getData(customUrl, city) {
	fetch(customUrl, { mode: 'cors' })
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			display(response, city);
		})
		.catch((err) => {
			const displayArea = document.querySelector('#current-city' + city);
			clear(city);
			displayArea.textContent =
				'Uh Oh, City not found. Please try again with: city name, country name!';
			displayArea.style.fontSize = '20px';
		});
}

function clear(city) {
	document.querySelector('#degrees' + city).textContent = '';
	document.querySelector('#min' + city).textContent = '';
	document.querySelector('#max' + city).textContent = '';
	document.querySelector('#real' + city).textContent = '';
	document.querySelector('#current-city' + city).textContent = '';
	document.querySelector('#current-time' + city).textContent = '';
}

function display(dataCollected, city) {
	const temp = document.querySelector('#degrees' + city);
	const minTemp = document.querySelector('#min' + city);
	const maxTemp = document.querySelector('#max' + city);
	const realFeel = document.querySelector('#real' + city);
	const currentCity = document.querySelector('#current-city' + city);
	const currentTime = document.querySelector('#current-time' + city);

	temp.textContent = Math.round(dataCollected.main.temp) + 'º';
	minTemp.textContent = 'Min: ' + Math.round(dataCollected.main.temp_min) + 'º';
	maxTemp.textContent = 'Max: ' + Math.round(dataCollected.main.temp_max) + 'º';
	realFeel.textContent =
		'Real feel: ' + Math.round(dataCollected.main.feels_like) + 'º';
	currentCity.textContent = dataCollected.name;
	let date = new Date();
	let hours = date.getUTCHours();
	let min = date.getUTCMinutes();
	if (min < 10) min = '0' + min;
	currentTime.textContent = hours + dataCollected.timezone / 3600 + ':' + min;
}

const searchBtn = document.querySelectorAll('.city-search-btn');
searchBtn.forEach((btn) =>
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		cityNumber = e.path[1].id;
		const city = document.querySelector('#input' + cityNumber).value;
		if (city.toLowerCase() == 'julipa') {
			secretMode();
		} else {
			getData(getUrl(city), cityNumber);
		}
	})
);

function getUrl(city) {
	url =
		'https://api.openweathermap.org/data/2.5/weather?q=' +
		city +
		'&units=metric&APPID=71c26ea185359ddc31e7c229cd0eb1ba';

	return url;
}

function secretMode() {
	const displayArea = document.querySelector('#duo-display');
	displayArea.style.backgroundImage = 'url(heartLineMiddle.png)';
	let j = getUrl('bacabal, br');
	let f = getUrl('porto, pt');
	getData(j, '1');
	getData(f, '2');
}

getData(getUrl('Paris'), '1');
getData(getUrl('Lisbon'), '2');
