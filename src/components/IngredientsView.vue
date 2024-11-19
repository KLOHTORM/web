<template>
  <div class="ingredients">
    <!-- Заголовок и индикатор загрузки -->
    <h2 v-if="loading">Загрузка...</h2>

    <!-- Сообщение об ошибке -->
    <h2 v-if="error">{{ error }}</h2>

    <!-- Кнопка для добавления нового ингредиента -->
    <button @click="addIngredient" class="add-button">Добавить ингредиент</button>

    <!-- Список ингредиентов после загрузки -->
    <div v-if="ingredients && !loading && !error">
      <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient">
        <h3>{{ ingredient.name }}</h3>
        <p>{{ ingredient.description }}</p>
        <button @click="editIngredient(ingredient)" class="edit-button">
          ✏️ Редактировать
        </button>
        <button @click="deleteIngredient(ingredient.id)" class="delete-button">
            🗑️ Удалить
          </button>
      </div>
    </div>
    <!-- Форма добавления/редактирования -->
    <IngredientForm v-if="selectedIngredient !== null || isAdding" :ingredient="selectedIngredient"
      @add-ingredient="createIngredient" @update-ingredient="updateIngredient" @cancel-edit="cancelEdit" />
  </div>
</template>

<script>
import axios from "axios";
import IngredientForm from "./IngredientForm.vue";

export default {
  components: {
    IngredientForm,
  },
  data() {
    return {
      ingredients: [], // Список ингредиентов
      selectedIngredient: null, // Текущий ингредиент для редактирования
      isAdding: false, // Флаг добавления нового ингредиента
      loading: false,   // Статус загрузки
      error: null       // Сообщение об ошибке
    };
  },
  methods: {
    async fetchIngredients() {
      this.loading = true; // Включаем индикатор загрузки
      this.error = null; // Сбрасываем сообщение об ошибке

      try {
        const response = await axios.get("http://localhost:3000/ingredients");
        this.ingredients = response.data; // Получаем данные
      } catch (err) {
        this.error = "Ошибка при загрузке данных: " + err.message; // Устанавливаем сообщение об ошибке
      } finally {
        this.loading = false; // Выключаем индикатор загрузки
      }
    },
    addIngredient() {
      this.isAdding = true;
      this.selectedIngredient = null;
    },
    editIngredient(ingredient) {
      this.selectedIngredient = ingredient;
      this.isAdding = false;
    },
    async createIngredient(newIngredient) {
      try {
        const response = await axios.post(
          "http://localhost:3000/ingredients",
          newIngredient
        );
        this.ingredients.push(response.data); // Добавляем новый ингредиент в список
      } catch (err) {
        this.error = "Ошибка при добавлении ингредиента: " + err.message;
      } finally {
        this.isAdding = false;
      }
    },
    async updateIngredient(updatedIngredient) {
      try {
        console.log("Im inside update ingredient");
        await axios.put(
          `http://localhost:3000/ingredients/${updatedIngredient.id}`,
          updatedIngredient
        );
        const index = this.ingredients.findIndex(
          (i) => i.id === updatedIngredient.id
        );
        if (index !== -1) {
          this.ingredients[index] = updatedIngredient; // Прямое обновление массива
        }

      } catch (err) {
        this.error = "Ошибка при обновлении ингредиента: " + err.message;
      } finally {
        this.selectedIngredient = null;
      }
    },
    async deleteIngredient(id) {
      try {
        await axios.delete(`http://localhost:3000/ingredients/${id}`);
        this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== id); // Удаляем из списка
      } catch (err) {
        this.error = "Ошибка при удалении ингредиента: " + err.message;
      }
    },
    cancelEdit() {
      this.selectedIngredient = null;
      this.isAdding = false;

    },
  },
  mounted() {
    this.fetchIngredients(); // Загружаем данные при монтировании компонента
  }
};
</script>

<style scoped>
.ingredients {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.ingredient {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.ingredient h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #42b983;
}

.ingredient p {
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #555;
}

.delete-button {
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>