import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import routes from "./config/routes"

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        { routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        )) }
      </Routes>
    </BrowserRouter>
  )
}

export default App
