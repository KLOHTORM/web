<template>
  <div id="app">
    <!-- Показываем Navbar, если маршрут не "/login" -->
    <Navbar v-if="$route.path !== '/'" />
    <router-view /> <!-- Компоненты, связанные с маршрутами, будут отображаться здесь -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"; // Подключаем Navbar

export default {
  components: {
    Navbar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 20px;
}
</style>