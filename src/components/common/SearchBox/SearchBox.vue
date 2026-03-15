<template>
  <div class="search-box" ref="searchBoxRef">
    <div class="search-input-wrapper" :class="{ active: isOpen }">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        class="search-input"
        placeholder="全站搜索模型、场景、文档..."
        @focus="openDropdown"
        @keydown.down.prevent="navigateDown"
        @keydown.up.prevent="navigateUp"
        @keydown.enter.prevent="selectCurrent"
        @keydown.esc="closeDropdown"
      />
      <button v-if="query" class="search-clear" @click="clearQuery">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <Transition name="dropdown">
      <div v-if="isOpen" class="search-dropdown">
        <!-- 搜索结果 -->
        <div v-if="query.trim()" class="dropdown-content">
          <div v-if="groupedResults.length === 0" class="dropdown-empty">
            <div class="empty-icon">😕</div>
            <p>未找到相关结果</p>
            <span class="tip">试试其他关键词</span>
          </div>

          <template v-else>
            <div
              v-for="group in groupedResults"
              :key="group.type"
              class="result-group"
            >
              <div class="group-header">
                <span class="group-icon">{{ group.icon }}</span>
                <span class="group-title">{{ group.title }}</span>
              </div>
              <div class="group-items">
                <div
                  v-for="item in group.items"
                  :key="item.id"
                  class="result-item"
                  :class="{ active: isActive(item) }"
                  @click="goToResult(item)"
                  @mouseenter="setActive(item)"
                >
                  <div class="item-main">
                    <span class="item-title" v-html="highlightText(item.title)"></span>
                    <span v-if="item.subtitle" class="item-subtitle">{{ item.subtitle }}</span>
                  </div>
                  <span class="item-type">{{ item.typeLabel }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 默认状态：热门搜索 -->
        <div v-else class="dropdown-content">
          <div class="hot-searches">
            <div class="hot-header">
              <span class="hot-icon">🔥</span>
              <span class="hot-title">热门搜索</span>
            </div>
            <div class="hot-tags">
              <button
                v-for="tag in hotSearches"
                :key="tag"
                class="hot-tag"
                @click.stop="searchTag(tag)"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <div class="quick-links">
            <div class="quick-header">
              <span class="quick-icon">⚡</span>
              <span class="quick-title">快速访问</span>
            </div>
            <div class="quick-items">
              <div
                v-for="item in quickLinks"
                :key="item.path"
                class="quick-item"
                @click="goTo(item.path)"
              >
                <span class="quick-icon-small">{{ item.icon }}</span>
                <span class="quick-label">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Fuse from 'fuse.js';
import { getAllModels } from '@/services/modelService';
import { getAllScenarios } from '@/services/scenarioService';
import { getAllDocsMeta } from '@/services/docService';

interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'model' | 'scenario' | 'doc';
  typeLabel: string;
  path: string;
}

const router = useRouter();
const isOpen = ref(false);
const query = ref('');
const inputRef = ref<HTMLInputElement>();
const searchBoxRef = ref<HTMLDivElement>();
const activeItem = ref<SearchItem | null>(null);

// 热门搜索关键词
const hotSearches = [
  'GPT',
  'Claude',
  '代码生成',
  '中文处理',
  '多模态',
  '开源模型',
  '长文本',
  'API调用'
];

// 快速访问链接
const quickLinks = [
  { path: '/models', label: '模型目录', icon: '🤖' },
  { path: '/scenarios', label: '场景推荐', icon: '🎯' },
  { path: '/docs', label: '知识库', icon: '📚' },
];

// 构建搜索索引
const searchIndex = computed(() => {
  const items: SearchItem[] = [];

  const models = getAllModels();
  models.forEach(model => {
    items.push({
      id: `model-${model.id}`,
      title: model.name,
      subtitle: model.vendor,
      type: 'model',
      typeLabel: '模型',
      path: `/models/${model.id}`
    });
  });

  const scenarios = getAllScenarios();
  scenarios.forEach(scenario => {
    items.push({
      id: `scenario-${scenario.id}`,
      title: scenario.name,
      subtitle: scenario.description.slice(0, 50) + '...',
      type: 'scenario',
      typeLabel: '场景',
      path: `/scenarios/${scenario.id}`
    });
  });

  const docs = getAllDocsMeta();
  docs.forEach(doc => {
    items.push({
      id: `doc-${doc.slug}`,
      title: doc.title,
      subtitle: doc.summary,
      type: 'doc',
      typeLabel: '文档',
      path: `/docs/${doc.slug}`
    });
  });

  return items;
});

// Fuse.js 配置
const fuse = computed(() => {
  return new Fuse(searchIndex.value, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'subtitle', weight: 0.3 },
    ],
    threshold: 0.4,
    includeScore: true,
  });
});

// 搜索结果
const results = computed(() => {
  if (!query.value.trim()) return [];
  return fuse.value.search(query.value).map(result => result.item);
});

// 分组结果
const groupedResults = computed(() => {
  const groups: { type: string; title: string; icon: string; items: SearchItem[] }[] = [];

  const models = results.value.filter(r => r.type === 'model');
  if (models.length) {
    groups.push({ type: 'model', title: '模型', icon: '🤖', items: models.slice(0, 5) });
  }

  const scenarios = results.value.filter(r => r.type === 'scenario');
  if (scenarios.length) {
    groups.push({ type: 'scenario', title: '场景', icon: '🎯', items: scenarios.slice(0, 3) });
  }

  const docs = results.value.filter(r => r.type === 'doc');
  if (docs.length) {
    groups.push({ type: 'doc', title: '文档', icon: '📚', items: docs.slice(0, 3) });
  }

  return groups;
});

// 所有结果项（用于键盘导航）
const allResults = computed(() => {
  return groupedResults.value.flatMap(g => g.items);
});

// 高亮匹配文本
const highlightText = (text: string) => {
  if (!query.value.trim()) return text;
  const regex = new RegExp(`(${query.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// 打开下拉框
const openDropdown = () => {
  isOpen.value = true;
  activeItem.value = null;
};

// 关闭下拉框
const closeDropdown = () => {
  isOpen.value = false;
  query.value = '';
  activeItem.value = null;
};

// 清除搜索
const clearQuery = () => {
  query.value = '';
  inputRef.value?.focus();
};

// 搜索标签
const searchTag = (tag: string) => {
  query.value = tag;
  openDropdown();
  nextTick(() => {
    inputRef.value?.focus();
  });
};

// 跳转到结果
const goToResult = (item: SearchItem) => {
  router.push(item.path);
  closeDropdown();
};

// 直接跳转
const goTo = (path: string) => {
  router.push(path);
  closeDropdown();
};

// 检查是否激活
const isActive = (item: SearchItem) => {
  return activeItem.value?.id === item.id;
};

// 设置激活项
const setActive = (item: SearchItem) => {
  activeItem.value = item;
};

// 键盘导航 - 向下
const navigateDown = () => {
  const items = allResults.value;
  if (items.length === 0) return;

  if (!activeItem.value) {
    activeItem.value = items[0];
  } else {
    const currentIndex = items.findIndex(i => i.id === activeItem.value?.id);
    const nextIndex = (currentIndex + 1) % items.length;
    activeItem.value = items[nextIndex];
  }
};

// 键盘导航 - 向上
const navigateUp = () => {
  const items = allResults.value;
  if (items.length === 0) return;

  if (!activeItem.value) {
    activeItem.value = items[items.length - 1];
  } else {
    const currentIndex = items.findIndex(i => i.id === activeItem.value?.id);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    activeItem.value = items[prevIndex];
  }
};

// 选择当前项
const selectCurrent = () => {
  if (activeItem.value) {
    goToResult(activeItem.value);
  }
};

// 监听结果变化，自动选中第一项
watch(results, (newResults) => {
  if (newResults.length > 0 && query.value.trim()) {
    activeItem.value = newResults[0];
  } else {
    activeItem.value = null;
  }
});

// 点击外部关闭
const handleClickOutside = (e: MouseEvent) => {
  if (searchBoxRef.value && !searchBoxRef.value.contains(e.target as Node)) {
    closeDropdown();
  }
};

// 全局快捷键
const handleKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (isOpen.value) {
      closeDropdown();
    } else {
      openDropdown();
      nextTick(() => inputRef.value?.focus());
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.search-box {
  position: relative;
  width: 280px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  transition: all 0.2s ease;
}

.search-input-wrapper:hover,
.search-input-wrapper.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.search-icon {
  width: 16px;
  height: 16px;
  color: var(--text-muted);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--text-main);
  outline: none;
  width: 100%;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: var(--bg-body);
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.search-clear:hover {
  background: var(--border-subtle);
  color: var(--text-main);
}

.search-clear svg {
  width: 12px;
  height: 12px;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
}

.dropdown-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.dropdown-empty p {
  font-size: 14px;
  color: var(--text-main);
  margin: 0 0 4px;
}

.tip {
  font-size: 12px;
  color: var(--text-muted);
}

/* 热门搜索 */
.hot-searches {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-subtle);
}

.hot-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.hot-icon {
  font-size: 14px;
}

.hot-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

.hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hot-tag {
  padding: 6px 12px;
  font-size: 13px;
  color: var(--text-main);
  background: var(--bg-body);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hot-tag:hover {
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--primary);
}

/* 快速访问 */
.quick-links {
  padding: 12px 16px;
}

.quick-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.quick-icon {
  font-size: 14px;
}

.quick-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

.quick-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.quick-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.quick-item:hover {
  background: var(--bg-hover);
}

.quick-icon-small {
  font-size: 16px;
}

.quick-label {
  font-size: 13px;
  color: var(--text-main);
}

/* 搜索结果 */
.result-group {
  padding: 8px 0;
}

.result-group:not(:last-child) {
  border-bottom: 1px solid var(--border-subtle);
}

.group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.group-icon {
  font-size: 12px;
}

.group-items {
  padding: 0 12px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.result-item:hover,
.result-item.active {
  background: var(--bg-hover);
}

.item-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.item-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-title :deep(mark) {
  background: rgba(255, 214, 0, 0.4);
  color: inherit;
  padding: 0 2px;
  border-radius: 2px;
}

.item-subtitle {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-type {
  flex-shrink: 0;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 500;
  color: var(--primary);
  background: var(--primary-light);
  border-radius: 4px;
}

/* 动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .search-box {
    width: 200px;
  }

  .search-dropdown {
    position: fixed;
    top: 60px;
    left: 16px;
    right: 16px;
    width: auto;
  }
}
</style>
