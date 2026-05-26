
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.toLowerCase() === currentPage) link.classList.add('active');
  });

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.classList.toggle('no-scroll', open);
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('no-scroll');
    }));
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Puppy filters and sorting
  const puppyGrid = document.querySelector('[data-puppy-grid]');
  if (puppyGrid) {
    const cards = Array.from(puppyGrid.querySelectorAll('[data-puppy-card]'));
    const breed = document.getElementById('breedFilter');
    const gender = document.getElementById('genderFilter');
    const sort = document.getElementById('sortFilter');
    const empty = document.querySelector('[data-puppy-empty]');

    const applyFilters = () => {
      const sorted = [...cards].sort((a, b) => {
        const diff = new Date(b.dataset.born) - new Date(a.dataset.born);
        return sort && sort.value === 'oldest' ? -diff : diff;
      });
      sorted.forEach(card => puppyGrid.appendChild(card));
      let visible = 0;
      sorted.forEach(card => {
        const matchBreed = !breed || breed.value === 'all' || card.dataset.breed === breed.value;
        const matchGender = !gender || gender.value === 'all' || card.dataset.gender === gender.value;
        const show = matchBreed && matchGender;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    };

    document.querySelector('[data-apply-puppy-filters]')?.addEventListener('click', applyFilters);
    [breed, gender, sort].forEach(el => el?.addEventListener('change', applyFilters));
    document.querySelector('[data-reset-puppy-filters]')?.addEventListener('click', () => {
      if (breed) breed.value = 'all';
      if (gender) gender.value = 'all';
      if (sort) sort.value = 'newest';
      applyFilters();
    });
    applyFilters();
  }

  // Generic modal helpers
  const openModal = modal => {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
  };
  const closeModals = () => {
    document.querySelectorAll('.modal.open').forEach(modal => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('.lightbox.open').forEach(lightbox => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    });
    body.classList.remove('no-scroll');
  };

  document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeModals));
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) closeModals(); });
  });

  document.querySelectorAll('.js-puppy-details').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-puppy-card]');
      const modal = document.getElementById('puppyModal');
      const content = document.querySelector('[data-puppy-modal-content]');
      if (!card || !modal || !content) return;
      content.innerHTML = `
        <p class="script">Future Best Friend</p>
        <h2>${card.dataset.breed}</h2>
        <div class="detail-grid">
          <p><strong>Status:</strong> ${card.dataset.status}</p>
          <p><strong>Gender:</strong> ${card.dataset.gender}</p>
          <p><strong>Date of birth:</strong> ${new Date(card.dataset.born).toLocaleDateString('en-ZA', { day:'2-digit', month:'long', year:'numeric' })}</p>
          <p><strong>Colour:</strong> ${card.dataset.colour}</p>
          <p><strong>Vaccination:</strong> Up to date</p>
          <p><strong>Vet check:</strong> Completed</p>
        </div>
        <p><strong>Personality:</strong> ${card.dataset.personality}</p>
        <p>This is placeholder puppy information. Replace it with the real puppy notes when final photos and details are ready.</p>
        <a class="btn btn-primary" href="contact.html">🐾 Enquire About This Puppy</a>`;
      openModal(modal);
    });
  });

  document.querySelectorAll('.js-pedigree').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-dog-name]');
      const modal = document.getElementById('pedigreeModal');
      const content = document.querySelector('[data-pedigree-modal-content]');
      if (!card || !modal || !content) return;
      content.innerHTML = `
        <p class="script">Pedigree Information</p>
        <h2>${card.dataset.dogName}</h2>
        <p><strong>Breed:</strong> ${card.dataset.dogBreed}</p>
        <p>Pedigree certificates, health testing documentation and breeding information are available on request.</p>
        <p>Please contact us if you would like to learn more about ${card.dataset.dogName}'s bloodline, temperament and health background.</p>
        <a class="btn btn-primary" href="contact.html">🐾 Request Pedigree Info</a>`;
      openModal(modal);
    });
  });

  // Gallery filters and lightbox
  const galleryGrid = document.querySelector('[data-gallery-grid]');
  const galleryLightbox = document.getElementById('galleryLightbox');
  let visibleGalleryItems = [];
  let lightboxIndex = 0;

  const updateVisibleGalleryItems = () => {
    visibleGalleryItems = Array.from(document.querySelectorAll('[data-gallery-item]')).filter(item => !item.hidden);
  };
  const showLightboxImage = index => {
    if (!galleryLightbox || visibleGalleryItems.length === 0) return;
    lightboxIndex = (index + visibleGalleryItems.length) % visibleGalleryItems.length;
    const item = visibleGalleryItems[lightboxIndex];
    const image = galleryLightbox.querySelector('[data-lightbox-image]');
    const caption = galleryLightbox.querySelector('[data-lightbox-caption]');
    image.src = item.dataset.full;
    image.alt = item.dataset.caption || 'Gallery image';
    caption.textContent = item.dataset.caption || '';
  };

  if (galleryGrid && galleryLightbox) {
    const items = Array.from(galleryGrid.querySelectorAll('[data-gallery-item]'));
    document.querySelectorAll('[data-gallery-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.galleryFilter;
        document.querySelectorAll('[data-gallery-filter]').forEach(b => b.classList.toggle('active', b === btn));
        items.forEach(item => {
          const categories = (item.dataset.category || '').split(' ');
          item.hidden = !(filter === 'all' || categories.includes(filter));
        });
        updateVisibleGalleryItems();
      });
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        updateVisibleGalleryItems();
        showLightboxImage(visibleGalleryItems.indexOf(item));
        galleryLightbox.classList.add('open');
        galleryLightbox.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
      });
    });

    document.querySelector('[data-lightbox-close]')?.addEventListener('click', closeModals);
    document.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
    document.querySelector('[data-lightbox-next]')?.addEventListener('click', () => showLightboxImage(lightboxIndex + 1));
    galleryLightbox.addEventListener('click', e => { if (e.target === galleryLightbox) closeModals(); });
    updateVisibleGalleryItems();
  }

  // Contact validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const messageBox = contactForm.querySelector('[data-form-message]');
    const setMessage = (text, type = 'error') => {
      messageBox.textContent = text;
      messageBox.className = `form-message ${type}`;
    };
    contactForm.addEventListener('submit', event => {
      const name = contactForm.elements.name.value.trim();
      const email = contactForm.elements.email.value.trim();
      const message = contactForm.elements.message.value.trim();
      const key = contactForm.elements.access_key.value.trim();
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name) {
        event.preventDefault();
        setMessage('Please enter your name.');
        contactForm.elements.name.focus();
        return;
      }
      if (!email || !emailValid) {
        event.preventDefault();
        setMessage('Please enter a valid email address.');
        contactForm.elements.email.focus();
        return;
      }
      if (!message) {
        event.preventDefault();
        setMessage('Please enter a message before sending.');
        contactForm.elements.message.focus();
        return;
      }
      if (key === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        event.preventDefault();
        setMessage('The form is ready, but the Web3Forms access key still needs to be added before live submissions will work.');
        return;
      }
      setMessage('Thank you. Your message is being sent...', 'success');
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModals();
    if (galleryLightbox?.classList.contains('open')) {
      if (event.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
      if (event.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
    }
  });
});
