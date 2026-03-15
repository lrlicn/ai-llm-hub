<template>
  <section class="page">
    <div v-if="model">
      <div class="model-header">
        <div class="header-main">
          <h1 class="model-name">{{ model.name }}</h1>
          <span :class="['origin-tag', model.origin]">
            {{ model.origin === 'domestic' ? '国产' : '海外' }}
          </span>
        </div>
        <div class="header-actions">
          <div class="model-vendor">{{ model.vendor }}</div>
          <div class="action-buttons">
            <button 
              :class="['compare-btn', { active: isInCompare }]"
              @click="toggleCompare"
            >
              <svg v-if="isInCompare" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 13l4 4L19 7"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              {{ isInCompare ? '已加入对比' : '加入对比' }}
            </button>
            <button class="compare-link" v-if="compareStore.count >= 2" @click="goToCompare">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              查看对比 ({{ compareStore.count }})
            </button>
          </div>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <h3>基本信息</h3>
          <div class="info-row">
            <span class="label">类型</span>
            <span class="value">{{ model.modelType === 'general' ? '通用' : model.modelType }}</span>
          </div>
          <div class="info-row">
            <span class="label">开源</span>
            <span class="value">{{ model.openSource ? '是' : '否' }}</span>
          </div>
          <div class="info-row">
            <span class="label">部署方式</span>
            <span class="value">{{ deploymentLabel }}</span>
          </div>
          <div class="info-row" v-if="model.contextLength">
            <span class="label">上下文长度</span>
            <span class="value">{{ formatNumber(model.contextLength) }} tokens</span>
          </div>
        </div>

        <div class="info-card">
          <h3>价格信息</h3>
          <div class="info-row" v-if="model.inputPrice">
            <span class="label">输入价格</span>
            <span class="value">{{ model.inputPrice }} {{ model.currency }}/M tokens</span>
          </div>
          <div class="info-row" v-if="model.outputPrice">
            <span class="label">输出价格</span>
            <span class="value">{{ model.outputPrice }} {{ model.currency }}/M tokens</span>
          </div>
          <div class="info-row" v-if="model.pricingRemark">
            <span class="label">备注</span>
            <span class="value">{{ model.pricingRemark }}</span>
          </div>
        </div>

        <div class="info-card full-width">
          <h3>能力评分</h3>
          <div class="capability-bars">
            <div class="capability-row" v-for="(value, key) in model.capability" :key="key">
              <span class="cap-label">{{ capabilityLabels[key] }}</span>
              <div class="cap-bar">
                <div class="cap-fill" :style="{ width: value + '%' }"></div>
              </div>
              <span class="cap-value">{{ value }}</span>
            </div>
          </div>
        </div>

        <div class="info-card" v-if="model.pros?.length">
          <h3>优势</h3>
          <ul class="pros-list">
            <li v-for="(pro, idx) in model.pros" :key="idx">{{ pro }}</li>
          </ul>
        </div>

        <div class="info-card" v-if="model.cons?.length">
          <h3>劣势</h3>
          <ul class="cons-list">
            <li v-for="(con, idx) in model.cons" :key="idx">{{ con }}</li>
          </ul>
        </div>

        <div class="info-card full-width" v-if="model.summary">
          <h3>简介</h3>
          <p class="summary-text">{{ model.summary }}</p>
        </div>

        <div class="info-card full-width" v-if="model.officialSite || model.apiDoc || model.console">
          <h3>相关链接</h3>
          <div class="links">
            <a v-if="model.officialSite" :href="model.officialSite" target="_blank" class="link-btn">官方网站</a>
            <a v-if="model.apiDoc" :href="model.apiDoc" target="_blank" class="link-btn">API 文档</a>
            <a v-if="model.console" :href="model.console" target="_blank" class="link-btn">控制台</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="not-found">
      模型不存在
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getModelById } from '@/services/modelService';
import { useCompareStore } from '@/store/compareStore';

const route = useRoute();
const router = useRouter();
const compareStore = useCompareStore();
const model = getModelById(route.params.id as string);

const isInCompare = computed(() => {
  return model ? compareStore.ids.includes(model.id) : false;
});

function toggleCompare() {
  if (!model) return;
  compareStore.toggle(model.id);
}

function goToCompare() {
  router.push('/compare');
}

function updateTitle() {
  if (model) {
    document.title = `${model.name} - AI 大模型资源中心`;
  }
}

onMounted(() => {
  updateTitle();
});

watch(() => route.params.id, () => {
  updateTitle();
});

const deploymentLabel = computed(() => {
  if (!model) return '';
  const labels: Record<string, string> = {
    local: '本地部署',
    cloud: '云端 API',
    both: '本地 + 云端'
  };
  return labels[model.deploymentType] || model.deploymentType;
});

const capabilityLabels: Record<string, string> = {
  general: '综合能力',
  code: '代码能力',
  reasoning: '推理能力',
  longContext: '长文本',
  multimodal: '多模态',
  ragFit: 'RAG 适配'
};

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.model-header {
  margin-bottom: 20px;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.model-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.origin-tag {
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.origin-tag.domestic {
  background: #dbeafe;
  color: #1d4ed8;
}

.origin-tag.foreign {
  background: #fef3c7;
  color: #b45309;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.model-vendor {
  font-size: 15px;
  color: var(--text-muted);
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.compare-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid var(--primary);
  border-radius: 10px;
  background: transparent;
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.compare-btn:hover {
  background: var(--primary);
  color: white;
}

.compare-btn.active {
  background: var(--primary);
  color: white;
}

.compare-btn svg {
  width: 18px;
  height: 18px;
}

.compare-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  background: var(--bg-body);
  color: var(--text-main);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.compare-link:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.compare-link svg {
  width: 16px;
  height: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.info-card {
  padding: 18px;
  background: var(--bg-card);
  border-radius: var(--radius-card);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-soft);
}

.info-card.full-width {
  grid-column: 1 / -1;
}

.info-card h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 14px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-subtle);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}

.info-row .label {
  font-size: 13px;
  color: var(--text-muted);
}

.info-row .value {
  font-size: 13px;
  color: var(--text-main);
  font-weight: 500;
}

.capability-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.capability-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cap-label {
  width: 80px;
  font-size: 13px;
  color: var(--text-muted);
}

.cap-bar {
  flex: 1;
  height: 8px;
  background: var(--bg-body);
  border-radius: 4px;
  overflow: hidden;
}

.cap-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 4px;
  transition: width 0.3s;
}

.cap-value {
  width: 30px;
  font-size: 12px;
  color: var(--text-main);
  font-weight: 500;
  text-align: right;
}

.pros-list, .cons-list {
  margin: 0;
  padding-left: 18px;
}

.pros-list li, .cons-list li {
  font-size: 13px;
  color: var(--text-main);
  line-height: 1.6;
  margin-bottom: 4px;
}

.summary-text {
  font-size: 14px;
  color: var(--text-main);
  line-height: 1.7;
  margin: 0;
}

.links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.link-btn {
  padding: 8px 16px;
  background: var(--bg-body);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  font-size: 13px;
  color: var(--text-main);
  text-decoration: none;
  transition: all 0.2s;
}

.link-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.not-found {
  padding: 40px;
  text-align: center;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .action-buttons {
    width: 100%;
  }
  
  .compare-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
