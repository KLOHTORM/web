import { createRouter, createWebHistory } from "vue-router";
import IngredientsView from "./components/IngredientsView.vue";
import RecipesView from "./components/RecipesView.vue";
import LoginView from "./components/LoginView.vue";
import Menu from './components/Menu';

const routes = [
  {
    path: "/",
    component: RecipesView, // Страница входа
    //meta: { guest: true } // Доступно только для неавторизованных пользователей
  },
  {
    path: "/login",
    component: LoginView, // Страница входа
    meta: { guest: true } // Доступно только для неавторизованных пользователей
  },
  {
    path: "/menu",
    component: Menu, // Главная страница
    meta: { requiresAuth: true } // Требует авторизации
  },
  {
    path: "/recipes",
    component: RecipesView, // Страница рецептов
    //meta: { requiresAuth: true } // Требует авторизации
  },
  {
    path: "/ingredients",
    component: IngredientsView, // Страница рецептов
    meta: { requiresAuth: true } // Требует авторизации
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Глобальный перехват маршрутов
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("auth"); // Проверяем наличие токена

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Если требуется авторизация и пользователь не вошел в систему
    next("/login"); // Перенаправляем на страницу входа
  } else if (to.meta.guest && isAuthenticated) {
    // Если пользователь уже вошел в систему, перенаправляем на главную
    next("/menu");
  } else {
    next(); // Разрешаем переход
  }
});

export default router;
