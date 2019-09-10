import { countries as rawCountries } from 'countries-list'
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

export { formattedCountries as countries }
