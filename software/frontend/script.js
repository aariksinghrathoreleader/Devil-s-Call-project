document.addEventListener('DOMContentLoaded', () => {
    function handleSplashScreen() {
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('app').style.display = 'flex';
            document.getElementById('app').style.opacity = '1';
            initHologram();
            initTiles();
        }, 4000); // Duration of the splash screen
    }

    handleSplashScreen();

    // Dropdown functionality
    const dropdownContent = document.querySelector('.dropdown-content');
    document.querySelector('.menu-button').addEventListener('click', (event) => {
        event.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === 'none' || dropdownContent.style.display === '' ? 'block' : 'none';
    });

    // Close dropdown when clicking outside of it
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.menu-button') && !event.target.closest('.dropdown-content')) {
            dropdownContent.style.display = 'none';
        }
    });

    document.getElementById('saved-files').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('saved-history-modal').style.display = 'block';
    });

    // Close modal functionality
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        const savedHistoryModal = document.getElementById('saved-history-modal');
        if (event.target === savedHistoryModal) {
            savedHistoryModal.style.display = 'none';
        }
    });

    // Function to show quote details in full screen
    function showQuoteDetails(quoteDetails) {
        const allDetails = document.querySelectorAll('.quote-details');
        const allQuotes = document.querySelectorAll('.quote');

        // Hide all other details and quotes
        allDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        allQuotes.forEach(quote => {
            quote.style.display = 'none';
        });

        // Show the selected detail
        quoteDetails.style.display = 'block';
        quoteDetails.classList.add('active'); // Add active class for animation

        // Request full screen
        if (quoteDetails.requestFullscreen) {
            quoteDetails.requestFullscreen();
        } else if (quoteDetails.mozRequestFullScreen) { // Firefox
            quoteDetails.mozRequestFullScreen();
        } else if (quoteDetails.webkitRequestFullscreen) { // Chrome, Safari and Opera
            quoteDetails.webkitRequestFullscreen();
        } else if (quoteDetails.msRequestFullscreen) { // IE/Edge
            quoteDetails.msRequestFullscreen();
        }
    }

    // Add click event to the quotes
    document.querySelectorAll('.quote').forEach(quote => {
        quote.addEventListener('click', () => {
            const detailsId = quote.dataset.details;
            const details = document.getElementById(detailsId);
            showQuoteDetails(details);
            details.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Close quote details functionality
    document.querySelectorAll('.close-quote-details').forEach(button => {
        button.addEventListener('click', () => {
            const details = button.closest('.quote-details');
            details.style.display = 'none'; // Hide the quote details
            details.classList.remove('active'); // Remove active class
            const allQuotes = document.querySelectorAll('.quote');
            allQuotes.forEach(quote => {
                quote.style.display = 'block'; // Show all quotes again
            });
            // Exit full screen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        });
    });
});
