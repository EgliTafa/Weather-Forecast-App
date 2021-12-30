function updateData(){
    const submitCity = document.querySelector('form');
    const details = document.querySelector('.details');
    const card = document.querySelector('#weatherCard');

    const updateUI = (data) =>{
        const cityDetails = data.cityDetails;
        const weather = data.weather;

        //render the page
        details.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body card-elements" id="details">
                  <h5 class="card-title">${cityDetails.EnglishName}</h5>
                </div>
                <ul class="list-group list-group-flush card-elements">
                  <li class="list-group-item">${weather.WeatherText}</li>
                  <li class="list-group-item">${weather.Temperature.Metric.Value} &nbsp; <span>${weather.Temperature.Metric.Unit}</span></li>
                </ul>
              </div>

              <div class="card d-none details" id="weatherCard" style="width: 18rem;">
                <div class="card-body card-elements">
                  <h5 class="card-title">${cityDetails.EnglishName}</h5>
                </div>
                <ul class="list-group list-group-flush card-elements">
                  <li class="list-group-item">${weather.WeatherText} </li>
                  <li class="list-group-item">${weather.Temperature.Metric.Value} &nbsp; <span>${weather.Temperature.Metric.Unit}</span></li>
                </ul>
              </div>
        `;

        //remove d-none if present
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
    }

    const updateCity = async(city) => {
        const cityDetails = await getCity(city);
        const weather = await getWeather(cityDetails.Key);

        return {cityDetails : cityDetails,
                weather:weather};
    }

    if(submitCity){
        submitCity.addEventListener('click', e=>{
            e.preventDefault();
    
            //get data
            const city = submitCity.city.value.trim();
            submitCity.reset();
    
            //update with the new values
            updateCity(city)
             .then(data => updateUI(data))
             .catch(err => console.log(err));
        }) 
    }
}