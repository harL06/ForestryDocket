<template>
  <div class="table-component">
    <!-- Main Table Content -->
    <div class="header">
      <div class="title">
        <h1>Database Table</h1>
      </div>
      <div class="shareable-link">
        <button @click="copyLink">Copy Link</button>
        <input type="text" :value="shareableLink" readonly ref="shareableLinkInput" />
      </div>
      <!--
      <div class="controls">
        <button class="action-button" @click="addNew">+ New</button>
      </div>
      -->
    </div>
    <div class="sub-header">
      <div class="actions">
        <button v-if="anySelected" @click="deleteSelected">Delete</button>

        <div class="search-container">
          <input type="text" placeholder="Search" v-model="searchQuery" class="search-bar" />
          <span class="material-icons">search</span>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /></th>
            <th @click="sortTable('date')">Date <span class="sort-arrows">▲▼</span></th>
            <th @click="sortTable('name')">Driver Name <span class="sort-arrows">▲▼</span></th>
            <th @click="sortTable('reg')">Reg <span class="sort-arrows">▲▼</span></th>
            <th @click="sortTable('id')">ID <span class="sort-arrows">▲▼</span></th>
            <th @click="sortTable('status')">Status <span class="sort-arrows">▲▼</span></th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedAndFilteredItems" :key="item.id" :class="{ 'selected-row': item.selected }">
            <td><input type="checkbox" v-model="item.selected" /></td>
            <td>{{ formatDate(item.date) }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.reg }}</td>
            <td>{{ item.id }}</td>
            <td>
              <span :class="statusClass(item.status)">
                {{ statusText(item.status) }}
              </span>
            </td>
            <td>
              <button class="action-button small-button" @click="viewMore(item)">View More</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for Detailed Info -->
    <div v-if="selectedItem" class="modal-overlay">
      <div class="modal">
        <h2>Details for driver: {{ selectedItem.name }}</h2>
        <div class="modal-content">
          <div class="modal-text">
            <p><strong>Docket Number:</strong> {{ selectedItem.id }}</p>
            <p><strong>Forest Code:</strong> {{ selectedItem.forest }}</p>
            <p><strong>Arrival Date:</strong> {{ formatDate(selectedItem.date) }}</p>
            <p><strong>Arrival Time:</strong> {{ formatTime(selectedItem.date) }}</p>
            <p><strong>Departure Date:</strong> {{ formatDate(selectedItem.departTime) }}</p>
            <p><strong>Departure Time:</strong> {{ formatTime(selectedItem.departTime) }}</p>
            <p><strong>Vehicle Type:</strong> {{ selectedItem.vehicle }}</p>
            <p><strong>License Plate: </strong> {{ selectedItem.reg }}</p>
            <p><strong>Product Type:</strong> {{ selectedItem.product }}</p>
            <p><strong>Certified:</strong> {{ selectedItem.certified }}</p>
            <p><strong>Certification Info:</strong> {{ selectedItem.certifiedInfo }}</p>
            <p><strong>Log Count:</strong> {{ selectedItem.logCount }} </p>
            <p><strong>Net Weight:</strong> {{ selectedItem.netWeight }}</p>
            <p><strong>Destination:</strong> {{ selectedItem.destination }}</p>
            <p><strong>Status:</strong>
              <span :class="statusClass(selectedItem.status) + ' modal-status'">
                {{ statusText(selectedItem.status) }}
              </span>
            </p>
            <p>
              <strong>Image:</strong>
              <a :href="selectedItem.imageUrl" target="_blank">
                <button class="view-image-button">View</button>
              </a>
            </p>
          </div>
        </div>
        <button class="action-button" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { supabase } from '../supabase/supabase';
import { useRoute } from 'vue-router';

const forestryCode = ref('');
const route = useRoute();
const items = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const sortKey = ref('');
const sortAsc = ref(true);
const selectAll = ref(false);
const pollingInterval = ref(null);
const selectedItem = ref(null); // State for the selected item
const managerId = ref(null);
const shareableLink = ref('');

const isEqualArray = (a, b) => {
  if (a.length !== b.length) return false;
  return a.every((item, index) => JSON.stringify(item) === JSON.stringify(b[index]));
};

const fetchData = async () => {

  /*
  const managerId = getManagerId();

  if (!managerId) {
        console.error('No manager ID found in the URL');
        return;
    }
      */

  loading.value = true;

  let data, error;

  if (forestryCode.value) {
    ({ data, error } = await supabase
      .from('forestry_dockets')
      .select('*')
      .eq('forest_code', forestryCode.value));
  } else {
    ({ data, error } = await supabase
      .from('forestry_dockets')
      .select('*'));
  }

  if (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
    return;
  }

  const newData = data.map(row => ({
    id: row.permit_number,
    forest: row.forest_code,
    date: row.time_of_arrival,
    name: row.driver_name,
    vehicle: row.vehicle_type,
    product: row.product_type,
    netWeight: row.estimated_tonnage,
    destination: row.destination,
    departTime: row.time_of_departure,
    managerId: row.manager_id,
    certified: row.certified_pure,
    certifiedInfo: row.certification_info,
    reg: row.vehicle_registration,
    logCount: row.cap_logs,
    imageUrl: row.image_url,
    status: row.status,
    selected: false,
  }));

  if (!isEqualArray(newData, items.value)) {
    items.value = newData.map((item, index) => {
      const existingItem = items.value.find(i => i.id === item.id);
      return existingItem ? { ...item, selected: existingItem.selected } : item;
    });
  }

  loading.value = false;
};

const sortedAndFilteredItems = computed(() => {
  let filtered = [...items.value];

  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }

  if (sortKey.value) {
    filtered.sort((a, b) => {
      let result = 0;
      if (a[sortKey.value] < b[sortKey.value]) result = -1;
      if (a[sortKey.value] > b[sortKey.value]) result = 1;
      return sortAsc.value ? result : -result;
    });
  }

  return filtered;
});

const sortTable = key => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
};

const toggleSelectAll = () => {
  sortedAndFilteredItems.value.forEach(item => {
    item.selected = selectAll.value;
  });
};

const deleteSelected = async () => {
  const selectedItems = items.value.filter(item => item.selected);

  for (const item of selectedItems) {
    const { error } = await supabase
      .from('forestry_dockets')
      .delete()
      .eq('permit_number', item.id);

    if (error) {
      console.error('Error deleting data:', error);
    }
  }

  fetchData();
};

const startPolling = () => {
  pollingInterval.value = setInterval(fetchData, 5000); // Poll every 5 seconds
};

const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
    pollingInterval.value = null;
  }
};

onMounted(() => {
  forestryCode.value = route.params.forestryCode;
  console.log(forestryCode.value);
  fetchData();
  startPolling();
  managerId.value = getManagerId();
  if (managerId.value) {
    shareableLink.value = `https://www.logwatch.ie/capture%20copy.html?manager_id=${managerId.value}`;
  }
});

onUnmounted(() => {
  stopPolling();
});

function getManagerId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('manager_id');
}


function copyLink() {
  const input = document.querySelector('.shareable-link input');
  input.select();
  document.execCommand('copy');
  alert('Link copied to clipboard!');
}

const anySelected = computed(() => {
  return items.value.some(item => item.selected);
});

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};


// const addNew = () => {
//   // Define the action for the + New button
// };


const viewMore = (item) => {
  selectedItem.value = item; // Set the selected item to display in the modal
  document.addEventListener('keydown', handleKeyDown); // Add keydown listener when modal opens
};

const closeModal = () => {
  selectedItem.value = null; // Clear the selected item to close the modal
  document.removeEventListener('keydown', handleKeyDown); // Remove keydown listener when modal closes
};

// Helper methods for status
const statusText = (status) => {
  switch (status) {
    case -1: return 'No Status';
    case 0: return 'Entered';
    case 1: return 'Departed';
    case 2: return 'Dropped Off';
    default: return 'Unknown';
  }
};

const statusClass = (status) => {
  switch (status) {
    case -1: return 'status-no-status';
    case 0: return 'status-entered';
    case 1: return 'status-departed';
    case 2: return 'status-dropped-off';
    default: return '';
  }
};

const formatDate = (dateString) => {
  const dateOptions = { day: 'numeric', month: 'short' }; // Short format: "8 Aug"
  const timeOptions = { hour: '2-digit', minute: '2-digit' }; // Time format: "HH:MM"
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-GB', dateOptions)} ${date.toLocaleTimeString('en-GB', timeOptions)}`;
};

const formatTime = (dateString) => {
  const timeOptions = { hour: '2-digit', minute: '2-digit' }; // Time format: "HH:MM"
  return new Date(dateString).toLocaleTimeString('en-GB', timeOptions);
};
</script>


<style scoped>
body {
  background: var(--light);
}

.table-component {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
}

.title {
  text-align: left;
}

.shareable-link {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
}

.shareable-link input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  margin-left: 10px;
}

.shareable-link button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.shareable-link button:hover {
  background-color: #0056b3;
}

.controls {
  display: flex;
  align-items: center;
}

.sub-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  align-items: center;
  width: 100%;
}

.actions button, .controls .action-button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:hover, .controls .action-button:hover {
  background-color: #0056b3;
}

.search-container {
  position: relative;
  flex-grow: 1;
}

.search-bar {
  width: 100%;
  padding: 8px 16px 8px 40px; /* Adjust padding to fit the icon */
  border: 1px solid #ddd;
  border-radius: 4px;
}

.material-icons {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 18px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

table th, table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

table th {
  background-color: #f4f4f4;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
}

table td {
  background-color: white;
}

.action-button {
  border-bottom: 1px solid #ddd;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.small-button {
  padding: 4px 8px;
  font-size: 0.9em;
  margin: 0;
}

input[type="checkbox"] {
  margin: 0;
}

.sort-arrows {
  font-size: 10px;
  margin-left: 5px;
}

.selected-row {
  background-color: #e0e0e0;
}

.status-entered {
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.status-departed {
  background-color: orange;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.status-dropped-off {
  background-color: green;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.status-no-status {
  background-color: gray;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.status-entered, .status-departed, .status-dropped-off, .status-no-status {
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  font-size: 0.8em; /* Match font size with the button */
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

.modal-text {
  display: flex;
  flex-direction: column;
}

.view-image-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px; /* Smaller padding */
  font-size: 0.8em; /* Smaller font size */
  cursor: pointer;
  text-align: center;
  margin-top: 5px; /* Adjust margin to fit with text */
}

.view-image-button:hover {
  background-color: #0056b3;
}

.modal-text p {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.modal-text p strong {
  margin-right: 5px; /* Space between label and content */
}

</style>
