<template>
  <div class="wrapper">
    <Skeleton borderRadius="16px" class="mb-2"></Skeleton>
    <Skeleton borderRadius="16px" class="mb-2"></Skeleton>
    <Skeleton borderRadius="16px" width="10rem" class="mb-2"></Skeleton>
  </div>
</template>

<script setup lang="ts">
import Skeleton from "primevue/skeleton";
</script>

<style scoped>
.wrapper {
  gap: 0.5rem;
}
</style>
