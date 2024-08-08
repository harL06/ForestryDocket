<template>
    <div class="farm-list">
        <h1>Farm Dashboard</h1>
        <div class="farms">
            <FarmComponent
                v-for="farm in items"
                :key="farm.id"
                :farm="farm"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FarmComponent from './FarmComp.vue';
import { supabase } from '../supabase/supabase';

const items = ref([])

const fetchData = async () => {
    const { data, error } = await supabase.from('forestry_list').select('*');

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    items.value = data.map(row => ({
        id: row.id,
        forestryCode: row.forestry_code,
        name: row.forestry_name,
        location: row.location
    }));
}

onMounted(() => {
    fetchData();
})
</script>

<style scoped>
.farm-list {
    padding: 20px;
    box-sizing: border-box;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.farms {
    display: flex; /* Use flexbox for layout */
    flex-wrap: wrap; /* Allow items to wrap to the next line */
    gap: 10px; /* Space between items */
    margin: -10px; /* Compensate for the gap to align with container edges */
}

.farms > * {
    flex: 1 1 calc(33.333% - 30px); /* Calculate width for three items per row */
    max-width: calc(33.333% - 30px); /* Ensure items do not exceed this width */
    box-sizing: border-box; /* Include padding and border in width calculation */
}

h1 {
    text-align: left;
    margin-bottom: 30px;
}
</style>
