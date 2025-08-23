(function () {
    // === Data ===
    const Projects = [
        {
            title: "Marriage Harmony",
            description: "A marriage planning app built with React, Bootstrap, Node.js, Express.js, MySQL.",
            stack: "React, Bootstrap, Node.js, Express.js, MySQL",
            image: "/images/marriage.png", // Replace with actual image path
        },
        {
            title: "Ecommerce Mobile App",
            description: "A fullstack ecommerce application with all the required ecommerce features.",
            stack: "Angular, Bootstrap, Node.js, Express.js, MongoDB",
            image: "/images/fdhs-ecommerce.jpg", // Replace with actual image path
        },
        {
            title: "Sales Management Mobile App",
            description: "A fullstack sales management application with all the required sales management features.",
            stack: "Angular, Bootstrap, Node.js, Express.js, MongoDB",
            image: "/images/sales.jpg", // Replace with actual image path
        }
    ];

    // === Render Projects into #project-grid ===
    function renderProjects() {
        const projectGrid = document.getElementById('project-grid');
        if (!projectGrid) return console.warn('#project-grid not found');
        projectGrid.innerHTML = Projects.map((project, i) => `
      <div class="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
        <div class="w-full h-48 overflow-hidden">
          <img data-index="${i}" class="project-thumb w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" 
               src="${project.image}" alt="${escapeHtml(project.title)}" loading="lazy" />
        </div>
        <div class="p-6 h-auto flex flex-col items-start">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">${escapeHtml(project.title)}</h3>
          <p class="text-sm mb-4 text-gray-600">${escapeHtml(project.description)}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.stack.split(', ').map(tech => `<span class="px-2 py-1 bg-green-500 text-white text-xs rounded-full">${escapeHtml(tech)}</span>`).join('')}
          </div>
          <div class="flex gap-3 w-full">
            <a href="#" target="_blank" class="flex-1 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-center">Visit</a>
            <a href="${project.image}" download class="flex-1 text-sm px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded text-center">Download</a>
          </div>
        </div>
      </div>
    `).join('');

        // Attach listeners for thumbnails
        document.querySelectorAll('.project-thumb').forEach(img => {
            img.addEventListener('click', (e) => {
                const idx = Number(e.currentTarget.getAttribute('data-index'));
                openGallery(idx);
            });
        });
    }

    // Small helper to avoid HTML injection in titles/stacks
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // === Modal Logic ===
    let currentIndex = 0;
    let modal, modalImage, btnNext, btnPrev, btnClose;

    function initModalElements() {
        modal = document.getElementById('image-modal');
        modalImage = document.getElementById('modal-image');
        btnNext = document.getElementById('modal-next');
        btnPrev = document.getElementById('modal-prev');
        btnClose = document.getElementById('modal-close');

        if (!modal || !modalImage || !btnNext || !btnPrev || !btnClose) {
            console.warn('Modal elements missing');
            return;
        }

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        btnClose.addEventListener('click', closeModal);
        btnNext.addEventListener('click', showNext);
        btnPrev.addEventListener('click', showPrev);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal || modal.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });

        // Prevent image drag ghost
        modalImage.addEventListener('dragstart', (e) => e.preventDefault());
    }

    function openGallery(index) {
        if (!modal) initModalElements();
        currentIndex = (typeof index === 'number') ? index : 0;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        showImageAt(currentIndex);
    }

    function closeModal() {
        if (!modal) return;
        modalImage.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            modalImage.src = '';
        }, 300);
    }

    function showImageAt(idx) {
        const proj = Projects[idx];
        if (!proj) return;
        modalImage.classList.remove('opacity-100', 'scale-100');
        modalImage.classList.add('opacity-0', 'scale-95');
        const img = new Image();
        img.src = proj.image;
        img.onload = () => {
            modalImage.src = proj.image;
            requestAnimationFrame(() => {
                modalImage.classList.remove('opacity-0', 'scale-95');
                modalImage.classList.add('opacity-100', 'scale-100');
            });
        };
        img.onerror = () => {
            modalImage.src = '';
            console.warn('Image load failed for:', proj.image);
        };
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % Projects.length;
        showImageAt(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + Projects.length) % Projects.length;
        showImageAt(currentIndex);
    }

    // === Scroll and Visibility Handling ===
    document.addEventListener('DOMContentLoaded', () => {
        renderProjects();
        initModalElements();

        // Handle navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Handle section visibility
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        sections.forEach(section => observer.observe(section));
    });

    // Expose openGallery to global
    window.openGallery = openGallery;
})();