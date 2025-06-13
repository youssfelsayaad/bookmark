        document.addEventListener('DOMContentLoaded', function() {
            const linkForm = document.getElementById('linkForm');
            const linksContainer = document.getElementById('linksContainer');
            const emptyState = document.querySelector('.empty-state');
            
            // Load saved links from localStorage
            loadLinks();
            
            // Form submission handler
            linkForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('linkName').value.trim();
                let url = document.getElementById('linkUrl').value.trim();
                
             
                 url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://www.' + url;
            
                
                addLink(name, url);
                
                // Reset form
                linkForm.reset();
                document.getElementById('linkName').focus();
            });
            
            // Function to add a new link
            function addLink(name, url) {
                // Hide empty state if it's visible
                if (emptyState.style.display === 'block') {
                    emptyState.style.display = 'none';
                }
                
                // Create link card
                const linkCard = document.createElement('div');
                linkCard.className = 'link-card card mb-3';
                linkCard.innerHTML = `
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div class="link-info flex-grow-1">
                            <h5 class="card-title mb-1">${name}</h5>
                            <a href="${url}" target="_blank" class="card-link text-muted small"></a>
                        </div>
                        <div class="link-actions d-flex">
                            <a href="${url}" target="_blank" class="btn btn-sm btn-outline-primary me-2">Visit</a>
                            <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
                        </div>
                    </div>
                `;
                
                // Add delete functionality
                const deleteBtn = linkCard.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', function() {
                    linkCard.remove();
                    saveLinks();
                    checkEmptyState();
                });
                
                // Add to container
                linksContainer.insertBefore(linkCard, linksContainer.firstChild);
                
                // Save to localStorage
                saveLinks();
            }
            
            // Function to save links to localStorage
            function saveLinks() {
                const linkCards = document.querySelectorAll('.link-card');
                const links = [];
                
                linkCards.forEach(card => {
                    const name = card.querySelector('.card-title').textContent;
                    const url = card.querySelector('.card-link').getAttribute('href');
                    links.push({ name, url });
                });
                
                localStorage.setItem('savedLinks', JSON.stringify(links));
            }
            
            // Function to load links from localStorage
            function loadLinks() {
                const savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
                
                if (savedLinks.length > 0) {
                    emptyState.style.display = 'none';
                    savedLinks.forEach(link => {
                        addLink(link.name, link.url);
                    });
                } else {
                    emptyState.style.display = 'block';
                }
            }
            
            // Function to check if container is empty and show empty state
            function checkEmptyState() {
                if (document.querySelectorAll('.link-card').length === 0) {
                    emptyState.style.display = 'block';
                }
            }
        });
