import { createRouter, createWebHistory } from "vue-router";
import IngredientsView from "./components/IngredientsView.vue";
import RecipesView from "./components/RecipesView.vue";
import RecipeReview from '@/components/RecipeReview.vue';
import LoginView from "./components/LoginView.vue";
import Navbar from "./components/Navbar.vue";

const routes = [
  {
    path: "/",
    component: LoginView, // Страница входа
  },
  {
    path: "/menu",
    component: Navbar.vue, // Главная страница
  },
  {
    path: "/ingredients",
    component: IngredientsView, // Страница рецептов
  },
  {
    path: "/recipes",
    component: RecipesView, // Страница рецептов
  },
  {
    path: '/recipe/:id',
    name: 'RecipeReview',
    component: RecipeReview,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
