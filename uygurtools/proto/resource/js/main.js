document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-button');
    
    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            alert('搜索: ' + searchTerm + '\n(实际功能将在未来版本中实现)');
        }
    }
    
    // Add event listeners for search
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Tool card click event
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const toolName = this.querySelector('.tool-name').textContent;
            alert('您点击了: ' + toolName + '\n(工具详情页将在未来版本中实现)');
        });
    });
    
    // Category card click event
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            alert('您选择了分类: ' + categoryName + '\n(分类详情页将在未来版本中实现)');
        });
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            event.target !== mobileMenuBtn) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Sidebar menu functionality
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu-item');
    
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            sidebarMenuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // If item has submenu (indicated by arrow), prevent default navigation
            if (this.querySelector('.arrow')) {
                e.preventDefault();
                alert('子菜单功能将在未来版本中实现');
            }
        });
    });

    // Sidebar toggle functionality
    const sidebar = document.querySelector('.sidebar');
    const mainWrapper = document.querySelector('.main-wrapper');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainWrapper.classList.toggle('expanded');
    });

    // Handle sidebar on mobile devices
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            mainWrapper.classList.remove('expanded');
        }
    });

    // 添加语言切换功能
    const languageToggle = document.querySelector('.language-toggle');
    let currentLang = 'zh'; // 默认中文
    
    languageToggle.addEventListener('click', function() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        // 这里添加切换语言的逻辑
        if (currentLang === 'en') {
            // 切换到英文
            console.log('Switched to English');
        } else {
            // 切换到中文
            console.log('切换到中文');
        }
    });
}); 