import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { createApi } from 'unsplash-js';

export async function getServerSideProps(context) {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY || ''
  const unsplash = createApi({
    accessKey: unsplashAccessKey,
    fetch: fetch,
  });
  
  const collections = (await unsplash.search.getCollections({
    query: 'weather app',
  })).response?.results

  const collectionIds = collections?.map(collection => collection.id)

  const photos = (await unsplash.search.getPhotos({
    collectionIds,
    query: 'rainy'
  })).response?.results

  const photo = photos ? photos[0] : undefined

  if(!photo) {
    return {props: { photo: 'not found'}}
  }

  return {
    props: { photo: photo.urls.full }, // will be passed to the page component as props
  }
}

const Home: NextPage<{photo: string}> = ({photo}) => {
  return (
    <div
      style={{
        background: `url("${photo}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
      }}
    >
    </div>
  )
}

export default Home
