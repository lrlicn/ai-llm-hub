<template>
  <section class="home">
    <div class="hero-section">
      <div class="hero-bg">
        <div class="neural-network">
          <div v-for="n in 20" :key="n" class="node" :style="getNodeStyle(n)"></div>
          <svg class="connections" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path v-for="line in connections" :key="line.id"
              class="connection-line"
              :d="line.path"
              :style="{ animationDelay: line.delay + 's' }"
            />
          </svg>
        </div>
        <div class="floating-particles">
          <div v-for="p in 15" :key="p" class="particle" :style="getParticleStyle(p)"></div>
        </div>
        <!-- Floating Icons -->
        <div class="floating-icons">
          <div class="floating-icon" style="top: 15%; left: 8%;">🤖</div>
          <div class="floating-icon" style="top: 25%; right: 12%;">💻</div>
          <div class="floating-icon" style="top: 60%; left: 5%;">⚡</div>
          <div class="floating-icon" style="top: 70%; right: 8%;">🚀</div>
          <div class="floating-icon" style="top: 40%; left: 15%;">📊</div>
          <div class="floating-icon" style="top: 50%; right: 15%;">🎯</div>
          <div class="floating-icon" style="top: 20%; left: 25%;">🔍</div>
          <div class="floating-icon" style="top: 75%; left: 20%;">💡</div>
        </div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">AI 时代</span>
          <span class="title-gradient">懂模型，更懂你需要哪一个</span>
        </h1>
        <p class="hero-desc">
          一站式大模型选型平台，帮你快速找到最适合的 AI 工具
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="goTo('/scenarios')">
            <span>开始选型</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button class="btn-secondary" @click="goTo('/models')">
            浏览模型
          </button>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="content-left">
        <div class="section-header">
          <h2 class="section-title">热门模型</h2>
          <button class="view-more" @click="goTo('/models')">
            查看更多
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div class="models-grid">
          <div 
            v-for="model in featuredModels" 
            :key="model.id" 
            class="model-card"
            @click="goTo(`/models/${model.id}`)"
          >
            <div class="model-header">
              <div class="model-logo" :style="{ background: getModelColor(model.vendor) }">
                {{ model.name.charAt(0) }}
              </div>
              <div class="model-info">
                <div class="model-name">{{ model.name }}</div>
                <div class="model-vendor">{{ model.vendor }}</div>
              </div>
              <div class="model-badge" :class="model.origin">
                {{ model.origin === 'domestic' ? '国产' : '海外' }}
              </div>
            </div>
            <p class="model-summary">{{ model.summary }}</p>
            <div class="model-capability">
              <div class="capability-item">
                <span class="capability-label">综合</span>
                <div class="capability-bar">
                  <div class="capability-fill" :style="{ width: model.capability.general + '%' }"></div>
                </div>
                <span class="capability-value">{{ model.capability.general }}</span>
              </div>
              <div class="capability-item">
                <span class="capability-label">代码</span>
                <div class="capability-bar">
                  <div class="capability-fill" :style="{ width: model.capability.code + '%' }"></div>
                </div>
                <span class="capability-value">{{ model.capability.code }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section-header">
          <h2 class="section-title">应用场景</h2>
          <button class="view-more" @click="goTo('/scenarios')">
            查看更多
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div class="scenarios-grid">
          <div 
            v-for="scenario in scenarios" 
            :key="scenario.id" 
            class="scenario-card"
            @click="goTo(`/scenarios/${scenario.id}`)"
          >
            <div class="scenario-icon">{{ getScenarioIcon(scenario.id) }}</div>
            <div class="scenario-content">
              <div class="scenario-name">{{ scenario.name }}</div>
              <div class="scenario-desc">{{ scenario.description }}</div>
            </div>
            <div class="scenario-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="section-header">
          <h2 class="section-title">快速导航</h2>
          <button class="view-more" @click="goTo('/about')">
            了解更多
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div class="quick-nav">
          <div class="nav-card" @click="goTo('/models')">
            <div class="nav-icon-wrapper">
              <div class="nav-icon">🤖</div>
            </div>
            <div class="nav-content">
              <div class="nav-title">模型目录</div>
              <div class="nav-desc">浏览国内外主流大模型</div>
            </div>
            <span class="nav-arrow">→</span>
          </div>
          <div class="nav-card" @click="goTo('/scenarios')">
            <div class="nav-icon-wrapper">
              <div class="nav-icon">🎯</div>
            </div>
            <div class="nav-content">
              <div class="nav-title">场景推荐</div>
              <div class="nav-desc">按场景找到合适模型</div>
            </div>
            <span class="nav-arrow">→</span>
          </div>
          <div class="nav-card" @click="goTo('/docs')">
            <div class="nav-icon-wrapper">
              <div class="nav-icon">📚</div>
            </div>
            <div class="nav-content">
              <div class="nav-title">知识库</div>
              <div class="nav-desc">选型指南与实践文章</div>
            </div>
            <span class="nav-arrow">→</span>
          </div>
        </div>
      </div>

      <div class="content-right">
        <div class="sidebar-card">
          <div class="sidebar-header">
            <h3 class="sidebar-title">
              <span class="sidebar-icon">🔥</span>
              热门推荐
            </h3>
          </div>
          <div class="hot-list">
            <div 
              v-for="(model, index) in hotModels" 
              :key="model.id" 
              class="hot-item"
              @click="goTo(`/models/${model.id}`)"
            >
              <div class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</div>
              <div class="hot-content">
                <div class="hot-name">{{ model.name }}</div>
                <div class="hot-vendor">{{ model.vendor }}</div>
              </div>
              <div class="hot-score">{{ model.capability.general }}</div>
            </div>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="sidebar-header">
            <h3 class="sidebar-title">
              <span class="sidebar-icon">📰</span>
              最新资讯
            </h3>
            <button class="view-more-small" @click="goTo('/docs')">
              更多
            </button>
          </div>
          <div class="news-list">
            <div 
              v-for="doc in latestDocs" 
              :key="doc.slug" 
              class="news-item"
              @click="goTo(`/docs/${doc.slug}`)"
            >
              <div class="news-dot"></div>
              <div class="news-content">
                <div class="news-title">{{ doc.title }}</div>
                <div class="news-meta">
                  <span class="news-category">{{ doc.category }}</span>
                  <span v-if="doc.createdAt" class="news-date">{{ doc.createdAt }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="sidebar-header">
            <h3 class="sidebar-title">
              <span class="sidebar-icon">💡</span>
              快速入口
            </h3>
          </div>
          <div class="quick-links">
            <div class="quick-link" @click="goTo('/models?filter=domestic')">
              <div class="quick-link-icon">🇨🇳</div>
              <div class="quick-link-text">国产模型</div>
            </div>
            <div class="quick-link" @click="goTo('/models?filter=opensource')">
              <div class="quick-link-icon">🔓</div>
              <div class="quick-link-text">开源模型</div>
            </div>
            <div class="quick-link" @click="goTo('/models?filter=free')">
              <div class="quick-link-icon">🎁</div>
              <div class="quick-link-text">免费试用</div>
            </div>
            <div class="quick-link" @click="goTo('/scenarios/code-assistant')">
              <div class="quick-link-icon">💻</div>
              <div class="quick-link-text">代码助手</div>
            </div>
          </div>
        </div>

        <div class="sidebar-card tips-card">
          <div class="tips-icon">💡</div>
          <div class="tips-content">
            <div class="tips-title">选型小贴士</div>
            <div class="tips-text">不确定选哪个模型？试试从「场景推荐」开始，根据你的业务需求找到最合适的模型组合。</div>
          </div>
          <button class="tips-btn" @click="goTo('/scenarios')">立即体验</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAllModels } from '@/services/modelService';
import { getAllScenarios } from '@/services/scenarioService';
import { getAllDocsMeta } from '@/services/docService';

const router = useRouter();
const models = getAllModels();
const scenarios = getAllScenarios();
const docs = getAllDocsMeta();

const featuredModels = computed(() => models.slice(0, 4));
const hotModels = computed(() => [...models].sort((a, b) => b.capability.general - a.capability.general).slice(0, 5));
const latestDocs = computed(() => docs.slice(0, 4));

const goTo = (path: string) => {
  router.push(path);
};

const modelColors: Record<string, string> = {
  'OpenAI': 'linear-gradient(135deg, #10a37f 0%, #1a7f64 100%)',
  'Anthropic': 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
  '深度求索': 'linear-gradient(135deg, #4f6ef7 0%, #3a5bd9 100%)',
  '百度': 'linear-gradient(135deg, #2932e1 0%, #1e2ab8 100%)',
  '阿里云': 'linear-gradient(135deg, #ff6a00 0%, #ee5a00 100%)',
  '智谱AI': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
};

const getModelColor = (vendor: string) => {
  return modelColors[vendor] || 'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)';
};

const scenarioIcons: Record<string, string> = {
  'code-assistant': '💻',
  'knowledge-qa': '❓',
  'content-creation': '✍️',
  'data-analysis': '📊',
  'academic-research': '🎓',
  'enterprise-app': '🏢'
};

const getScenarioIcon = (id: string) => {
  return scenarioIcons[id] || '📋';
};

const getNodeStyle = (n: number) => {
  const positions = [
    { left: '10%', top: '20%' },
    { left: '25%', top: '15%' },
    { left: '40%', top: '25%' },
    { left: '60%', top: '10%' },
    { left: '75%', top: '20%' },
    { left: '85%', top: '35%' },
    { left: '15%', top: '45%' },
    { left: '35%', top: '55%' },
    { left: '55%', top: '45%' },
    { left: '70%', top: '60%' },
    { left: '90%', top: '50%' },
    { left: '20%', top: '70%' },
    { left: '45%', top: '80%' },
    { left: '65%', top: '75%' },
    { left: '80%', top: '85%' },
    { left: '5%', top: '85%' },
    { left: '30%', top: '90%' },
    { left: '50%', top: '65%' },
    { left: '95%', top: '70%' },
    { left: '12%', top: '55%' }
  ];
  const pos = positions[(n - 1) % positions.length];
  const delay = (n * 0.5) % 4;
  const duration = 3 + (n % 2);
  return {
    left: pos.left,
    top: pos.top,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  };
};

const connections = computed(() => {
  const lines = [
    { id: 1, path: 'M10,20 Q25,15 40,25', delay: 0 },
    { id: 2, path: 'M25,15 Q40,25 60,10', delay: 0.5 },
    { id: 3, path: 'M40,25 Q55,45 70,20', delay: 1 },
    { id: 4, path: 'M60,10 Q75,20 85,35', delay: 1.5 },
    { id: 5, path: 'M15,45 Q35,55 55,45', delay: 0.3 },
    { id: 6, path: 'M35,55 Q50,65 70,60', delay: 0.8 },
    { id: 7, path: 'M55,45 Q65,75 80,85', delay: 1.3 },
    { id: 8, path: 'M20,70 Q45,80 65,75', delay: 0.6 },
    { id: 9, path: 'M45,80 Q60,65 75,20', delay: 1.1 },
    { id: 10, path: 'M5,85 Q30,90 50,65', delay: 1.6 }
  ];
  return lines;
});

const getParticleStyle = (p: number) => {
  const left = (p * 7) % 100;
  const delay = (p * 0.3) % 5;
  const duration = 4 + (p % 3);
  const size = 3 + (p % 4);
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${size}px`,
    height: `${size}px`
  };
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Hero Section - Full Width Design */
.hero-section {
  position: relative;
  padding: 50px 40px;
  overflow: hidden;
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: calc(-50vw + 50%);
  margin-top: -24px;
  width: 100vw;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #0d1b2a 100%);
}

.neural-network {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.node {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(0, 180, 216, 0.8) 0%, rgba(0, 122, 255, 0.4) 100%);
  border-radius: 50%;
  animation: nodePulse 3s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(0, 180, 216, 0.5);
}

@keyframes nodePulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.6;
  }
  50% { 
    transform: scale(1.3);
    opacity: 1;
  }
}

.connections {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.connection-line {
  fill: none;
  stroke: url(#lineGradient);
  stroke-width: 0.5;
  opacity: 0;
  animation: lineDraw 4s ease-in-out infinite;
}

@keyframes lineDraw {
  0% {
    opacity: 0;
    stroke-dasharray: 0, 100;
  }
  50% {
    opacity: 0.6;
    stroke-dasharray: 50, 50;
  }
  100% {
    opacity: 0;
    stroke-dasharray: 100, 0;
  }
}

.floating-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: linear-gradient(135deg, rgba(0, 180, 216, 0.6) 0%, rgba(0, 122, 255, 0.3) 100%);
  border-radius: 50%;
  animation: particleFloat 5s ease-in-out infinite;
  bottom: -20px;
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-450px) scale(0.5);
    opacity: 0;
  }
}

/* Floating Icons */
.floating-icons {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-icon {
  position: absolute;
  font-size: 28px;
  opacity: 0.12;
  animation: iconFloat 6s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(0, 180, 216, 0.3));
}

.floating-icon:nth-child(1) { animation-delay: 0s; }
.floating-icon:nth-child(2) { animation-delay: -0.8s; }
.floating-icon:nth-child(3) { animation-delay: -1.6s; }
.floating-icon:nth-child(4) { animation-delay: -2.4s; }
.floating-icon:nth-child(5) { animation-delay: -3.2s; }
.floating-icon:nth-child(6) { animation-delay: -4s; }
.floating-icon:nth-child(7) { animation-delay: -4.8s; }
.floating-icon:nth-child(8) { animation-delay: -5.6s; }

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.08;
  }
  50% {
    transform: translateY(-25px) rotate(8deg);
    opacity: 0.18;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

/* 添加光晕效果 */
.hero-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}



.hero-title {
  margin: 0 0 16px;
  line-height: 1.3;
}

.title-line {
  display: block;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.title-gradient {
  display: block;
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #0099ff 30%, #00d4ff 60%, #0099ff 100%);
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient 5s ease infinite;
  line-height: 1.2;
}

.title-gradient::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #00d4ff 0%, #0099ff 100%);
  border-radius: 2px;
  margin: 16px auto 0;
}

@keyframes gradient {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}

.hero-desc {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0 auto 20px;
  max-width: 440px;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #00d4ff 0%, #0099ff 50%, #00d4ff 100%);
  background-size: 200% auto;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 180, 216, 0.5), 0 0 30px rgba(0, 180, 216, 0.3);
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 180, 216, 0.6), 0 0 40px rgba(0, 180, 216, 0.4);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: transparent;
  border: 2px solid rgba(0, 212, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-secondary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 153, 255, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-secondary:hover {
  border-color: #00d4ff;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(0, 212, 255, 0.1);
  transform: translateY(-2px);
}

.btn-secondary:hover::before {
  opacity: 1;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
}

.content-left {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.content-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 100px;
  height: fit-content;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
}

.view-more {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--primary);
  background: rgba(0, 122, 255, 0.08);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-more:hover {
  background: rgba(0, 122, 255, 0.15);
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.model-card {
  padding: 20px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.3s ease;
}

.model-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -6px rgba(0, 122, 255, 0.1);
}

.model-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
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
  color: #fff;
  flex-shrink: 0;
}

.model-info {
  flex: 1;
  min-width: 0;
}

.model-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 2px;
}

.model-vendor {
  font-size: 12px;
  color: var(--text-muted);
}

.model-badge {
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
}

.model-badge.domestic {
  background: rgba(0, 122, 255, 0.1);
  color: var(--primary);
}

.model-badge.foreign {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.model-summary {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.model-capability {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.capability-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.capability-label {
  font-size: 12px;
  color: var(--text-muted);
  width: 32px;
  flex-shrink: 0;
}

.capability-bar {
  flex: 1;
  height: 5px;
  background: var(--bg-body);
  border-radius: 3px;
  overflow: hidden;
}

.capability-fill {
  height: 100%;
  background: linear-gradient(90deg, #007AFF 0%, #00B4D8 100%);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.capability-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  width: 20px;
  text-align: right;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.scenario-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.25s ease;
}

.scenario-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(0, 122, 255, 0.1);
}

.scenario-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 180, 216, 0.1) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.scenario-content {
  flex: 1;
  min-width: 0;
}

.scenario-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 2px;
}

.scenario-desc {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scenario-arrow {
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.scenario-card:hover .scenario-arrow {
  color: var(--primary);
  transform: translateX(3px);
}

.quick-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;
}

.nav-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(0, 122, 255, 0.1);
}

.nav-icon-wrapper {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.08) 0%, rgba(0, 180, 216, 0.08) 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  font-size: 24px;
}

.nav-content {
  width: 100%;
}

.nav-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 2px;
}

.nav-desc {
  font-size: 12px;
  color: var(--text-muted);
}

.nav-arrow {
  font-size: 16px;
  color: var(--text-muted);
  transition: transform 0.2s, color 0.2s;
}

.nav-card:hover .nav-arrow {
  transform: translateX(3px);
  color: var(--primary);
}

.sidebar-card {
  padding: 20px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
}

.sidebar-icon {
  font-size: 16px;
}

.view-more-small {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  color: var(--primary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-more-small:hover {
  background: rgba(0, 122, 255, 0.08);
}

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
  transition: all 0.2s ease;
}

.hot-item:hover {
  background: var(--bg-body);
}

.hot-rank {
  width: 22px;
  height: 22px;
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

.hot-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 1px;
}

.hot-vendor {
  font-size: 11px;
  color: var(--text-muted);
}

.hot-score {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-item {
  display: flex;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.news-item:hover {
  background: var(--bg-body);
}

.news-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  margin-top: 6px;
  flex-shrink: 0;
}

.news-content {
  flex: 1;
  min-width: 0;
}

.news-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-main);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.news-meta {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--text-muted);
}

.news-category {
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-body);
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 10px;
  border-radius: 10px;
  background: var(--bg-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-link:hover {
  background: rgba(0, 122, 255, 0.08);
}

.quick-link-icon {
  font-size: 20px;
}

.quick-link-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-main);
}

.tips-card {
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.06) 0%, rgba(0, 180, 216, 0.06) 100%);
  border-color: rgba(0, 122, 255, 0.15);
  text-align: center;
}

.tips-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.tips-content {
  margin-bottom: 16px;
}

.tips-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 8px;
}

.tips-text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
}

.tips-btn {
  width: 100%;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #007AFF 0%, #0056b3 100%);
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tips-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .content-right {
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
    padding: 80px 24px;
    min-height: 400px;
    margin-left: calc(-50vw + 50%);
    margin-top: -24px;
    width: 100vw;
  }

  .title-line {
    font-size: 14px;
  }

  .title-gradient {
    font-size: 36px;
  }

  .title-gradient::after {
    width: 60px;
    height: 3px;
    margin-top: 16px;
  }

  .hero-desc {
    font-size: 16px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  .stats-section {
    flex-wrap: wrap;
    gap: 16px;
    padding: 20px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-item {
    width: calc(50% - 8px);
  }
  
  .stat-number {
    font-size: 26px;
  }
  
  .models-grid {
    grid-template-columns: 1fr;
  }
  
  .scenarios-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-nav {
    grid-template-columns: 1fr;
  }
  
  .content-right {
    grid-template-columns: 1fr;
  }
  
  .tips-card {
    grid-column: span 1;
  }
  
  .section-title {
    font-size: 18px;
  }
}
</style>
