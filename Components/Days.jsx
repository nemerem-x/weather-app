import { useState, useEffect } from 'react'
import WeatherIconSunSmall from '/sun-small.png'
import WeatherIconRainSmall from '/rain-small.png'
import WeatherIconCloudSmall from '/cloud-small.png'
import WeatherIconSnowSmall from '/snow-small.png'
import WeatherIconThunderStormSmall from '/thunderstorm-small.png'
import appTheme from '../src/recoil/themeAtom'
import { useRecoilValue } from 'recoil'
import Loading from './Loading'
import '../src/App.css'

function Days({ coordinates }) {

  const theme = useRecoilValue(appTheme)

  const [currentWeather, setCurrentWeather] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  useEffect(() => {
    if (coordinates) {
      const { lon, lat } = coordinates
      setLatitude(lat)
      setLongitude(lon)
    }
  }, [coordinates])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=37bfb4e0565fd074a0c0346aa9373a99`)
        const data = await res.json()
        setCurrentWeather(data)

      } catch (error) {
        console.log(error)
      }
    }
    if (latitude && longitude) {
      fetchData()
    }
  }, [latitude || longitude])


  const name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const fourDaysWeather = () => {

    const days = currentWeather.list.map((item, index) => {
      if (index == 22 || index == 7 || index == 15 || index == 29) {
        return item
      }
    }).filter(ele => ele != undefined).map(item => {

      const date = new Date(item.dt * 1000)

      const theWeatherIcon = () => {
        if (item.weather[0].main.toLowerCase() == "rain") {
          return WeatherIconRainSmall
        } else if (item.weather[0].main.toLowerCase() == "clouds") {
          return WeatherIconCloudSmall
        } else if (item.weather[0].main.toLowerCase() == "snow") {
          return WeatherIconSnowSmall
        } else if (item.weather[0].main.toLowerCase() == "thunderstorm") {
          return WeatherIconThunderStormSmall
        } else {
          return WeatherIconSunSmall
        }
      }

      return (
        <div key={item.dt} className="flex flex-col items-center gap-2 justify-center md:flex-row">
          <img className='h-full w-12' src={theWeatherIcon()} alt="weather" />
          <div className="info">
            <h3 className={`${theme ? "text-white" : "text-slate-800"}`}>
              {parseInt(item.main.temp)}<span>&deg;</span>
            </h3>
            <p>
              {name[date.getDay()]} {date.getDate()}
            </p>
          </div>
        </div>
      )
    })
    return days
  }

  return (
    <>
      {currentWeather
        ?
        <div className={`relative flex items-center justify-between gap-4 max-w-3xl 
        h-auto my-8 rounded-[40px] m-auto p-12 ${theme ? "bg-slate-700/30" : 'bg-gray-100'}`}>

          {fourDaysWeather()}

        </div>
        :
        <Loading />
      }
    </>
  )
}

export default Days
