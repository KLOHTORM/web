<template>
    <nav class="navbar">
      <router-link v-if="isAuthenticated" to="/" class="nav-item">Ingredients</router-link>
      <router-link v-if="isAuthenticated" to="/recipes" class="nav-item">Recipes</router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="nav-item">Login</router-link>
      <button v-if="isAuthenticated" class="nav-item" @click="logout">Logout</button>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isAuthenticated: !!localStorage.getItem("auth") // Проверяем авторизацию
      };
    },
    methods: {
      logout() {
        localStorage.removeItem("auth"); // Удаляем токен
        this.isAuthenticated = false; // Обновляем состояние
        this.$router.push("/login"); // Перенаправляем на страницу входа
      }
    },
    watch: {
      // Следим за изменением маршрута и обновляем состояние авторизации
      $route() {
        this.isAuthenticated = !!localStorage.getItem("auth");
      }
    }
  };
  </script>
  