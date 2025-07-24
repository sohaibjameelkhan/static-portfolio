// Portfolio data storage
let portfolioData = {};

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
}

// Navigation management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
    }

    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
}

// Data loader
class DataLoader {
    constructor() {
        this.baseUrl = './data/';
        this.cache = new Map();
    }

    async loadJSON(filename) {
        if (this.cache.has(filename)) {
            return this.cache.get(filename);
        }

        try {
            const response = await fetch(`${this.baseUrl}${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            const data = await response.json();
            this.cache.set(filename, data);
            return data;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return this.getFallbackData(filename);
        }
    }

    getFallbackData(filename) {
        // Fallback data in case JSON files can't be loaded
        const fallbackData = {
            'personal-info.json': {
                id: 1,
                name: "Muhammad Sohaib Jameel",
                title: "Senior Mobile Application Developer",
                phone: "+92 3115244602",
                email: "sohaibjameel3@gmail.com",
                linkedin: "https://linkedin.com/in/sohaibjameel",
                github: "https://github.com/sohaibjameelkhan",
                location: "Islamabad, Punjab, Pakistan",
                summary: "Accomplished Senior Mobile Application Developer with over 4 years of experience designing, developing, and deploying high-performance apps for iOS and Android using Flutter, Dart, Kotlin, and Swift/SwiftUI."
            },
            'experiences.json': [
                {
                    id: 1,
                    startDate: "01/2023",
                    endDate: "Present",
                    location: "Islamabad, Pakistan",
                    position: "Senior Mobile Application Developer (Flutter)",
                    company: "SoftLinks FZCO",
                    description: "A software development company focusing on mobile applications",
                    achievements: [
                        "Led the development of 6+ Flutter apps from scratch, resulting in a 30% reduction in project delivery time",
                        "Optimized app performance by 40% by optimizing code and implementing efficient state management",
                        "Collaborated with backend and design teams to deploy features used by over 50,000+ active users"
                    ]
                }
            ],
            'projects.json': [
                {
                    id: 1,
                    name: "ICD Happiness Club",
                    year: "2024",
                    country: "UAE",
                    description: "A community app designed to foster connections and promote happiness among ICD members in the UAE",
                    achievements: [
                        "Successfully launched with 500+ active members within first month",
                        "Implemented real-time chat functionality with Firebase integration"
                    ],
                    technologies: ["Flutter", "Dart", "Firebase", "Provider", "REST APIs"]
                }
            ],
            'skills.json': [
                {
                    id: 1,
                    category: "Mobile Development",
                    items: ["Flutter", "Dart", "iOS (Swift/SwiftUI)", "Android (Kotlin)", "React Native"]
                }
            ],
            'education.json': [
                {
                    id: 1,
                    startDate: "12/2018",
                    endDate: "07/2022",
                    location: "Islamabad, Pakistan",
                    degree: "Bachelor of Science in Computer Science",
                    institution: "COMSATS University Islamabad"
                }
            ]
        };

        return fallbackData[filename] || {};
    }

    async loadAllData() {
        try {
            const [personalInfo, experiences, projects, skills, education] = await Promise.all([
                this.loadJSON('personal-info.json'),
                this.loadJSON('experiences.json'),
                this.loadJSON('projects.json'),
                this.loadJSON('skills.json'),
                this.loadJSON('education.json')
            ]);

            return {
                personalInfo,
                experiences,
                projects,
                skills,
                education
            };
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            return {};
        }
    }
}

// Content renderer
class ContentRenderer {
    constructor(data) {
        this.data = data;
    }

    renderHeroSection() {
        const { personalInfo } = this.data;
        if (!personalInfo) return;

        // Update hero section
        document.getElementById('hero-name').textContent = personalInfo.name || '';
        document.getElementById('hero-title').textContent = personalInfo.title || '';
        document.getElementById('hero-summary').textContent = personalInfo.summary || '';
        document.getElementById('hero-location').textContent = personalInfo.location || '';
        document.getElementById('hero-email').textContent = personalInfo.email || '';
        document.getElementById('hero-phone').textContent = personalInfo.phone || '';
        
        // Update links
        document.getElementById('hero-email-link').href = `mailto:${personalInfo.email || ''}`;
        document.getElementById('hero-phone-link').href = `tel:${personalInfo.phone || ''}`;
        document.getElementById('hero-linkedin').href = personalInfo.linkedin || '#';
        document.getElementById('hero-github').href = personalInfo.github || '#';
    }

    renderEducationSection() {
        const { education } = this.data;
        if (!education || !Array.isArray(education)) return;

        const educationList = document.getElementById('education-list');
        if (!educationList) return;

        educationList.innerHTML = education.map(edu => `
            <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h4 class="text-lg font-bold text-dark">${edu.degree}</h4>
                        <p class="text-primary font-medium">${edu.institution}</p>
                    </div>
                    <div class="text-gray-medium text-sm mt-2 md:mt-0">
                        ${edu.startDate} - ${edu.endDate} • ${edu.location}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderExperienceSection() {
        const { experiences } = this.data;
        if (!experiences || !Array.isArray(experiences)) return;

        const timeline = document.getElementById('experience-timeline');
        if (!timeline) return;

        timeline.innerHTML = experiences.map((exp, index) => `
            <div class="relative">
                ${index !== experiences.length - 1 ? 
                    '<div class="absolute left-6 top-16 w-0.5 h-32 bg-gray-300"></div>' : 
                    ''
                }
                
                <div class="bg-gray-light rounded-xl p-6 ml-14 relative">
                    <div class="absolute -left-20 top-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <i data-lucide="building" class="text-white w-5 h-5"></i>
                    </div>
                    
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                            <h3 class="text-xl font-bold text-dark mb-2">${exp.position}</h3>
                            <div class="flex items-center space-x-4 text-gray-medium mb-2">
                                <div class="flex items-center space-x-1">
                                    <i data-lucide="building" class="w-4 h-4"></i>
                                    <span class="font-medium">${exp.company}</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                                    <span>${exp.location}</span>
                                </div>
                            </div>
                            <div class="flex items-center space-x-1 text-primary">
                                <i data-lucide="calendar" class="w-4 h-4"></i>
                                <span class="font-medium">
                                    ${exp.startDate} - ${exp.endDate || "Present"}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="text-gray-medium mb-4">${exp.description}</p>
                    
                    <div class="space-y-2">
                        ${exp.achievements && exp.achievements.length > 0 ? exp.achievements.map(achievement => `
                            <div class="flex items-start space-x-3">
                                <i data-lucide="check-circle" class="text-accent mt-0.5 flex-shrink-0 w-4 h-4"></i>
                                <span class="text-gray-medium">${achievement}</span>
                            </div>
                        `).join('') : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize lucide icons
        lucide.createIcons();
    }

    renderProjectsSection() {
        const { projects } = this.data;
        if (!projects || !Array.isArray(projects)) return;

        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        grid.innerHTML = projects.map(project => `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <i data-lucide="smartphone" class="text-primary w-6 h-6"></i>
                        </div>
                        <div class="flex items-center space-x-2 text-sm text-gray-medium">
                            <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                            <span>${project.year}</span>
                            ${project.country ? `
                                <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
                                <span>${project.country}</span>
                            ` : ''}
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-bold text-dark mb-3">${project.name}</h3>
                    <p class="text-gray-medium mb-4">${project.description}</p>
                    
                    <div class="space-y-2 mb-4">
                        ${project.achievements && project.achievements.length > 0 ? project.achievements.map(achievement => `
                            <div class="flex items-start space-x-2">
                                <i data-lucide="star" class="text-accent mt-0.5 flex-shrink-0 w-3.5 h-3.5"></i>
                                <span class="text-sm text-gray-medium">${achievement}</span>
                            </div>
                        `).join('') : ''}
                    </div>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.technologies && project.technologies.length > 0 ? project.technologies.map(tech => `
                            <span class="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">${tech}</span>
                        `).join('') : ''}
                    </div>
                    
                    <div class="flex gap-2">
                        ${project.playStoreLink ? `
                            <a href="${project.playStoreLink}" target="_blank" rel="noopener noreferrer" 
                               class="flex-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white border inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                </svg>
                                <span>Play Store</span>
                            </a>
                        ` : ''}
                        
                        ${project.appStoreLink ? `
                            <a href="${project.appStoreLink}" target="_blank" rel="noopener noreferrer" 
                               class="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white border inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                                </svg>
                                <span>App Store</span>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize lucide icons
        lucide.createIcons();
    }

    renderSkillsSection() {
        const { skills } = this.data;
        if (!skills || !Array.isArray(skills)) return;

        const grid = document.getElementById('skills-grid');
        if (!grid) return;

        const iconMap = {
            'Mobile Development': 'code',
            'Development Tools': 'wrench',
            'Backend & APIs': 'database',
            'Integration & Services': 'globe'
        };

        grid.innerHTML = skills.map(skillGroup => `
            <div class="bg-gray-light rounded-xl p-6">
                <div class="flex items-center space-x-3 mb-4">
                    <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <i data-lucide="${iconMap[skillGroup.category] || 'code'}" class="text-primary w-5 h-5"></i>
                    </div>
                    <h3 class="text-xl font-bold text-dark">${skillGroup.category}</h3>
                </div>
                
                <div class="flex flex-wrap gap-2">
                    ${skillGroup.items && skillGroup.items.length > 0 ? skillGroup.items.map(skill => `
                        <span class="bg-white text-gray-medium px-3 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow">${skill}</span>
                    `).join('') : ''}
                </div>
            </div>
        `).join('');

        // Reinitialize lucide icons
        lucide.createIcons();
    }

    renderContactSection() {
        const { personalInfo } = this.data;
        if (!personalInfo) return;

        const contactElements = {
            'contact-email': `mailto:${personalInfo.email}`,
            'contact-phone': `tel:${personalInfo.phone}`,
            'contact-location': personalInfo.location,
            'contact-linkedin': personalInfo.linkedin,
            'contact-github': personalInfo.github,
            'footer-email': `mailto:${personalInfo.email}`,
            'footer-linkedin': personalInfo.linkedin,
            'footer-github': personalInfo.github
        };

        Object.entries(contactElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                if (id === 'contact-location') {
                    element.textContent = value;
                } else if (id === 'contact-email') {
                    element.href = value;
                    element.textContent = personalInfo.email;
                } else if (id === 'contact-phone') {
                    element.href = value;
                    element.textContent = personalInfo.phone;
                } else {
                    element.href = value;
                }
            }
        });
    }

    renderAll() {
        this.renderHeroSection();
        this.renderEducationSection();
        this.renderExperienceSection();
        this.renderProjectsSection();
        this.renderSkillsSection();
        this.renderContactSection();
    }
}

// Contact form handler
class ContactFormHandler {
    constructor() {
        this.init();
    }

    init() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:sohaibjameel3@gmail.com?subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        // Reset form
        e.target.reset();
        
        // Show success message (optional)
        alert('Thank you for your message! Your email client should open now.');
    }
}

// Main application
class PortfolioApp {
    constructor() {
        this.navigationManager = new NavigationManager();
        this.dataLoader = new DataLoader();
        this.contentRenderer = null;
        this.contactFormHandler = new ContactFormHandler();
        
        this.init();
    }

    async init() {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Load data
            const data = await this.dataLoader.loadAllData();
            portfolioData = data;
            
            // Render content
            this.contentRenderer = new ContentRenderer(data);
            this.contentRenderer.renderAll();
            
            // Initialize lucide icons
            lucide.createIcons();
            
            // Hide loading state
            this.hideLoadingState();
            
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
            this.showErrorState();
        }
    }

    showLoadingState() {
        // Add loading animations to key elements
        const loadingElements = [
            'hero-summary',
            'experience-timeline',
            'projects-grid',
            'skills-grid'
        ];

        loadingElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('loading');
            }
        });
    }

    hideLoadingState() {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(element => {
            element.classList.remove('loading');
        });
    }

    showErrorState() {
        console.error('Failed to load portfolio data');
        // You could show an error message to the user here
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, can pause non-essential operations
    } else {
        // Page is visible, resume operations
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    // Handle any resize-specific logic if needed
});

// Export for potential external use  
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, ThemeManager, NavigationManager, DataLoader, ContentRenderer };
}