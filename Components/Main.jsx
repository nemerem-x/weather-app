import '../src/App.css'
import WeatherIconSun from '/sun.png'
import WeatherIconRain from '/rain.png'
import WeatherIconCloud from '/cloud.png'
import WeatherIconSnow from '/snow.png'
import WeatherIconThunderStorm from '/thunderstorm.png'
import { useState, useEffect } from 'react'
import Loading from '../Components/Loading'
import appTheme from '../src/recoil/themeAtom'
import { useRecoilValue } from 'recoil'

function Main({coordinates}) {

  const theme = useRecoilValue(appTheme)

  const [currentWeather, setCurrentWeather] = useState(null)
  const [weatherIcon, setweatherIcon] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [unit, setUnit] = useState(false)

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
          setweatherIcon( {icon: WeatherIconRain, style: "to-purple-400"})
        } else if (data.weather[0].main.toLowerCase() == "clouds"){
          setweatherIcon( {icon: WeatherIconCloud, style: "to-gray-400"})
        } else if (data.weather[0].main.toLowerCase() == "snow"){
          setweatherIcon( {icon: WeatherIconSnow, style: "to-emerald-400"})
        } else if (data.weather[0].main.toLowerCase() == "thunderstorm"){
          setweatherIcon( {icon: WeatherIconThunderStorm, style: "to-red-600"})
        }else{
          setweatherIcon( {icon: WeatherIconSun, style: "to-yellow-400"})
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
        <div className={`relative flex box-border flex-col items-center max-w-[50em] h-56 rounded-[40px] mt-12 mb-6 mx-auto pt-8 pb-12 px-16 shadow-lg 
        ${theme ? `bg-gradient-to-r from-slate-800 via-slate-800 ${weatherIcon.style}` : `bg-gradient-to-r from-gray-200 via-gray-200 ${weatherIcon.style}`}`}>
              
              <div className="flex items-center justify-between w-full h-full">
                <div className='flex'>
                  <div className=' min-w-[7.2em]'>
                    <h1 className={`${theme ? "text-white" : "text-slate-800"} `}>
                      {
                        unit &&
                        currentWeather.main.temp.toFixed(0)
                      } 
                      {
                        !unit &&
                        (currentWeather.main.temp * 1.8 + 32).toFixed(0)
                      } 
                    </h1>
                    <p className={`${theme ? "text-white" : "text-slate-800"}`}>
                      {currentWeather.name}, {currentWeather.sys.country}
                    </p>
                  </div>
                  <div className='flex mt-2 gap-1'>
                    <p onClick={()=>setUnit(true)} className={`${unit && `font-bold ${theme ? "text-white" : "text-black"}`} cursor-pointer`}>&deg;C</p>
                    <p>|</p>
                    <p onClick={()=>setUnit(false)} className={`${!unit && `font-bold ${theme ? "text-white" : "text-black"}`} cursor-pointer`}>&deg;F</p>
                  </div>
                </div>
    
                <img className='max-w-[15%]' src={weatherIcon ? weatherIcon.icon : WeatherIconSun} alt="weather" />
              </div>
    
              <div className="flex items-center gap-1 absolute bottom-4">
                <div className="h-2 w-2 rounded-full bg-gray-600 cursor-pointer"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 cursor-pointer"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 cursor-pointer"></div>
              </div>
        </div>
        :
        <Loading/>
      }
    </>
  )
}

export default Main
