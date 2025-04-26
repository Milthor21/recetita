import { useParams } from "react-router";
import { useFetchData } from "../hooks/useFetchData";
import { Recipe } from "../types/Recipe";

interface ApiDetailResponse {
  recipe: Recipe;
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetchData<ApiDetailResponse>(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );

  if (loading) return <div className="p-4">Cargando receta...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  const recipe = data?.recipe;

  return (
    <div className="p-6 center shadow-md rounded-lg flex flex-col items-center">
      
      <h1 className="text-2xl font-bold mb-4">{recipe?.title}</h1>
      <img src={recipe?.image_url} alt={recipe?.title} className="w-full max-w-md mb-4" />
      <p className="text-lg">Publicado por: {recipe?.publisher}</p>
      <a
        href={recipe?.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mt-4 inline-block"
      >
        Ver receta completa
      </a>
    </div>
  );
};

export default RecipeDetail;
