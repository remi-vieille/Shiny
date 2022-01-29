import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, SurveyProvider } from './utils/context'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Header from './components/Header'
import Error from './components/Error'
import Footer from './components/Footer'
import GlobalStyle from './utils/styles/GlobalStyle'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/survey/:questionNumber" element={<Survey />}></Route>
            <Route path="/results" element={<Results />}></Route>
            <Route path="/freelances" element={<Freelances />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
