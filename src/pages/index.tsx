import type { NextPage } from 'next'
import { getUserLanguageByAcceptedLanguages } from '../helper/languageHelper';
import { getCurrentLocation } from '../helper/locationHelper';
import { findRandomPhotoUrl } from '../helper/unsplashHelper';
import { getWeather, getWeatherCondition, getWeatherTemperature } from '../helper/weatherHelper';

type Props = {
  backgroundUrl: string
  currentLocation: {
    country: string,
    city: string
  },
  weather: {
    translatedWeatherCondition: string,
    currentTemperature: string
  }
}

export async function getServerSideProps({req}: any): Promise<{props: Props}> {
  const userIpAddress = req.headers['x-real-ip'] || req.connection.remoteAddress
  const userLanguage = getUserLanguageByAcceptedLanguages(req.headers['accept-language'])
  
  const currentLocation = await getCurrentLocation(userIpAddress)
  const weatherResponse = await getWeather(userIpAddress)
  const weatherCondition = getWeatherCondition(weatherResponse)
  const translatedWeatherCondition = getWeatherCondition(weatherResponse, userLanguage)
  const currentTemperature = getWeatherTemperature(weatherResponse)


  const backgroundUrl = await findRandomPhotoUrl({
    collectionName: 'weather app', photoName: weatherCondition
  }) || ''

  return {
    props: { 
      backgroundUrl,
      currentLocation,
      weather: {
        translatedWeatherCondition, currentTemperature
    }
  },
  }
}

const Home: NextPage<Props> = ({
  backgroundUrl,
  currentLocation,
  weather
}) => {
  return (
    <div
      style={{
        background: `url("${backgroundUrl}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        color: 'white',
        textShadow: '1px 1px 3px rgba(0,0,0,.5)'
      }}
    >
      <div>
        <h1 style={{margin: 0}}>
          {currentLocation.country}, {currentLocation.city}
        </h1>
        <h1 style={{margin: 0}}>
          {weather.translatedWeatherCondition}, {weather.currentTemperature}
        </h1>
      </div>
    </div>
  )
}

export default Home
