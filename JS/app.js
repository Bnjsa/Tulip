const apiKey = 'TU_API_KEY'; // Asegúrate de reemplazar con tu propia API Key
const city = 'Madrid'; // Aquí puedes cambiar la ciudad que deseas consultar

// URL base para la búsqueda de ciudades
const baseUrl = 'http://dataservice.accuweather.com';

// Función para obtener la clave de la ciudad usando su nombre
async function getCityKey(cityName) {
    const url = `${baseUrl}/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length === 0) {
            throw new Error('Ciudad no encontrada');
        }
        return data[0].Key;
    } catch (error) {
        console.error('Error al obtener la clave de la ciudad:', error);
        throw error;
    }
}

// Función para obtener el pronóstico del clima
async function getWeather() {
    try {
        const cityKey = await getCityKey(city); // Obtiene la clave de la ciudad
        const url = `${baseUrl}/currentconditions/v1/${cityKey}?apikey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        const weather = data[0]; // Solo hay un pronóstico de clima por solicitud

        // Actualiza la interfaz con la información del clima
        document.getElementById('location').textContent = city;
        document.getElementById('temperature').textContent = `${weather.Temperature.Metric.Value}°${weather.Temperature.Metric.Unit}`;
        document.getElementById('description').textContent = weather.WeatherText;
        document.getElementById('weather-icon').src = `http://developer.accuweather.com/sites/default/files/${weather.WeatherIcon < 10 ? '0' : ''}${weather.WeatherIcon}-s.png`;

    } catch (error) {
        console.error('Error al obtener el clima:', error);
        document.getElementById('location').textContent = 'Error';
        document.getElementById('temperature').textContent = 'No se pudo obtener el pronóstico';
        document.getElementById('description').textContent = '';
    }
}

// Llamar a la función para cargar el clima al cargar la página
getWeather();
