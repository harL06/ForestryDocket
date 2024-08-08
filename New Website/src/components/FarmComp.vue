<template>
    <div class="farm-card">
      <div class="farm-header">
        <h3>{{ farm.name }}</h3>
      </div>
      <div class="farm-details">
        <p><strong>Location:</strong> {{ farm.location }}</p>
        <p><strong>Forestry Code:</strong> {{ farm.forestryCode }}</p>
      </div>
      <div class="farm-actions">
        <router-link
        class="action-button"
        :to="{ name: 'table', params: { forestryCode: farm.forestryCode } }"
        >Select</router-link>
      </div>
    </div>
  </template>

  <script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    farm: {
      type: Object,
      required: true
    }
  });
  </script>

  <style scoped>
  .farm-card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 10px;
    padding: 15px;
    width: calc(33% - 20px);
    box-sizing: border-box;
    display: inline-block;
  }

  .farm-header h3 {
    margin: 0;
    font-size: 1.2em;
  }
  
  .farm-details {
    margin: 15px 0;
  }
  
  .farm-details p {
    margin: 5px 0;
  }
  
  .farm-actions {
    text-align: right;
  }
  
  .action-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    text-decoration: none;
  }
  
  .action-button:hover {
    background-color: #0056b3;
  }
  </style>
  