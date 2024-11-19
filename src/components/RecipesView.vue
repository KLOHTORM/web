<template>
  <div>
    <h2>Рецепты</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in accessibleRecipes" :key="recipe.id">
            <td>{{ recipe.name }}</td>
            <td>{{ recipe.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
      userGroup: null,
      groupRecipes: [],
    };
  },
  computed: {
    accessibleRecipes() {
      const accessibleIds = this.groupRecipes.map((gr) => gr.id_recipe);
      return this.recipes.filter((recipe) => accessibleIds.includes(recipe.id));
    },
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;

        // Получение данных пользователя из localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          this.$router.push("/login");
          return;
        }
        this.userGroup = user.userGroup.id_group;

        // Получение рецептов
        const [recipes, groupRecipes] = await Promise.all([
          axios.get("http://localhost:3000/recipes"),
          axios.get(
            `http://localhost:3000/group_recipes?id_group=${this.userGroup}`
          ),
        ]);

        this.recipes = recipes.data;
        this.groupRecipes = groupRecipes.data;
      } catch (error) {
        this.error = "Ошибка загрузки данных. Попробуйте снова.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
</style>
