<template>
  <section class="page">
    <!-- Main Content -->
    <div class="content-layout">
      <!-- Left: Doc List -->
      <div class="content-main card-box">
        <!-- Filter Bar -->
        <div class="filter-bar">
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="搜索文章标题、内容..."
              class="search-input"
            />
            <button v-if="searchKeyword" class="clear-btn" @click="searchKeyword = ''">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="category-pills">
            <button
              v-for="cat in categories"
              :key="cat"
              :class="['category-pill', { active: selectedCategory === cat }]"
              @click="selectedCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Results Info -->
        <div class="results-info">
          <span class="results-count">
            共 <strong>{{ filteredDocs.length }}</strong> 篇文章
            <span v-if="selectedCategory !== '全部'" class="filter-tag">
              · {{ selectedCategory }}
            </span>
          </span>
          <div class="sort-options">
            <button
              v-for="opt in sortOptions"
              :key="opt.value"
              :class="['sort-btn', { active: sortBy === opt.value }]"
              @click="sortBy = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Doc Grid -->
        <div class="doc-grid" v-if="filteredDocs.length">
          <div
            v-for="doc in filteredDocs"
            :key="doc.slug"
            class="doc-card"
            @click="goTo(`/docs/${doc.slug}`)"
          >
            <div class="card-header">
              <span class="card-category" :style="{ background: getCategoryColor(doc.category) }">
                {{ doc.category }}
              </span>
              <span class="card-date">{{ doc.createdAt || '最近更新' }}</span>
            </div>
            <h3 class="card-title">{{ doc.title }}</h3>
            <p class="card-summary">{{ doc.summary || '点击查看文章详情...' }}</p>
            <div class="card-meta">
              <div class="meta-left">
                <span class="meta-item" v-if="doc.readingTime">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ doc.readingTime }} 分钟
                </span>
                <span class="meta-item" v-if="doc.tags?.length">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  {{ doc.tags.length }} 个标签
                </span>
              </div>
            </div>
            <div class="card-footer">
              <div class="card-tags" v-if="doc.tags?.length">
                <span v-for="tag in doc.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="read-more">
                <span>阅读全文</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" v-else>
          <div class="empty-icon">📚</div>
          <h3>未找到相关文章</h3>
          <p>尝试调整搜索关键词或选择其他分类</p>
          <button class="reset-btn" @click="resetFilters">重置筛选</button>
        </div>
      </div>

      <!-- Right: Sidebar -->
      <aside class="content-sidebar">
        <!-- Hot Articles -->
        <div class="sidebar-card">
          <div class="sidebar-header">
            <span class="sidebar-icon">🔥</span>
            <h3>热门文章</h3>
          </div>
          <div class="hot-list">
            <div
              v-for="(doc, index) in hotDocs"
              :key="doc.slug"
              class="hot-item"
              @click="goTo(`/docs/${doc.slug}`)"
            >
              <div class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</div>
              <div class="hot-content">
                <div class="hot-title">{{ doc.title }}</div>
                <div class="hot-category">{{ doc.category }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="sidebar-card">
          <div class="sidebar-header">
            <span class="sidebar-icon">📑</span>
            <h3>文章分类</h3>
          </div>
          <div class="category-list">
            <div
              v-for="cat in categories.slice(1)"
              :key="cat"
              class="category-item"
              @click="selectedCategory = cat"
            >
              <span class="category-name">{{ cat }}</span>
              <span class="category-count">{{ getCategoryCount(cat) }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Tips -->
        <div class="sidebar-card tips-card">
          <div class="tips-icon">💡</div>
          <div class="tips-content">
            <h4>阅读小贴士</h4>
            <p>每篇文章都包含详细的实践案例和选型建议，建议根据你的实际需求选择性阅读。</p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAllDocsMeta, getDocCategories } from '@/services/docService';

const router = useRouter();
const docs = getAllDocsMeta();
const categories = getDocCategories();

const searchKeyword = ref('');
const selectedCategory = ref('全部');
const sortBy = ref('newest');

const goTo = (path: string) => {
  router.push(path);
};

const sortOptions = [
  { label: '最新发布', value: 'newest' },
  { label: '阅读时间', value: 'readingTime' },
  { label: '标题排序', value: 'title' }
];

const filteredDocs = computed(() => {
  let result = docs;
  
  // Filter by category
  if (selectedCategory.value !== '全部') {
    result = result.filter(d => d.category === selectedCategory.value);
  }
  
  // Filter by keyword
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(d => 
      d.title.toLowerCase().includes(keyword) ||
      d.summary?.toLowerCase().includes(keyword) ||
      d.tags?.some(t => t.toLowerCase().includes(keyword))
    );
  }
  
  // Sort
  result = [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      case 'readingTime':
        return (a.readingTime || 0) - (b.readingTime || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  
  return result;
});

// Hot docs (mock: first 5 docs)
const hotDocs = computed(() => docs.slice(0, 5));

function getCategoryCount(category: string): number {
  return docs.filter(d => d.category === category).length;
}

function resetFilters() {
  searchKeyword.value = '';
  selectedCategory.value = '全部';
  sortBy.value = 'newest';
}

const categoryColors: Record<string, string> = {
  '入门指南': 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
  '选型对比': 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  '实践案例': 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
  '技术解析': 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
  '行业应用': 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
};

function getCategoryColor(category?: string): string {
  return categoryColors[category || ''] || 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Content Layout */
.content-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
}

.content-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-main.card-box {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  padding: 24px;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  padding: 14px 48px 14px 48px;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  font-size: 15px;
  background: var(--bg-card);
  color: var(--text-main);
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
}

.clear-btn {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
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

.category-pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-pill {
  padding: 8px 16px;
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  background: var(--bg-card);
  font-size: 13px;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
}

.category-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.category-pill.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* Results Info */
.results-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
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

.filter-tag {
  color: var(--primary);
  font-weight: 500;
}

.sort-options {
  display: flex;
  gap: 8px;
}

.sort-btn {
  padding: 6px 12px;
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  background: var(--bg-card);
  font-size: 12px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.sort-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.sort-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* Doc Grid */
.doc-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.doc-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.25s ease;
}

.doc-card:hover {
  border-color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 16px 40px -12px rgba(0, 122, 255, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.card-category {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--primary);
}

.card-date {
  font-size: 12px;
  color: var(--text-muted);
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.card-summary {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.meta-left {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.meta-item svg {
  width: 14px;
  height: 14px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
}

.card-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background: var(--bg-body);
  color: var(--text-muted);
  font-size: 11px;
  border-radius: 6px;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  transition: all 0.2s;
}

.read-more svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}

.doc-card:hover .read-more svg {
  transform: translateX(4px);
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
  border-radius: 16px;
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

.reset-btn {
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

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
}

/* Sidebar */
.content-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
  padding: 20px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.sidebar-icon {
  font-size: 18px;
}

.sidebar-header h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

/* Hot List */
.hot-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.hot-item:hover {
  background: var(--bg-body);
}

.hot-rank {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--bg-body);
  flex-shrink: 0;
}

.hot-rank.top {
  color: #fff;
  background: linear-gradient(135deg, #007AFF 0%, #00B4D8 100%);
}

.hot-content {
  flex: 1;
  min-width: 0;
}

.hot-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hot-category {
  font-size: 11px;
  color: var(--text-muted);
}

/* Category List */
.category-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-item:hover {
  background: var(--bg-body);
}

.category-name {
  font-size: 13px;
  color: var(--text-main);
  font-weight: 500;
}

.category-count {
  font-size: 12px;
  color: var(--text-muted);
  background: var(--bg-body);
  padding: 2px 8px;
  border-radius: 10px;
}

/* Tips Card */
.tips-card {
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.06) 0%, rgba(0, 180, 216, 0.06) 100%);
  border-color: rgba(0, 122, 255, 0.15);
  text-align: center;
}

.tips-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.tips-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 8px 0;
}

.tips-content p {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
  
  .content-sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .tips-card {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 24px;
  }
  
  .hero-title {
    font-size: 30px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .content-sidebar {
    grid-template-columns: 1fr;
  }
  
  .tips-card {
    grid-column: span 1;
  }
  
  .results-info {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
