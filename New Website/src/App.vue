<template>
  <div class="app">
    <!-- Sidebar here -->
    
    <router-view />
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
</script>


<style lang="scss">

:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
  --table-background: #cdd7e6;

}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Hanken Grotesk", sans-serif;
}

</style>
