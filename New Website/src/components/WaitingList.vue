<template>
    <div class="waitingList-container">
      <form @submit.prevent="submitForm" ref="waitingListForm" id="waitingList-form">
        <h2>Interested? Join our Waiting List</h2>
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input v-model="firstName" type="text" id="firstName" name="firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input v-model="lastName" type="text" id="lastName" name="lastName" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" name="email" required />
        </div>
        <div class="job-dropDown">
          <input v-model="inForestry" type="checkbox" id="dropDown"> Part of the forestry industry?
        </div>
        <div v-if="inForestry" id="occupation-details">
          <div class="spacer"><br></div>
          <div class="form-group">
            <label for="occupation-selector">Occupation:</label>
            <select v-model="occupation" id="occupation-selector">
              <option value="Owner">Forest Owner</option>
              <option value="Contractor">Forest Contractor</option>
            </select>
          </div>
          <div class="form-group">
            <label for="companyName">Company Name:</label>
            <input v-model="companyName" type="text" id="companyName" name="companyName" placeholder="Company Name"/>
          </div>
        </div>
        <button type="submit" class="waitingList-button">Join Waiting List</button>
      </form>
      <div ref="waitingListError" id="waitingList-error"></div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Import useRouter
  import { supabase } from '../supabase/supabase';
  
  // Reactive variables for form fields
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const inForestry = ref(false);
  const occupation = ref('');
  const companyName = ref('');
  
  const router = useRouter(); // Initialize the router
  
  const submitForm = async () => {
    // Prepare data to be inserted
    const formData = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      in_forestry: inForestry.value,
      occupation: inForestry.value ? occupation.value : null,
      company_name: inForestry.value ? companyName.value : null
    };
  
    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('forestry_waiting_list')
        .insert([formData]);
  
      if (error) throw error;
  
      // Clear form
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      inForestry.value = false;
      occupation.value = '';
      companyName.value = '';
  
      // Redirect to /logout
      router.push('/joined');
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error submitting form:', error.message);
      alert('There was an error submitting your information. Please try again.');
    }
  };
  </script>
  
  <style scoped>
    body {
      font-family: Arial, sans-serif;
      background-color: var(--light);
    }
    
    .waitingList-container {
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
    input[type="text"],
    select,
    #reset-email {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fff;
      margin-bottom: 10px;
    }
    
    select {
      background-color: #fff;
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
      background-color: #6f8a5e;
      border: none;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
    }
    
    button:hover {
      background-color: #839e71;
    }
    
    .waitingList-button {
      margin-top: 20px;
    }
  </style>
  