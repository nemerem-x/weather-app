import { useState, useEffect } from 'react'
import Nav from '../Components/Nav'
import Main from '../Components/Main'
import Days from '../Components/Days'
import './App.css'
import AddButton from '/addbtn.png'
import Logo from '/weatherapplogo.png'
import Logo_light from '/weatherapplogolight.png'
import appTheme from './recoil/themeAtom'
import { useRecoilValue } from 'recoil'

function App() {

  const theme = useRecoilValue(appTheme)

  // const root = document.querySelector(':root');
  // root.style.setProperty('--backgroundColor',  theme ? '#1E293B' : '#f6f6f6');

  const [coordinates, setCoordinates] = useState(null)
  const [searchquery, setSearchquery] = useState(undefined)
  const [searchResult, setSearchResult] = useState([])
  const [city, setCity] = useState("")

  useEffect(() => {
    const city = async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '84cb2be0d9msh250ec78d40daaf3p148eb0jsn39f8064681a6',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }
      try {
        const res = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${searchquery}`, options)
        const data = await res.json()
        setSearchResult(data.data)
      } catch(error) {
        console.log(error)
      }
    }
    city()
  },[searchquery])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=37bfb4e0565fd074a0c0346aa9373a99`)
        const data = await res.json()
        setCoordinates(data.coord)
      } catch(error){
        console.log(error)
      }
    }
    if(searchquery){
      fetchData()
    }
  },[city])

  function debounce(func, timeout = 1000){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func(...args) }, timeout);
    };
  }
  const input = debounce((e)=> 
      setSearchquery(e.target.value ? e.target.value : undefined)
  )

  const submit = (e, selected) => {
    e.preventDefault()
    if(selected){
      setSearchquery(selected)
    }
    setCity(selected || searchquery)
    setSearchResult([])
  }

  return (
    <div className={`h-full w-full py-8 ${theme ? "bg-slate-800" : "bg-gray-200"}`}>
      <div className="py-0 px-12 md:px-16">

        <Nav 
          searchResult={searchResult ? searchResult : []}
          coordinates={coordinates}
          handleOnChange={input}
          handleOnSubmit={submit}
        />

        <Main coordinates={coordinates} />

        <Days coordinates={coordinates} />

      </div> 

      <div className={`flex justify-center items-center gap-15px w-full h-28 ${theme ? "bg-slate-800" : "bg-white"} my-8 mx-auto`}>
        <div className="flex gap-3 px-7.5 items-center m-auto">
          <div><img className='w-12 cursor-pointer' src={AddButton} alt="add" /></div>
          <p>Add your preferred cities here. (coming soon)</p>
        </div>
      </div> 

      <div className="flex gap-10 items-center justify-center py-2">
        <img className='w-28 h-full' src={theme ? Logo_light : Logo} alt="logo" /> <p>Built with React</p>
      </div>
    
    </div>
  )
}

export default App
