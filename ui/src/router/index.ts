import { createMemoryHistory, createRouter } from 'vue-router'

import LibraryView from '../views/Library.vue'
import ChatView from '../views/Chat.vue'
import HomeView from '../views/Home.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/chat', component: ChatView },
  { path: '/library', component: LibraryView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})