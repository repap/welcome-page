export const getCurrentLocation = async (ip: string) => {
  const weatherApiKey = process.env.WEATHER_API_KEY || ''
  const weatherApiBaseUrl = 'https://api.weatherapi.com/v1'
  const weatherUrl = `${weatherApiBaseUrl}/current.json?key=${weatherApiKey}&q=${ip}&aqi=no`
  
  const weather = await fetch(weatherUrl).then(res => res.json())

  const {country, name: city} = weather?.location

  return {
    country,
    city
  }
}