// MainAppWrapper.tsx - Place this in your root project folder
import React, { useState } from 'react'

// Import all your existing apps - ADJUST THESE PATHS TO MATCH YOUR FOLDER STRUCTURE
import RegistrationCommunityApp from '../registration and community/src/App'
import MatchingApp from '../matching section/src/App'
import MessagesApp from '../messages section/src/App'
import ProfileApp from './profile/src/App'
import Add2CartApp from './add2cart/src/App'
import CounsellingApp from './counselling/src/App'

type CurrentApp = 'home' | 'matching' | 'messages' | 'profile' | 'add2cart' | 'counselling'

function MainAppWrapper() {
  const [currentApp, setCurrentApp] = useState<CurrentApp>('home')

  // Navigation handler that gets passed to each app
  const navigationHandler = {
    // Bottom navigation handlers
    goToAdd2Cart: () => {
      console.log('Navigating to Add2Cart')
      setCurrentApp('add2cart')
    },
    goToCounselling: () => {
      console.log('Navigating to Counselling')
      setCurrentApp('counselling')
    },
    goToHome: () => {
      console.log('Navigating to Home')
      setCurrentApp('home')
    },
    goToMatching: () => {
      console.log('Navigating to Matching')
      setCurrentApp('matching')
    },
    goToProfile: () => {
      console.log('Navigating to Profile')
      setCurrentApp('profile')
    },
    
    // Messages handler (for top-right messages icon)
    goToMessages: () => {
      console.log('Navigating to Messages')
      setCurrentApp('messages')
    },
  }

  // Render the current app
  const renderCurrentApp = () => {
    switch (currentApp) {
      case 'matching':
        return <MatchingApp navigationHandler={navigationHandler} />
      
      case 'messages':
        return <MessagesApp navigationHandler={navigationHandler} />
      
      case 'profile':
        return <ProfileApp navigationHandler={navigationHandler} />
      
      case 'add2cart':
        return <Add2CartApp navigationHandler={navigationHandler} />
      
      case 'counselling':
        return <CounsellingApp navigationHandler={navigationHandler} />
      
      case 'home':
      default:
        return <RegistrationCommunityApp navigationHandler={navigationHandler} />
    }
  }

  return (
    <div className="main-app-wrapper" style={{ width: '100%', height: '100vh' }}>
      {renderCurrentApp()}
    </div>
  )
}

export default MainAppWrapper
