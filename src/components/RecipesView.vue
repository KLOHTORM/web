<template>
  <div>
    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <!-- Кнопка для добавления новой рецептуры -->
      <button @click="addRecipe" class="add-button">Добавить рецептуру</button>

      <table class="recipes-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in recipes" :key="recipe.id">
            <!-- Название рецепта как ссылка -->
            <td>
              <span class="link" @click="goToRecipe(recipe.id)">
                {{ recipe.name }}
              </span>
            </td>
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
          const response = await axios.get("/api/recipes");
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
          "/api/recipes",
          newRecipe
        );
        newRecipe.id = response.data;
        this.recipes.push(newRecipe); // Добавляем новую рецептуру в список

      } catch (err) {
        this.error = "Ошибка при добавлении рецептуры: " + err.message;
      } finally {
        this.isAdding = false;
      }
    },
    async updateRecipe(updatedRecipe) {
      try {
        await axios.put(
          `/api/recipes/${updatedRecipe.id}`,
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
        await axios.delete(`/api/recipes/${id}`);
        this.recipes = this.recipes.filter((recipe) => recipe.id !== id); // Удаляем из списка
      } catch (err) {
        this.error = "Ошибка при удалении рецепта: " + err.message;
      }
    },
    cancelEdit() {
      this.selectedRecipe = null;
      this.isAdding = false;
    },goToRecipe(recipeId) {
    this.$router.push({ name: 'RecipeReview', params: { id: recipeId } });
  },
  },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  

  <style scoped>
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

.add-button {
  background-color: #28a745;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px 0;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s;
}

.add-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.add-button:active {
  background-color: #1e7e34;
  transform: scale(1);
}

.link {
  color: black;
  cursor: pointer;
}

.link:hover {
  color: darkblue;
}

</style>