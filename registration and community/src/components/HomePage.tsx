import React, { useState } from 'react'
import { Bell, Mail, Search, Users, BookOpen, Briefcase, Palette, Church, Music, Film, Trophy, Shield, Heart, Megaphone, X, Plus, TrendingUp, Calendar, Star } from 'lucide-react'
import BottomNavigation from './BottomNavigation'

interface HomePageProps {
  onNavigateToBatch: () => void
  onNavigateToBoard: (boardType: string) => void
  userGender?: string
  userAvatar?: string
  userName?: string
  // NEW: Add external navigation handlers
  onNavigateToMatch?: () => void
  onNavigateToMessages?: () => void
  onNavigateToProfile?: () => void
  onNavigateToCart?: () => void
  onNavigateToCounseling?: () => void
}

const HomePage: React.FC<HomePageProps> = ({ 
  onNavigateToBatch, 
  onNavigateToBoard, 
  userGender = 'female',
  userAvatar = '👩‍🎓',
  userName = 'SITI NURHALIZA',
  // NEW: Receive external navigation handlers
  onNavigateToMatch,
  onNavigateToMessages,
  onNavigateToProfile,
  onNavigateToCart,
  onNavigateToCounseling
}) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [genderWarning, setGenderWarning] = useState<string | null>(null)

  // Mock notifications - Anonymous
  const notifications = [
    {
      id: 1,
      title: 'NEW COMMENT ON POST',
      message: 'SOMEONE REPLIED TO STUDY GROUP',
      time: '5 MIN AGO',
      type: 'comment',
      redirectTo: 'batch',
      postId: 'batch-1'
    },
    {
      id: 2,
      title: 'EVENT REMINDER',
      message: 'SPRING FESTIVAL MEETING IN 1H',
      time: '1 HOUR AGO',
      type: 'event',
      redirectTo: 'announcements',
      postId: 'announcements-1'
    },
    {
      id: 3,
      title: 'NEW ANNOUNCEMENT',
      message: 'LIBRARY EXTENDED HOURS',
      time: '2 HOURS AGO',
      type: 'announcement',
      redirectTo: 'announcements',
      postId: 'announcements-2'
    }
  ]

  // Mock messages
  const messages = [
    {
      id: 1,
      sender: 'SARAH AHMAD',
      message: 'HEY! JOINING STUDY GROUP TONIGHT?',
      time: '2 MIN AGO',
      unread: true
    },
    {
      id: 2,
      sender: 'ALEX WONG',
      message: 'CHECK OUT THIS ASSIGNMENT HELP',
      time: '15 MIN AGO',
      unread: true
    },
    {
      id: 3,
      sender: 'MARIA SANTOS',
      message: 'MOVIE NIGHT THIS WEEKEND?',
      time: '1 HOUR AGO',
      unread: false
    }
  ]

  const communityBoards = [
    { id: 'batch', title: 'BATCH', subtitle: 'CLASS DISCUSSIONS', icon: Users, color: 'bg-blue-violet' },
    { id: 'major', title: 'MAJOR', subtitle: 'ACADEMIC TOPICS', icon: BookOpen, color: 'bg-sun-glare' },
    { id: 'fashion', title: 'FASHION', subtitle: 'STYLE & TRENDS', icon: Palette, color: 'bg-exuberant-orange' },
    { id: 'religion', title: 'RELIGION', subtitle: 'FAITH & VALUES', icon: Church, color: 'bg-blue-violet' },
    { id: 'music', title: 'MUSIC', subtitle: 'BEATS & LYRICS', icon: Music, color: 'bg-sun-glare' },
    { id: 'movie', title: 'MOVIE', subtitle: 'FILMS & SERIES', icon: Film, color: 'bg-exuberant-orange' },
    { id: 'sports', title: 'SPORTS', subtitle: 'GAMES & FITNESS', icon: Trophy, color: 'bg-blue-violet' },
    { id: 'mens', title: 'MENS', subtitle: 'GUYS ONLY', icon: Shield, color: 'bg-sun-glare' },
    { id: 'womens', title: 'WOMENS', subtitle: 'GIRLS ONLY', icon: Heart, color: 'bg-exuberant-orange' },
    { id: 'announcements', title: 'ANNOUNCEMENTS', subtitle: 'OFFICIAL UPDATES', icon: Megaphone, color: 'bg-blue-violet' }
  ]

  const handleBoardClick = (boardType: string) => {
    if (boardType === 'batch') {
      onNavigateToBatch()
      return
    }

    if (boardType === 'mens' && userGender !== 'male') {
      setGenderWarning('ACCESS RESTRICTED TO MALE STUDENTS ONLY')
      return
    }
    if (boardType === 'womens' && userGender !== 'female') {
      setGenderWarning('ACCESS RESTRICTED TO FEMALE STUDENTS ONLY')
      return
    }

    onNavigateToBoard(boardType)
  }

  const handleNotificationClick = (notification: any) => {
    onNavigateToBoard(notification.redirectTo)
    setShowNotifications(false)
  }

  return (
    <div className="min-h-screen bg-cloud-dancer">
      {/* Status Bar Spacer */}
      <div className="h-12 bg-darkest-hour"></div>
      
      {/* Header */}
      <div className="bg-sun-glare border-b-4 border-darkest-hour p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          {/* Profile Section */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-darkest-hour border-4 border-darkest-hour flex items-center justify-center text-xl">
              {userAvatar}
            </div>
            <div>
              <h1 className="pixel-text text-darkest-hour font-black text-lg leading-none">HELLO</h1>
              <p className="pixel-text text-darkest-hour font-black text-sm leading-none">{userName}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-darkest-hour border-4 border-darkest-hour hover:bg-blue-violet transition-none"
            >
              <Bell size={20} className="text-cloud-dancer" />
              {notifications.some(n => n.type === 'comment' || n.type === 'event') && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-exuberant-orange border-2 border-darkest-hour"></div>
              )}
            </button>

            {/* Messages Button - UPDATED TO REDIRECT */}
            <button
              onClick={() => {
                if (onNavigateToMessages) {
                  onNavigateToMessages() // REDIRECT TO EXTERNAL MESSAGES COMPONENT
                } else {
                  setShowMessages(!showMessages) // FALLBACK TO EXISTING BEHAVIOR
                }
              }}
              className="relative p-3 bg-sun-glare border-4 border-darkest-hour hover:bg-exuberant-orange transition-none"
            >
              <Mail size={20} className="text-darkest-hour" />
              {messages.some(m => m.unread) && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-exuberant-orange border-2 border-darkest-hour"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-24">
        {/* Welcome Section */}
        <div className="bg-darkest-hour border-4 border-darkest-hour p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="pixel-text text-cloud-dancer font-black text-xl mb-2">CAMPUS CONNECT</h2>
              <p className="pixel-text text-cloud-dancer">YOUR DIGITAL CAMPUS HUB</p>
            </div>
            <Star className="w-8 h-8 text-sun-glare" />
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-sun-glare border-2 border-darkest-hour p-3 text-center">
              <TrendingUp className="w-6 h-6 text-darkest-hour mx-auto mb-1" />
              <p className="pixel-text text-darkest-hour font-black text-xs">TRENDING</p>
            </div>
            <div className="bg-blue-violet border-2 border-darkest-hour p-3 text-center">
              <Calendar className="w-6 h-6 text-cloud-dancer mx-auto mb-1" />
              <p className="pixel-text text-cloud-dancer font-black text-xs">EVENTS</p>
            </div>
            <div className="bg-exuberant-orange border-2 border-darkest-hour p-3 text-center">
              <Plus className="w-6 h-6 text-cloud-dancer mx-auto mb-1" />
              <p className="pixel-text text-cloud-dancer font-black text-xs">CREATE</p>
            </div>
          </div>
        </div>

        {/* Community Boards Grid */}
        <div className="space-y-3">
          <h3 className="pixel-text text-darkest-hour font-black text-lg mb-4">COMMUNITY BOARDS</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {communityBoards.map((board) => {
              const IconComponent = board.icon
              return (
                <button
                  key={board.id}
                  onClick={() => handleBoardClick(board.id)}
                  className={`${board.color} border-4 border-darkest-hour p-4 text-left hover:brightness-110 transition-none group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent size={24} className="text-darkest-hour group-hover:scale-110 transition-transform" />
                    <div className="w-2 h-2 bg-darkest-hour"></div>
                  </div>
                  <h4 className="pixel-text text-darkest-hour font-black text-sm leading-none mb-1">{board.title}</h4>
                  <p className="pixel-text text-darkest-hour text-xs leading-none">{board.subtitle}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-20 right-4 bg-cloud-dancer border-4 border-darkest-hour shadow-lg z-50 w-80 max-w-[calc(100vw-2rem)]">
          <div className="p-4 bg-darkest-hour border-b-4 border-darkest-hour">
            <div className="flex items-center justify-between">
              <h3 className="pixel-text text-cloud-dancer font-black">NOTIFICATIONS</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 bg-exuberant-orange border-2 border-darkest-hour flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
              >
                <X size={14} className="text-cloud-dancer" />
              </button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="w-full p-4 text-left border-b-2 border-darkest-hour hover:bg-sun-glare transition-none group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="pixel-text font-black text-darkest-hour group-hover:text-darkest-hour">{notification.title}</h4>
                  <span className="pixel-text text-darkest-hour text-xs opacity-75">{notification.time}</span>
                </div>
                <p className="pixel-text text-darkest-hour group-hover:text-darkest-hour">{notification.message}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Dropdown - Keep for fallback, but won't show if external messages used */}
      {showMessages && !onNavigateToMessages && (
        <div className="fixed top-20 right-4 bg-cloud-dancer border-4 border-darkest-hour shadow-lg z-50 w-80 max-w-[calc(100vw-2rem)]">
          <div className="p-4 bg-darkest-hour border-b-4 border-darkest-hour">
            <div className="flex items-center justify-between">
              <h3 className="pixel-text text-cloud-dancer font-black">MESSAGES</h3>
              <button
                onClick={() => setShowMessages(false)}
                className="w-8 h-8 bg-exuberant-orange border-2 border-darkest-hour flex items-center justify-center hover:bg-sun-glare hover:text-darkest-hour transition-none"
              >
                <X size={14} className="text-cloud-dancer" />
              </button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            <div className="p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 border-2 transition-none ${message.unread 
                      ? 'bg-blue-violet text-cloud-dancer' : 'bg-sun-glare text-darkest-hour'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="pixel-text font-black">{message.sender}</h4>
                      {message.unread && <div className="w-3 h-3 bg-exuberant-orange pixel-border-thin"></div>}
                    </div>
                    <p className="pixel-text mb-2">{message.message}</p>
                    <p className="pixel-text opacity-75">{message.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gender Warning Modal */}
      {genderWarning && (
        <div className="fixed inset-0 bg-darkest-hour bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-cloud-dancer pixel-modal max-w-sm w-full">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-exuberant-orange pixel-border flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-cloud-dancer" />
              </div>
              <h3 className="pixel-text-lg text-darkest-hour font-black mb-4">ACCESS RESTRICTED</h3>
              <p className="pixel-text text-darkest-hour mb-6 leading-relaxed">{genderWarning}</p>
              <button
                onClick={() => setGenderWarning(null)}
                className="w-full pixel-btn-danger py-3"
              >
                UNDERSTOOD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - UPDATED WITH EXTERNAL HANDLERS */}
      <BottomNavigation 
        activeTab="home" 
        onCartClick={onNavigateToCart}
        onMatchClick={onNavigateToMatch}
        onCounselingClick={onNavigateToCounseling}
        onProfileClick={onNavigateToProfile}
      />
    </div>
  )
}

export default HomePage
