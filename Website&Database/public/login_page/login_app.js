// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
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