<template>
    <div class="logout-container">
        <p class="logout-message">You're logged out... Redirecting...</p>
    </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Use the router instance for redirection
const router = useRouter();

onMounted(() => {
  // Clear sessionStorage and localStorage
    sessionStorage.removeItem('user_uuid');
    localStorage.removeItem('user_uuid');

  // Redirect to login page after a short delay
    setTimeout(() => {
    router.push('/'); // Adjust the path if you want to redirect to a different page
    }, 2000); // Redirect after 2 seconds to show the logout message
});

</script>

<style scoped>
.logout-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}

.logout-message {
    font-size: 1.5rem;
    color: #333;
    text-align: center;
}

</style>