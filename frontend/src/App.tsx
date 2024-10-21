import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PageHowToGet } from './pages/PageHowToGet';
import { PageAlreadyPlayed } from './pages/PageAlreadyPlayed';
import { PageTemplateMinorAge } from './pages/PageTemplateMinorAge';
import { PageNotFound } from './pages/PageNotFound';
import PageTermsAndConditions from './pages/PageTermsAndConditions';
import { PageHome } from './pages/PageHome'
/* import { Test } from './pages/Test'; */
function App() {
  return (
    <main className='textGothamMedium'>
      <Router>
        <Routes>
          <Route path='/' element={<PageHome />} />
          <Route path='/minorAge' element={<PageTemplateMinorAge />} />
          <Route path='/howToGet' element={<PageHowToGet />} />
          <Route path='/AlreadyPlayed' element={<PageAlreadyPlayed />} />
          <Route path='/terms' element={<PageTermsAndConditions />} />
          {/* <Route path='/test' element={<Test />} /> */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </main>

  );
}

export default App;
