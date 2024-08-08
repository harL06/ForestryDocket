<template>
    <div class="dapp">
    <Sidebar />
    <main>
        <Dashboard />
    </main>
</div>
</template>

<script setup>
import Dashboard from '../components/Dashboard.vue';
import Sidebar from '../components/Sidebar.vue'
</script>

<style lang="scss" scoped>
main {
    background: var(--light);
}

.dapp {
    display: flex;

    main{
        flex: 1 1 0;
        padding: 2rem;

        @media (max-width: 768px){
            padding-left: 6rem;
        }
    }
}
</style>