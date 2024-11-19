<template>
    <div>
      <h2>Рецепты</h2>
      <div v-if="loading">Загрузка...</div>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Действия</th> <!-- Новая колонка для значка изменения -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="recipe in recipes" :key="recipe.id">
              <td>{{ recipe.name }}</td>
              <td>{{ recipe.description }}</td>
              <td>
                <!-- Иконка для редактирования рецепта
                <button @click="editRecipe(recipe.id)" class="edit-button">
                  ✏️ Изменить
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        recipes: [],
        loading: false,
        error: null,
        userGroup: null,
        groupRecipes: [],
      };
    },

    // computed: {
    //   accessibleRecipes() {
    //     const accessibleIds = this.recipes.map((gr) => gr.id_recipe);
    //     return this.recipes.filter((recipe) => accessibleIds.includes(recipe.id));
    //   },
    // },

    methods: {
      async fetchData() {
        try {
          this.loading = true;
  
          // // Получение данных пользователя из localStorage
          // const user = JSON.parse(localStorage.getItem("users"));
          // if (!user) {
          //   this.$router.push("/login");
          //   return;
          // }
          // this.userGroup = user.userGroup.id_group;
  
          // Получение рецептов
          // const [recipes, groupRecipes] = await Promise.all([
          //   axios.get("http://localhost:3000/recipes"),
          //   axios.get(
          //     `http://localhost:3000/group_recipes?id_group=${this.userGroup}`
          //   ),
          // ]);
          const response = await axios.get("http://localhost:3000/recipes");
          console.log("axios call");
          console.log(response.data);
          this.recipes = response.data;
          // this.groupRecipes = groupRecipes.data;
        } catch (error) {
          this.error = "Ошибка загрузки данных. Попробуйте снова.";
        } finally {
          this.loading = false;
        }
      },
      // Метод для обработки клика на кнопку редактирования рецепта
      editRecipe(recipeId) {
        // Можно редиректить на страницу редактирования рецепта с параметром id
        this.$router.push(`/edit-recipe/${recipeId}`);
      },
    },
    mounted() {
      console.log("resipesview im here");
      this.fetchData();
      console.log(this.recipes);
    },
  };
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f4f4f4;
  }
  
  .edit-button {
    background-color: #f4f4f4;
    border: none;
    cursor: pointer;
    color: #42b983;
  }
  
  .edit-button:hover {
    color: #369b72;
  }
  </style>
  