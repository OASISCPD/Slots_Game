import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import { MinorAge } from './components/minorAge/MinorAge';
import { domain } from './content/content';
import { HowToGet } from './components/howToGet/HowToGet';
import { AlreadyPlayed } from './components/played/AlreadyPlayed';
import { Terms } from './components/terms/Terms';

function App() {
  return (
    <div className="gothamMedium">
      <Router>
        <Routes>
          <Route path='/' element={<Home domain={domain} />} />
          <Route path='/minorAge' element={<MinorAge domain={domain} />} />
          <Route path='/howToGet' element={<HowToGet domain={domain} />} />
          <Route path='/alreadyPlayed' element={<AlreadyPlayed domain={domain} />} />
          <Route path='/terms' element={<Terms domain={domain} />} />
         {/*  <Route path='/test' element={<Home domain={domain} />} /> */}
        </Routes>
      </Router>
    </div >
  )
}

export default App;
