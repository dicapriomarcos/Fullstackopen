import axios from 'axios'

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {

    const request = axios.get(countriesUrl)

    return request.then(response => {
      return response.data
    })

}

const getCityWeather = (cityName) => {

    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)

  return request
}

export default { getAll, getCityWeather }