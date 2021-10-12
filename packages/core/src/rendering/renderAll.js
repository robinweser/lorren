import { series } from 'async'
import { arrayMap } from 'fast-loops'

import render from './render'

export default function renderAll(files, callback) {
  series(
    arrayMap(
      files,
      ({ document, path }) =>
        (done) =>
          render(document, path, () => {
            if (callback) {
              callback(path)
            }

            done()
          })
    )
  )
}
