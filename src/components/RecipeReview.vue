<template>
    <div class="recipe-review">
      <!-- Название рецепта -->
      <h1>{{ recipe.name }}</h1>
  
      <!-- Описание рецепта -->
      <p>{{ recipe.description }}</p>
  
      <!-- Список ингредиентов -->
      <div v-if="recipe.ingredients && recipe.ingredients.length">
        <h2>Ингредиенты</h2>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <strong>{{ ingredient.name }}</strong>: 
            {{ ingredient.quantity }} {{ ingredient.unit }}
          </li>
        </ul>
      </div>
  
      <router-link to="/recipes">Вернуться к списку рецептов</router-link>
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
  
      // Функция для загрузки данных рецепта с ингредиентами
      const loadRecipeData = async (recipeId) => {
        try {
          console.log("Загружаем данные рецепта с ингредиентами для ID:", recipeId);
  
          // Единый запрос на данные рецепта с ингредиентами
          const response = await axios.get(`/api/recipes/${recipeId}/with-ingredients`);
          console.log("Ответ от сервера:", response.data); // Отладка
  
          recipe.value = response.data;
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
          recipe.value = { name: "Ошибка загрузки", description: "", ingredients: [] };
        }
      };
  
      // Загружаем данные при монтировании
      onMounted(() => {
        const recipeId = route.params.id;
        if (recipeId) {
          loadRecipeData(recipeId);
        } else {
          console.error("ID рецепта отсутствует");
        }
      });
  
      // Следим за изменением маршрута и обновляем данные
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
    padding: 20px;
  }
  
  h2 {
    margin-top: 20px;
  }
  
  ul {
    list-style-type: none; /* Убираем стандартные маркеры списка */
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  strong {
    font-weight: bold;
  }
  
  router-link {
    display: block;
    margin-top: 20px;
    text-decoration: none;
    color: #007bff;
  }
  
  router-link:hover {
    text-decoration: underline;
  }
  </style>
  