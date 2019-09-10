import countries from './countriesWithCurrency'

  .map(lc => {
    const newCountry = { ...lc }
    const currentCountry = countries.find(country => country.code === lc.code)
    if (currentCountry) return { ...newCountry, currency: currentCountry.currency }
    return newCountry
  })