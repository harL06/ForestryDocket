<template>
    <div class="dapp">
    <Sidebar />
    <main class="home-page">
        <Farmss />
    </main>
</div>
</template>

<script setup>
import Farmss from '../components/Farms.vue';
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
