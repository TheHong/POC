<template>
  <div class="header">
    {{ props.title }}
    <nav v-if="isDebug">
      <router-link to="/chat">Chat</router-link> |
      <router-link to="/library">Library</router-link>
    </nav>
    <div class="debug-section">
      <ToggleSwitch @change="handleToggleChange" />
      Debug
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUiStore } from "../store/ui";

import ToggleSwitch from "primevue/toggleswitch";

const props = defineProps<{ title: string }>();

const uiStore = useUiStore();
const isDebug = computed(() => uiStore.isDebug);

const handleToggleChange = () => {
  uiStore.toggleDebugMode();
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  text-align: left;
  padding: 1rem;
  height: 60px;
  flex-shrink: 0;
}

.debug-section {
  display: flex;
  gap: 0.5rem;
}
</style>
