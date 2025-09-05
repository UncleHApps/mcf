// Import the main stylesheet
import '../css/input.css';

// Import Swiper and its styles for the slider
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Import and initialize Alpine.js
import Alpine from 'alpinejs';
import focus from '@alpinejs/focus'; // For modal focus trapping
window.Alpine = Alpine;

// Add plugins
Alpine.plugin(focus);

// Global store for modal state
Alpine.store('modal', {
    isOpen: false,
    isLoading: false,
    isSuccess: false,
    open() {
        this.isOpen = true;
        this.isSuccess = false; // Reset on open
    },
    close() {
        this.isOpen = false;
    },
    submitForm() {
        this.isLoading = true;
        const form = document.getElementById('quote-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Replace with your actual webhook URL
        const webhookUrl = 'https://webhook.site/your-unique-id'; 

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.isLoading = false;
            this.isSuccess = true;
        })
        .catch((error) => {
            console.error('Error:', error);
            this.isLoading = false;
            // Optionally, show an error message to the user
        });
    }
});

// Alpine component for the testimonial slider
document.addEventListener('alpine:init', () => {
    Alpine.data('testimonialSlider', () => ({
        init() {
            new Swiper(this.$el, {
                modules: [Navigation],
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoHeight: true,
            });
        }
    }));
});

// Start Alpine
Alpine.start();