class Forecast {
    constructor() {
        this.api = 'Rh4Gcs9GUDikN7ub1n7KZMNrKAcrxaAF';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) {
        //store city object about the city
        const cityDets = await this.getCity(city);
        //value from cityDets call
        const weather = await this.getWeather(cityDets.Key);
        //returning object
        //object short hand notation
        return { cityDets, weather };
    }
    async getCity(city){
        const query = `?apikey=${this.api}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(locationKey) {
        const query = `${locationKey}?apikey=${this.api}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
};



//data fetch

//weather api/ 50 requests per day on trial
// const api = 'Rh4Gcs9GUDikN7ub1n7KZMNrKAcrxaAF';


// const getCity = async (city) => {
//     const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${api}&q=${city}`;
//     const response = await fetch(base + query);
//     const data = await response.json();
//     return data[0];
// };
//checking data fetch
// getCity('Manchester').then(data => {
//         return getWeather(data.Key);    
//     })
//     .then(data => {
//         console.log(data);
//     }).catch(err => console.log(err));

//get Weather info
// const getWeather = async (locationKey) => {
//     const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
//     const query = `${locationKey}?apikey=${api}`;
//     const response = await fetch(base+query);
//     const data = await response.json();
//     return data[0];
// };
//check
// getWeather('329260')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
