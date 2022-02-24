export const getWeatherCondition = async (ip: string): Promise<string | undefined> => {
  const weatherApiKey = process.env.WEATHER_API_KEY || ''
  const weatherApiBaseUrl = 'https://api.weatherapi.com/v1'
  const weatherUrl = `${weatherApiBaseUrl}/current.json?key=${weatherApiKey}&q=${ip}&aqi=no`
  
  const weather = await fetch(weatherUrl).then(res => res.json())

  return weather?.current.condition.text
}