<template>
    <div class="joined-container">
        <p class="joined-message">You've joined the waiting list... Redirecting to home...</p>
    </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Use the router instance for redirection
const router = useRouter();

onMounted(() => {

  // Redirect to login page after a short delay
    setTimeout(() => {
    router.push('/'); // Adjust the path if you want to redirect to a different page
    }, 3000); // Redirect after 2 seconds to show the logout message
});

</script>

<style scoped>
.joined-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}

.joined-message {
    font-size: 1.5rem;
    color: #333;
    text-align: center;
}

</style>