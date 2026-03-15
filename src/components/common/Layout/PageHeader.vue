<template>
  <section class="page-header">
    <div class="titles">
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="subtitle">
        {{ subtitle }}
      </p>
    </div>
    <div v-if="$slots.extra" class="extra">
      <slot name="extra" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
}

h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #007AFF 0%, #0099FF 50%, #00B8FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin-top: 8px;
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.5;
}

.extra {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  h1 {
    font-size: 26px;
  }
}
</style>
