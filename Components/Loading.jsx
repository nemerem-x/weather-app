import '../src/App.css'
import appTheme from '../src/recoil/themeAtom'
import { useRecoilValue } from 'recoil'

function Loading() {

  const theme = useRecoilValue(appTheme)

  return (
    <div className={`loading ${theme ? "dark" : ""}`}>
      <p>Search city to see forecast.</p>
    </div>
  )
}

export default Loading
