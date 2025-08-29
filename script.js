// Your Unsplash API key (replace with your actual key)
const API_KEY = 'OZVLuKjMFJTLykgMkKSGt5us5sDvCSnEOZEAOGzIOVM';
const API_URL = 'https://api.unsplash.com/photos';

// Get DOM elements
const gallery = document.getElementById('gallery');
const loading = document.querySelector('.loading');

// Function to fetch photos from Unsplash
async function fetchPhotos() {
    try {
        const response = await fetch(`${API_URL}?client_id=${API_KEY}&per_page=12`);
        const photos = await response.json();
        
        // Hide loading message
        loading.style.display = 'none';
        
        // Display photos
        displayPhotos(photos);
    } catch (error) {
        console.error('Error fetching photos:', error);
        loading.textContent = 'Sorry, failed to load photos. Please try again later.';
    }
}

// Function to display photos in the gallery
function displayPhotos(photos) {
    gallery.innerHTML = '';
    
    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        photoItem.innerHTML = `
            <img src="${photo.urls.regular}" 
                 alt="${photo.alt_description || 'Beautiful photo'}"
                 onclick="openModal('${photo.urls.full}', '${photo.alt_description || 'Beautiful photo'}')">
        `;
        
        gallery.appendChild(photoItem);
    });
}

// Load photos when page loads
document.addEventListener('DOMContentLoaded', fetchPhotos);


// Modal elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const caption = document.getElementById('caption');
const closeModal = document.getElementById('closeModal');

// Function to open modal
function openModal(imageSrc, imageAlt) {
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    caption.textContent = imageAlt;
}

// Function to close modal
function closeModalFunction() {
    modal.style.display = 'none';
}

// Event listeners for modal
closeModal.addEventListener('click', closeModalFunction);

// Close modal when clicking outside the image
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModalFunction();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModalFunction();
    }
});