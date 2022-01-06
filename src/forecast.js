import request from "request";

export const forecast=(address, callback)=>{
    const url="http://api.weatherstack.com/current?access_key=b5b647f9902f310c56e663237a15bcba&query="+encodeURIComponent(address);
    request({ url: url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (response.body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{actual:body.current.temperature,feelslike:body.current.feelslike});   
        }
    })
}

export default{
    forecast: forecast,

}