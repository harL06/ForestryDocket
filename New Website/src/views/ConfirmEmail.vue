<template>
    <div class="container">
        <h1>Email Confirmation</h1>
        <p id="message">Your email has been confirmed successfully! You can now log in.</p>
        <p><button @click="redirectToLogin">Go to Login Page</button></p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Log message when the component is mounted
onMounted(() => {
    console.log('Email confirmation page loaded.');
});

// Get the router instance
const router = useRouter();

// Define the redirect function
function redirectToLogin() {
    router.push({ name: 'login' }); // Use the route name defined in your router configuration
}
</script>


<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.container {
    width: 300px;
    margin: 100px auto;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}


button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

</style>