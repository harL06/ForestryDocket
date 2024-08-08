<template>
    <div class="login-container">
        <form ref="loginForm" id="login-form">
        <h2>Login</h2>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Login</button>
        </form>
        <div ref="loginError" id="login-error"></div>
        <br>
        <p>Don't have an account? <router-link to="/signup">Sign Up here</router-link></p>
        <br>
        <p><a href="#" ref="forgotPasswordLink" id="forgot-password-link">Forgot your password?</a></p>
        <div ref="forgotPasswordSection" id="forgot-password-section" style="display: none;">
            <h2>Reset Password</h2>
            <form ref="forgotPasswordForm" id="forgot-password-form">
                <input type="email" ref="resetEmailInput" id="reset-email" placeholder="Enter your email" required>
                <button type="submit" id="reset_link">Send Reset Link</button>
            </form>
            <p ref="resetMessage" id="reset-message"></p>
        </div>
    </div>

</template>

<script setup>
import { supabase } from '../supabase/supabase';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'      ;

const forgotPasswordSection = ref(null);
const forgotPasswordForm = ref(null);
const resetEmailInput = ref(null);
const resetMessage = ref(null);
const loginForm = ref(null);
const loginError = ref(null);
const forgotPasswordLink = ref(null);

const router = useRouter();

onMounted(() => {
    forgotPasswordLink.value.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior
        if (forgotPasswordSection.value.style.display === 'none' || forgotPasswordSection.value.style.display === '') {
            forgotPasswordSection.value.style.display = 'block';
            console.log("Forgot Password section is now visible.");
        } else {
            forgotPasswordSection.value.style.display = 'none';
            console.log("Forgot Password section is now hidden.");
        }
    });

    forgotPasswordForm.value.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = resetEmailInput.value.value.trim(); // Trim whitespace
      // Validate email format (basic validation)
        if (!validateEmail(email)) {
            resetMessage.value.textContent = 'Please enter a valid email address.';
            return;
        }

      // Call Supabase to send reset password email
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);

            if (error) {
                resetMessage.value.textContent = 'Error sending reset email: ' + error.message;
            } else {
                resetMessage.value.textContent = 'Check your email for a password reset link.';
                forgotPasswordForm.value.reset(); // Clear the form
            }
        } catch (err) {
            resetMessage.value.textContent = 'Unexpected error occurred: ' + err.message;
        }
    });

    // Handle Login Form Submission
    loginForm.value.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const { data: sessionData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
            });

            if (authError) {
                loginError.value.innerText = authError.message;
                return;
            }

            // Successfully logged in, fetch additional user data if needed
            const { user } = sessionData;

            if (user) {
            // Successfully logged in
                const managerId = user.id; // Get the unique manager ID from Supabase Auth
                console.log('Manager ID:', managerId);

                router.push({ name: 'table', query: { manager_id: managerId } });
            }
        } catch (error) {
            console.error('Error during login:', error);
            loginError.value.innerText = 'An unexpected error occurred. Please try again.';
            }
    });
});

  // Function to validate email format (basic validation)
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

</script>


<style scoped>

/* styles.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

.login-container {
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

#reset-email {
    padding-bottom: 10px; /* Adjust the padding as needed */
}

#reset_link {
    margin-top: 15px;
}

</style>