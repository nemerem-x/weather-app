import '../src/App.css'
import WeatherIconSun from '/sun.png'
import WeatherIconRain from '/rain.png'
import WeatherIconCloud from '/cloud.png'
import WeatherIconSnow from '/snow.png'
import WeatherIconThunderStorm from '/thunderstorm.png'
import { useState, useEffect } from 'react'
import Loading from '../Components/Loading'

function Main({coordinates}) {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [weatherIcon, setweatherIcon] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  useEffect(()=>{
    if(coordinates){
        const {lon, lat} = coordinates
        setLatitude(lat)
        setLongitude(lon)
    }
  },[coordinates])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  },[])
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=37bfb4e0565fd074a0c0346aa9373a99`)
        const data = await res.json()
        setCurrentWeather(data)
        
        if (data.weather[0].main.toLowerCase() == "rain"){
          setweatherIcon( {icon: WeatherIconRain, style: "linear-gradient(270deg, rgba(106, 16, 252, 0.27) -16.97%, rgba(0, 0, 0, 0) 59.8%), #FFFFFF"})
        } else if (data.weather[0].main.toLowerCase() == "clouds"){
          setweatherIcon( {icon: WeatherIconCloud, style: "linear-gradient(270deg, rgba(51, 51, 51, 0.27) -16.97%, rgba(0, 0, 0, 0) 59.8%), #FFFFFF"})
        } else if (data.weather[0].main.toLowerCase() == "snow"){
          setweatherIcon( {icon: WeatherIconSnow, style: "linear-gradient(270deg, rgba(16, 167, 252, 0.27) -16.97%, rgba(0, 0, 0, 0) 59.8%), #FFFFFF"})
        } else if (data.weather[0].main.toLowerCase() == "thunderstorm"){
          setweatherIcon( {icon: WeatherIconThunderStorm, style: "linear-gradient(270deg, #F80000 -16.97%, rgba(255, 0, 0, 0) 59.8%), #FFFFFF"})
        }else{
          setweatherIcon( {icon: WeatherIconSun, style: "linear-gradient(270deg, rgba(252, 129, 16, 0.27) -16.97%, rgba(0, 0, 0, 0) 59.8%), #FFFFFF"})
        }

      } catch(error){
        console.log(error)
      }
    }
    if(longitude && latitude){
      fetchData()
    }
  },[longitude || latitude])


  return (
    <>
      { currentWeather
        ?
        <div className="maindata" style={{background: weatherIcon ? weatherIcon.style : "none"}}>
              
              <div className="data">
                <div className="data1">
                  <h1>{currentWeather.main.temp.toFixed(0)} <span>&deg;C</span></h1>
                  <p>{currentWeather.name}, {currentWeather.sys.country}</p>
                </div>
    
                <img id='weathericon' src={weatherIcon ? weatherIcon.icon : WeatherIconSun} alt="weather" />
              </div>
    
              <div className="dots">
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
        </div>
        :
        <Loading/>
      }
    </>
  )
}

export default Main
