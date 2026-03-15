<template>
  <section class="page">
    <div class="content-wrapper card-box">
      <!-- Filter Section -->
      <div class="filter-wrapper">
        <!-- 搜索栏 - 独立一行 -->
        <div class="search-section">
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              v-model="keyword"
              type="text"
              placeholder="搜索模型名称、厂商..."
              class="search-input"
            />
            <button v-if="keyword" class="clear-btn" @click="keyword = ''">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 筛选条件 -->
        <div class="filter-section">
          <div class="filter-row">
            <span class="filter-section-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              筛选条件
            </span>
            <div class="filter-categories">
              <div class="filter-category">
                <span class="filter-label">来源</span>
                <div class="filter-tags">
                  <button
                    v-for="opt in originOptions"
                    :key="opt.value"
                    :class="['filter-tag', { active: filters.origin === opt.value }]"
                    @click="filters.origin = opt.value"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>
              <div class="filter-category">
                <span class="filter-label">类型</span>
                <div class="filter-tags">
                  <button
                    v-for="opt in typeOptions"
                    :key="opt.value"
                    :class="['filter-tag', { active: filters.type === opt.value }]"
                    @click="filters.type = opt.value"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>
              <div class="filter-category">
                <span class="filter-label">开源</span>
                <div class="filter-tags">
                  <button
                    v-for="opt in openSourceOptions"
                    :key="opt.value"
                    :class="['filter-tag', { active: filters.openSource === opt.value }]"
                    @click="filters.openSource = opt.value"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>
              <div class="filter-category">
                <span class="filter-label">部署</span>
                <div class="filter-tags">
                  <button
                    v-for="opt in deployOptions"
                    :key="opt.value"
                    :class="['filter-tag', { active: filters.deployment === opt.value }]"
                    @click="filters.deployment = opt.value"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 工具栏 -->
        <div class="filter-toolbar">
          <div class="toolbar-left">
            <div class="sort-box">
              <span class="sort-label">排序方式</span>
              <select v-model="sortBy" class="sort-select">
                <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>
          </div>
          <button class="reset-btn" @click="resetFilters">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"/>
              <path d="M3 3v9h9"/>
            </svg>
            重置筛选
          </button>
        </div>
      </div>

      <!-- Results Info -->
      <div class="results-info">
        <span class="results-count">共找到 <strong>{{ filteredModels.length }}</strong> 个模型</span>
      </div>

      <!-- Model Grid -->
      <div class="model-grid">
        <div
          v-for="model in filteredModels"
          :key="model.id"
          class="model-card"
          @click="goTo(`/models/${model.id}`)"
        >
          <div class="card-header">
            <div class="card-icon-wrapper">
              <div class="card-icon" :style="{ background: getModelGradient(model.vendor) }">
                {{ getModelIcon(model) }}
              </div>
              <div class="card-badges">
                <span :class="['origin-badge', model.origin]">
                  {{ model.origin === 'domestic' ? '国产' : '海外' }}
                </span>
                <span v-if="model.openSource" class="opensource-badge">开源</span>
              </div>
            </div>
            <div class="card-title-section">
              <h3 class="card-title">{{ model.name }}</h3>
              <p class="card-vendor">{{ model.vendor }}</p>
            </div>
          </div>

          <div class="card-body">
            <p class="card-summary">{{ model.summary }}</p>

            <div class="capability-preview">
              <div class="capability-item">
                <span class="cap-label">综合</span>
                <div class="cap-bar">
                  <div class="cap-fill" :style="{ width: model.capability.general + '%' }"></div>
                </div>
                <span class="cap-value">{{ model.capability.general }}</span>
              </div>
              <div class="capability-item">
                <span class="cap-label">代码</span>
                <div class="cap-bar">
                  <div class="cap-fill code" :style="{ width: model.capability.code + '%' }"></div>
                </div>
                <span class="cap-value">{{ model.capability.code }}</span>
              </div>
            </div>
          </div>

          <div class="card-tags">
            <span class="tag type-tag">{{ getTypeLabel(model.modelType) }}</span>
            <span class="tag deploy-tag">{{ getDeployLabel(model.deploymentType) }}</span>
            <span v-if="model.contextLength" class="tag context-tag">
              {{ formatContext(model.contextLength) }}
            </span>
          </div>

          <div class="card-footer">
            <div class="price-section" v-if="model.inputPrice">
              <span class="price-label">输入</span>
              <span class="price-value">{{ model.inputPrice }} {{ model.currency }}/M</span>
            </div>
            <div class="price-section" v-if="model.outputPrice">
              <span class="price-label">输出</span>
              <span class="price-value">{{ model.outputPrice }} {{ model.currency }}/M</span>
            </div>
            <div class="view-btn">
              <span>查看详情</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredModels.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>未找到匹配的模型</h3>
        <p>尝试调整筛选条件或搜索关键词</p>
        <button class="reset-btn-large" @click="resetFilters">重置所有筛选</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAllModels } from '@/services/modelService';
import type { Model } from '@/types/model';

const router = useRouter();
const models = getAllModels();
const keyword = ref('');
const sortBy = ref('general');
const filters = ref({
  origin: 'all',
  type: 'all',
  openSource: 'all',
  deployment: 'all'
});

const goTo = (path: string) => {
  router.push(path);
};



// Filter Options
const originOptions = [
  { label: '全部', value: 'all' },
  { label: '国产', value: 'domestic' },
  { label: '海外', value: 'foreign' }
];

const typeOptions = [
  { label: '全部', value: 'all' },
  { label: '通用', value: 'general' },
  { label: '代码', value: 'code' },
  { label: '多模态', value: 'multimodal' }
];

const openSourceOptions = [
  { label: '全部', value: 'all' },
  { label: '开源', value: 'true' },
  { label: '闭源', value: 'false' }
];

const deployOptions = [
  { label: '全部', value: 'all' },
  { label: '云端', value: 'cloud' },
  { label: '本地', value: 'local' },
  { label: '均可', value: 'both' }
];

const sortOptions = [
  { label: '综合评分', value: 'general' },
  { label: '代码能力', value: 'code' },
  { label: '推理能力', value: 'reasoning' },
  { label: '上下文长度', value: 'context' },
  { label: '价格从低到高', value: 'price_asc' },
  { label: '价格从高到低', value: 'price_desc' }
];

// Filter Logic
const filteredModels = computed(() => {
  let result = models.filter(m => {
    const matchKeyword = !keyword.value || 
      m.name.toLowerCase().includes(keyword.value.toLowerCase()) ||
      m.vendor.toLowerCase().includes(keyword.value.toLowerCase());
    const matchOrigin = filters.value.origin === 'all' || m.origin === filters.value.origin;
    const matchType = filters.value.type === 'all' || m.modelType === filters.value.type;
    const matchOpenSource = filters.value.openSource === 'all' || 
      String(m.openSource) === filters.value.openSource;
    const matchDeploy = filters.value.deployment === 'all' || m.deploymentType === filters.value.deployment;
    return matchKeyword && matchOrigin && matchType && matchOpenSource && matchDeploy;
  });

  // Sort
  result = [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'general':
        return b.capability.general - a.capability.general;
      case 'code':
        return b.capability.code - a.capability.code;
      case 'reasoning':
        return (b.capability.reasoning || 0) - (a.capability.reasoning || 0);
      case 'context':
        return (b.contextLength || 0) - (a.contextLength || 0);
      case 'price_asc':
        return (a.inputPrice || Infinity) - (b.inputPrice || Infinity);
      case 'price_desc':
        return (b.inputPrice || 0) - (a.inputPrice || 0);
      default:
        return 0;
    }
  });

  return result;
});

function resetFilters() {
  keyword.value = '';
  sortBy.value = 'general';
  filters.value = {
    origin: 'all',
    type: 'all',
    openSource: 'all',
    deployment: 'all'
  };
}

function getModelIcon(model: Model): string {
  if (model.id.includes('gpt')) return '🤖';
  if (model.id.includes('claude')) return '🧠';
  if (model.id.includes('deepseek')) return '🔍';
  if (model.id.includes('ernie')) return '📖';
  if (model.id.includes('qwen')) return '⚡';
  if (model.id.includes('glm')) return '🎓';
  if (model.id.includes('llama')) return '🦙';
  if (model.id.includes('gemini')) return '💎';
  return '🤖';
}

const modelGradients: Record<string, string> = {
  'OpenAI': 'linear-gradient(135deg, #10a37f 0%, #1a7f64 100%)',
  'Anthropic': 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
  '深度求索': 'linear-gradient(135deg, #4f6ef7 0%, #3a5bd9 100%)',
  '百度': 'linear-gradient(135deg, #2932e1 0%, #1e2ab8 100%)',
  '阿里云': 'linear-gradient(135deg, #ff6a00 0%, #ee5a00 100%)',
  '智谱AI': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  '月之暗面': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  '零一万物': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  'Meta': 'linear-gradient(135deg, #0081fb 0%, #0066cc 100%)',
  'Google': 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)'
};

function getModelGradient(vendor: string): string {
  return modelGradients[vendor] || 'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)';
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'general': '通用模型',
    'code': '代码专用',
    'multimodal': '多模态'
  };
  return labels[type] || type;
}

function getDeployLabel(type: string): string {
  const labels: Record<string, string> = {
    'cloud': '云端 API',
    'local': '本地部署',
    'both': '均可部署'
  };
  return labels[type] || type;
}

function formatContext(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M 上下文';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K 上下文';
  return num + ' 上下文';
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Content Wrapper */
.content-wrapper.card-box {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  padding: 20px;
}

/* Filter Section */
.filter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.03) 0%, rgba(0, 180, 216, 0.03) 100%);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
}

/* 搜索栏 */
.search-section {
  display: flex;
  justify-content: center;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 520px;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  padding: 14px 44px 14px 50px;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  font-size: 15px;
  background: var(--bg-card);
  color: var(--text-main);
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1), 0 4px 12px rgba(0, 122, 255, 0.1);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.clear-btn {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  border: none;
  background: var(--bg-body);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.2s;
}

.clear-btn:hover {
  background: var(--border-subtle);
  color: var(--text-main);
}

.clear-btn svg {
  width: 14px;
  height: 14px;
}

/* 筛选条件区域 */
.filter-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.filter-section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  white-space: nowrap;
  padding-top: 8px;
}

.filter-section-label svg {
  width: 16px;
  height: 16px;
}

.filter-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  flex: 1;
}

.filter-category {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
}

.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tag {
  padding: 7px 16px;
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  background: var(--bg-card);
  font-size: 13px;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.filter-tag:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-1px);
}

.filter-tag.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.25);
}

/* 工具栏 */
.filter-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sort-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.sort-select {
  padding: 10px 36px 10px 16px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  font-size: 13px;
  background: var(--bg-card);
  color: var(--text-main);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: all 0.2s;
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary);
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(0, 122, 255, 0.05);
}

.reset-btn svg {
  width: 16px;
  height: 16px;
}

/* Results Info */
.results-info {
  padding: 0 4px;
}

.results-count {
  font-size: 14px;
  color: var(--text-muted);
}

.results-count strong {
  color: var(--primary);
  font-weight: 600;
}

/* Model Grid */
.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.model-card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.25s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.model-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px -12px rgba(0, 122, 255, 0.2);
}

.card-header {
  padding: 20px 20px 16px;
  display: flex;
  gap: 16px;
}

.card-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.card-badges {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
}

.origin-badge {
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.origin-badge.domestic {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1d4ed8;
}

.origin-badge.foreign {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #b45309;
}

.opensource-badge {
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #047857;
}

.card-title-section {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 4px 0;
}

.card-vendor {
  font-size: 13px;
  color: var(--text-muted);
}

.card-body {
  padding: 0 20px 16px;
  flex: 1;
}

.card-summary {
  font-size: 13px;
  color: var(--text-main);
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.capability-preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.capability-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cap-label {
  font-size: 12px;
  color: var(--text-muted);
  width: 32px;
  flex-shrink: 0;
}

.cap-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-body);
  border-radius: 3px;
  overflow: hidden;
}

.cap-fill {
  height: 100%;
  background: linear-gradient(90deg, #007AFF 0%, #00B4D8 100%);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.cap-fill.code {
  background: linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%);
}

.cap-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  width: 24px;
  text-align: right;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 20px 16px;
}

.tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}

.type-tag {
  background: var(--bg-body);
  color: var(--text-muted);
}

.deploy-tag {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: var(--primary);
}

.context-tag {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  color: #7c3aed;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: var(--bg-body);
  border-top: 1px solid var(--border-subtle);
  gap: 16px;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-label {
  font-size: 10px;
  color: var(--text-muted);
}

.price-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--primary);
  color: white;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  margin-left: auto;
  transition: all 0.2s;
}

.view-btn svg {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}

.model-card:hover .view-btn svg {
  transform: translateX(3px);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 8px 0;
}

.empty-state p {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0 0 24px 0;
}

.reset-btn-large {
  padding: 12px 28px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 32px 24px;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .hero-stats {
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-item {
    width: calc(50% - 8px);
  }
  
  .filter-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .filter-group {
    flex-wrap: wrap;
  }
  
  .filter-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
    min-width: auto;
  }
  
  .model-grid {
    grid-template-columns: 1fr;
  }
}
</style>
