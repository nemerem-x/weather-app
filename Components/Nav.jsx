import { useState, useRef } from 'react'
import '../src/App.css'
import Logo from '/weatherapplogo.png'
import DarkMode from '/darkmode.png'

function Nav({handleOnChange, handleOnSubmit, coordinates, searchResult}) {

  const [selected, setselected] = useState("")
  const inputField = useRef(null)

  const select = (e) => {
    setselected(e.target.textContent)
    inputField.current.value = ""
  }

  // console.log(searchResult)

  const searchresults = searchResult.map(result => {
    return (
      <h4 
        onTouchEnd={(e)=>handleOnSubmit(e, selected)}
        onMouseUp={(e)=>handleOnSubmit(e, selected)}
        onTouchStart={select}
        onMouseDown={select}
        key={result.id}>{result.city}, {result.countryCode}
      </h4>
    )
  })

  return (
    <>
      <div className="logoMobile"><img src={Logo} alt="logo" /></div>
      <div className="nav">
          <div className="navbar">
              <img src={Logo} alt="logo" />

              <form>
                <input 
                  ref={inputField}
                  autoComplete='off'
                  style={{backgroundColor: coordinates === undefined ? "#ffdfdf" : '', border: coordinates === undefined ? "2px solid #ffa8a8" : ""}} 
                  name='searchQuery' onChange={(e) => handleOnChange(e)} 
                  type="text"
                  placeholder='Search city'
                />
                <button onClick={handleOnSubmit} type="submit">Search</button>
              </form>

              <div className="mode">
                <img id='darkmode' src={DarkMode} alt="darkmode" />
              </div>
          </div>

          <div className={searchResult.length ? "searchResults active" : "searchResults"}>
            <div className="result">
              {searchresults}
            </div>
          </div>

      </div>
    </>
  )
}

export default Nav
