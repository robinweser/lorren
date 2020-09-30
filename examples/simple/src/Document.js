import React from 'react'
import {
  Page,
  Box,
  Image,
  Text,
  DateTime,
  Currency,
  Fixed,
  PageNumber,
  Source,
} from '@lorren/core'

import Wrapper from './Wrapper'

export default function Document() {
  return (
    <Wrapper>
      <Page padding="2cm">
        <Box>
          <Text intent="heading">1. Einleitung</Text>
          <Text intent="subheading">1.1. Hinführung zum Thema</Text>
          <Text intent="paragraph">
            Seit etwa zehn Jahren rückt eine bestimmte Plattform immer weiter in
            den Vordergrund. Es handelt sich um das mobile Endgerät, sprich
            Smartphone und Tablet. In vielen Ländern der Welt besitzt
            mittlerweile fast jeder eine solches Gerät. Dank stetig verbesserter
            Hardware können mittlerweile sogar graphisch aufwendige Anwendungen
            betrieben werden. Um eine solche Anwendung entwickeln zu können,
            stehen aktuell drei verschiedene Herangehensweisen zur Auswahl, die
            alle verschiedene Vor- und Nachteile mit sich bringen. [1] Auf der
            einen Seite können mobile Anwendungen durch eine Webanwendung
            realisiert werden. Sie werden mit den klassischen Webtechnologien
            implementiert und über einen geeigneten Webbrowser zugegriffen. Die
            Anwendung muss hierzu nicht auf dem mobilen Gerät installiert
            werden. Webanwendungen sind allerdings im Bezug auf
            gerätespezifische Hardwarenutzung, wie zum Beispiel Kamera oder
            Accelerometer, sowie im Bezug auf Dateisystem-Zugriff sehr
            eingeschränkt. [2] Das Gegenstück stellt die native Anwendung, die
            speziell für ein bestimmtes Betriebssystem entwickelt wird. Hierzu
            kommen, je nach Plattform, verschiedene Programmiersprachen zum
            Einsatz. So werden iOS Anwendungen mit Swift oder dessen Vorgänger
            Objective-C entwickelt, während Android Anwendungen auf Java
            aufbauen. Sie können mithilfe spezieller SDKs, die meist vom
            Betriebssystem-Hersteller selbst veröffentlicht werden, auf
            sämtliche gerätespezifische Eigenschaften zugreifen. Außerdem werden
            sie direkt über den jeweiligen App Store vertrieben und direkt als
            Anwendung auf dem mobilen Endgerät installiert. [1]
          </Text>

          <Image
            height={240}
            src="https://react-pdf.org/images/quijote2.png"
            description="Abbildung 1: Quijote"
          />
        </Box>
        <Box break>
          <Text intent="subheading">
            1.2. Zielsetzung und geplantes Vorgehen
          </Text>
          <Text intent="paragraph">Blablablabla</Text>
          <Currency>4.25</Currency>
          <DateTime format="dd.MM.yyyy kk:mm" />
          <Source value="Hans Peter, 7. Auflage, Seite 1-15, https://www.foo.bar/baz">
            <Text>[1]</Text>
          </Source>
          <Source value="Werner Peter, 7. Auflage, Seite 1-15, https://www.foo.bar/baz">
            {ref => <Text>[{ref}]</Text>}
          </Source>
          <Source value="Jürgen Peter, 7. Auflage, Seite 1-15, https://www.foo.bar/baz; vgl. Peter hans, Seite 10256 auf Seite 12 mit Aufglage hahah und so weiter und so fort" />
        </Box>
        <Box break>
          <Text intent="heading">2. Anforderungsanalyse</Text>
          <Text intent="subheading">2.1. Technische Anforderungen</Text>
          <Text intent="paragraph">Blablabla</Text>
          <Text intent="subheading">2.2. Personelle Anforderungen</Text>
          <Text intent="paragraph">Blablabla</Text>
        </Box>
        <Image
          src="https://react-pdf.org/images/quijote2.png"
          description="Abbildung 2: Quijote"
        />
        <Fixed
          as={Text}
          bottom={4}
          right={4}
          left={4}
          style={{
            textAlign: 'right',
            fontSize: 12,
            minHeight: 16,
            justifyContent: 'flex-end',
          }}>
          {({ pageNumber, totalPages }) => pageNumber}
        </Fixed>
      </Page>
    </Wrapper>
  )
}
