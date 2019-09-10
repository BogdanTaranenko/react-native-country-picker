import { countries as rawCountries } from 'countries-list'
export { default as SearchIcon } from './assets/images/SearchIcon/searchIcon.png';

const formattedCountries = Object.keys(rawCountries)
  .map(country => {
    return {
      ...rawCountries[country],
      code: country
    }
  })
  .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

export { formattedCountries as countries }
