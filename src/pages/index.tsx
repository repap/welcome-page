import type { NextPage } from 'next'
import { getCurrentLocation } from '../helper/locationHelper';
import { findRandomPhotoUrl } from '../helper/unsplashHelper';
import { getWeatherCondition } from '../helper/weatherHelper';

type Props = {
  backgroundUrl: string
  currentLocation: {
    country: string,
    city: string
  }
}

export async function getServerSideProps({req}: any): Promise<{props: Props}> {
  const userIpAddress = req.headers['x-real-ip'] || req.connection.remoteAddress
  
  const currentLocation = await getCurrentLocation(userIpAddress)
  const weatherCondition = await getWeatherCondition(userIpAddress) || 'moody'

  const backgroundUrl = await findRandomPhotoUrl({
    collectionName: 'weather app', photoName: weatherCondition
  }) || ''

  return {
    props: { backgroundUrl, currentLocation },
  }
}

const Home: NextPage<Props> = ({backgroundUrl, currentLocation}) => {
  return (
    <div
      style={{
        background: `url("${backgroundUrl}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
      }}
    >
      <h1>
        {currentLocation.country}, {currentLocation.city}
      </h1>
    </div>
  )
}

export default Home
