<template>
    <div class="login-container">
      <form ref="loginForm" id="login-form">
        <h2>Login</h2>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <div class="remember-me">
            <input v-model="rememberMe" type="checkbox" id="remember-me" />
            <label for="remember-me">Remember Me</label>
          </div>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <div ref="loginError" id="login-error"></div>
      <br />
      <p>
        Don't have an account? 
        <router-link to="/signup" class="signup-link">Sign Up here</router-link>
      </p>
      <br />
      <p>
        <a href="#" ref="forgotPasswordLink" id="forgot-password-link" class="forgot-password-link">Forgot your password?</a>
      </p>
      <div ref="forgotPasswordSection" id="forgot-password-section" style="display: none;">
        <h2>Reset Password</h2>
        <form ref="forgotPasswordForm" id="forgot-password-form">
          <input type="email" ref="resetEmailInput" id="reset-email" placeholder="Enter your email" required />
          <button type="submit" id="reset_link" class="reset-button">Send Reset Link</button>
        </form>
        <p ref="resetMessage" id="reset-message"></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { supabase } from '../supabase/supabase';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const forgotPasswordSection = ref(null);
  const forgotPasswordForm = ref(null);
  const resetEmailInput = ref(null);
  const resetMessage = ref(null);
  const loginForm = ref(null);
  const loginError = ref(null);
  const forgotPasswordLink = ref(null);
  const rememberMe = ref(false);
  
  const router = useRouter();
  
  onMounted(() => {
    if (sessionStorage.getItem('user_uuid')) {
      router.push({ name: 'table' });
    } else if (localStorage.getItem('user_uuid')) {
      router.push({ name: 'table' });
    }
  
    forgotPasswordLink.value.addEventListener('click', (event) => {
      event.preventDefault();
      forgotPasswordSection.value.style.display = forgotPasswordSection.value.style.display === 'none' || forgotPasswordSection.value.style.display === '' ? 'block' : 'none';
    });
  
    forgotPasswordForm.value.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = resetEmailInput.value.value.trim();
      if (!validateEmail(email)) {
        resetMessage.value.textContent = 'Please enter a valid email address.';
        return;
      }
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
          resetMessage.value.textContent = 'Error sending reset email: ' + error.message;
        } else {
          resetMessage.value.textContent = 'Check your email for a password reset link.';
          forgotPasswordForm.value.reset();
        }
      } catch (err) {
        resetMessage.value.textContent = 'Unexpected error occurred: ' + err.message;
      }
    });
  
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
        const { user } = sessionData;
        if (user) {
          const managerId = user.id;
          if (rememberMe.value) {
            localStorage.setItem('user_uuid', managerId);
          } else {
            sessionStorage.setItem('user_uuid', managerId);
          }
          router.push({ name: 'table' });
        }
      } catch (error) {
        loginError.value.innerText = 'An unexpected error occurred. Please try again.';
      }
    });
  });
  
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: var(--light);
  }
  
  .login-container {
    width: 350px;
    margin: 100px auto;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: var(--dark);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: var(--dark);
  }
  
  input[type="email"],
  input[type="password"],
  #reset-email {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
  }
  
  .remember-me input {
    margin-right: 5px;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .login-button {
    margin-top: 20px;
  }
  
  .signup-link,
  .forgot-password-link {
    color: #007bff;
    text-decoration: none;
  }
  
  .signup-link:hover,
  .forgot-password-link:hover {
    text-decoration: underline;
  }
  
  .reset-button {
    margin-top: 15px;
  }
  </style>
  