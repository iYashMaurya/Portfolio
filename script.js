// script.js - Clean and optimized version

// Menu toggle function
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Skills data - organized and clean
const skillsData = {
  programming: {
    title: "Programming Languages",
    skills: [
      { name: "C++", level: 4 },
      { name: "Java", level: 3 },
      { name: "Go", level: 2 },
      { name: "SQL", level: 3 },
      { name: "JavaScript", level: 2 }
    ]
  },
  core: {
    title: "Core Concepts",
    skills: [
      { name: "Multithreading", level: 3 },
      { name: "Design Patterns", level: 2 },
      { name: "Microservices Architecture", level: 2 },
      { name: "RESTful API Design", level: 3 }
    ]
  },
  backend: {
    title: "Backend Frameworks",
    skills: [
      { name: "Spring Boot", level: 3 },
      { name: "Spring Framework", level: 3 },
      { name: "Spring Data JPA", level: 2 },
      { name: "Spring Security", level: 2 },
      { name: "Go Fiber", level: 1 },
      { name: "gRPC", level: 2 }
    ]
  },
  api: {
    title: "API & Build Tools",
    skills: [
      { name: "REST APIs", level: 3 },
      { name: "gRPC", level: 2 },
      { name: "Swagger (OpenAPI)", level: 2 },
      { name: "Postman", level: 3 },
      { name: "Maven", level: 2 }
    ]
  },
  messaging: {
    title: "Messaging & Streaming Systems",
    skills: [
      { name: "Apache Kafka", level: 1 }
    ]
  },
  devops: {
    title: "Development & Cloud Tools",
    skills: [
      { name: "Docker", level: 2 },
      { name: "Docker Compose", level: 2 },
      { name: "Kubernetes (Basic)", level: 1 },
      { name: "Git", level: 3 },
      { name: "JUnit 5", level: 2 },
      { name: "AWS (EC2, ECS)", level: 1 }
    ]
  },
  database: {
    title: "Databases & Storage",
    skills: [
      { name: "PostgreSQL", level: 3 },
      { name: "MySQL", level: 3 },
      { name: "MongoDB", level: 2 },
      { name: "Redis", level: 1 }
    ]
  }
};

// DOM Content Loaded - Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
  initializeSkillsSection();
  initializeProjectModals();
});

// Initialize skills section
function initializeSkillsSection() {
  const skillsCategoriesContainer = document.querySelector('.skills-categories');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Render initial skills (programming by default)
  renderSkillsCategory('programming');
  
  // Add event listeners to filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Render selected category
      const filter = btn.getAttribute('data-filter');
      renderSkillsCategory(filter);
    });
  });
  
  // Function to render a skills category
  function renderSkillsCategory(category) {
    const categoryData = skillsData[category];
    if (!categoryData) return;
    
    // Create category HTML
    const categoryHTML = `
      <div class="skill-category active" data-category="${category}">
        <h3>${categoryData.title}</h3>
        <div class="skill-items-container">
          ${categoryData.skills.map(skill => createSkillItemHTML(skill)).join('')}
        </div>
      </div>
    `;
    
    // Update container
    skillsCategoriesContainer.innerHTML = categoryHTML;
    
    // Add event listeners to skill points
    initializeSkillPoints();
  }
  
  // Function to create HTML for a skill item
  function createSkillItemHTML(skill) {
    const level = skill.level;
    
    return `
      <div class="skill-item-new">
        <div class="skill-header">
          <span class="skill-name">${skill.name}</span>
        </div>
        <div class="skill-points">
          <div class="point-slider" style="width: calc(25% - 6px); left: calc(${(level - 1) * 25}% + 3px);"></div>
          <div class="point-option ${level === 1 ? 'active' : ''}" data-level="1">Basic</div>
          <div class="point-option ${level === 2 ? 'active' : ''}" data-level="2">Intermediate</div>
          <div class="point-option ${level === 3 ? 'active' : ''}" data-level="3">Advance</div>
          <div class="point-option ${level === 4 ? 'active' : ''}" data-level="4">Professional</div>
        </div>
      </div>
    `;
  }
  
  // Initialize skill point interaction
  function initializeSkillPoints() {
    const pointOptions = document.querySelectorAll('.point-option');
    
    pointOptions.forEach(option => {
      option.addEventListener('click', function() {
        const skillItem = this.closest('.skill-item-new');
        const slider = skillItem.querySelector('.point-slider');
        const allOptions = skillItem.querySelectorAll('.point-option');
        
        // Remove active class from all options
        allOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Calculate slider position
        const level = parseInt(this.getAttribute('data-level'));
        const sliderPosition = (level - 1) * 25;
slider.style.left = `calc(${sliderPosition}% + 3px)`;
slider.style.width = 'calc(25% - 6px)';
        
        // You could save this change to your data model here
        const skillName = skillItem.querySelector('.skill-name').textContent;
        updateSkillLevel(skillName, level);
      });
    });
  }
  
  // Function to update skill level in data model
  function updateSkillLevel(skillName, level) {
    // Find the skill in the data and update its level
    for (const category in skillsData) {
      const skill = skillsData[category].skills.find(s => s.name === skillName);
      if (skill) {
        skill.level = level;
        break;
      }
    }
    console.log(`Updated ${skillName} to level ${level}`);
  }
}

// Initialize project modals
function initializeProjectModals() {
  const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
  const modals = document.querySelectorAll('.project-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  // Add event listeners to learn more buttons
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const modal = document.getElementById(`project-modal-${projectId}`);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Add event listeners to close buttons
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.project-modal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
  
  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
}