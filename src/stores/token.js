import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  function setToken(value) {
    token.value = value
  }

  return { token, setToken }
})
