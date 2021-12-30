const key = 'wWErPqxIUoLLeEeczHvNjhffzrYeuiiT';

//Get city data 
const getCity = async(city) => {
    const baseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(baseURL + query);
    const data = await response.json();

    return data[0];
}

//Get weather data

const getWeather = async(id) => {
    const baseURL = 'http://dataservice.accuweather.com/currentconditions/v1/'
    //City Key
    const query = `${id}?apikey=${key}`

    const response = await fetch(baseURL + query);
    const data = await response.json();
    return data[0];
}

 getCity("Tirana").then(data => {
         return getWeather(data.Key);
     }).then(data => {        
         console.log(data)
     })
     .catch(err => console.log(err));



// getWeather("6522");