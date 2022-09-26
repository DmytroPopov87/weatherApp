//DOM manipulations
//getCity and getWeather is loaded before script in html file thats why no need import
const cityForm = document.querySelector('form');
//card  and details class reference
const card = document.querySelector('.card');
const details = document.querySelector('.details');
//time and icon reference
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();


//update ui is responsible for dynamicaly updating page info
const updateUI = (data) => {
    console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //desctructure properties

    const { cityDets, weather } = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update day/night icon images
    let timeSrc = null;
    (weather.IsDayTime) ? timeSrc = 'assets/img/day.svg' : timeSrc = 'assets/img/night.svg';
    time.setAttribute('src', timeSrc);

    //update icon
    icon.src = `assets/img/icons/${weather.WeatherIcon}.svg`;


    //remove the d-none class if press it
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
};


// const updateCity = async (city) => {
//     //store city object about the city
//     const cityDets = await getCity(city);
//     //value from cityDets call
//     const weather = await getWeather(cityDets.Key);
//     //returning object
//     //object short hand notation
//     return { cityDets, weather };

// }

cityForm.addEventListener('submit', e => {
    //prevent refreshing page
    e.preventDefault();
    // getting city value from input
    const city = cityForm.city.value.trim();

    cityForm.reset();
    // update ui with new city
    //update async/await and returns promise now
    //output updated datat to DOM
    forecast.updateCity(city)
        .then(data  => updateUI(data) )
        .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});

//on app starts // page refresh etc.
//check for true or false value
if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}