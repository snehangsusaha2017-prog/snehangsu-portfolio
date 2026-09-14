document.addEventListener('DOMContentLoaded', () => {

  // ── THEME ───────────────────────────────────────────────────
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const stored = localStorage.getItem('sn-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('sn-theme', next);
    });
  });

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) icon.className = t === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
    });
  }



  // ── MOBILE MENU ──────────────────────────────────────────────
  const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileDrawer   = document.getElementById('mobileNavDrawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
    mobileCloseBtn.addEventListener('click', () => mobileDrawer.classList.remove('open'));
  }

  // ── SCROLLSPY (sidebar nav for subpages) ─────────────────────
  const sections  = document.querySelectorAll('.module-section');
  const sideItems = document.querySelectorAll('.sidebar-item');

  if (sections.length && sideItems.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sideItems.forEach(item => {
            const a = item.querySelector('a');
            if (a && a.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => spy.observe(s));
  }

  // ── FLOATING TOC BUTTON (mobile) ─────────────────────────────
  const floatBtn  = document.querySelector('.floating-toc-btn');
  const sidebarEl = document.querySelector('.sidebar-nav');

  if (floatBtn && sidebarEl) {
    floatBtn.addEventListener('click', e => {
      e.stopPropagation();
      sidebarEl.classList.toggle('open');
      const icon = floatBtn.querySelector('i');
      if (icon) icon.className = sidebarEl.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-list-ul';
    });

    // Close when clicking a link
    sidebarEl.querySelectorAll('.sidebar-item a').forEach(link => {
      link.addEventListener('click', () => {
        sidebarEl.classList.remove('open');
        const icon = floatBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-list-ul';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', e => {
      if (sidebarEl.classList.contains('open') && !sidebarEl.contains(e.target) && e.target !== floatBtn) {
        sidebarEl.classList.remove('open');
        const icon = floatBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-list-ul';
      }
    });
  }

  // ── CONTACT MODAL ────────────────────────────────────────────
  const triggers   = document.querySelectorAll('.contact-me-trigger');
  const modal      = document.getElementById('contactModal');
  const closeModal = document.querySelector('.modal-close-btn');

  if (modal) {
    triggers.forEach(t => t.addEventListener('click', e => { e.preventDefault(); modal.classList.add('open'); }));
    closeModal?.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
  }

  // ── ROBOT HOTSPOT WIDGET (HOMEPAGE) ──────────────────────────
  const robotWidget    = document.getElementById('robotWidget');
  const robotCloseBtn  = document.getElementById('robotCloseBtn');
  const robotReopenBtn = document.getElementById('robotReopenBtn');

  if (robotWidget && robotCloseBtn && robotReopenBtn) {
    robotCloseBtn.addEventListener('click', () => {
      robotWidget.classList.add('minimized');
      robotReopenBtn.classList.add('visible');
    });

    robotReopenBtn.addEventListener('click', () => {
      robotWidget.classList.remove('minimized');
      robotReopenBtn.classList.remove('visible');
    });
  }

  // ── EXPLORE PAGE FLOATING CAROUSEL & VIEW TOGGLE ──────────────
  const isExplorePage = document.body.classList.contains('explore-page');

  if (isExplorePage) {
    const modulesData = [
      {
        num: '01',
        title: 'Internship – Bajaj Finance',
        eyebrow: 'PROFESSIONAL EXPERIENCE',
        status: 'wip',
        statusText: 'WORK IN PROGRESS',
        bgGradient: 'radial-gradient(circle at 50% 40%, #0d1e4a 0%, #050b1a 100%)',
        desc: 'Product Management – Payments (Acquiring) at Bajaj Finance Ltd. Soundbox reconciliation automation (23.8% cost reduction), AI Merchant Dashboard revamp, and UAT for 12 live requirements.',
        ctaText: 'See SB-RECON Prototype ↗',
        ctaUrl: 'https://snehangsusaha2017-prog.github.io/sb-recon/',
        isExternal: true
      },
      {
        num: '02',
        title: 'Credit Risk Model',
        eyebrow: 'DEPLOYED MODEL',
        status: 'wip',
        statusText: 'WORK IN PROGRESS',
        bgGradient: 'radial-gradient(circle at 50% 40%, #1a1038 0%, #090518 100%)',
        desc: 'End-to-end Machine Learning pipeline evaluating probability of default (PD) using XGBoost & WoE binning, served via FastAPI & Streamlit.',
        ctaText: 'WIP Documentation',
        ctaUrl: '#credit-risk-modelling',
        isExternal: false
      },
      {
        num: '03',
        title: 'Blockchain Simulation',
        eyebrow: 'DISTRIBUTED SYSTEMS',
        status: 'live',
        statusText: 'LIVE',
        bgGradient: 'radial-gradient(circle at 50% 40%, #062b38 0%, #030f17 100%)',
        desc: 'Functional local blockchain network demonstrating ledger immutability, SHA-256 mining, and consensus mechanics in real time.',
        ctaText: 'Launch Simulation Portal ↗',
        ctaUrl: 'https://snehangsusaha2017-prog.github.io/blockchain-portal/',
        isExternal: true
      },
      {
        num: '04',
        title: 'Retail Analytics Dashboard',
        eyebrow: 'BUSINESS INTELLIGENCE & DECISION PLATFORM',
        status: 'live',
        statusText: 'LIVE',
        bgGradient: 'radial-gradient(circle at 50% 40%, #062e1e 0%, #02120b 100%)',
        desc: 'Apollo RetailIQ AI — decision intelligence platform connecting 247+ stores across 10 states. Choose a sub-module below: learn the design study or open the live app (operating on synthetic dataset).',
        ctaText: 'See Dashboard App ↗',
        ctaUrl: 'https://apollo-retailiq.ai.studio/',
        isExternal: true,
        hasLearnOption: true
      },
      {
        num: '05',
        title: 'Learn with Me',
        eyebrow: 'KNOWLEDGE SHARING',
        status: 'wip',
        statusText: 'WORK IN PROGRESS',
        bgGradient: 'radial-gradient(circle at 50% 40%, #200e38 0%, #0c0417 100%)',
        desc: 'Tutorials, architecture guides, and study notes on N8N Automations, FinTech payment gateways (Adyen), and micro-lending apps.',
        ctaText: 'WIP Documentation',
        ctaUrl: '#learn-with-me',
        isExternal: false
      },
      {
        num: '06',
        title: 'RAWE — Learning by Doing',
        eyebrow: 'FIELD EXPERIENCE',
        status: 'wip',
        statusText: 'WORK IN PROGRESS',
        bgGradient: 'radial-gradient(circle at 50% 40%, #361c06 0%, #140902 100%)',
        desc: 'Rural Agricultural Work Experience — applying economic models under real-world resource constraints alongside local communities.',
        ctaText: 'WIP Documentation',
        ctaUrl: '#rawe',
        isExternal: false
      }
    ];

    let currentIndex = 0;
    let isScrollMode = false;

    const dynamicBg       = document.getElementById('dynamicBgOverlay');
    const stage           = document.getElementById('exploreCarouselStage');
    const scrollContainer = document.getElementById('exploreScrollContainer');
    const toggleBtn       = document.getElementById('exploreViewToggleBtn');
    const toggleText      = document.getElementById('viewToggleText');

    const prevBtn         = document.getElementById('carouselPrevBtn');
    const nextBtn         = document.getElementById('carouselNextBtn');
    const currentNumEl    = document.getElementById('carouselCurrentNum');
    const eyebrowEl       = document.getElementById('carouselEyebrow');
    const statusBadgeEl   = document.getElementById('carouselStatusBadge');
    const ampContent      = document.getElementById('ampContent');

    const cards           = document.querySelectorAll('.floating-block-card');
    const sidebarLinks    = document.querySelectorAll('.sidebar-item');

    function updateModule(index) {
      const total = modulesData.length;
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      currentIndex = index;

      const data = modulesData[currentIndex];

      // Update background gradient
      if (dynamicBg && data.bgGradient) {
        dynamicBg.style.background = data.bgGradient;
      }

      // Update Header Tracker
      if (currentNumEl) currentNumEl.textContent = data.num;
      if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

      if (statusBadgeEl) {
        if (data.status === 'live') {
          statusBadgeEl.className = 'tracker-status live';
          statusBadgeEl.innerHTML = '<span class="pulse-dot"></span> LIVE';
        } else {
          statusBadgeEl.className = 'tracker-status wip';
          statusBadgeEl.innerHTML = '<i class="fa-solid fa-hourglass-half"></i> WIP';
        }
      }

      // Show EXACTLY MAX 3 CARDS: Prev, Active, Next
      const prevIdx = (currentIndex - 1 + total) % total;
      const nextIdx = (currentIndex + 1) % total;

      cards.forEach((card, idx) => {
        card.classList.remove('active', 'card-prev', 'card-next', 'card-hidden');
        if (idx === currentIndex) {
          card.classList.add('active');
          card.style.display = 'flex';
          card.style.order = '2';
        } else if (idx === prevIdx) {
          card.classList.add('card-prev');
          card.style.display = 'flex';
          card.style.order = '1';
        } else if (idx === nextIdx) {
          card.classList.add('card-next');
          card.style.display = 'flex';
          card.style.order = '3';
        } else {
          card.classList.add('card-hidden');
          card.style.display = 'none';
        }
      });

      // Update Sidebar Items Active class
      sidebarLinks.forEach((item, idx) => {
        if (idx === currentIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update Quick Detail Panel Content
      if (ampContent) {
        const ctaAttr = data.isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        const learnBtnHtml = data.hasLearnOption 
          ? `<button class="amp-btn-secondary trigger-learn-modal"><i class="fa-solid fa-book-open-reader"></i> Learn Study</button>`
          : '';
        const noteHtml = data.hasLearnOption
          ? `<div class="dummy-dataset-badge"><i class="fa-solid fa-database"></i> Note: Operating on a synthetic dataset</div>`
          : '';

        ampContent.innerHTML = `
          <div class="amp-header">
            <span class="amp-eyebrow">${data.eyebrow}</span>
            <span class="status-pill ${data.status}">${data.status === 'live' ? '<span class="pulse-dot"></span> Live' : '<i class="fa-solid fa-hourglass-half"></i> Work In Progress'}</span>
          </div>
          <h2 class="amp-title">${data.title}</h2>
          ${noteHtml}
          <p class="amp-desc">${data.desc}</p>
          <div class="amp-actions">
            <a href="${data.ctaUrl}" ${ctaAttr} class="amp-btn-primary">
              <span>${data.ctaText}</span>
              <i class="fa-solid ${data.isExternal ? 'fa-arrow-up-right-from-square' : 'fa-arrow-right'}"></i>
            </a>
            ${learnBtnHtml}
          </div>
        `;
      }
    }

    // Prev / Next Listeners
    prevBtn?.addEventListener('click', () => updateModule(currentIndex - 1));
    nextBtn?.addEventListener('click', () => updateModule(currentIndex + 1));

    // Keyboard Arrow Keys Navigation
    document.addEventListener('keydown', e => {
      if (isExplorePage && !isScrollMode) {
        if (e.key === 'ArrowLeft') updateModule(currentIndex - 1);
        if (e.key === 'ArrowRight') updateModule(currentIndex + 1);
      }
    });

    // Floating Card Click Handler
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => updateModule(idx));
    });

    // Sidebar Items Click Handler
    sidebarLinks.forEach((item, idx) => {
      item.addEventListener('click', e => {
        if (!isScrollMode) {
          e.preventDefault();
          updateModule(idx);
        }
      });
    });

    // View Toggle Button (Carousel vs Scroll List)
    toggleBtn?.addEventListener('click', () => {
      isScrollMode = !isScrollMode;

      if (isScrollMode) {
        stage.style.display = 'none';
        scrollContainer.style.display = 'block';
        if (toggleText) toggleText.textContent = 'FLOATING BLOCK VIEW';
        if (toggleBtn) toggleBtn.querySelector('i').className = 'fa-solid fa-layer-group';
      } else {
        stage.style.display = 'flex';
        scrollContainer.style.display = 'none';
        if (toggleText) toggleText.textContent = 'SEE ALL MODULES';
        if (toggleBtn) toggleBtn.querySelector('i').className = 'fa-solid fa-list-ul';
        updateModule(currentIndex);
      }
    });

    // Initialize first module
    updateModule(0);
  }

  // ── MY JOURNEY PAGE FLOATING CAROUSEL & VIEW TOGGLE ───────────
  const isJourneyPage = document.body.classList.contains('journey-page');

  if (isJourneyPage) {
    const journeyModulesData = [
      {
        num: '01',
        title: 'Who am I?',
        eyebrow: 'IDENTITY',
        bgGradient: 'radial-gradient(circle at 50% 40%, #3a0d1e 0%, #17040a 100%)',
        desc: 'A developer, designer, and student of systems who loves bridging technical depth with strategic thinking and product intuition.',
        quote: '"Learn continuously, build deliberately, and leave things better than you found them."',
        sectionId: 'who-am-i'
      },
      {
        num: '02',
        title: 'What I did?',
        eyebrow: 'EXPERIENCE',
        bgGradient: 'radial-gradient(circle at 50% 40%, #1e0d3a 0%, #0c0417 100%)',
        desc: 'Pursuing a rigorous academic path combining software engineering, data sciences, and business analytics. Learning from mistakes, practicing Karma Yoga, and navigating Placecom challenges.',
        quote: '"Mistakes are data points. Debugging your process is as important as debugging your code."',
        sectionId: 'what-i-did'
      },
      {
        num: '03',
        title: 'What I achieved?',
        eyebrow: 'ACHIEVEMENTS',
        bgGradient: 'radial-gradient(circle at 50% 40%, #382506 0%, #170f02 100%)',
        desc: 'Gold Medals in academic excellence, Certificates of Distinction in analytics, and victories in high-stakes technical hackathons.',
        quote: '"Excellence is not an accident — it is the result of continuous iterations."',
        sectionId: 'what-i-achieved'
      },
      {
        num: '04',
        title: 'Spices of my life',
        eyebrow: 'PERSONAL',
        bgGradient: 'radial-gradient(circle at 50% 40%, #062b1a 0%, #02120b 100%)',
        desc: 'Photography & architectural geometry, exploring cityscapes and industrial history, deep reading into technology builders, and brewing artisanal coffee.',
        quote: '"Curiosity outside of work fuels creativity inside of work."',
        sectionId: 'spices-of-life'
      },
      {
        num: '05',
        title: 'Fun Philosophy',
        eyebrow: 'PHILOSOPHY · HUMOUR',
        bgGradient: 'radial-gradient(circle at 50% 40%, #0b273d 0%, #030e17 100%)',
        desc: 'The 2 AM Rule: If it doesn\'t work by 2 AM, sleep fixes it by 9 AM. Occam\'s Butterknife & infinite coffee loops.',
        quote: '"Coffee is the input. Code is the side-effect."',
        sectionId: 'fun-philosophy'
      },
      {
        num: '06',
        title: 'अब्बा नहीं मानेंगे',
        eyebrow: 'INDIAN ENGINEER DILEMMA',
        bgGradient: 'radial-gradient(circle at 50% 40%, #330b14 0%, #140307 100%)',
        desc: 'Navigating the classic engineer dilemma: balancing traditional societal expectations with a passion for software craft. Proving value through tangible output.',
        quote: '"Building real things that showcase tangible value is the only argument that works."',
        sectionId: 'abba-nahin-maanenge'
      }
    ];

    let currentJourneyIndex = 0;
    let isJourneyScrollMode = false;

    const dynamicBg       = document.getElementById('dynamicBgOverlay');
    const stage           = document.getElementById('journeyCarouselStage');
    const scrollContainer = document.getElementById('journeyScrollContainer');
    const toggleBtn       = document.getElementById('journeyViewToggleBtn');
    const toggleText      = document.getElementById('journeyViewToggleText');

    const prevBtn         = document.getElementById('journeyPrevBtn');
    const nextBtn         = document.getElementById('journeyNextBtn');
    const currentNumEl    = document.getElementById('journeyCurrentNum');
    const eyebrowEl       = document.getElementById('journeyEyebrow');
    const ampContent      = document.getElementById('journeyAmpContent');

    const cards           = document.querySelectorAll('#journeyBlocksContainer .floating-block-card');
    const sidebarLinks    = document.querySelectorAll('.sidebar-nav .sidebar-item');

    function updateJourneyModule(index) {
      const total = journeyModulesData.length;
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      currentJourneyIndex = index;

      const data = journeyModulesData[currentJourneyIndex];

      // Dynamic Background Gradient
      if (dynamicBg && data.bgGradient) {
        dynamicBg.style.background = data.bgGradient;
      }

      // Update Tracker
      if (currentNumEl) currentNumEl.textContent = data.num;
      if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;

      // Show EXACTLY MAX 3 CARDS: Prev, Active, Next
      const prevIdx = (currentJourneyIndex - 1 + total) % total;
      const nextIdx = (currentJourneyIndex + 1) % total;

      cards.forEach((card, idx) => {
        card.classList.remove('active', 'card-prev', 'card-next', 'card-hidden');
        if (idx === currentJourneyIndex) {
          card.classList.add('active');
          card.style.display = 'flex';
          card.style.order = '2';
        } else if (idx === prevIdx) {
          card.classList.add('card-prev');
          card.style.display = 'flex';
          card.style.order = '1';
        } else if (idx === nextIdx) {
          card.classList.add('card-next');
          card.style.display = 'flex';
          card.style.order = '3';
        } else {
          card.classList.add('card-hidden');
          card.style.display = 'none';
        }
      });

      // Sync Sidebar Links
      sidebarLinks.forEach((item, idx) => {
        if (idx === currentJourneyIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Quick Detail Panel
      if (ampContent) {
        ampContent.innerHTML = `
          <div class="amp-header">
            <span class="amp-eyebrow">${data.eyebrow}</span>
            <span class="status-pill live">CHAPTER ${data.num}</span>
          </div>
          <h2 class="amp-title">${data.title}</h2>
          <p class="amp-desc">${data.desc}</p>
          <div class="highlight-quote" style="margin-top: 1rem;">${data.quote}</div>
          <div class="amp-actions" style="margin-top: 1.25rem;">
            <button class="amp-btn-primary jump-to-scroll-btn" data-section="${data.sectionId}">
              <span>Read Full Chapter</span>
              <i class="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        `;

        const jumpBtn = ampContent.querySelector('.jump-to-scroll-btn');
        jumpBtn?.addEventListener('click', () => {
          switchToScrollView();
          const targetSection = document.getElementById(data.sectionId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }

    function switchToScrollView() {
      isJourneyScrollMode = true;
      if (stage) stage.style.display = 'none';
      if (scrollContainer) scrollContainer.style.display = 'block';
      if (toggleText) toggleText.textContent = 'FLOATING BLOCK VIEW';
      if (toggleBtn) toggleBtn.querySelector('i').className = 'fa-solid fa-layer-group';
    }

    function switchToCarouselView() {
      isJourneyScrollMode = false;
      if (stage) stage.style.display = 'flex';
      if (scrollContainer) scrollContainer.style.display = 'none';
      if (toggleText) toggleText.textContent = 'SEE ALL MODULES';
      if (toggleBtn) toggleBtn.querySelector('i').className = 'fa-solid fa-list-ul';
      updateJourneyModule(currentJourneyIndex);
    }

    // Prev / Next Listeners
    prevBtn?.addEventListener('click', () => updateJourneyModule(currentJourneyIndex - 1));
    nextBtn?.addEventListener('click', () => updateJourneyModule(currentJourneyIndex + 1));

    // Keyboard Arrow Navigation
    document.addEventListener('keydown', e => {
      if (isJourneyPage && !isJourneyScrollMode) {
        if (e.key === 'ArrowLeft') updateJourneyModule(currentJourneyIndex - 1);
        if (e.key === 'ArrowRight') updateJourneyModule(currentJourneyIndex + 1);
      }
    });

    // Card Clicks
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => updateJourneyModule(idx));
    });

    // Sidebar Clicks
    sidebarLinks.forEach((item, idx) => {
      item.addEventListener('click', e => {
        if (!isJourneyScrollMode) {
          e.preventDefault();
          updateJourneyModule(idx);
        }
      });
    });

    // View Toggle
    toggleBtn?.addEventListener('click', () => {
      if (isJourneyScrollMode) {
        switchToCarouselView();
      } else {
        switchToScrollView();
      }
    });

    // Init
    updateJourneyModule(0);
  }

  // ── APOLLO RETAILIQ AI LEARNING MODAL ────────────────────────
  const learnModal = document.getElementById('retailIQModal');
  const closeLearnModalBtn = document.getElementById('closeLearnModalBtn');

  document.addEventListener('click', e => {
    if (e.target.closest('.trigger-learn-modal')) {
      e.preventDefault();
      learnModal?.classList.add('open');
    }
  });

  closeLearnModalBtn?.addEventListener('click', () => learnModal?.classList.remove('open'));
  learnModal?.addEventListener('click', e => { if (e.target === learnModal) learnModal.classList.remove('open'); });

  // ── INTERNSHIP ABOUT MODAL ───────────────────────────────────
  const internshipAboutModal = document.getElementById('internshipAboutModal');
  const closeInternshipAboutBtn = document.getElementById('closeInternshipAboutBtn');

  document.addEventListener('click', e => {
    if (e.target.closest('.trigger-internship-about-modal')) {
      e.preventDefault();
      internshipAboutModal?.classList.add('open');
    }
  });
  closeInternshipAboutBtn?.addEventListener('click', () => internshipAboutModal?.classList.remove('open'));
  internshipAboutModal?.addEventListener('click', e => { if (e.target === internshipAboutModal) internshipAboutModal.classList.remove('open'); });

  // ── INTERNSHIP REPORT PASSWORD MODAL ────────────────────────
  const internshipReportModal = document.getElementById('internshipReportModal');
  const closeInternshipReportBtn = document.getElementById('closeInternshipReportBtn');
  const reportPasswordInput = document.getElementById('reportPasswordInput');
  const reportPasswordSubmit = document.getElementById('reportPasswordSubmit');
  const reportPasswordError = document.getElementById('reportPasswordError');
  const reportPasswordWrap = document.getElementById('reportPasswordWrap');
  const reportViewerWrap = document.getElementById('reportViewerWrap');

  const REPORT_PASSWORD = 'saha470@bajajglim';

  document.addEventListener('click', e => {
    if (e.target.closest('.trigger-internship-report-modal')) {
      e.preventDefault();
      // Reset state each open
      if (reportPasswordWrap) reportPasswordWrap.style.display = 'block';
      if (reportViewerWrap) reportViewerWrap.style.display = 'none';
      if (reportPasswordInput) reportPasswordInput.value = '';
      if (reportPasswordError) reportPasswordError.style.display = 'none';
      internshipReportModal?.classList.add('open');
    }
  });

  reportPasswordSubmit?.addEventListener('click', () => {
    if (reportPasswordInput?.value === REPORT_PASSWORD) {
      reportPasswordWrap.style.display = 'none';
      reportViewerWrap.style.display = 'block';
    } else {
      if (reportPasswordError) reportPasswordError.style.display = 'block';
      if (reportPasswordInput) { reportPasswordInput.value = ''; reportPasswordInput.focus(); }
    }
  });

  reportPasswordInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') reportPasswordSubmit?.click();
  });

  closeInternshipReportBtn?.addEventListener('click', () => internshipReportModal?.classList.remove('open'));
  internshipReportModal?.addEventListener('click', e => { if (e.target === internshipReportModal) internshipReportModal.classList.remove('open'); });

});
