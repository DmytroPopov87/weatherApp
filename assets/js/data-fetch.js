//data fetch

//weather api/ 50 requests per day on trial
const api = '1xctgGb5YqDg1wWcPvIuY4LGt1inT9c5';


const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${api}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
    
};
//checking data fetch
// getCity('Manchester').then(data => {
//         return getWeather(data.Key);    
//     })
//     .then(data => {
//         console.log(data);
//     }).catch(err => console.log(err));

//get Weather info
const getWeather = async (locationKey) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationKey}?apikey=${api}`;
    const response = await fetch(base+query);
    const data = await response.json();
    return data[0];
};
//check
// getWeather('329260')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));