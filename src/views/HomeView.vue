<template>
  <div class="message">
    <Message v-if="!token.token" severity="error">Please add token to use this functionality</Message>
  </div>
  <div class="inputs__container">
    <Select v-model="inputValues.from" :options="currencies" optionLabel="name" placeholder="From Currency"  />
    <InputNumber v-model="inputValues.amount" inputId="currencyInput" />
    <Select v-model="inputValues.to" :options="currencies" optionLabel="name" placeholder="To Currency"  />
    <Button :disabled="!token.token" label="exchange" @click="exchange" />
  </div>
  <ValueExchanged v-if="exchangedValue" :value="exchangedValue"/>
</template>


<script setup>
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { onMounted, ref } from 'vue';
import { useTokenStore } from '@/stores/token.js';
import axios from 'axios'
import ValueExchanged from '@/components/valueExchanged.vue';

const token = useTokenStore()
const currencies = ref([])
const inputValues = ref({
  from: '',
  to: '',
  amount: null
})
const exchangedValue = ref('')

onMounted(async () => {
  try {
    const response = await axios.get('https://api.currencybeacon.com/v1/currencies', {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    })
    currencies.value = Object.values(response.data).filter(item => item.name)
  } catch(error) {
    console.error(error)
  }
})

const exchange = async () => {
  try {
    const response = await axios.get('https://api.currencybeacon.com/v1/convert', {
      headers: {
        Authorization: `Bearer ${token.token}`
      }, 
      params: {
        from: inputValues.value.from.short_code,
        to: inputValues.value.to.short_code,
        amount: inputValues.value.amount
      }
    })
    exchangedValue.value = response.data

  } catch(error) {
    console.error(error)
  }
}

</script>

<style>
.message{
  margin: 12px 0;
}
.inputs__container{
  display: flex;
  gap: 12px;
  max-width: 900px;
  margin: 12px 0;
}
</style>

