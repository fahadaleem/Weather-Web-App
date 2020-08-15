const images = {
    '01d': 'wi wi-day-sunny',
    '02d': 'wi wi-day-cloudy',
    '03d': 'wi wi-cloud',
    '04d': 'wi wi-cloudy',
    '09d': 'wi wi-showers',
    '10d': 'wi wi-day-rain-mix',
    '11d': 'wi wi-thunderstorm',
    '13d': 'wi wi-snow',
    '50d': 'wi wi-fog',
    '01n': 'wi wi-night-clear',
    '02n': 'wi wi-night-alt-cloudy',
    '03n': 'wi wi-night-alt-cloudy-high',
    '04n': 'wi wi-cloudy',
    '09n': 'wi wi-night-alt-sprinkle',
    '10n': 'wi wi-night-alt-showers',
    '11n': 'wi wi-night-alt-thunderstorm',
    '13n': 'wi wi-night-alt-snow',
    '50n': 'wi wi-night-fog'
  };

const domStr = {
    day_night_image:"#day-night-image",
    time:"#time_display",
    location:"#location",
    weather_icon:"#weather-icon",
    status:"#status",
    temperature:"#temperature_display",
    min_temp:"#min-temp",
    max_temp:"#max-temp",
    wind_speed:"#wind-speed",
    humidity:"#humidity",
    heading_weather:"#heading-weather",
    loader:".loader"
};


const fetchDataFromObj = (obj)=>{
    console.log(obj);
    if(obj.cod===200)
    {
    const {main,name} = obj;
    const {description, icon:icon_id}=obj.weather[0];
    const {speed:windSpeed} = obj.wind;

    return [main, description, icon_id, windSpeed,name];
    }
    else if(obj.cod==="404")
    {
        alert("Country Not Found!");
        return [];
    }
}



const displayData = (arr)=>
{
    if(arr.length!=0)
    {
    if(arr[2].includes('n'))
    {
        document.querySelector(domStr.day_night_image).src="images/night_image.png";
        document.body.style.backgroundColor="#636687";
        document.querySelector(domStr.heading_weather).style.color="white";
    }
    else if(arr[2].includes('d'))
    {
        document.querySelector(domStr.day_night_image).src="images/day_image.png";
        document.body.style.backgroundColor="#96D6DB";
        document.querySelector(domStr.heading_weather).style.color="black";


    }
    document.querySelector(domStr.weather_icon).className = images[arr[2]];
    document.querySelector(domStr.status).textContent = arr[1];
    document.querySelector(domStr.temperature).textContent = ` ${convertToCelcius(arr[0].temp)}`;
    document.querySelector(domStr.min_temp).textContent = ` ${convertToCelcius(arr[0].temp_min)}`;
    document.querySelector(domStr.max_temp).textContent = ` ${convertToCelcius(arr[0].temp_max)}`;
    document.querySelector(domStr.humidity).textContent = ` ${arr[0].humidity}`;
    document.querySelector(domStr.wind_speed).textContent=` ${arr[3]}`;
    document.querySelector(domStr.location).textContent=` ${arr[4]}`;
}
}

async function fetchWeatherData(cityName){
    const weatherJson = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=3920aa24f2f8aa987867a18858ce064a`);
    let weatherInJsonObj = await weatherJson.json();
    return weatherInJsonObj;
}

// Convert Kelvin to Celcius
const convertToCelcius = temp=> Math.round(temp-273.15);

document.querySelector("#city-name-input").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        fetchWeatherData(this.value)
            .then(obj => {
                displayData(fetchDataFromObj(obj));
            });
            
            this.value="";
            this.placeholder="Enter City Name";
    }
})



