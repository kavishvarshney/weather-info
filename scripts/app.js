const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast(); 

//showing the city and weather details on browser
const updateUI = (data) => {

    const cityDets = data.cityDets;
    const Weather = data.Weather;

    //update the details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${Weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${Weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update night/day & icon image

    const iconSrc = `img/icons/${Weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    let timeSrc = null;
    if(Weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else{
        timeSrc= 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};


//getting the new city names which the user enters
cityForm.addEventListener('submit', e =>{
    //prevent default action
    e.preventDefault();

    
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //uodate the ui with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

        //setting up local storage
        localStorage.setItem('city', city);
});

// update automatic reload of city stroed in local storage
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}