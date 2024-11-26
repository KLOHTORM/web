<template>
  <div class="login-container">
    <div class="login-box">
      <h2>DataKeeper</h2>
      <p class="login-description">Войдите в систему</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="text" id="username" v-model="username" required placeholder="Введите логин" />
        </div>
        <div class="form-group">
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Введите пароль"
          />
        </div>
        <button type="button" class="login-button" @click="handleLogin">Войти</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
    const response = await axios.get("/api/users", {
      params: {
        username: this.username,
        password: this.password,
      },
    });
    const users = response.data;
    const validUser = users.find(
      (user) => user.username === this.username && user.password === this.password
    );

    if (validUser) {
      // Успешный вход
      alert("Успешный вход!"); // Уведомление
      this.$router.push("/menu"); // Перенаправление на страницу Menu
    } else {
      this.errorMessage = "Неверный логин или пароль";
    }
  } catch (error) {
    this.errorMessage = "Ошибка сервера. Попробуйте позже.";
  }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-box {
  max-width: 400px;
  width: 100%;
  padding: 40px; 
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.login-box h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.login-description {
  font-size: 14px;
  color: #777;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

input {
  display: block;
  margin: 0 auto; 
  width: 90%; 
  max-width: 320px; 
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  background-color: #f9f9f9; 
}

input:focus {
  border-color: #42b983;
  outline: none;
}

.login-button {
  display: block;
  margin: 20px auto 0; 
  width: 90%; 
  max-width: 320px; 
  padding: 12px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.login-button:hover {
  background-color: #369b72;
  transform: scale(1.02);
}

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.login-button:active {
  transform: scale(0.98);
}

@media (max-width: 480px) {
  .login-box {
    padding: 20px;
  }

  .login-box h2 {
    font-size: 20px;
  }

  .login-description {
    font-size: 12px;
  }

  input {
    font-size: 14px;
  }

  .login-button {
    font-size: 14px;
  }
}
</style>
