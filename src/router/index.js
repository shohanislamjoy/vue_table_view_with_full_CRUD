import { createRouter, createWebHistory } from 'vue-router';
import add_wifi_data from '@/components/add_wifi_data.vue';
import edit_wifi_data from '@/components/edit_wifi_data.vue';
import home from '@/view/home.vue'; // Assuming this is where the list of data is shown

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home, // Display the list of wifi data
  },
  {
    path: '/add',
    name: 'add_wifi_data',
    component: add_wifi_data, // Add wifi data page
  },
  {
    path: '/edit/:id',
    name: 'edit_wifi_data',
    component: edit_wifi_data, // Edit wifi data page
    props: true, // To pass the id as a prop
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
