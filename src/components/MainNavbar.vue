<template>
    <div class="card">
        <Menubar :model="items">
            <template #start>
                <img src="../assets/icons/currency.png" height="30px"/>
            </template>
            <template #item="{ item, props }">
                <RouterLink v-ripple class="flex items-center" v-bind="props.action">
                    <span>{{ item.label }}</span>
                </RouterLink>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Menubar from 'primevue/menubar';
import { useRouter } from "vue-router";

const router = useRouter()

const items = ref([
    {
        label: 'Home',
        command: () => router.push("/")
    },
    {
        label: 'Settings',
        command: () => router.push("/settings")
    },
    {
        label: 'About',
        command: () => router.push("/about")
    },
   
]);
</script>

<style scoped>
.card{
    width: 100%;
}
</style>