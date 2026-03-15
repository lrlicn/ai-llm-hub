<template>
  <section class="page">
    <div v-if="scenario">
      <div class="scenario-header">
        <h1 class="scenario-name">{{ scenario.name }}</h1>
      </div>
      
      <div class="scenario-desc">{{ scenario.description }}</div>
      
      <div class="concerns-section">
        <h3>核心关注点</h3>
        <div class="concerns-tags">
          <span v-for="(concern, idx) in scenario.keyConcerns" :key="idx" class="concern-tag">
            {{ concern }}
          </span>
        </div>
      </div>

      <div class="recommended-section">
        <h3>推荐模型</h3>
        <div class="recommended-list">
          <div 
            v-for="rec in scenario.recommendedModels" 
            :key="rec.modelId" 
            class="recommended-card"
            @click="goTo(`/models/${rec.modelId}`)"
          >
            <div class="rec-header">
              <span class="rec-priority">优先级 {{ rec.priority }}</span>
              <span class="rec-model">{{ getModelName(rec.modelId) }}</span>
            </div>
            <div class="rec-reason">{{ rec.reason }}</div>
            <div class="rec-notes" v-if="rec.notes">{{ rec.notes }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="not-found">
      场景不存在
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getScenarioById } from '@/services/scenarioService';
import { getModelById } from '@/services/modelService';

const route = useRoute();
const router = useRouter();
const scenario = getScenarioById(route.params.id as string);

const goTo = (path: string) => {
  router.push(path);
};

function updateTitle() {
  if (scenario) {
    document.title = `${scenario.name} - AI 大模型资源中心`;
  }
}

onMounted(() => {
  updateTitle();
});

watch(() => route.params.id, () => {
  updateTitle();
});

function getModelName(id: string): string {
  const model = getModelById(id);
  return model?.name || id;
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.scenario-header {
  margin-bottom: 10px;
}

.scenario-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.scenario-desc {
  font-size: 15px;
  color: var(--text-main);
  line-height: 1.6;
  margin-bottom: 20px;
}

.concerns-section, .recommended-section {
  background: var(--bg-card);
  border-radius: var(--radius-card);
  border: 1px solid var(--border-subtle);
  padding: 18px;
  box-shadow: var(--shadow-soft);
}

.concerns-section h3, .recommended-section h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 14px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-subtle);
}

.concerns-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.concern-tag {
  padding: 4px 12px;
  background: var(--bg-body);
  border-radius: 4px;
  font-size: 13px;
  color: var(--text-main);
}

.recommended-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recommended-card {
  padding: 16px;
  background: var(--bg-body);
  border-radius: var(--radius-card);
  cursor: pointer;
  transition: all 0.2s;
}

.recommended-card:hover {
  background: var(--bg-card);
  box-shadow: var(--shadow-soft);
}

.rec-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.rec-priority {
  padding: 2px 8px;
  background: var(--primary);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.rec-model {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
}

.rec-reason {
  font-size: 13px;
  color: var(--text-main);
  line-height: 1.5;
  margin-bottom: 6px;
}

.rec-notes {
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
}

.not-found {
  padding: 40px;
  text-align: center;
  color: var(--text-muted);
}
</style>
