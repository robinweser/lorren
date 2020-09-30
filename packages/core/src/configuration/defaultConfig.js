import Source from '../renderers/Source'
import ImageDescription from '../renderers/ImageDescription'

export default {
  locale: 'en-US',
  currency: 'USD',
  dateTime: 'yyyy-0MM-dd hh:mm',

  renderers: {
    source: Source,
    imageDescription: ImageDescription,
  },
}
