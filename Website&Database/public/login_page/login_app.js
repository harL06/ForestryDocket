// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    // Handle Forgot Password Link Click
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordSection = document.getElementById('forgot-password-section');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const resetEmailInput = document.getElementById('reset-email');
    const resetMessage = document.getElementById('reset-message');

    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior
        if (forgotPasswordSection.style.display === 'none' || forgotPasswordSection.style.display === '') {
            forgotPasswordSection.style.display = 'block';
            console.log("Forgot Password section is now visible.");
        } else {
            forgotPasswordSection.style.display = 'none';
            console.log("Forgot Password section is now hidden.");
        }
    });

    forgotPasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = resetEmailInput.value.trim(); // Trim whitespace

        // Validate email format (basic validation)
        if (!validateEmail(email)) {
            resetMessage.textContent = 'Please enter a valid email address.';
            return;
        }

        // Call Supabase to send reset password email
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);

            if (error) {
                resetMessage.textContent = 'Error sending reset email: ' + error.message;
            } else {
                resetMessage.textContent = 'Check your email for a password reset link.';
                forgotPasswordForm.reset(); // Clear the form
            }
        } catch (err) {
            resetMessage.textContent = 'Unexpected error occurred: ' + err.message;
        }
    });

    // Function to validate email format (basic validation)
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Handle Login Form Submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const { data: sessionData, error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (authError) {
                document.getElementById('login-error').innerText = authError.message;
                return;
            }

            // Successfully logged in, fetch additional user data if needed
            const { user } = sessionData;

            if (user) {
                // Successfully logged in
                const managerId = user.id; // Get the unique manager ID from Supabase Auth
                console.log('Manager ID:', managerId);

                // Redirect to the manager's personalised dashboard
                window.location.href = `../dashboard_page/dashboard.html?manager_id=${managerId}`;
            }

            //alert('Login successful!');

            // Redirect user or handle post-login actions here
        } catch (error) {
            console.error('Error during login:', error);
            document.getElementById('login-error').innerText = 'An unexpected error occurred. Please try again.';
        }
    });
});