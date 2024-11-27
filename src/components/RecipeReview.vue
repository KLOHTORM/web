<template>
    <div class="recipe-review">
      <!-- Название рецепта -->
      <div class="recipe-header">
        <h1>{{ recipe.name }}</h1>
        <p class="recipe-description">{{ recipe.description }}</p>
      </div>
  
      <!-- Список ингредиентов -->
      <div v-if="recipe.ingredients && recipe.ingredients.length" class="ingredients-section">
        <h2>Компоненты</h2>
        <ul class="ingredients-list">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient-item">
            <strong>{{ ingredient.name }}</strong>: 
            {{ ingredient.quantity }} {{ ingredient.unit }}
          </li>
        </ul>
      </div>
  
      <div class="back-link">
  <router-link to="/recipes" class="button-link">Вернуться к рецептурам</router-link>
</div>

    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  export default {
    name: "RecipeReview",
    setup() {
      const recipe = ref({});
      const route = useRoute();
  
      const loadRecipeData = async (recipeId) => {
        try {
          const response = await axios.get(`/api/recipes/${recipeId}/with-ingredients`);
          console.log("Ответ от сервера:", response.data);
          recipe.value = response.data;
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
          recipe.value = { name: "Ошибка загрузки", description: "", ingredients: [] };
        }
      };
  
      onMounted(() => {
        const recipeId = route.params.id;
        if (recipeId) {
          loadRecipeData(recipeId);
        } else {
          console.error("ID рецепта отсутствует");
        }
      });
  
      watch(
        () => route.params.id,
        (newId) => {
          loadRecipeData(newId);
        }
      );
  
      return {
        recipe,
      };
    },
  };
  </script>
  
  <style scoped>
  .recipe-review {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: "Arial", sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .recipe-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .recipe-header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    color: #444;
  }
  
  .recipe-description {
    font-size: 1.2em;
    color: #666;
  }
  
  .ingredients-section h2 {
    font-size: 1.8em;
    margin-bottom: 15px;
    color: #444;
  }
  
  .ingredients-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .ingredient-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #fff;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .ingredient-item strong {
    font-weight: bold;
    color: #333;
  }
  
  .back-link {
    text-align: center;
    margin-top: 20px;
  }

  .button-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s, transform 0.2s;
}

.button-link:hover {
  background-color: #218838;
  transform: scale(1.05); /* Легкое увеличение при наведении */
}

.button-link:active {
  background-color: #1e7e34;
  transform: scale(0.95); /* Легкое сжатие при клике */
}
  
  router-link {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
  }
  
  router-link:hover {
    text-decoration: underline;
    color: #0056b3;
  }
  </style>
