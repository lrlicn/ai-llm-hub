<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppLayout from '@/components/common/Layout/AppLayout.vue';
</script>
