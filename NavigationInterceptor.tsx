// NavigationInterceptor.tsx - Place this in your root project folder
import React, { useEffect } from 'react'

interface NavigationHandler {
  goToAdd2Cart: () => void
  goToCounselling: () => void
  goToHome: () => void
  goToMatching: () => void
  goToProfile: () => void
  goToMessages: () => void
}

interface NavigationInterceptorProps {
  navigationHandler?: NavigationHandler
}

const NavigationInterceptor: React.FC<NavigationInterceptorProps> = ({ navigationHandler }) => {
  useEffect(() => {
    if (!navigationHandler) return

    // Function to handle all navigation clicks
    const handleNavigationClick = (event: Event) => {
      const target = event.target as HTMLElement
      const button = target.closest('button')
      
      if (!button) return

      // Get button text and check for icons
      const buttonText = button.textContent?.toUpperCase() || ''
      const buttonHTML = button.innerHTML.toLowerCase()
      
      console.log('Button clicked:', buttonText, buttonHTML)

      // Bottom Navigation Detection
      // Check for ADD2CART / Shopping Cart
      if (buttonText.includes('ADD2CART') || 
          buttonText.includes('CART') ||
          buttonHTML.includes('shoppingcart') ||
          buttonHTML.includes('shopping-cart')) {
        event.preventDefault()
        event.stopPropagation()
        navigationHandler.goToAdd2Cart()
        return
      }

      // Check for COUNSELLING
      if (buttonText.includes('COUNSELLING') || 
          buttonText.includes('COUNSEL') ||
          buttonHTML.includes('messagecircle') ||
          (buttonHTML.includes('messagecircle') && buttonText.includes('COUNSELLING'))) {
        event.preventDefault()
        event.stopPropagation()
        navigationHandler.goToCounselling()
        return
      }

      // Check for HOME
      if (buttonText.includes('HOME') ||
          buttonHTML.includes('home')) {
        event.preventDefault()
        event.stopPropagation()
        navigationHandler.goToHome()
        return
      }

      // Check for MATCHING / MATCH
      if (buttonText.includes('MATCH') ||
          buttonHTML.includes('users')) {
        event.preventDefault()
        event.stopPropagation()
        navigationHandler.goToMatching()
        return
      }

      // Check for PROFILE
      if (buttonText.includes('PROFILE') ||
          buttonHTML.includes('user')) {
        event.preventDefault()
        event.stopPropagation()
        navigationHandler.goToProfile()
        return
      }

      // Messages Icon Detection (top-right)
      if (buttonHTML.includes('mail') ||
          buttonHTML.includes('envelope') ||
          (button.querySelector('svg') && button.querySelector('[class*="mail"]'))) {
        event.preventDefault()
        event.stopPropagation()
        navigationHandler.goToMessages()
        return
      }
    }

    // Alternative method using class-based detection
    const handleClassBasedNavigation = (event: Event) => {
      const target = event.target as HTMLElement
      const button = target.closest('button')
      
      if (!button) return

      // Check parent container for bottom navigation
      const isBottomNav = button.closest('[class*="bottom"]') || 
                         button.closest('[class*="nav"]') ||
                         button.closest('.fixed.bottom-0')

      if (isBottomNav) {
        const allButtons = button.parentElement?.querySelectorAll('button') || []
        const buttonIndex = Array.from(allButtons).indexOf(button)
        
        // Based on your description: add2cart, counselling, home, matching, profile
        switch (buttonIndex) {
          case 0: // leftmost - add2cart
            event.preventDefault()
            event.stopPropagation()
            navigationHandler.goToAdd2Cart()
            break
          case 1: // counselling
            event.preventDefault()
            event.stopPropagation()
            navigationHandler.goToCounselling()
            break
          case 2: // home (center)
            event.preventDefault()
            event.stopPropagation()
            navigationHandler.goToHome()
            break
          case 3: // matching
            event.preventDefault()
            event.stopPropagation()
            navigationHandler.goToMatching()
            break
          case 4: // rightmost - profile
            event.preventDefault()
            event.stopPropagation()
            navigationHandler.goToProfile()
            break
        }
      }
    }

    // Add event listeners with capture phase
    document.addEventListener('click', handleNavigationClick, true)
    document.addEventListener('click', handleClassBasedNavigation, true)

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleNavigationClick, true)
      document.removeEventListener('click', handleClassBasedNavigation, true)
    }
  }, [navigationHandler])

  // This component doesn't render anything visible
  return null
}

export default NavigationInterceptor
