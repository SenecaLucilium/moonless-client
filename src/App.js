import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Authors from './pages/Authors'
import Catalog from './pages/Catalog'
import Article from './pages/Article'
import NoPage from './pages/NoPage'

import './styles/main.css'

function App () {

  return (
    <div class='main-part'>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/article/:id" element={<Article />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App