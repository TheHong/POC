<template>
  <div class="wrapper">
    <Toast />
    <SpeedDial direction="down" :model="speedDialItems" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import SpeedDial from "primevue/speeddial";
import Toast from "primevue/toast";

import { initAiServiceRun } from "../services/aiService";

const toast = useToast();
const router = useRouter();

const speedDialItems = ref([
  {
    label: "Start",
    icon: "pi pi-bolt",
    command: () => {
      initAiServiceRun(toast).then(() => {
        router.push("/chat");
      });
    },
  },
  {
    label: "About",
    icon: "pi pi-question",
    command: () => {
      toast.add({
        severity: "info",
        summary: "Info",
        detail: "The About Page coming soon...",
        life: 3000,
      });
    },
  },
]);
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
</style>
