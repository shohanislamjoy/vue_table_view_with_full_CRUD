

<script setup>
import { ref } from "vue";
import api from '../axios.js';
import { useRouter } from 'vue-router';


const router = useRouter();

const wifiData = ref({
  date: '',
  trade_code: '',
  high: '',
  low: '',
  open: '',
  close: '',
  volume: ''
});

const addWifiData = async () => {
  try {
    const response = await api.post('/wifi_data', wifiData.value);
    router.push('/');
    alert('WiFi Data added successfully!');
    // Reset the form or redirect after success
  } catch (error) {
    console.error('Error adding WiFi Data:', error);
    alert('Failed to add WiFi Data');
  }
};
</script>


















<template>
    <div class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md m-12">
      <h1 class="text-2xl font-semibold text-center mb-6">Add WiFi Data</h1>
      <form @submit.prevent="addWifiData" class="space-y-4">
        <div class="flex flex-col">
          <label for="date" class="text-lg font-medium">Date:</label>
          <input v-model="wifiData.date" type="date" id="date" required class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
  
        <div class="flex flex-col">
          <label for="trade_code" class="text-lg font-medium">Trade Code:</label>
          <input v-model="wifiData.trade_code" type="text" id="trade_code" required class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
  
        <div class="flex flex-col">
          <label for="high" class="text-lg font-medium">High:</label>
          <input v-model="wifiData.high" type="number" step="0.01" id="high" required class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
  
        <div class="flex flex-col">
          <label for="low" class="text-lg font-medium">Low:</label>
          <input v-model="wifiData.low" type="number" step="0.01" id="low" required class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
  
        <div class="flex flex-col">
          <label for="open" class="text-lg font-medium">Open:</label>
          <input v-model="wifiData.open" type="number" step="0.01" id="open" required class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
  
        <div class="flex flex-col">
          <label for="close" class="text-lg font-medium">Close:</label>
          <input v-model="wifiData.close" type="number" step="0.01" id="close" required class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
  
        <div class="flex flex-col">
          <label for="volume" class="text-lg font-medium">Volume:</label>
          <input v-model="wifiData.volume" type="number" step="0.01" id="volume" required class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
  
        <button type="submit" class="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Save
        </button>
      </form>
    </div>
  </template>
  