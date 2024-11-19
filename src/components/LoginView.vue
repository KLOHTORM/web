<template>
  <div class="login">
    <h2>Вход в систему</h2>

    <!-- Сообщение об ошибке -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Форма входа -->
    <form @submit.prevent="handleLogin">
      <label for="username">Имя пользователя</label>
      <input
        id="username"
        v-model="credentials.username"
        type="text"
        placeholder="Введите имя пользователя"
        required
      />

      <label for="password">Пароль</label>
      <input
        id="password"
        v-model="credentials.password"
        type="password"
        placeholder="Введите пароль"
        required
      />

      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      }, // Хранение данных для входа
      error: null // Сообщение об ошибке
    };
  },
  methods: {
    async handleLogin() {
      this.error = null; // Сбрасываем сообщение об ошибке

      try {
        // Отправляем данные на сервер для проверки
        const response = await axios.post("http://localhost:3000/users", this.credentials);

        // Сохраняем данные пользователя в localStorage
        const user = response.data.user; // предполагается, что сервер возвращает информацию о пользователе
        localStorage.setItem("user", JSON.stringify(user)); // Сохраняем пользователя
        localStorage.setItem("auth", response.data.token); // Сохраняем токен авторизации

        // Перенаправляем пользователя на страницу меню после успешного входа
        this.$router.push("/menu"); // Перенаправление на страницу меню
      } catch (err) {
        // Обрабатываем ошибки
        this.error = "Ошибка входа: " + (err.response?.data?.message || err.message);
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #42b983;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #369b72;
}

.error {
  color: #e74c3c;
  margin-bottom: 15px;
  text-align: center;
}
</style>
