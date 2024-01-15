<script setup>
import { RouterView } from 'vue-router';
import { useAuthApi } from './composables/authentication';
import { useUserStore } from './stores/user';
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>
