<template>
  <section class="page">
    <PageHeader title="模型对比" subtitle="选择 2-4 个模型进行并排对比，帮助你做出更好的选择" />
    
    <div class="compare-container">
      <!-- 已选模型区域 -->
      <div class="selected-models">
        <div class="section-header">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            已选模型
            <span class="count-badge">{{ compareStore.count }}/{{ compareStore.max }}</span>
          </h3>
          <button v-if="compareStore.count > 0" class="clear-btn" @click="compareStore.clear()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            清空全部
          </button>
        </div>
        
        <div class="models-grid">
          <div 
            v-for="id in compareStore.ids" 
            :key="id" 
            class="model-slot filled"
          >
            <div class="slot-content" v-if="getModelById(id)">
              <div class="model-header">
                <div class="model-logo" :style="{ background: getModelGradient(getModelById(id)!.vendor) }">
                  {{ getModelById(id)!.name.charAt(0) }}
                </div>
                <div class="model-info">
                  <span class="model-name">{{ getModelById(id)!.name }}</span>
                  <span class="model-vendor">{{ getModelById(id)!.vendor }}</span>
                </div>
                <button class="remove-btn" @click="compareStore.remove(id)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div 
            v-for="i in emptySlots" 
            :key="'empty-' + i" 
            class="model-slot empty"
            @click="showModelSelector = true"
          >
            <div class="slot-content">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span>添加模型</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 对比表格 -->
      <div class="compare-table-wrapper" v-if="modelsToCompare.length >= 2">
        <div class="table-scroll">
          <table class="compare-table">
            <thead>
              <tr>
                <th class="sticky-col">对比维度</th>
                <th v-for="model in modelsToCompare" :key="model.id">
                  <div class="th-content">
                    <div class="th-logo" :style="{ background: getModelGradient(model.vendor) }">
                      {{ model.name.charAt(0) }}
                    </div>
                    <span>{{ model.name }}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="section-row">
                <td colspan="100%">基本信息</td>
              </tr>
              <tr>
                <td class="sticky-col">厂商</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-vendor'">{{ model.vendor }}</td>
              </tr>
              <tr>
                <td class="sticky-col">来源</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-origin'">
                  <span :class="['origin-badge', model.origin]">
                    {{ model.origin === 'domestic' ? '国产' : '海外' }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="sticky-col">开源</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-opensource'">
                  <span :class="['opensource-badge', { yes: model.openSource }]">
                    {{ model.openSource ? '✓ 开源' : '✗ 闭源' }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="sticky-col">部署方式</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-deploy'">{{ getDeployLabel(model.deploymentType) }}</td>
              </tr>
              <tr>
                <td class="sticky-col">上下文长度</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-context'">
                  {{ model.contextLength ? formatContext(model.contextLength) : '-' }}
                </td>
              </tr>
              
              <tr class="section-row">
                <td colspan="100%">能力评分</td>
              </tr>
              <tr v-for="(label, key) in capabilityLabels" :key="key">
                <td class="sticky-col">{{ label }}</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-' + key">
                  <div class="capability-cell">
                    <div class="cap-bar">
                      <div class="cap-fill" :style="{ width: model.capability[key] + '%' }"></div>
                    </div>
                    <span class="cap-value">{{ model.capability[key] }}</span>
                  </div>
                </td>
              </tr>
              
              <tr class="section-row">
                <td colspan="100%">价格信息</td>
              </tr>
              <tr>
                <td class="sticky-col">输入价格</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-input'">
                  <span v-if="model.inputPrice" class="price">{{ model.inputPrice }} {{ model.currency }}/M</span>
                  <span v-else class="na">-</span>
                </td>
              </tr>
              <tr>
                <td class="sticky-col">输出价格</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-output'">
                  <span v-if="model.outputPrice" class="price">{{ model.outputPrice }} {{ model.currency }}/M</span>
                  <span v-else class="na">-</span>
                </td>
              </tr>
              
              <tr class="section-row">
                <td colspan="100%">优势与劣势</td>
              </tr>
              <tr>
                <td class="sticky-col">优势</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-pros'">
                  <ul class="pros-list" v-if="model.pros?.length">
                    <li v-for="(pro, idx) in model.pros.slice(0, 3)" :key="idx">{{ pro }}</li>
                  </ul>
                  <span v-else class="na">-</span>
                </td>
              </tr>
              <tr>
                <td class="sticky-col">劣势</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-cons'">
                  <ul class="cons-list" v-if="model.cons?.length">
                    <li v-for="(con, idx) in model.cons.slice(0, 3)" :key="idx">{{ con }}</li>
                  </ul>
                  <span v-else class="na">-</span>
                </td>
              </tr>
              
              <tr class="section-row">
                <td colspan="100%">简介</td>
              </tr>
              <tr>
                <td class="sticky-col">简介</td>
                <td v-for="model in modelsToCompare" :key="model.id + '-summary'">
                  <p class="summary-text">{{ model.summary || '-' }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div class="empty-state" v-else>
        <div class="empty-icon">⚖️</div>
        <h3>请选择至少 2 个模型进行对比</h3>
        <p>从模型列表页点击"加入对比"按钮，或直接点击上方空槽添加模型</p>
        <button class="browse-btn" @click="router.push('/models')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          浏览模型
        </button>
      </div>
    </div>
    
    <!-- 模型选择器弹窗 -->
    <Transition name="modal">
      <div v-if="showModelSelector" class="modal-overlay" @click.self="showModelSelector = false">
        <div class="modal-content">
          <div class="modal-header">
            <h3>选择要对比的模型</h3>
            <button class="close-btn" @click="showModelSelector = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input v-model="searchKeyword" type="text" placeholder="搜索模型..." />
            </div>
            <div class="model-list">
              <div 
                v-for="model in availableModels" 
                :key="model.id"
                :class="['model-item', { selected: compareStore.ids.includes(model.id) }]"
                @click="toggleModel(model.id)"
              >
                <div class="item-logo" :style="{ background: getModelGradient(model.vendor) }">
                  {{ model.name.charAt(0) }}
                </div>
                <div class="item-info">
                  <span class="item-name">{{ model.name }}</span>
                  <span class="item-vendor">{{ model.vendor }}</span>
                </div>
                <div class="item-check" v-if="compareStore.ids.includes(model.id)">✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAllModels, getModelById } from '@/services/modelService';
import { useCompareStore } from '@/store/compareStore';
import PageHeader from '@/components/common/Layout/PageHeader.vue';

const router = useRouter();
const compareStore = useCompareStore();
const allModels = getAllModels();
const showModelSelector = ref(false);
const searchKeyword = ref('');

const modelsToCompare = computed(() => {
  return allModels.filter(m => compareStore.ids.includes(m.id));
});

const emptySlots = computed(() => {
  return compareStore.max - compareStore.count;
});

const availableModels = computed(() => {
  if (!searchKeyword.value) return allModels;
  const keyword = searchKeyword.value.toLowerCase();
  return allModels.filter(m => 
    m.name.toLowerCase().includes(keyword) ||
    m.vendor.toLowerCase().includes(keyword)
  );
});

function toggleModel(id: string) {
  compareStore.toggle(id);
}

const modelGradients: Record<string, string> = {
  'OpenAI': 'linear-gradient(135deg, #10a37f 0%, #1a7f64 100%)',
  'Anthropic': 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
  '深度求索': 'linear-gradient(135deg, #4f6ef7 0%, #3a5bd9 100%)',
  '百度': 'linear-gradient(135deg, #2932e1 0%, #1e2ab8 100%)',
  '阿里云': 'linear-gradient(135deg, #ff6a00 0%, #ee5a00 100%)',
  '智谱AI': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
};

function getModelGradient(vendor: string): string {
  return modelGradients[vendor] || 'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)';
}

function getDeployLabel(type: string): string {
  const labels: Record<string, string> = {
    'cloud': '云端 API',
    'local': '本地部署',
    'both': '本地 + 云端'
  };
  return labels[type] || type;
}

function formatContext(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

type CapabilityKey = 'general' | 'code' | 'reasoning' | 'longContext' | 'multimodal' | 'ragFit';

const capabilityLabels: Record<CapabilityKey, string> = {
  general: '综合能力',
  code: '代码能力',
  reasoning: '推理能力',
  longContext: '长文本',
  multimodal: '多模态',
  ragFit: 'RAG 适配'
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.compare-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Selected Models */
.selected-models {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  padding: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-header h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.section-header h3 svg {
  width: 20px;
  height: 20px;
  color: var(--primary);
}

.count-badge {
  padding: 4px 10px;
  background: var(--primary);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid #ef4444;
  border-radius: 8px;
  background: transparent;
  color: #ef4444;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #ef4444;
  color: white;
}

.clear-btn svg {
  width: 16px;
  height: 16px;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.model-slot {
  border-radius: 16px;
  border: 2px dashed var(--border-subtle);
  background: var(--bg-body);
  min-height: 100px;
  transition: all 0.2s;
}

.model-slot.filled {
  border-style: solid;
  border-color: var(--border-subtle);
  background: var(--bg-card);
}

.model-slot.empty {
  cursor: pointer;
}

.model-slot.empty:hover {
  border-color: var(--primary);
  background: rgba(0, 122, 255, 0.05);
}

.slot-content {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.model-slot.empty .slot-content {
  color: var(--text-muted);
}

.model-slot.empty .slot-content svg {
  width: 32px;
  height: 32px;
}

.model-slot.empty .slot-content span {
  font-size: 14px;
  font-weight: 500;
}

.model-header {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.model-logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.model-info {
  flex: 1;
  min-width: 0;
}

.model-name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
}

.model-vendor {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
}

.remove-btn {
  width: 28px;
  height: 28px;
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

.remove-btn:hover {
  background: #ef4444;
  color: white;
}

.remove-btn svg {
  width: 14px;
  height: 14px;
}

/* Compare Table */
.compare-table-wrapper {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.table-scroll {
  overflow-x: auto;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.compare-table th,
.compare-table td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
  min-width: 180px;
}

.compare-table th {
  background: var(--bg-body);
  font-weight: 600;
  color: var(--text-main);
  position: sticky;
  top: 0;
}

.compare-table th.sticky-col,
.compare-table td.sticky-col {
  position: sticky;
  left: 0;
  background: var(--bg-card);
  z-index: 1;
  min-width: 120px;
  font-weight: 500;
  color: var(--text-muted);
}

.compare-table th.sticky-col {
  background: var(--bg-body);
}

.th-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.th-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.section-row td {
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.06) 0%, rgba(0, 180, 216, 0.06) 100%);
  font-weight: 600;
  color: var(--primary);
  padding: 12px 20px;
}

.origin-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.origin-badge.domestic {
  background: #dbeafe;
  color: #1d4ed8;
}

.origin-badge.foreign {
  background: #fef3c7;
  color: #b45309;
}

.opensource-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: #fee2e2;
  color: #dc2626;
}

.opensource-badge.yes {
  background: #d1fae5;
  color: #059669;
}

.capability-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cap-bar {
  flex: 1;
  height: 8px;
  background: var(--bg-body);
  border-radius: 4px;
  overflow: hidden;
  min-width: 60px;
}

.cap-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, #00B4D8 100%);
  border-radius: 4px;
}

.cap-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  min-width: 24px;
}

.price {
  font-weight: 600;
  color: var(--primary);
}

.na {
  color: var(--text-muted);
}

.pros-list, .cons-list {
  margin: 0;
  padding-left: 16px;
  font-size: 13px;
  line-height: 1.6;
}

.pros-list li {
  color: #059669;
}

.cons-list li {
  color: #dc2626;
}

.summary-text {
  margin: 0;
  font-size: 13px;
  color: var(--text-main);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
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

.browse-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
}

.browse-btn svg {
  width: 18px;
  height: 18px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--bg-card);
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-subtle);
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--bg-body);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--border-subtle);
  color: var(--text-main);
}

.close-btn svg {
  width: 18px;
  height: 18px;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
}

.search-box {
  position: relative;
  margin-bottom: 16px;
}

.search-box svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-muted);
}

.search-box input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  font-size: 14px;
  background: var(--bg-body);
  color: var(--text-main);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary);
}

.model-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.model-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.model-item:hover {
  background: var(--bg-body);
}

.model-item.selected {
  background: rgba(0, 122, 255, 0.1);
  border: 1px solid var(--primary);
}

.item-logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: white;
}

.item-info {
  flex: 1;
}

.item-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
}

.item-vendor {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
}

.item-check {
  width: 24px;
  height: 24px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .models-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .models-grid {
    grid-template-columns: 1fr;
  }
  
  .compare-table th,
  .compare-table td {
    padding: 12px 14px;
    min-width: 140px;
  }
}
</style>
