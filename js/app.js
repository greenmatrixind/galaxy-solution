/**
 * Galaxy Solutions - Interactive Multi-Page Website Logic
 * Enterprise & government client accessible JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initProjectFilters();
  initServiceTabs();
  initQuoteForm();
  initCareersModal();
  initSearch();
  initQueryParamHandler();
  initBackToTop();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  const links = mobileMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// Project Showcase Filtering
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-500', 'bg-slate-900', 'text-white', 'border-brand-500', 'shadow-xs');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
      btn.classList.add('bg-brand-500', 'text-white', 'border-brand-500', 'shadow-xs');

      const category = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Services Tabs
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const tabPanes = document.querySelectorAll('.service-tab-pane');

  if (!tabBtns.length || !tabPanes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => {
        b.classList.remove('active', 'border-brand-500', 'border-blue-700', 'text-brand-600', 'text-blue-900', 'bg-brand-50', 'bg-blue-50/50');
        b.classList.add('border-transparent', 'text-slate-600', 'hover:text-slate-900');
      });

      btn.classList.add('active', 'border-brand-500', 'text-brand-600', 'bg-brand-50');
      btn.classList.remove('border-transparent', 'text-slate-600');

      tabPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });
}

// Contact & Request Quotation Form
function initQuoteForm() {
  const form = document.getElementById('quotationForm');
  const successModal = document.getElementById('quoteSuccessModal');
  const closeModalBtn = document.getElementById('closeSuccessModal');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('quoteName')?.value || 'Valued Client';
    const org = document.getElementById('quoteOrg')?.value || 'Client Organization';
    const email = document.getElementById('quoteEmail')?.value || 'N/A';
    const phone = document.getElementById('quotePhone')?.value || 'N/A';
    const reqType = document.getElementById('quoteType')?.value || 'General Inquiry';

    // Submit lead seamlessly to Netlify Forms backend
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    }).catch(err => console.log('Enquiry logged:', err));

    const refNo = 'GS-REF-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const refEl = document.getElementById('modalRefNo');
    const clientEl = document.getElementById('modalClientName');
    const typeEl = document.getElementById('modalReqType');
    const dateEl = document.getElementById('modalDate');
    const waBtn = document.getElementById('modalWhatsAppBtn');

    if (refEl) refEl.textContent = refNo;
    if (clientEl) clientEl.textContent = `${name} (${org})`;
    if (typeEl) typeEl.textContent = reqType;
    if (dateEl) dateEl.textContent = dateStr;

    if (waBtn) {
      const details = document.getElementById('quoteDetails')?.value || 'N/A';
      const waMsg = `Hello Galaxy Solutions,\n\nI have submitted an engineering inquiry on your portal:\n• Ref No: ${refNo}\n• Name: ${name}\n• Organization: ${org}\n• Category: ${reqType}\n• Phone: ${phone}\n• Scope: ${details}\n\nPlease review and provide the initial appraisal.`;
      waBtn.href = `https://wa.me/919852625103?text=${encodeURIComponent(waMsg)}`;
    }

    if (successModal) {
      successModal.classList.remove('hidden');
      successModal.classList.add('flex');
    }
  });

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
      form.reset();
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
        form.reset();
      }
    });
  }
}

// Careers Application Modal
function initCareersModal() {
  const modal = document.getElementById('careersModal');
  const openBtns = document.querySelectorAll('.open-career-modal');
  const closeBtn = document.getElementById('closeCareersModal');
  const form = document.getElementById('careersForm');
  const roleSelect = document.getElementById('careerRoleSelect');
  const successNotice = document.getElementById('careerSuccessMsg');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.getAttribute('data-role');
      if (role && roleSelect) {
        roleSelect.value = role;
      }
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (form) form.classList.remove('hidden');
      if (successNotice) successNotice.classList.add('hidden');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Submit application data to Netlify Forms backend
      const formData = new FormData(form);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      }).catch(err => console.log('Application logged:', err));

      form.classList.add('hidden');
      if (successNotice) successNotice.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        form.reset();
      }, 2500);
    });
  }
}

// Global & Mobile Quick Search Bar with Multi-Page Routing
function initSearch() {
  const searchableIndex = [
    { title: 'Reverse Osmosis (RO) Technology', category: 'Water Technology', pageUrl: 'water-tech.html' },
    { title: 'Water Treatment Plants (WTP)', category: 'Water Technology', pageUrl: 'water-tech.html' },
    { title: 'Sewage Treatment Plants (STP)', category: 'Water Technology', pageUrl: 'water-tech.html' },
    { title: 'Effluent Treatment Plants (ETP)', category: 'Water Technology', pageUrl: 'water-tech.html' },
    { title: 'Dialysis RO Systems (Healthcare)', category: 'Water Technology', pageUrl: 'water-tech.html' },
    { title: 'Water Softening & Multi-Stage Filtration', category: 'Water Technology', pageUrl: 'water-tech.html' },
    { title: 'Water Quality Monitoring & Automation', category: 'Water Technology', pageUrl: 'water-tech.html' },
    { title: 'Defence Technology R&D & Prototyping', category: 'Defence R&D', pageUrl: 'defence-tech.html' },
    { title: 'Sensors & Monitoring Technologies', category: 'Defence R&D', pageUrl: 'defence-tech.html' },
    { title: 'Unmanned-System Technologies', category: 'Defence R&D', pageUrl: 'defence-tech.html' },
    { title: 'Government Infrastructure & PSUs', category: 'Services', pageUrl: 'services.html' },
    { title: 'Defence Infrastructure & Barracks', category: 'Services', pageUrl: 'services.html' },
    { title: 'Civil Construction & RCC Structures', category: 'Services', pageUrl: 'services.html' },
    { title: 'Electrical & LT Distribution Works', category: 'Services', pageUrl: 'services.html' },
    { title: 'Waterproofing for Roofs & Basements', category: 'Services', pageUrl: 'services.html' },
    { title: 'Annual Maintenance Contracts (AMC)', category: 'Services', pageUrl: 'services.html' },
    { title: 'CPWD Registered Contractor', category: 'Registrations', pageUrl: 'registrations.html' },
    { title: 'Building Construction Dept (BCD) Jharkhand', category: 'Registrations', pageUrl: 'registrations.html' },
    { title: 'Water Resources Dept (WRD) Jharkhand', category: 'Registrations', pageUrl: 'registrations.html' },
    { title: 'JBVNL Registered Electrical Contractor', category: 'Registrations', pageUrl: 'registrations.html' },
    { title: 'State Police Vendor Empanelments (Jharkhand)', category: 'Registrations', pageUrl: 'registrations.html' },
    { title: 'GeM Portal Seller & Registered Service Provider', category: 'Registrations', pageUrl: 'registrations.html' },
    { title: '11-Step Project Execution Process', category: 'Process', pageUrl: 'process.html' },
    { title: 'Health, Safety & Environment (HSE) Policy', category: 'Quality & HSE', pageUrl: 'quality-hse.html' },
    { title: 'Quality Policy & QA/QC Standards', category: 'Quality & HSE', pageUrl: 'quality-hse.html' },
    { title: 'Careers & Engineering Recruitment', category: 'Careers', pageUrl: 'careers.html' },
    { title: 'Head Office - Bokaro Steel City', category: 'Contact', pageUrl: 'contact.html' },
    { title: 'Request Technical Quotation / Tender', category: 'Contact', pageUrl: 'contact.html' },
    { title: 'About Galaxy Solutions & Philosophy', category: 'About Us', pageUrl: 'about.html' }
  ];

  function setupSearch(inputEl, resultsEl, isDarkTheme = false) {
    if (!inputEl || !resultsEl) return;

    inputEl.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query) {
        resultsEl.classList.add('hidden');
        resultsEl.innerHTML = '';
        return;
      }

      const matches = searchableIndex.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        const textClass = isDarkTheme ? 'text-slate-400' : 'text-slate-500';
        resultsEl.innerHTML = `<div class="p-3 text-xs ${textClass}">No matching services found. Try "RO", "CPWD", "Defence", "STP", or "Civil".</div>`;
        resultsEl.classList.remove('hidden');
        return;
      }

      const itemBorder = isDarkTheme ? 'border-slate-700/60 hover:bg-slate-700/70' : 'border-slate-100 hover:bg-slate-50';
      const titleColor = isDarkTheme ? 'text-white' : 'text-slate-900';
      const catColor = isDarkTheme ? 'text-sky-300' : 'text-brand-600';

      resultsEl.innerHTML = matches.slice(0, 6).map(m => `
        <a href="${m.pageUrl}" class="block p-2.5 text-xs border-b ${itemBorder} transition">
          <div class="font-semibold ${titleColor}">${m.title}</div>
          <div class="text-[10px] ${catColor} uppercase tracking-wider font-bold">${m.category}</div>
        </a>
      `).join('');

      resultsEl.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!inputEl.contains(e.target) && !resultsEl.contains(e.target)) {
        resultsEl.classList.add('hidden');
      }
    });

    resultsEl.addEventListener('click', () => {
      resultsEl.classList.add('hidden');
      inputEl.value = '';
    });
  }

  // Setup Desktop Header Search
  setupSearch(
    document.getElementById('globalSearchInput'),
    document.getElementById('searchResultsDropdown'),
    false
  );

  // Setup Mobile Drawer Search
  setupSearch(
    document.getElementById('mobileSearchInput'),
    document.getElementById('mobileSearchResultsDropdown'),
    true
  );
}

// URL Query Parameter Handler for Preselecting Quotation Types
function initQueryParamHandler() {
  const urlParams = new URLSearchParams(window.location.search);
  const reqParam = urlParams.get('type');
  const dropdown = document.getElementById('quoteType');
  if (reqParam && dropdown) {
    let matched = false;
    for (let i = 0; i < dropdown.options.length; i++) {
      if (dropdown.options[i].value.toLowerCase() === reqParam.toLowerCase()) {
        dropdown.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const q = reqParam.toLowerCase();
      for (let i = 0; i < dropdown.options.length; i++) {
        const optVal = dropdown.options[i].value.toLowerCase();
        if (optVal && (optVal.includes(q) || q.includes(optVal))) {
          dropdown.selectedIndex = i;
          matched = true;
          break;
        }
      }
    }
    if (!matched) {
      const q = reqParam.toLowerCase();
      if (q.includes('defence') || q.includes('defense') || q.includes('r&d')) {
        dropdown.value = 'Defence Technology R&D';
      } else if (q.includes('collab')) {
        dropdown.value = 'Technology Collaboration';
      } else if (q.includes('amc') || q.includes('maintenance')) {
        dropdown.value = 'AMC / Maintenance';
      } else if (q.includes('civil') || q.includes('construction') || q.includes('project')) {
        dropdown.value = 'Civil Construction';
      } else if (q.includes('ro') || q.includes('wtp') || q.includes('dialysis')) {
        dropdown.value = 'RO / WTP';
      } else if (q.includes('stp') || q.includes('etp')) {
        dropdown.value = 'STP / ETP';
      } else if (q.includes('water')) {
        dropdown.value = 'Water Technology';
      }
    }
    setTimeout(() => {
      const form = document.getElementById('quotationForm') || document.getElementById('contact');
      form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 250);
  }
}

// Helper to preset requirement type across multiple pages
window.selectRequirementAndContact = function(reqValue) {
  const dropdown = document.getElementById('quoteType');
  if (dropdown) {
    dropdown.value = reqValue;
    const form = document.getElementById('quotationForm') || document.getElementById('contact');
    form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    window.location.href = 'contact.html?type=' + encodeURIComponent(reqValue);
  }
};

// Back to Top Floating Button Functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
