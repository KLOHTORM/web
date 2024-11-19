<template>
    <div class="ingredients">
      <!-- Заголовок и индикатор загрузки -->
      <h2 v-if="loading">Загрузка...</h2>
  
      <!-- Сообщение об ошибке -->
      <h2 v-if="error">{{ error }}</h2>
  
      <!-- Список ингредиентов после загрузки -->
      <div v-if="ingredients && !loading && !error">
        <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient">
          <h3>{{ ingredient.name }}</h3>
          <p>{{ ingredient.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        ingredients: [], // Список ингредиентов
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
      }
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
  </style>
  