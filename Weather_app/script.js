document.addEventListener('DOMContentLoaded', ()=>{
    const cityInput= document.getElementById("city-input");
    const getWeatherBtn= document.getElementById("get-weather-btn");
    const weatherInfo=document.getElementById("weather-info");
    const cityName=document.getElementById("city-name");
    const temperature=document.getElementById("temperature");
    const description=document.getElementById("description");
    const errorMessage= document.getElementById("error-message")

    const API_KEY="12b150b1df0ceab76a02e9508d5956fa";
    getWeatherBtn.addEventListener('click', async ()=>{
        const city=cityInput.value.trim()
        if(!city) return;

        // it may throw error 
        // server/database is always in another continent
        // so use try catch block

        try{
            const weatherData= await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            console.log("ayushjdbjsf");
            
            showError();
        }
    })
    async function fetchWeatherData(city){
        const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        const data= await response.json();
        if(!response.ok){
            throw new Error("City Not Found");
        }
        return data;
    }
    function displayWeatherData(data){
        
        console.log(data);
        // const {name, main, weather}=data
        const cityName = data?.name || "Unknown City";
        console.log(cityName);

        
        // cityName.textContent=name;
        // temperature.textContent = `Temperature : ${main.temp}`;
        // description.textContent = `Weather : ${weather[0].description}`;
        // console.log("DOM Elements:", cityName, temperature, description);
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden')
        
    }
    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }

});