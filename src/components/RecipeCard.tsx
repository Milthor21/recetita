import { Link } from "react-router";
import { Recipe } from "../types/Recipe";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) => {

  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.image_url} alt={recipe.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
          <p className="text-sm text-gray-600">{recipe.publisher}</p>
        </div>
      </Link>
      <div className="p-4 border-t">
        <button
          onClick={() => onToggleFavorite(recipe.id)}
          className={`text-sm font-medium ${isFavorite ? "text-red-600" : "text-blue-600"}`}
        >
          {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
