import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { renderToNodeList } from 'react-fela'

import getFelaRenderer from '../styling/getFelaRenderer'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const renderer = getFelaRenderer()

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} renderer={renderer} />,
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styleTags: renderToNodeList(renderer),
    }
  }

  render() {
    const { styleTags } = this.props

    return (
      <html>
        <Head>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta
            name="viewport"
            content="width=device-width,height=device-height,initial-scale=1, viewport-fit=cover"
          />
          {styleTags}
        </Head>
        <body>
          <Main />
          <script async defer src="https://sa.weser.io/app.js" />
          <noscript>
            <img src="https://sa.weser.io/image.gif" alt="" />
          </noscript>
          <NextScript />
        </body>
      </html>
    )
  }
}
