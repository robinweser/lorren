import React from 'react'
import {
  renderWithIndex,
  IndexTable,
  Document,
  Page,
  Spacer,
  Box,
  Text,
  IMAGE_REFERENCE,
  SOURCE_REFERENCE,
} from '@lorren-js/core'

import MyDocument from '../src/Document'
import Wrapper from '../src/Wrapper'

renderWithIndex(
  <MyDocument />,
  (index) => (
    <Wrapper>
      <Document>
        <Page padding="2cm">
          <Text variant="heading">Inhaltsverzeichnis</Text>
          <Spacer size={5} />
          <IndexTable index={index} include={['heading', 'subheading']}>
            {({ type, content, pageNumber }) => (
              <Box
                key={type + content + pageNumber}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                space={2}
                style={{ paddingLeft: type === 'subheading' ? 12 : 0 }}>
                <Text>{content}</Text>
                <Box
                  grow={1}
                  style={{ height: 1, backgroundColor: '#333', marginTop: 4 }}
                />
                <Text>{pageNumber}</Text>
              </Box>
            )}
          </IndexTable>
        </Page>
        <Page padding="2cm">
          <Text variant="heading">Abbildungsverzeichnis</Text>
          <Spacer size={5} />
          <IndexTable index={index} include={[IMAGE_REFERENCE]}>
            {({ content, pageNumber }) => (
              <Box
                key={content + pageNumber}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                space={2}>
                <Text>{content}</Text>
                <Box
                  grow={1}
                  style={{ height: 1, backgroundColor: '#333', marginTop: 4 }}
                />
                <Text>{pageNumber}</Text>
              </Box>
            )}
          </IndexTable>
        </Page>

        <MyDocument />
        <Page padding="2cm">
          <Text variant="heading">Quellenverzeichnis</Text>
          <Spacer size={5} />

          <IndexTable
            index={index}
            include={[SOURCE_REFERENCE]}
            container={(props) => <Box space={2.5} {...props} />}>
            {({ content, index: count }) => (
              <Box key={content} space={2} direction="row">
                <Text>[{count + 1}]</Text>
                <Text key={content}>{content}</Text>
              </Box>
            )}
          </IndexTable>
        </Page>
      </Document>
    </Wrapper>
  ),
  `${__dirname}/../dist/Document.pdf`
)
