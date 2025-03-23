<template>
  <div class="options">
    <div class="option">
      <label for="token">Token</label>
      <InputText id="token" v-model="token.token" aria-describedby="token" />
    </div>
  </div>
</template>


<script setup>
import { useTokenStore } from '@/stores/token.js';
import InputText from 'primevue/inputtext';

const token = useTokenStore()


</script>

<style>
.options{
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-end;
}
.option{
  display: flex;
  flex-direction: column;
}
</style>

