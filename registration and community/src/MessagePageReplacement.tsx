// registration-and-community/src/MessagePageReplacement.tsx
// This file replaces your existing messages page
import React, { useEffect } from 'react'

interface MessagePageReplacementProps {
  navigationHandler?: {
    goToMessages: () => void
    goToHome: () => void
  }
  onBackToHome?: () => void
}

const MessagePageReplacement: React.FC<MessagePageReplacementProps> = ({ 
  navigationHandler, 
  onBackToHome 
}) => {
  // Automatically redirect to your separate messages app
  useEffect(() => {
    console.log('MessagePageReplacement: Redirecting to separate messages app')
    
    // Small delay to show loading state, then redirect
    const timer = setTimeout(() => {
      if (navigationHandler?.goToMessages) {
        navigationHandler.goToMessages()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [navigationHandler])

  // Show loading screen while redirecting
  return (
    <div className="min-h-screen bg-cloud-dancer flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="mb-6">
          <div className="w-16 h-16 border-4 border-darkest-hour border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
        
        {/* Loading Text */}
        <div className="pixel-text-lg text-darkest-hour font-black mb-4">
          REDIRECTING TO MESSAGES...
        </div>
        
        <div className="pixel-text text-darkest-hour opacity-75 mb-6">
          LOADING YOUR SEPARATE MESSAGES APP
        </div>

        {/* Fallback Button */}
        <button 
          onClick={onBackToHome}
          className="pixel-btn bg-darkest-hour text-cloud-dancer px-6 py-3 hover:bg-blue-violet transition-colors"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  )
}

export default MessagePageReplacement
