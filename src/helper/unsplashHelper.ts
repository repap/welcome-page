import { createApi } from "unsplash-js";
import { Orientation } from "unsplash-js/dist/types/request";

type RandomPhotoInput = {
  collectionName: string,
  photoName: string,
  orientation?: Orientation
}

export const findRandomPhotoUrl = async ({
  collectionName,
  photoName,
  orientation = 'landscape',
}: RandomPhotoInput) => {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY || ''
  const unsplash = createApi({
    accessKey: unsplashAccessKey,
    fetch: fetch,
  });
  
  const collections = (await unsplash.search.getCollections({
    query: collectionName,
  })).response?.results

  const collectionIds = collections?.map(collection => collection.id)

  const photos = (await unsplash.search.getPhotos({
    collectionIds,
    query: photoName,
    orientation: orientation
  })).response?.results || []

  const randomIndex = Math.floor(Math.random() * photos?.length - 1)

  const photo = photos ? photos[randomIndex] : undefined

  return photo?.urls.full
}