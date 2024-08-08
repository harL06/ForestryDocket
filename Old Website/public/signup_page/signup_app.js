// Import the Supabase client from a CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the Supabase client
const SUPABASE_URL = 'https://wvehlmuxjxpiawlnxdjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhsbXV4anhwaWF3bG54ZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzI3NTEsImV4cCI6MjAzNzQwODc1MX0.6wCO36WzXNklp8upySArJ0YBvqoFbseQa5DMXdUyFXE';

//const { createClient } = supabase; // Ensure Supabase is available globally
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                document.getElementById('signup-error').innerText = error.message;
            } else {
                document.getElementById('signup-success').innerText = 'Sign-up successful! Please check your email for confirmation.';
                // Optionally, redirect to another page or clear the form
                signupForm.reset();
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            document.getElementById('signup-error').innerText = 'An unexpected error occurred. Please try again.';
        }
    });
});