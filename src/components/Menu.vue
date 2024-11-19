<template>
    <div class="menu">
      <h2>Меню</h2>
  
      <div class="buttons-container">
        <!-- Кнопка для перехода к рецептам -->
        <router-link to="/recipes" class="menu-button">RECIPES</router-link>
        
        <!-- Кнопка для перехода к ингредиентам -->
        <router-link to="/ingredients" class="menu-button">INGREDIENTS</router-link>
  
        <!-- Кнопка для перехода к созданию -->
        <router-link to="/create" class="menu-button">CREATE</router-link>
      </div>
  
      <!-- Кнопка выхода -->
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Удаляем пользователя из localStorage и редиректим на страницу логина
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    }
  };
  </script>
  
  <style scoped>
  .menu {
    max-width: 500px;
    margin: 50px auto;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    background-color: #f9f9f9;
  }
  
  h2 {
    color: #42b983;
    margin-bottom: 20px;
  }
  
  .buttons-container {
    display: flex;
    flex-direction: column; /* Размещение кнопок по вертикали */
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .menu-button {
    display: inline-block;
    padding: 20px 40px;
    background-color: #42b983;
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: pointer;
  }
  
  .menu-button:hover {
    background-color: #369b72;
    transform: scale(1.05); /* Легкое увеличение при наведении */
  }
  
  .logout-btn {
    background-color: #f4f4f4;
    color: #42b983;
    border: none;
    padding: 12px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .logout-btn:hover {
    background-color: #369b72;
    color: white;
  }
  </style>
  