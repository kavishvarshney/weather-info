
class Forecast{
    constructor(){
        this.key ='V0TTDuGpp6TR10cimT2BgCzhbze0vGE0';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';

    }
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const Weather = await this.getWeather(cityDets.Key);
    
        return {
            cityDets: cityDets,
            Weather: Weather
        };
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURI + query);
        const data = await response.json();
    
        return data[0];

    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];

    }
}