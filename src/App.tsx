import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import routes from "./config/routes"

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ firstName, setFirstName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ token, setToken ] = useState("")

  useEffect(() => {
      if(localStorage.getItem('cookie_token')) {
        setLoggedIn(true)
        setFirstName(localStorage.getItem('first_name') || "")
        setEmail(localStorage.getItem('email') || "")
        setToken(localStorage.getItem('cookie_token') || "")
      }
  }, [])

  return (
    <BrowserRouter>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} firstName={firstName} email={email} token={token}/>
      <Routes>
        { routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component loggedIn={loggedIn} setLoggedIn={setLoggedIn} firstName={firstName} email={email} token={token} setFirstName={setFirstName}/>}
          />
        )) }
      </Routes>
    </BrowserRouter>
  )
}

export default App
