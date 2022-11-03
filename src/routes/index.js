import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Layout from '../components/layout'
import HomePage from '../pages/home'
import DetailPage from '../pages/detail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='detail'>
            <Route index path=':activityId' element={<DetailPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  