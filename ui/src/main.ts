import { createApp } from "vue";
import { createPinia } from 'pinia'
import { router } from "./router";

// PrimeVue
import Aura from "@primeuix/themes/aura";
import ConfirmationService from 'primevue/confirmationservice';
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Tooltip from 'primevue/tooltip';
import "primeicons/primeicons.css";

import App from "./App.vue";
import "./style.css";

const app = createApp(App);
app.use(router);
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);
app.mount("#app");
