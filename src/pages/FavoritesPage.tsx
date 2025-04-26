import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard'; // Adjust the path as needed
import { Recipe } from '../types/Recipe';
import { useNotification } from '../hooks/useNotification';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Recipe[]>(JSON.parse(localStorage.getItem("favorites") || "[]"));
  const notify = useNotification();

  useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

  const removeFavorite = (recipe: Recipe) => {
    const exists = favorites.some(item => item.id === recipe.id);
    
    if (exists) {
      setFavorites(prev => prev.filter(item => item.id !== recipe.id));
      notify("Receta removida de favoritos", "error");
    }
  }
/*<div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4 text-center">
                <h1 className="text-2xl font-bold">Recetitas</h1>
                <nav className="mt-2">
                    <a href="/" className="text-white mx-2">Inicio</a>
                    <a href="/favorites" className="text-white mx-2">Favoritos</a>
                </nav>
            </header>
            <main className="flex-grow p-4">
                <Outlet />
            </main>
            <Footer/>   
        </div>*/
    return (
      <><div className="p-6 bg-red-100 text-center">
        <h1 className="text-2xl font-bold">Recetas favoritas 💖</h1>
        <div className="mt-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((recipe: Recipe) => (
            <div key={recipe.id} className="mb-2">
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.some(item => item.id === recipe.id)}
                onToggleFavorite={() => removeFavorite(recipe)} />
            </div>
          ))}
        </div>
      </div><ToastContainer /></>
    )
  
}


export default FavoritesPage;
  