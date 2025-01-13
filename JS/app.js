// Clave API de AccuWeather
const apiKey = 'XuulHBH5lBjUMELgVAg6O549WFG4Fraz'; // Reemplaza con tu clave de API de AccuWeather
const city = 'Madrid'; // Cambia esto por la ciudad que desees

// URL base de la API de AccuWeather
const baseUrl = `http://dataservice.accuweather.com/currentconditions/v1/`;

// Función para obtener las coordenadas de la ciudad
async function getCityKey(city) {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

  const response = await fetch(url);
  const data = await response.json();
  
  if (data.length > 0) {
    return data[0].Key;
  } else {
    throw new Error('Ciudad no encontrada');
  }
}

// Función para obtener el pronóstico del clima
async function getWeather() {
  try {
    const cityKey = await getCityKey(city);
    const url = `${baseUrl}${cityKey}?apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const weather = data[0];
    
    // Mostrar la información en la interfaz
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

// Llamar a la función para cargar el clima
getWeather();
