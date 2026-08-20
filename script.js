document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.bg-image');
  let currentIndex = 0;

  function nextImage() {
    // Remove the active class from the current image (triggers fade-out via CSS transition)
    images[currentIndex].classList.remove('active');
    
    // Update the index to the next image in the cycle
    currentIndex = (currentIndex + 1) % images.length;
    
    // Add the active class to the new image (triggers fade-in and starts the hover panning animation)
    images[currentIndex].classList.add('active');
  }

  // Cycle the background images every 10 seconds
  setInterval(nextImage, 10000);
});
