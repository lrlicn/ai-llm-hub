<template>
  <div class="doc-page">
    <div class="doc-layout">
      <!-- 左侧：文章列表 -->
      <aside class="doc-sider-left" :class="{ collapsed: isCollapsed }">
        <div class="sider-inner">
          <div class="sider-header">
            <span class="sider-title">📚 文章列表</span>
          </div>
          
          <div class="sider-content">
            <!-- 搜索框 -->
            <div class="doc-search">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                v-model="searchKeyword" 
                type="text" 
                placeholder="搜索文章..."
                class="search-input"
              />
            </div>
            
            <!-- 分类筛选 - 下拉选择器 -->
            <div class="category-select-wrapper">
              <div class="category-select" @click="showCategoryDropdown = !showCategoryDropdown">
                <span class="select-label">{{ selectedCategory }}</span>
                <svg class="select-arrow" :class="{ open: showCategoryDropdown }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              <Transition name="dropdown">
                <div v-if="showCategoryDropdown" class="category-dropdown">
                  <div 
                    v-for="cat in categories.filter(Boolean)" 
                    :key="cat"
                    :class="['dropdown-item', { active: selectedCategory === cat }]"
                    @click="selectCategory(cat!)"
                  >
                    {{ cat }}
                  </div>
                </div>
              </Transition>
            </div>
            
            <!-- 文章列表 -->
            <div class="doc-list">
              <div 
                v-for="item in filteredDocs" 
                :key="item.slug"
                class="doc-list-item"
                :class="{ active: item.slug === doc?.slug }"
                @click="router.push(`/docs/${item.slug}`)"
              >
                <div class="item-title">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 收缩/展开按钮 - 紧挨分割线右侧 -->
        <button 
          class="sider-toggle-btn" 
          @click="toggleCollapse" 
          :title="isCollapsed ? '展开' : '收起'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" :class="{ rotated: !isCollapsed }">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </aside>
      
      <!-- 中间：文章内容 -->
      <main class="doc-main" :class="{ 'left-collapsed': isCollapsed }">
        <div v-if="doc" class="doc-wrapper">
          <article class="doc-content">
            <header class="doc-header">
              <div class="doc-breadcrumb">
                <span class="breadcrumb-item" @click="router.push('/docs')">知识库</span>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-item">{{ doc.category }}</span>
              </div>
              <h1 class="doc-title">{{ doc.title }}</h1>
              <div class="doc-meta">
                <span class="meta-item" v-if="doc.createdAt">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {{ doc.createdAt }}
                </span>
                <span class="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ doc.readingTime }} 分钟阅读
                </span>
              </div>
              <p class="doc-summary" v-if="doc.summary">{{ doc.summary }}</p>
              <div class="doc-tags" v-if="doc.tags?.length">
                <span v-for="tag in doc.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </header>
            <div class="doc-body" v-html="doc.content"></div>
            
            <!-- 文章底部导航 -->
            <div class="doc-footer-nav">
              <div class="nav-prev" v-if="prevDoc" @click="router.push(`/docs/${prevDoc.slug}`)">
                <span class="nav-label">← 上一篇</span>
                <span class="nav-title">{{ prevDoc.title }}</span>
              </div>
              <div class="nav-spacer"></div>
              <div class="nav-next" v-if="nextDoc" @click="router.push(`/docs/${nextDoc.slug}`)">
                <span class="nav-label">下一篇 →</span>
                <span class="nav-title">{{ nextDoc.title }}</span>
              </div>
            </div>
          </article>
        </div>
        
        <div v-else class="not-found">
          <div class="not-found-icon">📄</div>
          <h2>文档不存在</h2>
          <p>抱歉，找不到您要查看的文档</p>
          <button class="back-btn" @click="router.push('/docs')">返回知识库</button>
        </div>
      </main>
      
      <!-- 右侧：内容大纲 -->
      <aside class="doc-sider-right" v-if="doc?.toc?.length">
        <div class="toc-wrapper">
          <div class="toc-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
            <span>目录大纲</span>
          </div>
          <div class="toc-content">
            <a 
              v-for="item in doc.toc" 
              :key="item.id"
              :href="`#${item.id}`"
              :class="['toc-item', `toc-level-${item.level}`, { active: activeHeading === item.id }]"
              @click.prevent="scrollToHeading(item.id)"
            >
              {{ item.text }}
            </a>
          </div>
        </div>
      </aside>
    </div>
    
    <!-- 返回顶部按钮 -->
    <Transition name="fade">
      <button 
        v-show="showBackTop" 
        class="back-top-btn" 
        @click="scrollToTop"
        title="返回顶部"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDocDetail, getAllDocsMeta, type DocDetail } from '@/services/docService';
import type { DocMeta } from '@/types/doc';

const route = useRoute();
const router = useRouter();
const doc = ref<DocDetail | null>(null);
const allDocs = ref<DocMeta[]>([]);
const isCollapsed = ref(false);
const showBackTop = ref(false);
const activeHeading = ref('');
const searchKeyword = ref('');
const selectedCategory = ref('全部');
const showCategoryDropdown = ref(false);

function selectCategory(cat: string) {
  selectedCategory.value = cat;
  showCategoryDropdown.value = false;
}

// 分类列表
const categories = computed(() => {
  const cats = ['全部', ...new Set(allDocs.value.map(d => d.category))];
  return cats;
});

// 筛选后的文章列表
const filteredDocs = computed(() => {
  let result = allDocs.value;
  
  if (selectedCategory.value !== '全部') {
    result = result.filter(d => d.category === selectedCategory.value);
  }
  
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(d => 
      d.title.toLowerCase().includes(keyword) ||
      d.summary?.toLowerCase().includes(keyword)
    );
  }
  
  return result;
});

// 上一篇/下一篇
const currentIndex = computed(() => {
  return allDocs.value.findIndex(d => d.slug === doc.value?.slug);
});

const prevDoc = computed(() => {
  const idx = currentIndex.value;
  return idx > 0 ? allDocs.value[idx - 1] : null;
});

const nextDoc = computed(() => {
  const idx = currentIndex.value;
  return idx >= 0 && idx < allDocs.value.length - 1 ? allDocs.value[idx + 1] : null;
});

function loadDoc() {
  const slug = route.params.slug as string;
  doc.value = getDocDetail(slug);
  allDocs.value = getAllDocsMeta();
  if (doc.value) {
    document.title = `${doc.value.title} - AI 大模型资源中心`;
  }
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem('doc-sider-collapsed', String(isCollapsed.value));
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    activeHeading.value = id;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  const scrollTop = window.scrollY;
  showBackTop.value = scrollTop > 300;
  
  // 更新大纲高亮
  if (doc.value?.toc?.length) {
    const headings = doc.value.toc.map(item => ({
      id: item.id,
      element: document.getElementById(item.id)
    })).filter(h => h.element);
    
    // 找到当前可见的标题
    let currentId = '';
    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i];
      if (heading.element) {
        const rect = heading.element.getBoundingClientRect();
        if (rect.top <= 100) {
          currentId = heading.id;
          break;
        }
      }
    }
    
    // 如果没有找到，可能是页面顶部，选中第一个
    if (!currentId && headings.length > 0) {
      const firstHeading = headings[0];
      if (firstHeading.element) {
        const rect = firstHeading.element.getBoundingClientRect();
        if (rect.top > 100) {
          currentId = '';
        } else {
          currentId = firstHeading.id;
        }
      }
    }
    
    activeHeading.value = currentId;
  }
}

onMounted(() => {
  loadDoc();
  
  // 恢复侧边栏状态
  const saved = localStorage.getItem('doc-sider-collapsed');
  if (saved) {
    isCollapsed.value = saved === 'true';
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(() => route.params.slug, loadDoc);
</script>

<style scoped>
.doc-page {
  min-height: calc(100vh - 64px);
  background: #fff;
}

.doc-layout {
  display: flex;
  min-height: calc(100vh - 64px);
}

/* ========== 左侧边栏 - 完全贴合屏幕 ========== */
.doc-sider-left {
  width: 240px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  transition: width 0.2s ease;
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow: visible;
  display: flex;
}

.doc-sider-left.collapsed {
  width: 0;
  border-right: none;
}

.sider-inner {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sider-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
  flex-shrink: 0;
}

.sider-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.sider-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* 收缩/展开按钮 - 紧挨分割线右侧 */
.sider-toggle-btn {
  position: fixed;
  left: 240px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 60px;
  border: 1px solid #e8e8e8;
  border-left: none;
  background: #fff;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 100;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  padding: 0;
}

.sider-toggle-btn:hover {
  color: var(--primary);
  background: #f5f5f5;
}

.sider-toggle-btn svg {
  width: 12px;
  height: 12px;
  transition: transform 0.2s;
  color: #666;
}

.sider-toggle-btn svg.rotated {
  transform: rotate(180deg);
}

.doc-sider-left.collapsed .sider-toggle-btn {
  left: 0;
  border: 1px solid #e8e8e8;
  border-radius: 0 4px 4px 0;
}

.doc-sider-left.collapsed .sider-inner {
  opacity: 0;
}

/* 搜索框 */
.doc-search {
  position: relative;
  margin-bottom: 12px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #999;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 34px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 13px;
  background: #f5f5f5;
  color: #333;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  background: #fff;
}

.search-input::placeholder {
  color: #999;
}

/* 分类筛选 - 下拉选择器 */
.category-select-wrapper {
  position: relative;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.category-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
}

.category-select:hover {
  border-color: var(--primary);
}

.select-label {
  font-size: 13px;
  color: #333;
}

.select-arrow {
  width: 14px;
  height: 14px;
  color: #999;
  transition: transform 0.2s;
}

.select-arrow.open {
  transform: rotate(180deg);
}

.category-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 20;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px 12px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.15s;
}

.dropdown-item:hover {
  background: #f5f5f5;
  color: var(--primary);
}

.dropdown-item.active {
  background: rgba(0, 122, 255, 0.06);
  color: var(--primary);
  font-weight: 500;
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 文章列表 - 完全贴合左侧 */
.doc-list {
  display: flex;
  flex-direction: column;
  margin: 0 -16px;
}

.doc-list-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  border-left: 3px solid transparent;
}

.doc-list-item:hover {
  background: #f5f5f5;
}

.doc-list-item.active {
  background: rgba(0, 122, 255, 0.06);
  border-left-color: var(--primary);
}

.item-title {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.doc-list-item.active .item-title {
  color: var(--primary);
  font-weight: 600;
}

/* ========== 中间内容区域 - 无卡片边框 ========== */
.doc-main {
  flex: 1;
  min-width: 0;
  padding: 40px 48px;
  background: #fff;
}

.doc-wrapper {
  max-width: 720px;
  margin: 0 auto;
}

.doc-content {
  background: transparent;
  padding: 0;
}

.doc-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e8e8e8;
}

.doc-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13px;
}

.breadcrumb-item {
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
}

.breadcrumb-item:hover {
  color: var(--primary);
}

.breadcrumb-item:last-child {
  color: var(--primary);
  font-weight: 500;
}

.breadcrumb-separator {
  color: #ccc;
}

.doc-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.doc-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #999;
}

.meta-item svg {
  width: 14px;
  height: 14px;
}

.doc-summary {
  font-size: 15px;
  color: #666;
  line-height: 1.7;
  margin: 0 0 20px 0;
  padding: 16px 0;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}

.doc-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 10px;
  background: #f5f5f5;
  color: #666;
  font-size: 12px;
  border-radius: 4px;
}

/* 文章内容样式 - 清爽简洁 */
.doc-body {
  font-size: 15px;
  line-height: 1.8;
  color: #333;
}

.doc-body :deep(h1) {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 40px 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.doc-body :deep(h2) {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 32px 0 14px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.doc-body :deep(h3) {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin: 24px 0 12px 0;
}

.doc-body :deep(p) {
  margin: 0 0 16px 0;
}

.doc-body :deep(ul), .doc-body :deep(ol) {
  margin: 0 0 16px 0;
  padding-left: 24px;
}

.doc-body :deep(li) {
  line-height: 1.7;
  margin-bottom: 8px;
}

.doc-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 14px;
  border: 1px solid #e8e8e8;
}

.doc-body :deep(th), .doc-body :deep(td) {
  padding: 12px 16px;
  border: 1px solid #e8e8e8;
  text-align: left;
}

.doc-body :deep(th) {
  background: #f5f5f5;
  font-weight: 600;
}

.doc-body :deep(tr:hover td) {
  background: #fafafa;
}

.doc-body :deep(code) {
  padding: 2px 6px;
  background: #f5f5f5;
  border-radius: 3px;
  font-size: 13px;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  color: #e11d48;
}

.doc-body :deep(pre) {
  padding: 16px 20px;
  background: #f8f9fa;
  border-radius: 6px;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid #e8e8e8;
}

.doc-body :deep(pre code) {
  padding: 0;
  background: transparent;
  color: #333;
  font-size: 13px;
}

.doc-body :deep(blockquote) {
  margin: 16px 0;
  padding: 12px 16px;
  border-left: 3px solid var(--primary);
  background: #f8f9fa;
}

.doc-body :deep(blockquote p) {
  margin: 0;
}

.doc-body :deep(a) {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.doc-body :deep(a:hover) {
  border-bottom-color: var(--primary);
}

.doc-body :deep(hr) {
  border: none;
  border-top: 1px solid #e8e8e8;
  margin: 24px 0;
}

.doc-body :deep(img) {
  max-width: 100%;
  border-radius: 4px;
  margin: 16px 0;
}

/* 文章底部导航 - 简洁风格 */
.doc-footer-nav {
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
}

.nav-prev, .nav-next {
  flex: 1;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-prev:hover, .nav-next:hover {
  background: #f8f9fa;
}

.nav-next {
  text-align: right;
  align-items: flex-end;
}

.nav-label {
  font-size: 12px;
  color: #999;
}

.nav-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.nav-prev:hover .nav-title,
.nav-next:hover .nav-title {
  color: var(--primary);
}

.nav-spacer {
  width: 16px;
}

/* ========== 右侧大纲 - 简洁风格 ========== */
.doc-sider-right {
  width: 200px;
  flex-shrink: 0;
  padding: 40px 0 40px 24px;
  background: #fff;
}

.toc-wrapper {
  position: sticky;
  top: 88px;
}

.toc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #999;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.toc-header svg {
  width: 14px;
  height: 14px;
}

.toc-content {
  display: flex;
  flex-direction: column;
}

.toc-item {
  font-size: 13px;
  color: #666;
  text-decoration: none;
  padding: 6px 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.15s;
  cursor: pointer;
  border-left: 2px solid transparent;
  padding-left: 12px;
  margin-left: -12px;
}

.toc-item:hover {
  color: var(--primary);
}

.toc-item.active {
  color: var(--primary);
  border-left-color: var(--primary);
  font-weight: 500;
}

.toc-level-1 {
  font-weight: 500;
}

.toc-level-2 {
  padding-left: 20px;
  font-size: 12px;
}

.toc-level-3 {
  padding-left: 32px;
  font-size: 12px;
}

/* ========== 未找到页面 ========== */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  text-align: center;
  max-width: 600px;
  margin: 40px auto;
}

.not-found-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.4;
}

.not-found h2 {
  font-size: 24px;
  color: #333;
  margin: 0 0 8px 0;
}

.not-found p {
  font-size: 14px;
  color: #999;
  margin: 0 0 24px 0;
}

.back-btn {
  padding: 10px 24px;
  background: var(--primary);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #0066d4;
}

/* ========== 返回顶部按钮 ========== */
.back-top-btn {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 40px;
  height: 40px;
  background: #fff;
  color: #666;
  border: 1px solid #e8e8e8;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-top-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.back-top-btn svg {
  width: 18px;
  height: 18px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ========== 响应式 ========== */
@media (max-width: 1280px) {
  .doc-sider-right {
    display: none;
  }
  
  .doc-main {
    padding: 32px 40px;
  }
}

@media (max-width: 900px) {
  .doc-sider-left {
    position: fixed;
    left: 0;
    top: 64px;
    z-index: 100;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .doc-sider-left:not(.collapsed) {
    transform: translateX(0);
    width: 240px;
  }
  
  .doc-sider-left.collapsed {
    transform: translateX(-100%);
  }
  
  .doc-main {
    padding: 24px;
  }
  
  .doc-title {
    font-size: 22px;
  }
  
  .doc-footer-nav {
    flex-direction: column;
    gap: 0;
  }
  
  .nav-spacer {
    display: none;
  }
  
  .nav-next {
    text-align: left;
    align-items: flex-start;
    border-top: 1px solid #e8e8e8;
  }
}

@media (max-width: 640px) {
  .doc-title {
    font-size: 20px;
  }
  
  .doc-body :deep(h1) {
    font-size: 20px;
  }
  
  .doc-body :deep(h2) {
    font-size: 18px;
  }
  
  .doc-body :deep(h3) {
    font-size: 16px;
  }
}
</style>
