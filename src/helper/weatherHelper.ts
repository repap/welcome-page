import weatherConditionTranslations from "./weatherConditionTranslations"

export const getWeather = async (ip: string): Promise<any | undefined> => {
  const weatherApiKey = process.env.WEATHER_API_KEY || ''
  const weatherApiBaseUrl = 'https://api.weatherapi.com/v1'
  const weatherUrl = `${weatherApiBaseUrl}/current.json?key=${weatherApiKey}&q=${ip}&aqi=no`
  
  const weather = await fetch(weatherUrl).then(res => res.json())

  return weather
}

export const getWeatherCondition = (weather: any, lang?: string): string => {
const condition = weatherConditionTranslations
    .find((e:any) => e.code === weather?.current.condition.code)

  const translatedCondition = condition?.languages
    .find((e: any) => e.lang_name === lang || e.lang_iso === lang )

  const conditionText = getDayOrNightConditionText(
    weather,
    translatedCondition || condition
  )

  return conditionText || 'moody'
}

const getDayOrNightConditionText = (weather: any, condition: any): string => {
  return !!weather?.current.is_day ? 
    (condition.day || condition.day_text) :
    (condition.night || condition.night_text)
}

export const getWeatherTemperature = (weather: any): string => {
  return `${(weather?.current.feelslike_c || '-')}°`
}


