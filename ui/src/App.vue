<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <Header title="POC (redacted version)" />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vh;
  background-color: rgb(4, 22, 28);
}

.header {
  text-align: left;
  padding: 1rem;
  height: 60px;
  flex-shrink: 0;
}

nav {
  display: flex;
  padding: 30px;
  background-color: rgb(59, 45, 9);

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
