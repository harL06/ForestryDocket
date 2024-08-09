<template>
    <div class="signup-container">
        <form ref="signupForm" id="signup-form">
            <h2>Sign Up</h2>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" v-model="password" required />
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
    margin: 0;
}

.signup-container {
    width: 400px;
    margin: 100px auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

#signup-error {
    margin-top: 10px;
    color: #d9534f;
    font-weight: bold;
    text-align: center;
}

#signup-success {
    margin-top: 10px;
    color: #5cb85c;
    font-weight: bold;
    text-align: center;
}

p {
    text-align: center;
    margin-top: 20px;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
