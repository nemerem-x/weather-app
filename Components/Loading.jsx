import '../src/App.css'
import appTheme from '../src/recoil/themeAtom'
import { useRecoilValue } from 'recoil'

function Loading() {

  const theme = useRecoilValue(appTheme)

  return (
    <div className={`animate-pulse ${theme ? "dark" : ""}`}>
      <div className={`flex justify-center items-center max-w-[50em] h-[14em] my-8 rounded-[40px] m-auto ${theme ? "bg-slate-700" : "bg-gray-300"}`}>
        <p className={`${theme ? "text-gray-400" : "text-gray-600"}`}>Search city to see forecast.</p>
      </div>
    </div>
  )
}

export default Loading
