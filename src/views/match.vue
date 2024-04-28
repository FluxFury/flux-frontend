<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
console.log('route', route)
</script>

<template>
  Match #{{ route.params.id }}
</template>