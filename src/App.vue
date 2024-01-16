<script setup>
import { RouterView } from 'vue-router';
import { useAuthApi } from './composables/authentication';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const { logout } = useAuthApi();

const logoutUser = () => {
  logout();
}
</script>

<template>
  <header>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
        <a class="navbar-brand" href="#">Dish App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active" v-if="userStore?.user">
              <RouterLink :to="{ name: 'dish' }" class="nav-link">
                Add Dish
              </RouterLink>
            </li>

            <li class="nav-item" v-if="userStore?.user">
              <RouterLink :to="{ name: 'dish-list' }" class="nav-link">
                Dish Listing
              </RouterLink>
            </li>

            <li class="nav-item" v-if="!userStore?.user">
              <RouterLink :to="{ name: 'login' }" class="nav-link">
                Login
              </RouterLink>
            </li>

            <li class="nav-item" v-if="!userStore?.user">
              <RouterLink :to="{ name: 'register' }" class="nav-link">
                Register
              </RouterLink>
            </li>

            <li class="nav-item" v-if="userStore?.user">
              <a href="#" class="nav-link" @click="logoutUser">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
