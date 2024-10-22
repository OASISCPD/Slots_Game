import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import { MinorAge } from './components/minorAge/MinorAge';
import { domain } from './content/content';

function App() {

  return (
    <div className="gothamMedium">
      <Router>
        <Routes>
          <Route path='/' element={<Home domain={domain} />} />
          <Route path='/minorAge' element={<MinorAge domain={domain} />} />
        </Routes>
      </Router>
    </div >
  )
}

export default App;
