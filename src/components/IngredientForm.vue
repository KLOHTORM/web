<template>
    <div class="ingredient-form">
      <h3>{{ isNewIngredient ? "Добавить новый ингредиент" : "Редактировать ингредиент" }}</h3>
      <form @submit.prevent="submitForm">
        <!-- Поле для названия -->
        <div class="form-group">
          <label for="name">Название:</label>
          <input
            type="text"
            id="name"
            v-model="localIngredient.name"
            placeholder="Введите название"
            required
          />
        </div>
  
        <!-- Поле для описания -->
        <div class="form-group">
          <label for="description">Описание:</label>
          <textarea
            id="description"
            v-model="localIngredient.description"
            placeholder="Введите описание"
            required
          ></textarea>
        </div>
  
        <!-- Кнопки управления -->
        <div class="form-buttons">
          <button type="submit" class="save-button">
            {{ isNewIngredient ? "Добавить" : "Сохранить" }}
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
    name: "IngredientForm",
    props: {
      ingredient: {
        type: Object,
        required: false, // Если ингредиент не передан, значит это создание нового
      },
    },
    data() {
      return {
        localIngredient: this.ingredient
          ? { ...this.ingredient }
          : { name: "", description: "" }, // Новый ингредиент по умолчанию
      };
    },
    computed: {
      isNewIngredient() {
        return !this.ingredient; // Проверяем, создаем или редактируем
      },
    },
    methods: {
      submitForm() {
        // Если это новый ингредиент, эмитим событие добавления
        if (this.isNewIngredient) {
          this.$emit("add-ingredient", this.localIngredient);
        } else {
          // Если редактирование, эмитим обновление
          this.$emit("update-ingredient", this.localIngredient);
        }
      },
      cancelForm() {
        this.$emit("cancel-edit"); // Отмена формы
      },
    },
  };
  </script>
  
  <style scoped>
  .ingredient-form {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
    max-width: 400px;
  }
  
  .ingredient-form h3 {
    margin-bottom: 15px;
    font-size: 1.2rem;
    color: #42b983;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .save-button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .save-button:hover {
    background-color: #369b72;
  }
  
  .cancel-button:hover {
    background-color: #d32f2f;
  }
  </style>
  