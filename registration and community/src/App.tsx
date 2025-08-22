import React, { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import RegistrationScreen from './components/RegistrationScreen'
import LoginScreen from './components/LoginScreen'
import HomePage from './components/HomePage'
import CommunityBoard from './components/CommunityBoard'
import PostDetailModal from './components/PostDetailModal'
import BookmarksPage from './components/BookmarksPage'
import NewPostModal from './components/NewPostModal'
import { Post } from './types'
import { generateMockPosts } from './data/mockPosts'

type AuthState = 'loading' | 'login' | 'registration' | 'authenticated'
type AppView = 'home' | 'board' | 'bookmarks'

function App() {
  const [authState, setAuthState] = useState<AuthState>('loading')
  const [currentView, setCurrentView] = useState<AppView>('home')
  const [currentBoardType, setCurrentBoardType] = useState<string>('batch')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [posts, setPosts] = useState<{[key: string]: Post[]}>({})
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([])
  
  const [currentUser, setCurrentUser] = useState<string>('')
  const [userGender, setUserGender] = useState<string>('')
  const [userAvatar, setUserAvatar] = useState<string>('')

  // NEW: Add state for external navigation
  const [externalView, setExternalView] = useState<string | null>(null)

  useEffect(() => {
    const boardTypes = ['batch', 'major', 'fashion', 'religion', 'music', 'movie', 'sports', 'mens', 'womens', 'announcements']
    const initialPosts: {[key: string]: Post[]} = {}
    
    boardTypes.forEach(type => {
      initialPosts[type] = generateMockPosts(type, 5)
    })
    
    setPosts(initialPosts)
  }, [])

  const getBoardCategories = (boardType: string): string[] => {
    switch (boardType) {
      case 'batch': return ['ACADEMIC', 'SOCIAL', 'STUDY GROUP', 'ASSIGNMENTS', 'EXAMS']
      case 'major': return ['COMPUTER SCIENCE', 'BUSINESS', 'ENGINEERING', 'ARTS', 'SCIENCE']
      case 'fashion': return ['STREETWEAR', 'FORMAL', 'ACCESSORIES', 'BRANDS', 'TRENDS']
      case 'religion': return ['ISLAM', 'CHRISTIANITY', 'BUDDHISM', 'HINDUISM', 'INTERFAITH']
      case 'music': return ['POP', 'ROCK', 'JAZZ', 'CLASSICAL', 'LOCAL']
      case 'movie': return ['ACTION', 'COMEDY', 'DRAMA', 'HORROR', 'DOCUMENTARY']
      case 'sports': return ['FOOTBALL', 'BASKETBALL', 'TENNIS', 'SWIMMING', 'FITNESS']
      case 'mens': return ['LIFESTYLE', 'SPORTS', 'CAREER', 'RELATIONSHIPS', 'HEALTH']
      case 'womens': return ['LIFESTYLE', 'BEAUTY', 'CAREER', 'RELATIONSHIPS', 'HEALTH']
      case 'announcements': return ['ACADEMIC', 'EVENTS', 'FACILITIES', 'GENERAL', 'URGENT']
      default: return []
    }
  }

  // Auth handlers
  const handleLoadingComplete = () => {
    setAuthState('login')
  }

  const handleLoginComplete = (userData: { name: string; gender: string; avatar: string }) => {
    setCurrentUser(userData.name)
    setUserGender(userData.gender)
    setUserAvatar(userData.avatar)
    setAuthState('authenticated')
  }

  const handleGoToRegistration = () => {
    setAuthState('registration')
  }

  const handleRegistrationComplete = (userData: { name: string; gender: string; avatar: string }) => {
    setCurrentUser(userData.name)
    setUserGender(userData.gender)
    setUserAvatar(userData.avatar)
    setAuthState('authenticated')
  }

  const handleBackToLogin = () => {
    setAuthState('login')
  }

  // Centralized home navigation handler
  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedPost(null)
    setExternalView(null) // NEW: Reset external view when going back to home
  }

  // NEW: External navigation handlers
  const handleNavigateToMatch = () => {
    setExternalView('match')
  }

  const handleNavigateToMessages = () => {
    setExternalView('messages')
  }

  const handleNavigateToProfile = () => {
    setExternalView('profile')
  }

  const handleNavigateToCart = () => {
    setExternalView('cart')
  }

  const handleNavigateToCounseling = () => {
    setExternalView('counseling')
  }

  // App navigation handlers
  const handleNavigateToBoard = (boardType: string) => {
    if (boardType === 'mens' && userGender !== 'male') {
      return
    }
    if (boardType === 'womens' && userGender !== 'female') {
      return
    }

    setCurrentBoardType(boardType)
    setCurrentView('board')
    setExternalView(null) // NEW: Reset external view when navigating to boards
  }

  const handleNavigateToBatch = () => {
    setCurrentBoardType('batch')
    setCurrentView('board')
    setExternalView(null) // NEW: Reset external view when navigating to batch
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleClosePostDetail = () => {
    setSelectedPost(null)
  }

  const handleNewPost = () => {
    setShowNewPostModal(true)
  }

  const handleSubmitPost = (newPostData: { title: string; content: string; batch?: string; images: string[] }) => {
    const newPost: Post = {
      id: `${currentBoardType}-${Date.now()}`,
      author: currentBoardType === 'announcements' ? 'Admin' : 'Anonymous',
      avatar: currentBoardType === 'announcements' ? '📢' : '🌟',
      title: newPostData.title,
      content: newPostData.content,
      timestamp: new Date().toLocaleString('en-GB', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$3.$2.$1 $4:$5'),
      images: newPostData.images,
      reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0, confused: 0, cheer: 0 },
      comments: 0,
      batch: newPostData.batch || 'N/A',
      isBookmarked: false,
      userReaction: null
    }

    setPosts(prev => ({
      ...prev,
      [currentBoardType]: [newPost, ...prev[currentBoardType]]
    }))

    setShowNewPostModal(false)
  }

  const handleReaction = (postId: string, reactionType: string) => {
    setPosts(prev => {
      const newPosts = { ...prev }
      
      Object.keys(newPosts).forEach(boardType => {
        newPosts[boardType] = newPosts[boardType].map(post => {
          if (post.id === postId) {
            const reactions = { ...post.reactions }
            
            if (post.userReaction === reactionType) {
              reactions[reactionType as keyof typeof reactions]--
              return { ...post, reactions, userReaction: null }
            } else {
              if (post.userReaction) {
                reactions[post.userReaction as keyof typeof reactions]--
              }
              reactions[reactionType as keyof typeof reactions]++
              return { ...post, reactions, userReaction: reactionType }
            }
          }
          return post
        })
      })
      
      return newPosts
    })

    setBookmarkedPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const reactions = { ...post.reactions }
        
        if (post.userReaction === reactionType) {
          reactions[reactionType as keyof typeof reactions]--
          return { ...post, reactions, userReaction: null }
        } else {
          if (post.userReaction) {
            reactions[post.userReaction as keyof typeof reactions]--
          }
          reactions[reactionType as keyof typeof reactions]++
          return { ...post, reactions, userReaction: reactionType }
        }
      }
      return post
    }))
  }

  const handleBookmark = (postId: string) => {
    let foundPost: Post | null = null
    
    setPosts(prev => {
      const newPosts = { ...prev }
      
      Object.keys(newPosts).forEach(boardType => {
        newPosts[boardType] = newPosts[boardType].map(post => {
          if (post.id === postId) {
            foundPost = { ...post, isBookmarked: !post.isBookmarked }
            return foundPost
          }
          return post
        })
      })
      
      return newPosts
    })

    if (foundPost) {
      if (foundPost.isBookmarked) {
        setBookmarkedPosts(prev => [...prev, foundPost])
      } else {
        setBookmarkedPosts(prev => prev.filter(post => post.id !== postId))
      }
    }
  }

  const handleShare = (post: Post) => {
    const shareText = `Check out this post: "${post.title}" by ${post.author}`
    navigator.clipboard.writeText(shareText)
  }

  const handleReport = (postId: string, reason: string) => {
    console.log(`Post ${postId} reported for: ${reason}`)
  }

  const handleDeletePost = (postId: string) => {
    setPosts(prev => {
      const newPosts = { ...prev }
      Object.keys(newPosts).forEach(boardType => {
        newPosts[boardType] = newPosts[boardType].filter(post => post.id !== postId)
      })
      return newPosts
    })

    setBookmarkedPosts(prev => prev.filter(post => post.id !== postId))
  }

  const handleNavigateToBookmarks = () => {
    setCurrentView('bookmarks')
    setExternalView(null) // NEW: Reset external view when navigating to bookmarks
  }

  // NEW: Return to previous view when back is clicked from external components
  const handleBackFromExternal = () => {
    setExternalView(null)
  }

  // Loading screen
  if (authState === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  // Login screen
  if (authState === 'login') {
    return (
      <LoginScreen 
        onLoginComplete={handleLoginComplete}
        onGoToRegistration={handleGoToRegistration}
      />
    )
  }

  // Registration screen
  if (authState === 'registration') {
    return (
      <RegistrationScreen 
        onRegistrationComplete={handleRegistrationComplete}
        onBackToLogin={handleBackToLogin}
      />
    )
  }

  // Main app - authenticated
  return (
    <div className="min-h-screen bg-cloud-dancer">
      {/* EXTERNAL COMPONENTS - Render when external view is set */}
      {externalView === 'match' && (
        <iframe 
          src="/matching/index.html" 
          className="w-full h-screen border-0"
          title="Matching Section"
        />
      )}

      {externalView === 'messages' && (
        <iframe 
          src="/messages/index.html" 
          className="w-full h-screen border-0"
          title="Messages Section"
        />
      )}

      {externalView === 'profile' && (
        <iframe 
          src="/profile/index.html" 
          className="w-full h-screen border-0"
          title="Profile Section"
        />
      )}

      {externalView === 'cart' && (
        <iframe 
          src="/add2cart/index.html" 
          className="w-full h-screen border-0"
          title="Add2Cart Section"
        />
      )}

      {externalView === 'counseling' && (
        <iframe 
          src="/counseling/index.html" 
          className="w-full h-screen border-0"
          title="Counseling Section"
        />
      )}

      {/* ORIGINAL APP VIEWS - Only render when no external view */}
      {!externalView && (
        <>
          {/* Home Page */}
          {currentView === 'home' && (
            <HomePage
              onNavigateToBatch={handleNavigateToBatch}
              onNavigateToBoard={handleNavigateToBoard}
              userGender={userGender}
              userAvatar={userAvatar}
              userName={currentUser}
              // NEW: Pass external navigation handlers
              onNavigateToMatch={handleNavigateToMatch}
              onNavigateToMessages={handleNavigateToMessages}
              onNavigateToProfile={handleNavigateToProfile}
              onNavigateToCart={handleNavigateToCart}
              onNavigateToCounseling={handleNavigateToCounseling}
            />
          )}

          {/* Community Board */}
          {currentView === 'board' && (
            <CommunityBoard
              boardType={currentBoardType}
              posts={posts[currentBoardType] || []}
              categories={getBoardCategories(currentBoardType)}
              onPostClick={handlePostClick}
              onBackToHome={handleBackToHome}
              onNewPost={handleNewPost}
              onReaction={handleReaction}
              onBookmark={handleBookmark}
              onShare={handleShare}
              onReport={handleReport}
              onDeletePost={handleDeletePost}
              onNavigateToBookmarks={handleNavigateToBookmarks}
              currentUser={currentUser}
              userGender={userGender}
            />
          )}

          {/* Bookmarks Page */}
          {currentView === 'bookmarks' && (
            <BookmarksPage
              bookmarkedPosts={bookmarkedPosts}
              onPostClick={handlePostClick}
              onBackToBoard={() => setCurrentView('board')}
              onReaction={handleReaction}
              onBookmark={handleBookmark}
              onShare={handleShare}
              onReport={handleReport}
              onDeletePost={handleDeletePost}
              currentUser={currentUser}
              onBackToHome={handleBackToHome}
            />
          )}

          {/* Post Detail Modal */}
          {selectedPost && (
            <PostDetailModal
              post={selectedPost}
              onClose={handleClosePostDetail}
              onReaction={handleReaction}
              onBookmark={handleBookmark}
              onShare={handleShare}
              onReport={handleReport}
              onDeletePost={handleDeletePost}
              currentUser={currentUser}
            />
          )}

          {/* New Post Modal */}
          {showNewPostModal && (
            <NewPostModal
              boardType={currentBoardType}
              onClose={() => setShowNewPostModal(false)}
              onSubmit={handleSubmitPost}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
