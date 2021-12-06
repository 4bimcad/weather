import React, { useState } from 'react'
import Head from './head'


const dateBuilder = (d) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const day = days[d.getDay()]
  const date = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()

  return `${day}, ${date} ${month} ${year}`
}


const Dummy = () => {

const api = {
  key: '6f66993e659943ccd39dc55d0ab946ba',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const [query, setQuery] = useState('')
const [weather, setWeather] = useState({})


const search = (evt) => {
  if (evt.key === 'Enter') {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setWeather(result)
        setQuery('')
      })
  }
}


  return (
    <div>
      <Head title="Hello" />
      <div className="app">
        <main>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main !== 'undefined' ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}ºC</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ''
          )}
        </main>
      </div>
    </div>
  )
}

export default Dummy
