import { useState, useEffect } from 'react'
import Nav from '../Components/Nav'
import Main from '../Components/Main'
import Days from '../Components/Days'
import './App.css'
import AddButton from '/addbtn.png'
import Logo from '/logo.png'

function App() {

  const [coordinates, setCoordinates] = useState(null)
  const [searchquery, setSearchquery] = useState(null)
  const [city, setCity] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=37bfb4e0565fd074a0c0346aa9373a99`)
        const data = await res.json()
        setCoordinates(data.coord)
      } catch(error){
        setCoordinates(null)
      }
    }
    if(searchquery){
      fetchData()
    }
  },[city])

  const input = (e) => {
    setSearchquery(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    setCity(searchquery)
  }

  return (
    <>
      <div className="app">

        <Nav coordinates={coordinates} handleOnChange={input} handleOnSubmit={submit}/>

        <Main coordinates={coordinates} />

        <Days coordinates={coordinates} />

      </div> 
    
      <div className="thirddata">
        <div className="container">

          {/* <div className="city">
            <h3>21<span>&deg;</span></h3>
            <img src={SunCloud} alt="weather" />
            <h3>New York</h3>
          </div> */}

          <div className='addButton'><img src={AddButton} alt="add" /></div>
          <p>Add your preferred cities here. (coming soon)</p>
        </div>
      </div> 

      <div className="footer">
        <img src={Logo} alt="logo" /> <p>Built with React</p>
      </div>
    </>
  )
}

export default App
