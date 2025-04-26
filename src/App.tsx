import { BrowserRouter,Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import RecipeDetail from "./pages/RecipeDetail";
import FavoritesPage from "./pages/FavoritesPage";
import LayoutApp from "./pages/LayoutApp";




function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutApp/>}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoritesPage/>} />
      </Route>
    </Routes>
      
        
    </BrowserRouter>
  )
}

export default App
