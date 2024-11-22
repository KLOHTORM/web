<template>
  <div class="recipe-form">
    <h3>{{ isNewRecipe ? "Добавить новую рецептуру" : "Редактировать рецептуру" }}</h3>
    <form @submit.prevent="submitForm">
      <!-- Поле для названия -->
      <div class="form-group">
        <label for="name">Название:</label>
        <input
          type="text"
          id="name"
          v-model="localRecipe.name"
          placeholder="Введите название"
          required
        />
      </div>

      <!-- Поле для описания -->
      <div class="form-group">
        <label for="description">Описание:</label>
        <textarea
          id="description"
          v-model="localRecipe.description"
          placeholder="Введите описание"
          required
        ></textarea>
      </div>

      <!-- Кнопки управления -->
      <div class="form-buttons">
        <button type="submit" class="save-button">
          {{ isNewRecipe ? "Добавить" : "Сохранить" }}
        </button>
        <button type="button" class="cancel-button" @click="cancelForm">
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RecipeForm",
  props: {
    recipe: {
      type: Object,
      required: false, // Если рецепт не передан, значит это создание нового
    },
  },
  data() {
    return {
      localRecipe: this.recipe
        ? { ...this.recipe }
        : { name: "", description: "" }, // Новый рецепт по умолчанию
    };
  },
  computed: {
    isNewRecipe() {
      return !this.recipe; // Проверяем, создаем или редактируем
    },
  },
  methods: {
    submitForm() {
      if (this.isNewRecipe) {
        this.$emit("add-recipe", this.localRecipe);
      } else {
        this.$emit("update-recipe", this.localRecipe);
      }
    },
    cancelForm() {
      this.$emit("cancel-edit"); // Отмена формы
    },
  },
};
</script>

<style scoped>
.recipe-form {
  position: fixed; /* Фиксированное положение */
  bottom: 20px; /* Отступ снизу */
  left: 20px; /* Отступ слева */
  z-index: 1000; /* Поверх других элементов */
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  max-width: 300px; /* Компактный размер */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipe-form h3 {
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #2d8a59;
  text-align: center;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #42b983;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 60px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.save-button,
.cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.save-button {
  background-color: #42b983;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.save-button:hover {
  background-color: #369b72;
  transform: scale(1.05);
}

.cancel-button:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}

.save-button:active,
.cancel-button:active {
  transform: scale(0.95);
}
</style>
