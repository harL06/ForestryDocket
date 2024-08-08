<template>
    <div class="signup-container">
        <form ref="signupForm" id="signup-form">
        <h2>Sign Up</h2>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" v-model="email" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" v-model="password" required>
        </div>
        <button type="submit">Sign Up</button>
        </form>
        <div ref="signupError" id="signup-error"></div>
        <div ref="signupSuccess" id="signup-success"></div>
        <p>Already have an account? <router-link to="/login">Log in here</router-link></p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase/supabase';

const signupForm = ref(null);
const signupError = ref(null);
const signupSuccess = ref(null);
const email = ref('');
const password = ref('');

onMounted(() => {
    signupForm.value.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
            });

            if (error) {
                signupError.value.innerText = error.message;
            } else {
                signupSuccess.value.innerText = 'Sign-up successful! Please check your email for confirmation.';
                // Optionally, redirect to another page or clear the form
                signupForm.value.reset();
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            signupError.value.innerText = 'An unexpected error occurred. Please try again.';
        }
    });
});
</script>


<style scoped>

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.signup-container {
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

input[type="text"],
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