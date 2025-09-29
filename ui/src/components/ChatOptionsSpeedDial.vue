<template>
  <SpeedDial direction="right" :model="speedDialItems" />
  <Toast />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useChatStore } from "../store/chat";
import { useConfirm } from "primevue/useconfirm";

import ConfirmDialog from "primevue/confirmdialog";
import SpeedDial from "primevue/speeddial";
import Toast from "primevue/toast";

const confirm = useConfirm();
const router = useRouter();
const toast = useToast();
const chatStore = useChatStore();

const speedDialItems = computed(() => {
  const items = [
    {
      label: "Back",
      icon: "pi pi-arrow-left",
      command: () => {
        router.push("/");  // This is meant to go to a previous page, but that was removed in this redacted version
      },
    },
  ];
  if (chatStore.conversation.length > 0) {
    items.push({
      label: "Clear",
      icon: "pi pi-trash",
      command: () => {
        confirm.require({
          message: `Are you sure you want to clear the conversation?`,
          header: "Confirmation",
          icon: "pi pi-exclamation-circle",
          acceptProps: {
            label: "Clear",
          },
          rejectProps: {
            label: "Cancel",
            severity: "secondary",
            outlined: true,
          },
          accept: () => {
            chatStore.clearConversation();
            toast.add({
              severity: "info",
              summary: "Confirmed",
              detail: "Conversation cleared",
              life: 3000,
            });
          },
        });
      },
    });
  }
  return items;
});
</script>
