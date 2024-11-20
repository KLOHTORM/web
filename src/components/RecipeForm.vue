<template>
    <div class="recipe-form">
      <h3>{{ isNewRecipe ? "Добавить новый рецепт" : "Редактировать рецепт" }}</h3>
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
        // Если это новый рецепт, эмитим событие добавления
        if (this.isNewRecipe) {
          this.$emit("add-recipe", this.localRecipe);
        } else {
          // Если редактирование, эмитим обновление
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
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
    max-width: 400px;
  }
  
  .recipe-form h3 {
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
  