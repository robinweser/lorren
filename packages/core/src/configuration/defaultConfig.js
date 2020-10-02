import Source from './renderers/Source'
import ImageDescription from './renderers/ImageDescription'
import ListItem from './renderers/ListItem'

export default {
  locale: 'en-US',
  currency: 'USD',
  dateTime: 'yyyy-0MM-dd hh:mm',

  renderers: {
    source: Source,
    imageDescription: ImageDescription,
    listItem: ListItem,
  },
}
