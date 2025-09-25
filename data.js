(function () {
    // === Data ===
    const Projects = [
        {
            title: "Marriage Harmony",
            description: "A marriage planning app built with React, Bootstrap, Node.js, Express.js, MySQL.",
            stack: "React, Bootstrap, Node.js, Express.js, MySQL",
            image: "/images/marriage.png",
        },
        {
            title: "Ecommerce Mobile App",
            description: "A fullstack ecommerce application with all the required ecommerce features.",
            stack: "Angular, Bootstrap, Node.js, Express.js, MongoDB",
            image: "/images/fdhs-ecommerce.jpg",
        },
        {
            title: "Sales Management Mobile App",
            description: "A fullstack sales management application with all the required sales management features.",
            stack: "Angular, Bootstrap, Node.js, Express.js, MongoDB",
            image: "/images/sales.jpg",
        },
        {
            title: "AI Powered Study Assistant",
            description: "An AI-powered study assistant that helps students with personalized learning experiences.",
            stack: "React, Tailwind CSS, Node.js, Express.js, MongoDB, OpenAI API",
            image: "/images/LMS.png",
        },
        {
            title: "AI Powered Code Assistant",
            description: "An AI-powered code assistant that helps developers with code generation and debugging.",
            stack: "Next.js, Tailwind CSS, Shadi UI, Convex database, Openrouter API",
            image: "/images/code editor.png",
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

    // ---------- Careers: demo data + render ----------
    const jobs = [
        {
            id: 1,
            title: "Frontend Developer",
            type: "Remote",
            location: "Pune, India",
            salary: "₹40k - ₹90k / month",
            short: "2+ years in React, Angular or Vue; strong skills in Tailwind/SCSS.",
            desc: "We’re looking for a Frontend Developer to build responsive, accessible, and high-performance interfaces.",
            bullets: [
                "Modern JS (ES6+), React/Angular/Vue",
                "Component design and performance optimization",
                "Experience integrating with REST APIs"
            ]
        },
        {
            id: 2,
            title: "Backend Developer (Node.js)",
            type: "Onsite",
            location: "Mumbai, India",
            salary: "₹50k - ₹120k / month",
            short: "Node.js, Express, SQL/NoSQL, Authentication, Deployment.",
            desc: "An experienced backend developer to build scalable APIs and high-availability systems.",
            bullets: [
                "Node.js, Express expertise",
                "Database design (Postgres/MySQL/MongoDB)",
                "Testing, CI/CD experience"
            ]
        },
        {
            id: 3,
            title: "Fullstack Developer (MEAN, MERN)",
            type: "Onsite",
            location: "Mumbai, India",
            salary: "₹50k - ₹120k / month",
            short: "Node.js, Express, SQL/NoSQL, Authentication, Deployment.",
            desc: "An experienced backend developer to build scalable APIs and high-availability systems.",
            bullets: [
                "Node.js, Express expertise",
                "Database design (Postgres/MySQL/MongoDB)",
                "Testing, CI/CD experience"
            ]
        },
        {
            id: 4,
            title: "UI/UX Designer",
            type: "Remote",
            location: "Anywhere, Remote",
            salary: "₹30k - ₹80k / month",
            short: "Figma, design systems, prototyping, and user research.",
            desc: "A creative UI/UX Designer to craft attractive and user-friendly product experiences.",
            bullets: [
                "Proficiency in Figma",
                "Experience with design systems and component libraries",
                "User testing and prototyping skills"
            ]
        },
        {
            id: 5,
            title: "Python Fullstack Developer",
            type: "Onsite",
            location: "Anywhere, Remote",
            salary: "₹30k - ₹80k / month",
            short: "Figma, design systems, prototyping, and user research.",
            desc: "A creative UI/UX Designer to craft attractive and user-friendly product experiences.",
            bullets: [
                "Proficiency in Figma",
                "Experience with design systems and component libraries",
                "User testing and prototyping skills"
            ]
        }
    ];

    function renderCareers(list = jobs) {
        const grid = document.getElementById('career-grid');
        grid.innerHTML = '';
        list.forEach(job => {
            const card = document.createElement('div');
            card.className = 'career-card p-6';
            card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <div class="career-role">${job.title}</div>
          <div class="career-meta mt-2">${job.short}</div>
        </div>
        <div class="text-right">
          <div class="career-badge ${job.type.toLowerCase() === 'remote' ? 'career-remote' : 'career-onsite'}">
            ${job.type}
          </div>
          <div class="text-sm text-gray-500 mt-2">${job.location}</div>
          <div class="text-sm font-semibold text-gray-700 mt-1">${job.salary}</div>
        </div>
      </div>
      <div class="mt-4 flex gap-3">
        <button class="open-job-details px-4 py-2 rounded-full border border-purple-600 text-purple-600 font-semibold" data-id="${job.id}">Details</button>
        <a href="mailto:fdhssolution@gmail.com?subject=Application for ${encodeURIComponent(job.title)}" class="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold">Apply</a>
      </div>
    `;
            grid.appendChild(card);
        });

        // attach handlers
        Array.from(document.getElementsByClassName('open-job-details')).forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.getAttribute('data-id'));
                openJobModal(id);
            });
        });
    }

    function openJobModal(id) {
        const job = jobs.find(j => j.id === id);
        if (!job) return;
        document.getElementById('job-modal-title').innerText = job.title;
        document.getElementById('job-modal-type').innerText = job.type;
        document.getElementById('job-modal-location').innerText = job.location;
        document.getElementById('job-modal-salary').innerText = job.salary;
        document.getElementById('job-modal-desc').innerText = job.desc;
        const listEl = document.getElementById('job-modal-list');
        listEl.innerHTML = '';
        job.bullets.forEach(b => {
            const li = document.createElement('li');
            li.innerText = b;
            listEl.appendChild(li);
        });

        // mailto
        const mailto = document.getElementById('apply-mailto');
        mailto.href = `mailto:fdhssolution@gmail.com?subject=${encodeURIComponent('Application for ' + job.title)}&body=${encodeURIComponent('Hi team,\n\nI would like to apply for the position of ' + job.title + '.\n\nRegards,\n')}`;

        // fill form hidden inputs
        document.getElementById('form-subject').value = `Job Application - ${job.title}`;
        document.getElementById('form-position').value = job.title;

        // show modal
        document.getElementById('job-modal').classList.remove('hidden');
    }

    document.getElementById('job-modal-close').addEventListener('click', () => {
        document.getElementById('job-modal').classList.add('hidden');
    });

    document.getElementById('job-modal').addEventListener('click', (e) => {
        // close on backdrop click
        if (e.target.id === 'job-modal') {
            document.getElementById('job-modal').classList.add('hidden');
        }
    });

    // filters
    document.getElementById('filter-remote').addEventListener('click', () => {
        renderCareers(jobs.filter(j => j.type.toLowerCase() === 'remote'));
    });

    document.getElementById('filter-all').addEventListener('click', () => {
        renderCareers(jobs);
    });

    // initial render
    renderCareers();

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