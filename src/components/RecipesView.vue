<template>
    <div>
      <h2>Рецепты</h2>
      <div v-if="loading">Загрузка...</div>
      <div v-if="error">{{ error }}</div>
      <div v-else>

        <!-- Кнопка для добавления нового ингредиента -->
    <button @click="addRecipe" class="add-button">Добавить рецепт</button>

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
                <!-- Иконка для редактирования рецепта -->
                <button @click="editRecipe(recipe)" class="edit-button">
                  ✏️ Изменить
                </button>
                <button @click="deleteRecipe(recipe.id)" class="delete-button">
                  🗑️ Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Форма редактирования или добавления -->
    <RecipeForm
      v-if="selectedRecipe !== null || isAdding"
      :recipe="selectedRecipe"
      @update-recipe="updateRecipe"
      @add-recipe="createRecipe"
      @cancel-edit="cancelEdit"
    />
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import RecipeForm from "./RecipeForm.vue";

  
  export default {
    components: {
    RecipeForm // Регистрируем компонент
    },
    data() {
      return {
        recipes: [],
        loading: false,
        error: null,
        selectedRecipe: null,
        isAdding: false
      };
    },

    methods: {
      async fetchData() {
        try {
          this.loading = true;
          const response = await axios.get("http://localhost:3000/recipes");
          this.recipes = response.data;
        } catch (error) {
          this.error = "Ошибка загрузки данных. Попробуйте снова.";
        } finally {
          this.loading = false;
        }
      },
      addRecipe() {
      this.isAdding = true;
      this.selectedRecipe = null;
    },
    editRecipe(recipe) {
      this.selectedRecipe = recipe;
      this.isAdding = false;
    },
    async createRecipe(newRecipe) {
      try {
        const response = await axios.post(
          "http://localhost:3000/recipes",
          newRecipe
        );
        this.recipes.push(response.data);
      } catch (error) {
        this.error = "Ошибка при добавлении рецепта.";
      } finally {
        this.isAdding = false;
        this.selectedRecipe = null;
      }
    },
    async updateRecipe(updatedRecipe) {
      try {
        await axios.put(
          `http://localhost:3000/recipes/${updatedRecipe.id}`,
          updatedRecipe
        );

        const index = this.recipes.findIndex((r) => r.id === updatedRecipe.id);
        if (index !== -1) {
          this.recipes[index] = updatedRecipe;
        }
      } catch (error) {
        this.error = "Ошибка при обновлении рецепта.";

      } finally {
        this.selectedRecipe = null;
      }
    },
    async deleteRecipe(id) {
      try {
        await axios.delete(`http://localhost:3000/recipes/${id}`);
        this.recipes = this.recipes.filter((recipe) => recipe.id !== id); // Удаляем из списка
      } catch (err) {
        this.error = "Ошибка при удалении рецепта: " + err.message;
      }
    },
    cancelEdit() {
      this.selectedRecipe = null;
      this.isAdding = false;
    },
  },
    mounted() {
      this.fetchData();
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
  