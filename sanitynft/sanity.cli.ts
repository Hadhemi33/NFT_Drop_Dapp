import createImageUrlBuilder from '@sanity/image-url'
import {createClient} from 'next-sanity'

export const config = {
  projectId: '8863nxj0',
  dataset: 'production',
  apiVersion: '2023-06-08',
  // useCdn: 'production',
}

export const sanityClient = createClient(config)
export const urlFor = (source: any) => createImageUrlBuilder(config).image(source)
