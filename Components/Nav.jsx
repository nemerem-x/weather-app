import { useState, useRef } from 'react'
import '../src/App.css'
import Logo from '/weatherapplogo.png'
import Logo_light from '/weatherapplogolight.png'
import appTheme from '../src/recoil/themeAtom'
import { useRecoilValue } from 'recoil'
import { useRecoilState } from 'recoil'

function Nav({ handleOnChange, handleOnSubmit, coordinates, searchResult }) {

  const theme = useRecoilValue(appTheme)
  const [_, setTheme] = useRecoilState(appTheme);

  const onClick = (event) => {
    setTheme(oldTheme => !oldTheme);
  };

  const [selected, setselected] = useState("")
  const inputField = useRef(null)

  const select = (e) => {
    setselected(e.target.textContent)
    inputField.current.value = ""
  }

  const searchresults = searchResult.map(result => {
    return (
      <h4
        className={`p-6 cursor-pointer last:border-none border-b-[1px] first:rounded-t-xl last:rounded-b-xl   ${theme ? "border-gray-600 hover:bg-slate-800 text-gray-50" : "border-gray-300 hover:bg-slate-800 hover:text-gray-50"}`}
        onTouchEnd={(e) => handleOnSubmit(e, selected)}
        onMouseUp={(e) => handleOnSubmit(e, selected)}
        onTouchStart={select}
        onMouseDown={select}
        key={result.id}>{result.city}, {result.countryCode}
      </h4>
    )
  })

  return (
    <>
      <div className='flex m-auto max-w-[150px] md:hidden w-full justify-center mt-4 mb-8'><img src={theme ? Logo_light : Logo} alt="logo" /></div>
      <div className="relative w-full pt-2">
        <div className="flex items-center justify-center md:justify-between m-auto h-12 ">
          <img className='max-w-[150px] hidden md:block' src={theme ? Logo_light : Logo} alt="logo" />

          <div className='relative flex items-center h-10 w-80'>
            <input
              className='absolute w-full rounded-3xl py-3 px-4 text-sm border-white border-2 focus:border-gray-900 focus:outline-none'
              ref={inputField}
              autoComplete='off'
              style={{ backgroundColor: coordinates === undefined ? "#ffdfdf" : '', border: coordinates === undefined ? "2px solid #ffa8a8" : "" }}
              name='searchQuery' onChange={(e) => handleOnChange(e)}
              type="text"
              placeholder='Search city'
            />
            <button className='absolute py-2 px-4 bg-gray-900 text-white rounded-3xl right-2 text-xs hover:bg-gray-600' 
              onClick={handleOnSubmit} 
              type="submit">
              Search
            </button>
          </div>

          <div className="mx-6 cursor-pointer">
            <svg onClick={onClick} width="25" height="25" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 32C19.2333 32 16.8753 31.0247 14.926 29.074C12.9753 27.1247 12 24.7667 12 22C12 19.2333 12.9753 16.8747 14.926 14.924C16.8753 12.9747 19.2333 12 22 12C24.7667 12 27.1253 12.9747 29.076 14.924C31.0253 16.8747 32 19.2333 32 22C32 24.7667 31.0253 27.1247 29.076 29.074C27.1253 31.0247 24.7667 32 22 32ZM2 24C1.43333 24 0.958667 23.808 0.576 23.424C0.192 23.0413 0 22.5667 0 22C0 21.4333 0.192 20.958 0.576 20.574C0.958667 20.1913 1.43333 20 2 20H6C6.56667 20 7.042 20.1913 7.426 20.574C7.80867 20.958 8 21.4333 8 22C8 22.5667 7.80867 23.0413 7.426 23.424C7.042 23.808 6.56667 24 6 24H2ZM38 24C37.4333 24 36.9587 23.808 36.576 23.424C36.192 23.0413 36 22.5667 36 22C36 21.4333 36.192 20.958 36.576 20.574C36.9587 20.1913 37.4333 20 38 20H42C42.5667 20 43.0413 20.1913 43.424 20.574C43.808 20.958 44 21.4333 44 22C44 22.5667 43.808 23.0413 43.424 23.424C43.0413 23.808 42.5667 24 42 24H38ZM22 8C21.4333 8 20.9587 7.808 20.576 7.424C20.192 7.04134 20 6.56667 20 6V2C20 1.43333 20.192 0.958 20.576 0.574C20.9587 0.191333 21.4333 0 22 0C22.5667 0 23.042 0.191333 23.426 0.574C23.8087 0.958 24 1.43333 24 2V6C24 6.56667 23.8087 7.04134 23.426 7.424C23.042 7.808 22.5667 8 22 8ZM22 44C21.4333 44 20.9587 43.808 20.576 43.424C20.192 43.0413 20 42.5667 20 42V38C20 37.4333 20.192 36.9587 20.576 36.576C20.9587 36.192 21.4333 36 22 36C22.5667 36 23.042 36.192 23.426 36.576C23.8087 36.9587 24 37.4333 24 38V42C24 42.5667 23.8087 43.0413 23.426 43.424C23.042 43.808 22.5667 44 22 44ZM9.3 12.1L7.15 10C6.75 9.63334 6.558 9.16667 6.574 8.6C6.59134 8.03334 6.78334 7.55 7.15 7.15C7.55 6.75 8.03334 6.55 8.6 6.55C9.16667 6.55 9.63334 6.75 10 7.15L12.1 9.3C12.4667 9.7 12.65 10.1667 12.65 10.7C12.65 11.2333 12.4667 11.7 12.1 12.1C11.7333 12.5 11.2753 12.6913 10.726 12.674C10.1753 12.658 9.7 12.4667 9.3 12.1V12.1ZM34 36.85L31.9 34.7C31.5333 34.3 31.35 33.8253 31.35 33.276C31.35 32.7253 31.5333 32.2667 31.9 31.9C32.2667 31.5 32.7253 31.3087 33.276 31.326C33.8253 31.342 34.3 31.5333 34.7 31.9L36.85 34C37.25 34.3667 37.442 34.8333 37.426 35.4C37.4087 35.9667 37.2167 36.45 36.85 36.85C36.45 37.25 35.9667 37.45 35.4 37.45C34.8333 37.45 34.3667 37.25 34 36.85ZM31.9 12.1C31.5 11.7333 31.3087 11.2747 31.326 10.724C31.342 10.1747 31.5333 9.7 31.9 9.3L34 7.15C34.3667 6.75 34.8333 6.558 35.4 6.574C35.9667 6.59134 36.45 6.78334 36.85 7.15C37.25 7.55 37.45 8.03334 37.45 8.6C37.45 9.16667 37.25 9.63334 36.85 10L34.7 12.1C34.3 12.4667 33.8333 12.65 33.3 12.65C32.7667 12.65 32.3 12.4667 31.9 12.1V12.1ZM7.15 36.85C6.75 36.45 6.55 35.9667 6.55 35.4C6.55 34.8333 6.75 34.3667 7.15 34L9.3 31.9C9.7 31.5333 10.1753 31.35 10.726 31.35C11.2753 31.35 11.7333 31.5333 12.1 31.9C12.5 32.2667 12.692 32.7253 12.676 33.276C12.6587 33.8253 12.4667 34.3 12.1 34.7L10 36.85C9.63334 37.25 9.16667 37.4413 8.6 37.424C8.03334 37.408 7.55 37.2167 7.15 36.85Z" 
              fill={theme ? "#fff" : "#222222"} />
            </svg>
          </div>
        </div>

        <div className={`${searchResult.length ? "block" : "hidden"} absolute h-auto w-80 ${theme ? "bg-slate-700" : "bg-gray-200"}  z-10 rounded-2xl left-[45%] md:left-[53%] translate-x-[-50%] border-2 ${theme ? "border-slate-700" : "border-gray-200"} drop-shadow-xl`}>
          <div>
            {searchresults}
          </div>
        </div>

      </div>
    </>
  )
}

export default Nav
