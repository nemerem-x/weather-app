import '../src/App.css'
import { motion } from "framer-motion"
import WeatherIconSun from '/sun.png'
import WeatherIconRain from '/rain.png'
import WeatherIconCloud from '/cloud.png'
import WeatherIconSnow from '/snow.png'
import WeatherIconThunderStorm from '/thunderstorm.png'
import { useState, useEffect } from 'react'
import Loading from './Loading'
import appTheme from '../src/recoil/themeAtom'
import { useRecoilValue } from 'recoil'

interface Prop {
  coordinates: { lon: number, lat: number } | null;
}

function Main({ coordinates }: Prop) {

  const theme = useRecoilValue(appTheme)

  const [currentWeather, setCurrentWeather] = useState<any>(null)
  const [weatherIcon, setweatherIcon] = useState<{icon: string, style: string}>(null)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [unit, setUnit] = useState(false)

  const [main1, setMain1] = useState(true)
  const [main2, setMain2] = useState(false)

  useEffect(() => {
    if (coordinates) {
      const { lon, lat } = coordinates
      setLatitude(lat)
      setLongitude(lon)
    }
  }, [coordinates])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_APP_APP_ID}`)
        const data = await res.json()
        setCurrentWeather(data)

        if (data.weather[0].main.toLowerCase() == "rain") {
          setweatherIcon({ icon: WeatherIconRain, style: "to-purple-400" })
        } else if (data.weather[0].main.toLowerCase() == "clouds") {
          setweatherIcon({ icon: WeatherIconCloud, style: "to-gray-400" })
        } else if (data.weather[0].main.toLowerCase() == "snow") {
          setweatherIcon({ icon: WeatherIconSnow, style: "to-emerald-400" })
        } else if (data.weather[0].main.toLowerCase() == "thunderstorm") {
          setweatherIcon({ icon: WeatherIconThunderStorm, style: "to-red-600" })
        } else {
          setweatherIcon({ icon: WeatherIconSun, style: "to-yellow-400" })
        }

      } catch (error) {
        console.log(error)
      }
    }
    if (longitude && latitude) {
      fetchData()
    }
  }, [longitude || latitude])

  return (
    <>
      {
        currentWeather ?
          <div className={`flex flex-col gap-7 overflow-hidden items-center justify-center relative h-[14em] mt-12 mb-6 px-12 mx-auto max-w-[50em] rounded-[40px] ${theme ? `bg-gradient-to-r from-slate-700/30 via-slate-700/30 ${weatherIcon?.style}` : `bg-gradient-to-r from-gray-100 via-gray-200 ${weatherIcon?.style}`}`}>
           
            {main1 &&
              <motion.div
                initial={{opacity: 0}}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragMomentum={false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={
                  (event, info) => {
                    if (info.point.x < 200) {
                      setMain1(false)
                      setMain2(true)
                    }
                  }
                }
                className={`relative flex box-border h-[8em] flex-col items-center w-full rounded-[40px]`}
              >
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
                    <div className='flex mt-2 gap-1 h-fit'>
                      <p onClick={() => setUnit(true)} className={`${unit && `font-bold ${theme ? "text-white" : "text-black"}`} cursor-pointer`}>&deg;C</p>
                      <p>|</p>
                      <p onClick={() => setUnit(false)} className={`${!unit && `font-bold ${theme ? "text-white" : "text-black"}`} cursor-pointer`}>&deg;F</p>
                    </div>
                  </div>

                  <img className='max-w-[15%]' src={weatherIcon ? weatherIcon.icon : WeatherIconSun} alt="weather" />
                </div>
              </motion.div>
            }
            {main2 &&
              <motion.div
                initial={{opacity: 0}}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragMomentum={false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={
                  (event, info) => {
                    if (info.point.x > 300) {
                      setMain1(true)
                      setMain2(false)
                    }
                  }
                }
                className={`relative flex box-border h-[8em] flex-col items-center w-full rounded-[40px]`}
              >
                <div className="flex items-center justify-between w-full h-full">
                  <div className='flex justify-center w-full'>
                    <div className=' min-w-[7.2em]'>
                      <h3 className={`flex flex-wrap justify-center gap-5 md:gap-10 text-sm ${theme ? "text-white" : "text-slate-800"} text-center md:text-lg `}>
                        <p>Speed - {currentWeather.wind.speed}</p>
                        <p>Direction - {currentWeather.wind.deg}&deg;</p>
                        <p>Gust - {currentWeather.wind.gust}</p>
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            }
            <div className="flex items-center gap-1 bottom-4">
              <div onClick={()=>{setMain1(true); setMain2(false)}} className={`h-2 w-2 rounded-full ${main1 ? "bg-gray-600" : "bg-gray-400"} cursor-pointer`}></div>
              <div onClick={()=>{setMain1(false); setMain2(true)}}className={`h-2 w-2 rounded-full ${main2 ? "bg-gray-600" : "bg-gray-400"} cursor-pointer`}></div>
              {/* <div className="h-2 w-2 rounded-full bg-gray-400 cursor-pointer"></div> */}
            </div>
          </div >
          :
          <Loading />
      }
    </>
  )
}

export default Main
