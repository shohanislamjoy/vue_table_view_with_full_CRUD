<script setup>
import api from '../axios.js';
import { ref, onMounted,computed } from 'vue';

// import { defineProps } from 'vue';


// const props = defineProps(['foo','name']);





const wifi_data = ref([]);
const currentPage = ref(1);
const itemsPerPage = 25;

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return wifi_data.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(wifi_data.value.length / itemsPerPage);
});

onMounted(async () => {
  try {
    const response = await api.get('/wifi_data');
    wifi_data.value = response.data.data; // Assuming the API returns data in this format
    console.log(wifi_data.value);
  } catch (error) {
    console.error(error);
  }
});

// Pagination handlers
const goToPreviousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};



const goto_edit = (id) => {
  console.log(`Navigate to edit page for ID: ${id}`);
  // Example: Use Vue Router for navigation
  // router.push(`/edit/${id}`);
};




const delete_column = async (id) => {
  try {
    console.log(id);
    const response = await api.delete(`/wifi_data/${id}`); // Ensure the correct endpoint is used
    if (response.status === 200) {
      alert('Data Deleted');
      // Update the local data by removing the deleted item
      wifi_data.value = wifi_data.value.filter((item) => item.id !== id);
    }
  } catch (error) {
    console.error(error);
    alert('Failed to delete data');
  }
};








</script>






<template>

<!-- 
{{ props.foo }}
{{ props.name }}
{{ props.shohan }}
{{ props.hahso }} -->




  <div class="m-20 p-10">
    <table class="table-auto border-collapse border border-gray-300 w-full ">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 px-4 py-2">Date</th>
          <th class="border border-gray-300 px-4 py-2">Trade Code</th>
          <th class="border border-gray-300 px-4 py-2">High</th>
          <th class="border border-gray-300 px-4 py-2">Low</th>
          <th class="border border-gray-300 px-4 py-2">Open</th>
          <th class="border border-gray-300 px-4 py-2">Close</th>
          <th class="border border-gray-300 px-4 py-2">Volume</th>
          <th class="border border-gray-300 px-4 py-2">Extras</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="index">
          <td class="border border-gray-300 px-4 py-2">{{ item.date }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.trade_code }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.high }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.low }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.open }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.close }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.volume }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <button 
              class="px-4 py-2 bg-blue-500 text-white rounded" 
              @click="goto_edit(item?.id)"
              :disabled="!item?.id"
            >
              Edit
            </button>
            <button 
              class="px-4 py-2 bg-red-500 text-white rounded" 
              @click="delete_column(item?.id)"
              :disabled="!item?.id"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="mt-4 flex justify-between items-center">
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>






</template>