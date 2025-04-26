import { useFetchData } from "../hooks/useFetchData";
import RecipeCard from "../components/RecipeCard";
import { Recipe } from "../types/Recipe";
import { useEffect, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import FilterPanel from "../components/FilterPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

interface ApiResponse {
  recipes: Recipe[];
}

const HomePage = () => {
  const notify = useNotification();
  const { data, loading, error } = useFetchData<ApiResponse>(
    "https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza"
  );

  console.log(data);
  const [favorites, setFavorites] = useState<Recipe[]>(JSON.parse(localStorage.getItem("favorites") || "[]"));

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Guardar favoritos en localStorage solo cuando cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Alternar favoritos
  const toggleFavorite = (recipe: Recipe) => {
    const exists = favorites.some(item => item.id === recipe.id);
    if (!exists) {
      setFavorites(prev => [...prev, recipe]);
      notify("Receta agregada a favoritos", "success");
      console.log(notify);
      
    }
    else {
      setFavorites(prev => prev.filter(item => item.id !== recipe.id));
      notify("Receta removida de favoritos", "error");
      console.log(notify);
    }
  };

  if (loading) return <div className="p-4">Cargando recetas...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (data && data.recipes.length === 0)
    return <div className="p-4">No se encontraron recetas.</div>;

  const allFilters = Array.from(new Set(data?.recipes.map((r) => r.publisher)));

  // Filtrar recetas con base en los filtros activos
  const filteredRecipes = activeFilters.length
    ? data?.recipes.filter((r) => activeFilters.includes(r.publisher))
    : data?.recipes;

  return (
    <div className="p-6">
      <FilterPanel
        filters={allFilters}
        activeFilters={activeFilters} // Pasar activeFilters aquí
        onFilterChange={(filter) => {
          setActiveFilters((prev) =>
            prev.includes(filter)
              ? prev.filter((f) => f !== filter)
              : [...prev, filter]
          );
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.some(item => item.id === recipe.id)}
            onToggleFavorite={() => toggleFavorite(recipe)}
          />
        ))}
      </div>
      
    
    <ToastContainer />
    </div>
  );
};

export default HomePage;
