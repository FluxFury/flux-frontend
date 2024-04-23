<script setup>
import { ref } from "vue"
import { NButton, NButtonGroup, NModal } from "naive-ui"

const showModal = ref(false)

function openModal() {
  showModal.value = true
}
</script>

<template>
  <h1>FluxStart</h1>
  <div>
    <n-button-group @click="openModal">
      <n-button>Btn1</n-button>
      <n-button type="primary">Btn2</n-button>
      <n-button type="error">Btn3</n-button>
    </n-button-group>
  </div>
  <n-modal v-model:show="showModal">
    <div>
      <video autoplay src="../assets/cats.mp4"></video>
    </div>
  </n-modal>
</template>

<style lang="scss">
video {
  width: 100%;
  height: 100vh;
}
</style>
