<template>
  <div class="message">
    <Message v-if="!token.token" severity="error">Please add token to use this functionality</Message>
  </div>
  <div class="inputs__container">
    <Select v-model="inputValues.from" :options="currencies" optionLabel="name" placeholder="From Currency" />
    <InputNumber v-model="inputValues.amount" inputId="currencyInput" />
    <Select v-model="inputValues.to" :options="currencies" optionLabel="name" placeholder="To Currency" />
    <Button :disabled="!token.token" label="exchange" @click="exchange" />
  </div>
  <ValueExchanged v-if="exchangedValue" :value="exchangedValue"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useTokenStore } from '@/stores/token.js';
import { getCurrencies, convertCurrency } from '../services/currencyApi';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Message from 'primevue/message';
import ValueExchanged from '@/components/valueExchanged.vue';

const token = useTokenStore();
const currencies = ref([]);
const inputValues = ref({
  from: '',
  to: '',
  amount: null
});
const exchangedValue = ref('');

const rules = {
  inputValues: {
    from: { required },
    to: { required },
    amount: { required }
  }
};

const v$ = useVuelidate(rules, { inputValues });

onMounted(async () => {
  if (token.token) {
    try {
      currencies.value = await getCurrencies(token.token);
    } catch (error) {
      console.error(error);
    }
  }
});

const exchange = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  
  try {
    exchangedValue.value = await convertCurrency(
      token.token,
      inputValues.value.from,
      inputValues.value.to,
      inputValues.value.amount
    );
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
.message {
  margin: 12px 0;
}
.inputs__container {
  display: flex;
  gap: 12px;
  max-width: 900px;
  margin: 12px 0;
}
</style>