import React from 'react'

import Text from './Text'

import useConfig from '../configuration/useConfig'

export default function Currency({
  value,
  children,
  currency,
  thousandSeparator = true,
  locale,
  ...props
}) {
  const config = useConfig()

  const val = value || children
  if (val === undefined) {
    return null
  }

  const formatter = Intl.NumberFormat(locale || config.locale, {
    style: 'currency',
    useGrouping: thousandSeparator,
    currency: currency || config.currency,
  })

  return <Text {...props} text={formatter.format(val)} />
}

Currency.childOf = ['Page', 'Box', 'Text']
Currency.lorrenTypes = {
  value: {
    type: 'float',
    variable: true,
  },
  thousandSeparator: {
    type: 'boolean',
    initial: true,
  },
  locale: {
    type: 'select',
    initial: 'de-DE',
    options: [
      'af-ZA',
      'am-ET',
      'ar-AE',
      'ar-BH',
      'ar-DZ',
      'ar-EG',
      'ar-IQ',
      'ar-JO',
      'ar-KW',
      'ar-LB',
      'ar-LY',
      'ar-MA',
      'arn-CL',
      'ar-OM',
      'ar-QA',
      'ar-SA',
      'ar-SY',
      'ar-TN',
      'ar-YE',
      'as-IN',
      'az-Cyrl-AZ',
      'az-Latn-AZ',
      'ba-RU',
      'be-BY',
      'bg-BG',
      'bn-BD',
      'bn-IN',
      'bo-CN',
      'br-FR',
      'bs-Cyrl-BA',
      'bs-Latn-BA',
      'ca-ES',
      'co-FR',
      'cs-CZ',
      'cy-GB',
      'da-DK',
      'de-AT',
      'de-CH',
      'de-DE',
      'de-LI',
      'de-LU',
      'dsb-DE',
      'dv-MV',
      'el-GR',
      'en-029',
      'en-AU',
      'en-BZ',
      'en-CA',
      'en-GB',
      'en-IE',
      'en-IN',
      'en-JM',
      'en-MY',
      'en-NZ',
      'en-PH',
      'en-SG',
      'en-TT',
      'en-US',
      'en-ZA',
      'en-ZW',
      'es-AR',
      'es-BO',
      'es-CL',
      'es-CO',
      'es-CR',
      'es-DO',
      'es-EC',
      'es-ES',
      'es-GT',
      'es-HN',
      'es-MX',
      'es-NI',
      'es-PA',
      'es-PE',
      'es-PR',
      'es-PY',
      'es-SV',
      'es-US',
      'es-UY',
      'es-VE',
      'et-EE',
      'eu-ES',
      'fa-IR',
      'fi-FI',
      'fil-PH',
      'fo-FO',
      'fr-BE',
      'fr-CA',
      'fr-CH',
      'fr-FR',
      'fr-LU',
      'fr-MC',
      'fy-NL',
      'ga-IE',
      'gd-GB',
      'gl-ES',
      'gsw-FR',
      'gu-IN',
      'ha-Latn-NG',
      'he-IL',
      'hi-IN',
      'hr-BA',
      'hr-HR',
      'hsb-DE',
      'hu-HU',
      'hy-AM',
      'id-ID',
      'ig-NG',
      'ii-CN',
      'is-IS',
      'it-CH',
      'it-IT',
      'iu-Cans-CA',
      'iu-Latn-CA',
      'ja-JP',
      'ka-GE',
      'kk-KZ',
      'kl-GL',
      'km-KH',
      'kn-IN',
      'kok-IN',
      'ko-KR',
      'ky-KG',
      'lb-LU',
      'lo-LA',
      'lt-LT',
      'lv-LV',
      'mi-NZ',
      'mk-MK',
      'ml-IN',
      'mn-MN',
      'mn-Mong-CN',
      'moh-CA',
      'mr-IN',
      'ms-BN',
      'ms-MY',
      'mt-MT',
      'nb-NO',
      'ne-NP',
      'nl-BE',
      'nl-NL',
      'nn-NO',
      'nso-ZA',
      'oc-FR',
      'or-IN',
      'pa-IN',
      'pl-PL',
      'prs-AF',
      'ps-AF',
      'pt-BR',
      'pt-PT',
      'qut-GT',
      'quz-BO',
      'quz-EC',
      'quz-PE',
      'rm-CH',
      'ro-RO',
      'ru-RU',
      'rw-RW',
      'sah-RU',
      'sa-IN',
      'se-FI',
      'se-NO',
      'se-SE',
      'si-LK',
      'sk-SK',
      'sl-SI',
      'sma-NO',
      'sma-SE',
      'smj-NO',
      'smj-SE',
      'smn-FI',
      'sms-FI',
      'sq-AL',
      'sr-Cyrl-BA',
      'sr-Cyrl-CS',
      'sr-Cyrl-ME',
      'sr-Cyrl-RS',
      'sr-Latn-BA',
      'sr-Latn-CS',
      'sr-Latn-ME',
      'sr-Latn-RS',
      'sv-FI',
      'sv-SE',
      'sw-KE',
      'syr-SY',
      'ta-IN',
      'te-IN',
      'tg-Cyrl-TJ',
      'th-TH',
      'tk-TM',
      'tn-ZA',
      'tr-TR',
      'tt-RU',
      'tzm-Latn-DZ',
      'ug-CN',
      'uk-UA',
      'ur-PK',
      'uz-Cyrl-UZ',
      'uz-Latn-UZ',
      'vi-VN',
      'wo-SN',
      'xh-ZA',
      'yo-NG',
      'zh-CN',
      'zh-HK',
      'zh-MO',
      'zh-SG',
      'zh-TW',
      'zu-ZA',
    ],
  },
  currency: {
    type: 'select',
    initial: 'EUR',
    options: [
      'AFN',
      'EUR',
      'ALL',
      'DZD',
      'USD',
      'AOA',
      'XCD',
      'ARS',
      'AMD',
      'AWG',
      'AUD',
      'AZN',
      'BSD',
      'BHD',
      'BDT',
      'BBD',
      'BYN',
      'BZD',
      'XOF',
      'BMD',
      'INR',
      'BTN',
      'BOB',
      'BOV',
      'BAM',
      'BWP',
      'NOK',
      'BRL',
      'BND',
      'BGN',
      'BIF',
      'CVE',
      'KHR',
      'XAF',
      'CAD',
      'KYD',
      'CLP',
      'CLF',
      'CNY',
      'COP',
      'COU',
      'KMF',
      'CDF',
      'NZD',
      'CRC',
      'HRK',
      'CUP',
      'CUC',
      'ANG',
      'CZK',
      'DKK',
      'DJF',
      'DOP',
      'EGP',
      'SVC',
      'ERN',
      'ETB',
      'FKP',
      'FJD',
      'XPF',
      'GMD',
      'GEL',
      'GHS',
      'GIP',
      'GTQ',
      'GBP',
      'GNF',
      'GYD',
      'HTG',
      'HNL',
      'HKD',
      'HUF',
      'ISK',
      'IDR',
      'XDR',
      'IRR',
      'IQD',
      'ILS',
      'JMD',
      'JPY',
      'JOD',
      'KZT',
      'KES',
      'KPW',
      'KRW',
      'KWD',
      'KGS',
      'LAK',
      'LBP',
      'LSL',
      'ZAR',
      'LRD',
      'LYD',
      'CHF',
      'MOP',
      'MKD',
      'MGA',
      'MWK',
      'MYR',
      'MVR',
      'MRU',
      'MUR',
      'XUA',
      'MXN',
      'MXV',
      'MDL',
      'MNT',
      'MAD',
      'MZN',
      'MMK',
      'NAD',
      'NPR',
      'NIO',
      'NGN',
      'OMR',
      'PKR',
      'PAB',
      'PGK',
      'PYG',
      'PEN',
      'PHP',
      'PLN',
      'QAR',
      'RON',
      'RUB',
      'RWF',
      'SHP',
      'WST',
      'STN',
      'SAR',
      'RSD',
      'SCR',
      'SLL',
      'SGD',
      'XSU',
      'SBD',
      'SOS',
      'SSP',
      'LKR',
      'SDG',
      'SRD',
      'SZL',
      'SEK',
      'CHE',
      'CHW',
      'SYP',
      'TWD',
      'TJS',
      'TZS',
      'THB',
      'TOP',
      'TTD',
      'TND',
      'TRY',
      'TMT',
      'UGX',
      'UAH',
      'AED',
      'USN',
      'UYU',
      'UYI',
      'UYW',
      'UZS',
      'VUV',
      'VES',
      'VND',
      'YER',
      'ZMW',
      'ZWL',
    ],
  },
}
