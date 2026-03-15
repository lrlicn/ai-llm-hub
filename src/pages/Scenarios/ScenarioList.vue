<template>
  <section class="page">
    <div class="content-wrapper card-box">
      <!-- Category Filter -->
      <div class="category-section">
        <div class="category-header">
          <div class="category-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>场景分类</span>
          </div>
          <div class="category-count">{{ filteredScenarios.length }} 个场景</div>
        </div>
        <div class="category-tabs">
          <button
            v-for="cat in categories"
            :key="cat.value"
            :class="['category-tab', { active: selectedCategory === cat.value }]"
            @click="selectedCategory = cat.value"
          >
            <span class="tab-icon">{{ cat.icon }}</span>
            <span class="tab-text">{{ cat.label }}</span>
          </button>
        </div>
      </div>

      <!-- Scenario Grid -->
      <div class="scenario-grid">
        <div
          v-for="scenario in filteredScenarios"
          :key="scenario.id"
          class="scenario-card"
          @click="goTo(`/scenarios/${scenario.id}`)"
        >
          <div class="card-glow" :style="{ background: getScenarioGradient(scenario.id) }"></div>
          <div class="card-content">
            <div class="card-header">
              <div class="card-icon-wrapper" :style="{ background: getScenarioGradient(scenario.id) }">
                <span class="card-icon">{{ getScenarioIcon(scenario.id) }}</span>
              </div>
              <div class="card-meta">
                <span class="card-category">{{ getCategoryLabel(scenario.category) }}</span>
                <span class="card-count">{{ scenario.recommendedModels.length }} 个推荐</span>
              </div>
            </div>

            <div class="card-body">
              <h3 class="card-title">{{ scenario.name }}</h3>
              <p class="card-desc">{{ scenario.description }}</p>
            </div>

            <div class="card-concerns">
              <div class="concerns-label">核心关注点</div>
              <div class="concerns-tags">
                <span
                  v-for="(concern, idx) in scenario.keyConcerns.slice(0, 4)"
                  :key="idx"
                  class="concern-tag"
                  :style="{ background: getTagColor(idx) }"
                >
                  {{ concern }}
                </span>
              </div>
            </div>

            <div class="card-footer">
              <div class="model-preview">
                <div class="model-avatars">
                  <div
                    v-for="(rec, idx) in scenario.recommendedModels.slice(0, 3)"
                    :key="idx"
                    class="model-avatar"
                    :style="{
                      background: getModelGradient(rec.modelId),
                      zIndex: 3 - idx,
                      marginLeft: idx > 0 ? '-8px' : '0'
                    }"
                  >
                    {{ getModelInitial(rec.modelId) }}
                  </div>
                  <div v-if="scenario.recommendedModels.length > 3" class="model-avatar more">
                    +{{ scenario.recommendedModels.length - 3 }}
                  </div>
                </div>
                <span class="preview-text">查看推荐方案</span>
              </div>
              <div class="arrow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredScenarios.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>暂无该分类场景</h3>
        <p>请选择其他分类查看</p>
      </div>

      <!-- Tips Section -->
      <div class="tips-section">
        <div class="tips-card">
          <div class="tips-icon">💡</div>
          <div class="tips-content">
            <h4>如何选择合适的场景？</h4>
            <p>根据你的主要业务需求选择最匹配的场景。每个场景都经过精心分析，推荐了在该场景下表现最优的模型组合。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAllScenarios } from '@/services/scenarioService';
import { getModelById } from '@/services/modelService';

const router = useRouter();
const scenarios = getAllScenarios();
const selectedCategory = ref('all');

const goTo = (path: string) => {
  router.push(path);
};

// Categories
const categories = [
  { label: '全部场景', value: 'all', icon: '🎯' },
  { label: '开发编程', value: 'development', icon: '💻' },
  { label: '知识问答', value: 'knowledge', icon: '📚' },
  { label: '内容创作', value: 'creation', icon: '✍️' },
  { label: '数据分析', value: 'analysis', icon: '📊' },
  { label: '学术研究', value: 'research', icon: '🎓' },
  { label: '企业应用', value: 'enterprise', icon: '🏢' }
];

const filteredScenarios = computed(() => {
  if (selectedCategory.value === 'all') return scenarios;
  return scenarios.filter(s => s.category === selectedCategory.value);
});

function getCategoryLabel(category?: string): string {
  const cat = categories.find(c => c.value === category);
  return cat?.label || category || '其他';
}

function getScenarioIcon(id: string): string {
  const icons: Record<string, string> = {
    'code-assistant': '💻',
    'knowledge-qa': '📚',
    'content-creation': '✍️',
    'data-analysis': '📊',
    'academic-research': '🎓',
    'enterprise-app': '🏢'
  };
  return icons[id] || '🎯';
}

const scenarioGradients: Record<string, string> = {
  'code-assistant': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'knowledge-qa': 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
  'content-creation': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
  'data-analysis': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  'academic-research': 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
  'enterprise-app': 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)'
};

function getScenarioGradient(id: string): string {
  return scenarioGradients[id] || 'linear-gradient(135deg, #007AFF 0%, #00B4D8 100%)';
}

const tagColors = [
  'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
  'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
  'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)'
];

function getTagColor(index: number): string {
  return tagColors[index % tagColors.length];
}

function getModelInitial(modelId: string): string {
  const model = getModelById(modelId);
  return model ? model.name.charAt(0).toUpperCase() : '?';
}

const modelGradients: Record<string, string> = {
  'gpt-4o': 'linear-gradient(135deg, #10a37f 0%, #1a7f64 100%)',
  'claude-3-5-sonnet': 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
  'deepseek-v3': 'linear-gradient(135deg, #4f6ef7 0%, #3a5bd9 100%)',
  'qwen-max': 'linear-gradient(135deg, #ff6a00 0%, #ee5a00 100%)',
  'glm-4': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  'kimi-k1-5': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
};

function getModelGradient(modelId: string): string {
  return modelGradients[modelId] || 'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)';
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Content Wrapper */
.content-wrapper.card-box {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  padding: 20px;
}

/* Category Section */
.category-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.03) 0%, rgba(0, 180, 216, 0.03) 100%);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--primary);
}

.category-title svg {
  width: 18px;
  height: 18px;
}

.category-count {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
  padding: 6px 14px;
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
}

.category-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  font-size: 14px;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.category-tab:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(0, 122, 255, 0.15);
}

.category-tab.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 8px 24px -4px rgba(0, 122, 255, 0.35);
}

.tab-icon {
  font-size: 18px;
}

.tab-text {
  font-weight: 500;
}

/* Scenario Grid */
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
}

.scenario-card {
  position: relative;
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.scenario-card:hover {
  border-color: transparent;
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.15);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  opacity: 0.8;
  transition: height 0.3s ease;
}

.scenario-card:hover .card-glow {
  height: 100%;
  opacity: 0.05;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 24px;
  background: var(--bg-card);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 28px;
}

.card-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.card-category {
  padding: 4px 12px;
  background: var(--bg-body);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}

.card-count {
  font-size: 12px;
  color: var(--primary);
  font-weight: 500;
}

.card-body {
  flex: 1;
  margin-bottom: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 10px 0;
}

.card-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-concerns {
  margin-bottom: 20px;
}

.concerns-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.concerns-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.concern-tag {
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-main);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
}

.model-preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.model-avatars {
  display: flex;
  align-items: center;
}

.model-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border: 2px solid var(--bg-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.model-avatar.more {
  background: var(--bg-body);
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 600;
}

.preview-text {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.arrow-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--bg-body);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.arrow-icon svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.scenario-card:hover .arrow-icon {
  background: var(--primary);
  color: white;
}

.scenario-card:hover .arrow-icon svg {
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
  margin: 0;
}

/* Tips Section */
.tips-section {
  margin-top: 16px;
}

.tips-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.06) 0%, rgba(0, 180, 216, 0.06) 100%);
  border: 1px solid rgba(0, 122, 255, 0.15);
  border-radius: 16px;
}

.tips-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.tips-content h4 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 8px 0;
}

.tips-content p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 40px 24px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .category-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
  }
  
  .category-tab {
    white-space: nowrap;
  }
  
  .scenario-grid {
    grid-template-columns: 1fr;
  }
  
  .tips-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
