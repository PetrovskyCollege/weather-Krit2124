// Контейнеры с погодой, городом и ошибкой
let weatherContainer = document.getElementsByClassName("weatherContainer")[0]
let cityContainer = document.getElementsByClassName("cityContainer")[0]
let errorContainer = document.getElementsByClassName("errorContainer")[0]

// Функция показа контейнера с погодой
function showWeatherContainer() {
    weatherContainer.style.display = "flex"
    cityContainer.style.display = "none"
    errorContainer.style.display = "none"
}

// Функция показа контейнера с городом
function showCityContainer() {
    weatherContainer.style.display = "none"
    cityContainer.style.display = "flex"
    errorContainer.style.display = "none"
}

// Функция показа контейнера с ошибкой
function showCityContainer() {
    weatherContainer.style.display = "none"
    cityContainer.style.display = "none"
    errorContainer.style.display = "flex"
}

// Кнопка для перехода на ввод города
let changeCityButton = document.getElementById("changeCityButton")
changeCityButton.onclick = function() {
    // Изменение текущего окна
    showCityContainer()
}

//Кнопка поиска температуры по городу
let findCityButton = document.getElementById("findCityButton")
findCityButton.onclick = function() {
    // Изменение текущего окна
    showWeatherContainer()

    let enteredCity = document.getElementById("inputToFindCity").value
    coords = getCoordsFromCity(enteredCity)
    console.log(coords[0])
    console.log(coords[1])
}

// Автоматическое определение местоположения пользователя
navigator.geolocation.getCurrentPosition(
    function(position) {
        getWeatherFromCoords(position.coords.latitude, position.coords.longitude)
	}
)

// Функция определения погоды по автоматическому местоположению
function getWeatherFromCoords(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat.toFixed(2) + '&lon=' + lon.toFixed(2) + '&lang=ru&units=metric&appid=bd69def61e044b12aa285f853e73965f')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
}

// Функция определения координат города
function getCoordsFromCity(city) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=bd69def61e044b12aa285f853e73965f')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let coords = new Array()
            coords[0] = data[0].lat
            coords[1] = data[0].lon
        })
    return coords
}