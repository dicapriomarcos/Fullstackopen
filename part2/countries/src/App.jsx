import { useState, useEffect } from 'react'
import countriesService from './services/countries.js'


const Search = ({value, handleSearch}) => {
  return (
    <div>
      Find countries: <input name="search-countries" value={value} onChange={handleSearch} />
    </div>
  )
}

const CountryLanguajes = ({languages}) => {

  return(
    <div>
      <h3>Languages</h3>
      <ul>
        {Object.entries(languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>      
    </div>

  )
}

const Weather = ({weather}) => {

    if(!weather){
      return null
    }

    

    return (
      <div>
      <h4>Weather in {weather.name}</h4>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} width="200px" />
      <ul>
        <li><strong>Weather:</strong> {weather.weather[0].description}</li>
        <li><strong>Temperature:</strong> {weather.main.temp} Celcius</li>
        <li><strong>Wind:</strong> {weather.wind.speed} m/s</li>
      </ul>
      </div>
    )

}

const CountryInformation = ({countries}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countries.length > 0) {
      const country = countries[0];
      countriesService.getCityWeather(country.capital)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.warn('Error getting weather data: ', error);
          setWeather(null);
        });
    }
  }, [countries]);

  const country = countries[0]

  return (
    <article>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} />
      <ul>
        <li><strong>Capital:</strong> {country.capital}</li>
        <li><strong>Area:</strong> {country.area}</li>
      </ul>
      <CountryLanguajes languages={country.languages} />
      <Weather weather={weather} />
    </article>
  )

}

const Countries = ({countries, searchCountry, handleShowCountry  }) => {

  if( !countries || countries.length === 0 || !searchCountry ){
    return null
  }else if ( countries.length >= 10){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }else if( countries.length > 1 && countries.length < 10){
    return (
      <CountriesList countries={countries} handleShowCountry={handleShowCountry }  />
    )
  }else{
    return (
        <CountryInformation countries={countries} />  
    )
  }
}

const CountriesList = ({countries, handleShowCountry }) => {

  if(!countries){
    return null
  }else{
    return(
      <ol>
         {countries.map(country => <li key={country.cca2}>{country.name.common} <button onClick={ () => handleShowCountry(country.name.common)}>Show this country</button></li>)}
      </ol>
    )   
  }


}


function App() {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')


  useEffect(() => {

    const allCountries = countriesService.getAll().then( initialCountries => {
      const filteredCountries = initialCountries.filter( country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
      setCountries(filteredCountries)
    }).catch(error => {
      console.warn('Error getting countries data: ', error);
      setCountries([]);
    });

  }, [searchCountry])

  const handleShowCountry = countryName => {
    setSearchCountry(countryName)
  }


  const handleSearch = event => {
    setSearchCountry(event.target.value)

  }

  return (
    <div>
      <h1>Countries</h1>
      <Search value={searchCountry} handleSearch={handleSearch} />
      <Countries countries={countries} searchCountry={searchCountry} handleShowCountry={handleShowCountry } />
    </div>
  )
}

export default App
