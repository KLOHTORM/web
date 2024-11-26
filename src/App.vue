<template>
  <div id="app">
    <!-- Показываем NavBar, если маршрут не "/login" -->
    <NavBar v-if="$route.path !== '/'" />
    <router-view /> <!-- Компоненты, связанные с маршрутами, будут отображаться здесь -->
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"; // Подключаем NavBar

export default {
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 20px;
}
</style>