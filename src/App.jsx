import { Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"


function App() {

  return (
    <>
    <Routes>
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
    </>
  )
}

export default App
