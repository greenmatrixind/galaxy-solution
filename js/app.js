/**
 * Galaxy Solutions - Interactive Website Logic
 * Clean, sober, and accessible JavaScript for enterprise & government clients.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initProjectFilters();
  initServiceTabs();
  initQuoteForm();
  initCareersModal();
  initSearch();
  initScrollSpy();
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
      // close all
      items.forEach(i => i.classList.remove('open'));
      // toggle clicked
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
    const details = document.getElementById('quoteDetails')?.value || 'No additional details specified.';

    const refNo = 'GS-REF-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    // Populate modal receipt
    const refEl = document.getElementById('modalRefNo');
    const clientEl = document.getElementById('modalClientName');
    const typeEl = document.getElementById('modalReqType');
    const dateEl = document.getElementById('modalDate');

    if (refEl) refEl.textContent = refNo;
    if (clientEl) clientEl.textContent = `${name} (${org})`;
    if (typeEl) typeEl.textContent = reqType;
    if (dateEl) dateEl.textContent = dateStr;

    // Show modal
    if (successModal) {
      successModal.classList.remove('hidden');
      successModal.classList.add('flex');
    }

    form.reset();
  });

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    });
  }
}

// Careers Application Modal
function initCareersModal() {
  const modal = document.getElementById('careersModal');
  const openBtns = document.querySelectorAll('.open-career-modal');
  const closeBtn = document.getElementById('closeCareersModal');
  const form = document.getElementById('careersForm');
  const successNotice = document.getElementById('careerSuccessMsg');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.getAttribute('data-role') || 'Civil Engineers';
      const roleSelect = document.getElementById('careerRoleSelect');
      if (roleSelect) {
        roleSelect.value = role;
      }
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (successNotice) successNotice.classList.add('hidden');
      if (form) form.classList.remove('hidden');
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
      if (form) form.classList.add('hidden');
      if (successNotice) successNotice.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        form.reset();
      }, 2500);
    });
  }
}

// Global Quick Search Bar
function initSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('searchResultsDropdown');

  if (!searchInput || !searchResults) return;

  const searchableIndex = [
    { title: 'Reverse Osmosis (RO) Technology', category: 'Water Technology', sectionId: 'water-tech' },
    { title: 'Water Treatment Plants (WTP)', category: 'Water Technology', sectionId: 'water-tech' },
    { title: 'Sewage Treatment Plants (STP)', category: 'Water Technology', sectionId: 'water-tech' },
    { title: 'Effluent Treatment Plants (ETP)', category: 'Water Technology', sectionId: 'water-tech' },
    { title: 'Dialysis RO Systems (Healthcare)', category: 'Water Technology', sectionId: 'water-tech' },
    { title: 'Water Softening & Multi-Stage Filtration', category: 'Water Technology', sectionId: 'water-tech' },
    { title: 'Defence Technology R&D & Prototyping', category: 'Defence R&D', sectionId: 'defence-tech' },
    { title: 'Sensors & Monitoring Technologies', category: 'Defence R&D', sectionId: 'defence-tech' },
    { title: 'Unmanned-System Technologies', category: 'Defence R&D', sectionId: 'defence-tech' },
    { title: 'Government Infrastructure & PSUs', category: 'Services', sectionId: 'services' },
    { title: 'Defence Infrastructure & Barracks', category: 'Services', sectionId: 'services' },
    { title: 'Civil Construction & RCC Structures', category: 'Services', sectionId: 'services' },
    { title: 'Electrical & LT Distribution Works', category: 'Services', sectionId: 'services' },
    { title: 'Waterproofing for Roofs & Basements', category: 'Services', sectionId: 'services' },
    { title: 'Annual Maintenance Contracts (AMC)', category: 'Services', sectionId: 'services' },
    { title: 'CPWD Registered Contractor', category: 'Registrations', sectionId: 'registrations' },
    { title: 'GeM Registered Seller & Service Provider', category: 'Registrations', sectionId: 'registrations' },
    { title: 'Building Construction Dept (BCD) Jharkhand', category: 'Registrations', sectionId: 'registrations' },
    { title: 'Water Resources Dept (WRD) Jharkhand', category: 'Registrations', sectionId: 'registrations' },
    { title: 'JBVNL Registered Electrical Contractor', category: 'Registrations', sectionId: 'registrations' },
    { title: 'Jharkhand Police Registered Vendor', category: 'Registrations', sectionId: 'registrations' },
    { title: '11-Step Project Execution Process', category: 'Process', sectionId: 'process' },
    { title: 'Health, Safety & Environment (HSE) Policy', category: 'Quality & HSE', sectionId: 'quality-hse' },
    { title: 'Careers & Engineering Recruitment', category: 'Careers', sectionId: 'careers' },
    { title: 'Head Office - Bokaro Steel City', category: 'Contact', sectionId: 'contact' }
  ];

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      searchResults.classList.add('hidden');
      searchResults.innerHTML = '';
      return;
    }

    const matches = searchableIndex.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<div class="p-3 text-xs text-slate-500">No matching services or registrations found. Try "RO", "CPWD", "Defence", "STP", or "Civil".</div>`;
      searchResults.classList.remove('hidden');
      return;
    }

    searchResults.innerHTML = matches.slice(0, 6).map(m => `
      <a href="#${m.sectionId}" class="block p-2.5 text-xs border-b border-slate-100 hover:bg-slate-50 transition">
        <div class="font-semibold text-slate-900">${m.title}</div>
        <div class="text-[10px] text-slate-500 uppercase tracking-wider">${m.category}</div>
      </a>
    `).join('');

    searchResults.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });

  searchResults.addEventListener('click', () => {
    searchResults.classList.add('hidden');
    searchInput.value = '';
  });
}

// Scroll spy for active navbar state
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a, .nav-item');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Helper to preset requirement type and scroll to contact
window.selectRequirementAndContact = function(reqValue) {
  const dropdown = document.getElementById('quoteType');
  if (dropdown) {
    dropdown.value = reqValue;
  }
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
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
