<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-left">
        <div class="logo" @click="goTo('/')">
          <img src="/logo.png" alt="logo" class="logo-img" />
          <span class="logo-title">AI 大模型资源中心</span>
        </div>
        <nav class="nav">
          <button 
            class="nav-link" 
            :class="{ active: isHome }"
            @click="goTo('/')"
          >主页</button>
          <button 
            class="nav-link" 
            :class="{ active: isActive('/models') }"
            @click="goTo('/models')"
          >模型目录</button>
          <button 
            class="nav-link" 
            :class="{ active: isActive('/scenarios') }"
            @click="goTo('/scenarios')"
          >场景推荐</button>
          <button 
            class="nav-link" 
            :class="{ active: isActive('/docs') }"
            @click="goTo('/docs')"
          >知识库</button>
          <button 
            class="nav-link" 
            :class="{ active: isActive('/about') }"
            @click="goTo('/about')"
          >关于</button>
        </nav>
      </div>
      <div class="header-right" v-if="isHome">
        <SearchBox />
      </div>
    </header>
    <main class="app-main" :class="{ 'full-width': isDocsPage }">
      <slot />
    </main>
    <footer class="app-footer">
      <span>© 2026 AI 大模型资源中心</span>
      <span class="divider">|</span>
      <span>国内外大模型导航、能力对比、开发知识库</span>
      <span class="divider">|</span>
      <a
        href="https://github.com/lrlicn"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        GitHub
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SearchBox from '../SearchBox/SearchBox.vue';

const router = useRouter();
const route = useRoute();

const goTo = (path: string) => {
  router.push(path);
};

const isActive = (path: string) => {
  return route.path.startsWith(path);
};

const isHome = computed(() => route.path === '/');
const isDocsPage = computed(() => route.path.startsWith('/docs'));
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-body);
  color: var(--text-main);
}

.app-main {
  flex: 1;
  padding: 24px 8px 32px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.app-main.full-width {
  max-width: 100%;
  padding: 0;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 32px;
  background-color: var(--bg-header);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-subtle);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.header-right {
  display: flex;
  align-items: center;
  margin-left: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.logo-title {
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  padding: 8px 16px;
  position: relative;
  border-radius: 8px;
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link:hover {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light, #00b4d8) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateY(-1px);
}

.nav-link.active {
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.12) 0%, rgba(0, 180, 216, 0.12) 100%);
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  -webkit-text-fill-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.15);
}

.nav-link.active:hover {
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.18) 0%, rgba(0, 180, 216, 0.18) 100%);
}

.app-footer {
  padding: 16px 32px;
  font-size: 13px;
  color: var(--text-muted);
  border-top: 1px solid var(--border-subtle);
  background-color: var(--bg-footer);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.divider {
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

.footer-link {
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
}

.footer-link:hover {
  color: var(--primary);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .app-header {
    padding-inline: 16px;
  }

  .header-left {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .app-main {
    padding-inline: 8px;
  }

  .nav {
    gap: 4px;
  }

  .nav-link {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>
