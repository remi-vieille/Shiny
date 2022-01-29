import { createContext, useState } from 'react'

//on initialise notre Contexte pour le thème
export const ThemeContext = createContext()

// on utilise ensuite ThemeContext
// on créeé un composant qui nous permet de wrapper notre composant parent
// avec notre Provider
export const ThemeProvider = ({ children }) => {
  // Le state de theme  et sa fonction pour le modifier
  // sont passés dans les values
  // ainsi, tous les composants enfants qui se retrouvent englobés par le Provider
  // vont pouvoir accéder à theme  et setTheme
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const SurveyContext = createContext()

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({})
  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers })
  }

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  )
}
