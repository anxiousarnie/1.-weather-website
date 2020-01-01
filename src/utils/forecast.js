const request = require('request')


const getWeather = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/edc53cd0c2f0975e8a5c34def0974128/'+ latitude +',' + longitude;
    request({url:url, json:true},(error, { body }) =>{
        if(error){
            callback ('cannot get weather data', undefined)
        }else if(body.error){
            callback ('unable to find weather location', undefined)
        }else{
            callback (undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
         
        }
 
    })
}

module.exports =getWeather;