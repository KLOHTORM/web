<template>
  <nav class="navbar">
    <router-link to="/ingredients" class="nav-item">КОМПОНЕНТЫ</router-link>
    <router-link to="/recipes" class="nav-item">РЕЦЕПТУРЫ</router-link>
    <button @click="logout" class="logout-button">выход</button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false
    };
  },
  mounted() {
    this.isAuthenticated = !!localStorage.getItem("auth"); // Проверяем авторизацию при загрузке
  },
  methods: {
    logout() {
      localStorage.removeItem("auth"); // Удаляем токен
      this.isAuthenticated = false; // Обновляем состояние
      this.$router.push("/"); // Перенаправляем на страницу входа
    }
  }
};
</script>

<style scoped>
/* Основные стили для навигационной панели */
.navbar {
  display: flex;
  justify-content: space-around;
  background-color: #2c3e50;
  padding: 15px 0;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Стили для каждого элемента навигации */
.nav-item {
  color: white;
  font-size: 18px;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s;
}

/* Ховер-эффект на элементы навигации */
.nav-item:hover {
  background-color: #28a745;
  transform: scale(1.1);
}

/* Стили для активного элемента */
.router-link-active {
  background-color: #e74c3c;
  color: white;
}
</style>