import { countries as rawCountries } from 'countries-list'
import { uniqBy } from 'lodash'
export { default as SearchIcon } from './assets/images/SearchIcon/searchIcon.png';

const formattedCountries = Object.keys(rawCountries)
  .map(countryCode => {
    const country = rawCountries[countryCode]

    return {
      ...country,
      currency: (country.currency && country.currency.includes(',')) ? country.currency.split(',')[0] : country.currency,
      code: countryCode
    }
  })
  .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))



const filteredCurrencyCountries = formattedCountries.filter(country => {
  if (country.currency === 'GBP') return country.code === 'GB'
  if (country.currency === 'USD') return country.code === 'US'
  if (country.currency === 'NOK') return country.code === 'NO'
  return country.currency
})

const currencyCountries = uniqBy(filteredCurrencyCountries.reduce((memo, country) => {
  if (country.currency === 'EUR') {
    memo.push({
      "code": "EU",
      "name": "Euro",
      "native": "Euro",
      "phone": "00",
      "continent": "EU",
      "currency": "EUR",
      "languages": [
        "eu"
      ],
      "emoji": "🇪🇺",
      "emojiU": "U+1F1EA U+1F1FA"
    })
    return memo;
  }
  memo.push(country)
  return memo
}, []), 'currency')

export { formattedCountries as countries, currencyCountries }
