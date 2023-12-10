import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NotesState from "./context/notes/notesState"
import Home from "./pages/Home"
import Header from "./components/Header"
import ThemeState from "./context/theme/themeState"

function App() {
  useEffect(() => {
    getTheme();
  }, [])

  const getTheme = () => {
    const u = localStorage.getItem('cwl-theme') ? localStorage.getItem('cwl-theme') : '{"theme":"light"}';
    const parsed = JSON.parse(u);
    const theme = parsed['theme'];

    if (theme === 'light') {
      document.body.style.background = 'white';
    } else if (theme === 'dark') {
      document.body.style.background = '#343a40';
    }
  }
  return (
    <ThemeState>
      <NotesState>
        <Router>
          <Header title={"iNotebook"} search={false} getTheme={getTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </NotesState>
    </ThemeState>
  )
}

export default App
