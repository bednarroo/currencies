<template>
    <div class="result">
        <Message severity="info">{{exchangedValue}}</Message>
    </div>
</template>
  
  
<script setup>
import Message from 'primevue/message';
import { computed } from 'vue'

const props = defineProps({
    value: {
        type: Object,
        required: false,
        default: () => {}
    }
})

const exchangedValue = computed(() => {
    if(props.value.value && props.value.to) {
        return `${props.value.value} of ${props?.value?.to}` 
    }
    return 'Please try again'
})
</script>
  
<style>
.result {
    max-width: 400px;
}
</style>