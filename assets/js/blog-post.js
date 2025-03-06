document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add reveal animation for content sections as you scroll
    const revealElements = document.querySelectorAll('.post-content h2, .post-content h3, .post-content p, .post-image-content');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add visible class to elements in viewport
    function revealOnScroll() {
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('reveal-visible');
            }
        });
    }

    // Add initial class to elements
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    // Run on load and scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Get URL parameters to load dynamic content
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    // If we have a post ID, we would load the specific post data
    // This is a placeholder for dynamic content loading
    if (postId) {
        loadPostData(postId);
    }

    // Back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            // If there's a referrer from the same site, go back
            if (document.referrer && document.referrer.indexOf(window.location.hostname) !== -1) {
                e.preventDefault();
                window.history.back();
            }
            // Otherwise let the link navigate to technical-blog.html
        });
    }

    // Initialize any interactive elements
    const shareButtons = document.querySelectorAll('.social-icon');
    if (shareButtons) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.querySelector('i').className;
                
                // Get current URL
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.querySelector('.post-title').textContent);
                
                // Share based on platform
                if (platform.includes('facebook')) {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'share-facebook', 'width=580,height=296');
                } else if (platform.includes('twitter')) {
                    window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, 'share-twitter', 'width=550,height=235');
                } else if (platform.includes('linkedin')) {
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, 'share-linkedin', 'width=550,height=550');
                } else if (platform.includes('whatsapp')) {
                    window.open(`https://api.whatsapp.com/send?text=${title} ${url}`, 'share-whatsapp', 'width=550,height=550');
                }
            });
        });
    }
    
    // Add smooth scrolling for back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Function to load post data from server or local storage
function loadPostData(postId) {
    // This is a placeholder function where you would typically fetch data from a server
    // For now, we'll simulate loading with some hardcoded data
    
    // In a real application, you would make an AJAX request to your server
    // Example:
    // fetch(`/api/posts/${postId}`)
    //     .then(response => response.json())
    //     .then(data => updatePostContent(data))
    //     .catch(error => console.error('Error loading post:', error));
    
    console.log(`Loading post with ID: ${postId}`);
    
    // For demonstration purposes, let's pretend we loaded some data
    const demoData = {
        id: postId,
        title: "Introduction to Neural Networks",
        category: "Artificial Intelligence",
        date: "May 15, 2024",
        author: "Vaibhav Kesharwani",
        image: "assets/img/blog/placeholder.jpg"
    };
    
    // Update page content with demo data
    updatePostContent(demoData);
}

// Function to update the page content with post data
function updatePostContent(data) {
    // Update title, meta, and other elements with the loaded data
    document.title = `${data.title} - Prerogative Pointers`;
    
    const titleElement = document.getElementById('post-title');
    const categoryElement = document.getElementById('post-category');
    const dateElement = document.getElementById('post-date');
    const authorElement = document.getElementById('post-author');
    const imageElement = document.getElementById('post-image');
    
    if (titleElement) titleElement.textContent = data.title;
    if (categoryElement) categoryElement.textContent = data.category;
    if (dateElement) dateElement.textContent = data.date;
    if (authorElement) authorElement.textContent = `By ${data.author}`;
    if (imageElement) imageElement.src = data.image;
}
