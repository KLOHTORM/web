<template>
  <div class="recipe-review">
    <!-- Название рецепта -->
    <h1>{{ recipe.name }}</h1>

    <!-- Описание рецепта -->
    <p>{{ recipe.description }}</p>

    Список ингредиентов
    <div v-if="ingredients.length">
      <h2>Ингредиенты</h2>
      <ul>
        <li v-for="ingredient in ingredients" :key="ingredient.id">
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
    const ingredients = ref([]);
    const route = useRoute();

    // Функция для загрузки данных рецепта
    const loadRecipeData = async (recipeId) => {
      try {
        // Проверяем, что ID передан корректно
        console.log("Загружаем рецепт с ID:", recipeId);

        const recipeResponse = await axios.get(`/api/recipes/${recipeId}`);
        console.log("Ответ с данными рецепта:", recipeResponse.data);  // Отладка
        recipe.value = recipeResponse.data;

        const ingredientsResponse = await axios.get(`/api/recipe_ingredients/${recipeId}`);
        console.log("Ответ с ингредиентами:", ingredientsResponse.data);  // Отладка
        ingredients.value = ingredientsResponse.data;
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        recipe.value = { name: "Ошибка загрузки", description: "" };
        ingredients.value = [];
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
      ingredients,
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
