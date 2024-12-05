import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { domain } from './content/content';
import { MinorAge } from './components/minorAge/MinorAge';
import { HowToGet } from './components/howToGet/HowToGet';
import { AlreadyPlayed } from './components/played/AlreadyPlayed';
import { Terms } from './components/terms/Terms';
import { RedirectByResolution } from './components/logic/RedirectWithResolution';
/* import { Test } from './components/test/TemplateTest'; */
function App() {

  return (
    <div className="gothamMedium">
      <Router>
        <Routes>
          <Route path='/' element={<RedirectByResolution domain={domain} />} />
          <Route path='/minorAge' element={<MinorAge domain={domain} />} />
          <Route path='/howToGet' element={<HowToGet domain={domain} />} />
          <Route path='/alreadyPlayed' element={<AlreadyPlayed domain={domain} />} />
          <Route path='/terms' element={<Terms domain={domain} />} />
          {/* <Route path='/test' element={<Test />} /> */}
        </Routes>
      </Router>
    </div >
  )
}

export default App

