import { series } from 'async'
import { arrayMap } from 'fast-loops'

import render from './render'

export default function renderAll(files, callback) {
  series(
    arrayMap(
      files,
      (file) => (done) =>
        render(file.document, file.path, () => {
          if (callback) {
            callback(file)
          }

          done()
        })
    )
  )
}
