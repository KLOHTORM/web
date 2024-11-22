<template>
  <div>
    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <!-- Кнопка для добавления нового ингредиента -->
      <button @click="addIngredient" class="add-button">Добавить компонент</button>

      <!-- Таблица ингредиентов -->
      <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingredient in ingredients" :key="ingredient.id">
              <td>{{ ingredient.name }}</td>
              <td>{{ ingredient.description }}</td>
              <td>
                <!-- Иконка для редактирования рецепта -->
                <button @click="editIngredient(ingredient)" class="edit-button">
                  ✏️ Изменить
                </button>
                <button @click="deleteIngredient(ingredient.id)" class="delete-button">
                  🗑️ Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
        const response = await axios.get("/api/ingredients");
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
          "/api/ingredients",
          newIngredient
        );
        newIngredient.id = response.data;
        this.ingredients.push(newIngredient); // Добавляем новый ингредиент в список

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
          `/api/ingredients/${updatedIngredient.id}`,
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
        await axios.delete(`/api/ingredients/${id}`);
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
</style>