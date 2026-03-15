<template>
  <section class="page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-bg-decoration">
        <div class="floating-icon" style="top: 20%; left: 10%;">🤖</div>
        <div class="floating-icon" style="top: 30%; right: 15%;">⚡</div>
        <div class="floating-icon" style="bottom: 25%; left: 15%;">🚀</div>
        <div class="floating-icon" style="bottom: 20%; right: 10%;">💡</div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">✨</span>
          <span>关于我们</span>
        </div>
        <h1 class="hero-title">AI 大模型资源中心</h1>
        <p class="hero-desc">
          面向开发者的 AI 大模型资源聚合与选型辅助平台<br>
          帮助你快速找到最适合的 AI 工具，让选型不再困难
        </p>

      </div>
    </div>

    <!-- Project Introduction -->
    <div class="intro-section">
      <div class="section-header">
        <div class="section-icon">🎯</div>
        <div class="section-title">
          <h2>项目介绍</h2>
          <p>Project Introduction</p>
        </div>
      </div>
      <div class="intro-content">
        <div class="intro-card">
          <div class="intro-icon">🔍</div>
          <h3>模型聚合</h3>
          <p>收录国内外主流大模型，提供全面的模型信息、能力评分和价格对比，帮助你快速了解各模型的特点。</p>
        </div>
        <div class="intro-card">
          <div class="intro-icon">🎯</div>
          <h3>场景推荐</h3>
          <p>基于典型业务场景，智能推荐最适合的模型组合。不同场景对模型能力要求不同，选对模型事半功倍。</p>
        </div>
        <div class="intro-card">
          <div class="intro-icon">📚</div>
          <h3>知识库</h3>
          <p>提供结构化的选型指南和实践文章，帮助你深入理解大模型技术，做出更明智的选型决策。</p>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="features-section">
      <div class="section-header">
        <div class="section-icon">⭐</div>
        <div class="section-title">
          <h2>核心功能</h2>
          <p>Core Features</p>
        </div>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <h4>全站搜索</h4>
          <p>支持模型、场景、文档的全站搜索，快速定位所需信息</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h4>多维筛选</h4>
          <p>按来源、类型、开源状态等多维度筛选模型</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h4>详细对比</h4>
          <p>提供模型的详细能力评分、价格信息和优劣势分析</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <h4>场景化推荐</h4>
          <p>根据业务场景智能推荐最适合的模型组合</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon pink">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <h4>知识文章</h4>
          <p>丰富的选型指南和实践案例，助力技术决策</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon cyan">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <h4>响应式设计</h4>
          <p>完美适配桌面和移动设备，随时随地查看</p>
        </div>
      </div>
    </div>

    <!-- Tech Stack -->
    <div class="tech-section">
      <div class="section-header">
        <div class="section-icon">🛠️</div>
        <div class="section-title">
          <h2>技术栈</h2>
          <p>Technology Stack</p>
        </div>
      </div>
      <div class="tech-grid">
        <div class="tech-card">
          <div class="tech-logo vue">Vue</div>
          <div class="tech-info">
            <h4>Vue 3</h4>
            <p>渐进式 JavaScript 框架</p>
          </div>
        </div>
        <div class="tech-card">
          <div class="tech-logo ts">TS</div>
          <div class="tech-info">
            <h4>TypeScript</h4>
            <p>类型安全的 JavaScript</p>
          </div>
        </div>
        <div class="tech-card">
          <div class="tech-logo vite">Vite</div>
          <div class="tech-info">
            <h4>Vite</h4>
            <p>下一代前端构建工具</p>
          </div>
        </div>
        <div class="tech-card">
          <div class="tech-logo fuse">🔍</div>
          <div class="tech-info">
            <h4>Fuse.js</h4>
            <p>轻量级模糊搜索库</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Roadmap -->
    <div class="roadmap-section">
      <div class="section-header">
        <div class="section-icon">🗺️</div>
        <div class="section-title">
          <h2>发展路线</h2>
          <p>Roadmap</p>
        </div>
      </div>
      <div class="roadmap-timeline">
        <div class="timeline-item completed">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">2024 Q1</div>
            <h4>MVP 版本</h4>
            <ul>
              <li>基础模型信息展示</li>
              <li>场景推荐功能</li>
              <li>知识库文章</li>
            </ul>
          </div>
        </div>
        <div class="timeline-item completed">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">2024 Q2</div>
            <h4>功能完善</h4>
            <ul>
              <li>全站搜索功能</li>
              <li>多维度筛选</li>
              <li>响应式设计优化</li>
            </ul>
          </div>
        </div>
        <div class="timeline-item active">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">2024 Q3</div>
            <h4>体验升级</h4>
            <ul>
              <li>UI/UX 全面优化</li>
              <li>性能优化</li>
              <li>更多模型数据</li>
            </ul>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">2024 Q4</div>
            <h4>未来规划</h4>
            <ul>
              <li>用户反馈系统</li>
              <li>模型对比工具</li>
              <li>社区功能</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="contact-section">
      <div class="contact-card">
        <div class="contact-icon">💬</div>
        <h3>反馈与建议</h3>
        <p>如果你有任何建议或发现问题，欢迎通过以下方式联系我们</p>
        <div class="contact-links">
          <a href="mailto:feedback@ai-llm-hub.com" class="contact-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            发送邮件
          </a>
          <a href="https://github.com" target="_blank" class="contact-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #0d1b2a 100%);
  border-radius: 24px;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  font-size: 40px;
  opacity: 0.12;
  animation: float 6s ease-in-out infinite;
}

.floating-icon:nth-child(2) { animation-delay: -1.5s; }
.floating-icon:nth-child(3) { animation-delay: -3s; }
.floating-icon:nth-child(4) { animation-delay: -4.5s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
}

.badge-icon {
  font-size: 16px;
}

.hero-title {
  font-size: 44px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #00d4ff 0%, #0099ff 50%, #00d4ff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient 4s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}

.hero-desc {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin: 0;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.section-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 180, 216, 0.1) 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.section-title h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 4px 0;
}

.section-title p {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Intro Section */
.intro-section {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  padding: 32px;
}

.intro-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.intro-card {
  text-align: center;
  padding: 24px;
}

.intro-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 16px;
}

.intro-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 10px 0;
}

.intro-card p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0;
}

/* Features Section */
.features-section {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  padding: 32px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  padding: 24px;
  background: var(--bg-body);
  border-radius: 16px;
  transition: all 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.feature-icon svg {
  width: 22px;
  height: 22px;
  color: white;
}

.feature-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); }
.feature-icon.purple { background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); }
.feature-icon.green { background: linear-gradient(135deg, #10b981 0%, #34d399 100%); }
.feature-icon.orange { background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); }
.feature-icon.pink { background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); }
.feature-icon.cyan { background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%); }

.feature-card h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 8px 0;
}

.feature-card p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Tech Section */
.tech-section {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  padding: 32px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.tech-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: var(--bg-body);
  border-radius: 14px;
  transition: all 0.2s ease;
}

.tech-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.08);
}

.tech-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.tech-logo.vue { background: linear-gradient(135deg, #42b883 0%, #35495e 100%); }
.tech-logo.ts { background: linear-gradient(135deg, #3178c6 0%, #235a97 100%); }
.tech-logo.vite { background: linear-gradient(135deg, #646cff 0%, #747bff 100%); }
.tech-logo.fuse { background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); font-size: 20px; }

.tech-info h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 4px 0;
}

.tech-info p {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
}

/* Roadmap Section */
.roadmap-section {
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  padding: 32px;
}

.roadmap-timeline {
  display: flex;
  gap: 24px;
}

.timeline-item {
  flex: 1;
  position: relative;
  padding-left: 24px;
  border-left: 2px solid var(--border-subtle);
}

.timeline-item.completed { border-color: #10b981; }
.timeline-item.active { border-color: var(--primary); }

.timeline-dot {
  position: absolute;
  left: -7px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--border-subtle);
  border: 2px solid var(--bg-card);
}

.timeline-item.completed .timeline-dot { background: #10b981; }
.timeline-item.active .timeline-dot { background: var(--primary); box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.2); }

.timeline-date {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.timeline-content h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 12px 0;
}

.timeline-content ul {
  margin: 0;
  padding-left: 18px;
}

.timeline-content li {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.8;
}

/* Contact Section */
.contact-section {
  display: flex;
  justify-content: center;
}

.contact-card {
  max-width: 600px;
  width: 100%;
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.06) 0%, rgba(0, 180, 216, 0.06) 100%);
  border: 1px solid rgba(0, 122, 255, 0.15);
  border-radius: 20px;
}

.contact-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.contact-card h3 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 10px 0;
}

.contact-card p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0 0 24px 0;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--primary);
  color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.contact-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
}

.contact-link svg {
  width: 18px;
  height: 18px;
}

/* Responsive */
@media (max-width: 1200px) {
  .intro-content {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .roadmap-timeline {
    flex-direction: column;
  }
  
  .timeline-item {
    border-left: none;
    border-top: 2px solid var(--border-subtle);
    padding-left: 0;
    padding-top: 20px;
  }
  
  .timeline-item.completed { border-color: #10b981; }
  .timeline-item.active { border-color: var(--primary); }
  
  .timeline-dot {
    left: 0;
    top: -7px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 48px 24px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-desc {
    font-size: 15px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 24px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-links {
    flex-direction: column;
  }
  
  .contact-link {
    justify-content: center;
  }
}
</style>
