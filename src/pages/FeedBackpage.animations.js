/**
 * FeedBackpage Animation Utilities
 * 
 * This file contains JavaScript functions for triggering and managing
 * scroll-based animations in the FeedBackpage component.
 */

/**
 * Initialize scroll-triggered animations using Intersection Observer
 * Animations will trigger when elements scroll into viewport
 */
export const initFeedBackAnimations = () => {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    console.warn('IntersectionObserver is not supported');
    return;
  }

  // Intersection Observer options
  const observerOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -80px 0px' // Trigger slightly before element enters viewport
  };

  // Create observer instance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger animation
        entry.target.classList.add('feedback-visible');
        
        // Special handling for grade card - also animate grade text inside
        if (entry.target.classList.contains('feedback-grade-card')) {
          const gradeText = entry.target.querySelector('.feedback-grade-text');
          if (gradeText) {
            setTimeout(() => {
              gradeText.classList.add('feedback-visible');
            }, 300);
          }
        }
        
        // Special handling for feedback card container - animate text inside
        if (entry.target.classList.contains('feedback-card-container')) {
          const text = entry.target.querySelector('.feedback-card-text');
          if (text) {
            setTimeout(() => {
              text.classList.add('feedback-visible');
            }, 400);
          }
        }
        
        // Special handling for answer container - animate answer text inside
        if (entry.target.classList.contains('feedback-answer-container')) {
          const answerText = entry.target.querySelector('.feedback-answer-text');
          if (answerText) {
            setTimeout(() => {
              answerText.classList.add('feedback-visible');
            }, 300);
          }
        }
        
        // Stop observing this element after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe animation elements (only parent containers and standalone elements)
  setTimeout(() => {
    const animatedElements = document.querySelectorAll(`
      .feedback-section-title,
      .feedback-grade-card,
      .feedback-card-container,
      .feedback-card-logo,
      .feedback-radar-container,
      .feedback-answer-container
    `);

    animatedElements.forEach(el => {
      if (el) {
        observer.observe(el);
      }
    });

    // Check if first section is already in viewport on page load
    const firstTitle = document.querySelector('.feedback-section-title');
    if (firstTitle && isInViewport(firstTitle)) {
      firstTitle.classList.add('feedback-visible');
      const firstGradeCard = document.querySelector('.feedback-grade-card');
      if (firstGradeCard && isInViewport(firstGradeCard)) {
        setTimeout(() => {
          firstGradeCard.classList.add('feedback-visible');
        }, 200);
      }
    }
  }, 100);
};

/**
 * Trigger grade animation with delay
 * @param {HTMLElement} gradeElement - The grade card element
 */
export const animateGradeCard = (gradeElement) => {
  if (!gradeElement) return;
  
  setTimeout(() => {
    gradeElement.style.animation = 'fadeInScale 0.8s ease-out forwards';
    gradeElement.style.opacity = '1';
  }, 200);
};

/**
 * Reset all animations (useful for re-rendering)
 */
export const resetAnimations = () => {
  const animatedElements = document.querySelectorAll('[class*="feedback-"]');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.animation = 'none';
  });
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
export const isInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Trigger animation when element enters viewport
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS animation class to add
 */
export const animateOnScroll = (element, animationClass) => {
  if (!element || !animationClass) return;

  const checkViewport = () => {
    if (isInViewport(element)) {
      element.classList.add(animationClass);
      window.removeEventListener('scroll', checkViewport);
    }
  };

  // Check immediately in case element is already visible
  checkViewport();
  
  // Also check on scroll
  window.addEventListener('scroll', checkViewport);
};

/**
 * Animate text character by character (optional enhancement)
 * @param {HTMLElement} element - Text element to animate
 * @param {number} delay - Delay between characters in ms
 */
export const animateTextTyping = (element, delay = 30) => {
  if (!element) return;

  const text = element.textContent;
  element.textContent = '';
  element.style.opacity = '1';

  let index = 0;
  const typeChar = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, delay);
    }
  };

  typeChar();
};

