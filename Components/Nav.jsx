import '../src/App.css'
import Logo from '/weatherapplogo.png'
import DarkMode from '/darkmode.png'

function Nav({handleOnChange, handleOnSubmit, coordinates}) {

  return (
    <>
      <div className="logoMobile"><img src={Logo} alt="logo" /></div>
      <div className="nav">
          <div className="navbar">
              <img src={Logo} alt="logo" />
              <form>
                <input 
                  style={{backgroundColor: coordinates === undefined ? "#ffdfdf" : '', border: coordinates === undefined ? "2px solid #ffa8a8" : ""}} 
                  name='searchQuery' onChange={(e) => handleOnChange(e)} 
                  type="text" 
                  placeholder='Search city' />

                <button onClick={handleOnSubmit} type="submit">Search</button>
              </form>
              <div className="mode">
                <img id='darkmode' src={DarkMode} alt="darkmode" />
              </div>
          </div>
      </div>
    </>
  )
}

export default Nav
