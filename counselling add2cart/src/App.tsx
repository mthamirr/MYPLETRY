import React, { useState, useEffect } from 'react'
import NavigationInterceptor from '../../NavigationInterceptor' // ADD THIS LINE
import { ShoppingCart, Search, Filter, MessageCircle, User, Plus, ArrowLeft, Heart, Share2, Bell, Mail, Home, TrendingUp, Users, SortAsc, ChevronDown, Calendar, Clock, MapPin, Phone } from 'lucide-react'

// ADD THIS INTERFACE
interface AppProps {
  navigationHandler?: {
    goToAdd2Cart: () => void
    goToCounselling: () => void
    goToHome: () => void
    goToMatching: () => void
    goToProfile: () => void
    goToMessages: () => void
  }
  mode?: 'add2cart' | 'counselling' // NEW: To differentiate between the two pages
}

interface Product {
  id: number
  name: string
  price: number
  image: string
  seller: string
  condition: string
  description: string
  category: string
  isInCart: boolean
  timeAgo: string
  brand?: string
  additionalImages?: string[]
}

interface AppointmentForm {
  name: string
  dob: string
  studentNo: string
  major: string
  areasOfConcern: string[]
  meetingType: 'online' | 'physical'
  additionalNotes: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Sony Bunny",
    price: 25000,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    seller: "BOOKWORM_92",
    condition: "LIKE NEW",
    description: "Gaming controller with console setup",
    category: "ELECTRONICS",
    isInCart: false,
    timeAgo: "1 day ago",
    brand: "BrandEx",
    additionalImages: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Vintage Radio",
    price: 15000,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    seller: "TECH_STUDENT",
    condition: "GOOD",
    description: "Classic vintage radio in working condition",
    category: "ELECTRONICS",
    isInCart: true,
    timeAgo: "2 days ago"
  },
  {
    id: 3,
    name: "Pixel Art Print",
    price: 5000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    seller: "DORM_LIFE",
    condition: "NEW",
    description: "Digital art print for room decoration",
    category: "ART",
    isInCart: false,
    timeAgo: "3 days ago"
  },
  {
    id: 4,
    name: "Game Collection",
    price: 45000,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=400&fit=crop",
    seller: "NIGHT_STUDIER",
    condition: "EXCELLENT",
    description: "Complete game collection with rare titles",
    category: "GAMES",
    isInCart: false,
    timeAgo: "5 days ago"
  }
]

const concernOptions = [
  "I'm feeling anxious or panicky",
  "I'm having difficulty in my relationship",
  "A traumatic experience (past or present)",
  "I've been having trouble sleeping",
  "I'm navigating addiction or difficulty with substance abuse",
  "I'm feeling down or depressed",
  "I'm dealing with stress at work or school",
  "Something else"
]

// MODIFY FUNCTION SIGNATURE
function App(props: AppProps) {  // ADD props: AppProps
  // Determine which page to show based on props.mode
  const [currentPage, setCurrentPage] = useState<'add2cart' | 'counselling'>(
    props.mode || 'add2cart' // Default to add2cart if no mode specified
  )

  // Update page when mode prop changes
  useEffect(() => {
    if (props.mode) {
      setCurrentPage(props.mode)
    }
  }, [props.mode])

  // ALL YOUR EXISTING STATE
  const [currentView, setCurrentView] = useState<'main' | 'filter' | 'sell' | 'product' | 'cart' | 'matching' | 'profile' | 'counseling' | 'appointment-success'>('main')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Best Match')
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>({
    name: '',
    dob: '',
    studentNo: '',
    major: '',
    areasOfConcern: [],
    meetingType: 'online',
    additionalNotes: ''
  })

  // ALL YOUR EXISTING FUNCTIONS
  const toggleCart = (productId: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isInCart: !p.isInCart } : p
    ))
  }

  const cartItems = products.filter(p => p.isInCart)
  const cartCount = cartItems.length

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}원`
  }

  const handleConcernToggle = (concern: string) => {
    setAppointmentForm(prev => ({
      ...prev,
      areasOfConcern: prev.areasOfConcern.includes(concern)
        ? prev.areasOfConcern.filter(c => c !== concern)
        : [...prev.areasOfConcern, concern]
    }))
  }

  const handleSubmitAppointment = () => {
    console.log('Appointment submitted:', appointmentForm)
    setCurrentView('appointment-success')
  }

  // RENDER FUNCTIONS BASED ON CURRENT PAGE
  if (currentPage === 'counselling') {
    // COUNSELLING APP VIEWS
    if (currentView === 'main') {
      return (
        <div className="min-h-screen bg-cloud-dancer">
          <NavigationInterceptor navigationHandler={props.navigationHandler} />
          
          {/* Header */}
          <div className="bg-blue-violet text-cloud-dancer p-4 text-center">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold pixel-font">counselling</h1>
              <button
                onClick={() => props.navigationHandler?.goToHome?.()}
                className="bg-darkest-hour text-cloud-dancer px-3 py-1 rounded pixel-font font-bold text-sm"
              >
                HOME
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Welcome Message */}
            <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
              <h2 className="pixel-font font-bold text-darkest-hour text-lg mb-2">
                Student Counseling Services
              </h2>
              <p className="pixel-font text-darkest-hour text-sm mb-4">
                We provide confidential counseling services to support your mental health and well-being during your academic journey.
              </p>
              <button
                onClick={() => setCurrentView('counseling')}
                className="w-full bg-blue-violet text-cloud-dancer py-3 pixel-font font-bold hover:bg-opacity-80 transition-colors border-4 border-darkest-hour"
              >
                Schedule Appointment
              </button>
            </div>

            {/* Services Info */}
            <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
              <h3 className="pixel-font font-bold text-darkest-hour mb-3">Our Services</h3>
              <div className="space-y-2">
                <div className="p-2 border-2 border-darkest-hour">
                  <h4 className="pixel-font font-bold text-darkest-hour">Individual Counseling</h4>
                  <p className="pixel-font text-darkest-hour text-sm">One-on-one sessions with qualified counselors</p>
                </div>
                <div className="p-2 border-2 border-darkest-hour">
                  <h4 className="pixel-font font-bold text-darkest-hour">Crisis Support</h4>
                  <p className="pixel-font text-darkest-hour text-sm">24/7 emergency mental health support</p>
                </div>
                <div className="p-2 border-2 border-darkest-hour">
                  <h4 className="pixel-font font-bold text-darkest-hour">Academic Stress Management</h4>
                  <p className="pixel-font text-darkest-hour text-sm">Help with study-related anxiety and pressure</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
              <h3 className="pixel-font font-bold text-darkest-hour mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-darkest-hour" />
                  <span className="pixel-font text-darkest-hour">Emergency: 24/7 Hotline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-darkest-hour" />
                  <span className="pixel-font text-darkest-hour">Office Hours: Mon-Fri 9AM-5PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-darkest-hour" />
                  <span className="pixel-font text-darkest-hour">Location: Student Services Building</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-cloud-dancer border-t-4 border-darkest-hour">
            <div className="flex justify-around items-center py-3">
              <button 
                className="p-3 text-darkest-hour"
                onClick={() => props.navigationHandler?.goToAdd2Cart?.()}
              >
                <ShoppingCart className="w-6 h-6" />
              </button>
              <button 
                className="p-3 text-blue-violet"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              <button 
                className="p-3 text-darkest-hour"
                onClick={() => props.navigationHandler?.goToHome?.()}
              >
                <Home className="w-6 h-6" />
              </button>
              <button 
                className="p-3 text-darkest-hour"
                onClick={() => props.navigationHandler?.goToMatching?.()}
              >
                <Search className="w-6 h-6" />
              </button>
              <button 
                className="p-3 text-darkest-hour"
                onClick={() => props.navigationHandler?.goToProfile?.()}
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (currentView === 'counseling') {
      return (
        <div className="min-h-screen bg-cloud-dancer">
          <NavigationInterceptor navigationHandler={props.navigationHandler} />
          
          <div className="bg-blue-violet text-cloud-dancer p-4 flex items-center border-b-4 border-darkest-hour">
            <ArrowLeft 
              className="w-6 h-6 cursor-pointer mr-4" 
              onClick={() => setCurrentView('main')}
            />
            <h1 className="text-xl pixel-font font-bold">Schedule Appointment</h1>
          </div>

          <div className="p-4 space-y-4">
            {/* Personal Information */}
            <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
              <h3 className="pixel-font font-bold text-darkest-hour mb-3">Personal Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block pixel-font font-bold mb-1 text-darkest-hour text-sm">1. Name</label>
                  <input
                    type="text"
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block pixel-font font-bold mb-1 text-darkest-hour text-sm">2. D.O.B</label>
                  <input
                    type="date"
                    value={appointmentForm.dob}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, dob: e.target.value }))}
                    className="w-full p-2 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour"
                  />
                </div>

                <div>
                  <label className="block pixel-font font-bold mb-1 text-darkest-hour text-sm">3. Student No.</label>
                  <input
                    type="text"
                    value={appointmentForm.studentNo}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, studentNo: e.target.value }))}
                    className="w-full p-2 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour"
                    placeholder="Student ID number"
                  />
                </div>

                <div>
                  <label className="block pixel-font font-bold mb-1 text-darkest-hour text-sm">4. Major</label>
                  <input
                    type="text"
                    value={appointmentForm.major}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, major: e.target.value }))}
                    className="w-full p-2 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour"
                    placeholder="Your major"
                  />
                </div>
              </div>
            </div>

            {/* Areas of Concern */}
            <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
              <h3 className="pixel-font font-bold text-darkest-hour mb-3">5. Areas of Concern</h3>
              <div className="space-y-2">
                {concernOptions.map((concern, index) => (
                  <label key={index} className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appointmentForm.areasOfConcern.includes(concern)}
                      onChange={() => handleConcernToggle(concern)}
                      className="mt-1"
                    />
                    <span className="pixel-font text-darkest-hour text-sm">{concern}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Meeting Type */}
            <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
              <h3 className="pixel-font font-bold text-darkest-hour mb-3">6. Schedule a Meeting</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="meetingType"
                    value="online"
                    checked={appointmentForm.meetingType === 'online'}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, meetingType: e.target.value as 'online' | 'physical' }))}
                    className="border-2 border-darkest-hour"
                  />
                  <span className="pixel-font text-darkest-hour">Online</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="meetingType"
                    value="physical"
                    checked={appointmentForm.meetingType === 'physical'}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, meetingType: e.target.value as 'online' | 'physical' }))}
                    className="border-2 border-darkest-hour"
                  />
                  <span className="pixel-font text-darkest-hour">Physical</span>
                </label>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
              <h3 className="pixel-font font-bold text-darkest-hour mb-3">Additional Notes</h3>
              <textarea
                rows={3}
                value={appointmentForm.additionalNotes}
                onChange={(e) => setAppointmentForm(prev => ({ ...prev, additionalNotes: e.target.value }))}
                className="w-full p-2 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour"
                placeholder="Any additional information you'd like to share..."
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitAppointment}
              className="w-full bg-exuberant-orange text-cloud-dancer py-3 pixel-font font-bold hover:bg-opacity-80 transition-colors border-4 border-darkest-hour"
            >
              Submit Appointment Request
            </button>
          </div>
        </div>
      )
    }

    if (currentView === 'appointment-success') {
      return (
        <div className="min-h-screen bg-cloud-dancer flex items-center justify-center">
          <NavigationInterceptor navigationHandler={props.navigationHandler} />
          
          <div className="p-8 border-4 border-darkest-hour bg-cloud-dancer text-center max-w-sm mx-4">
            <div className="w-16 h-16 bg-sun-glare border-4 border-darkest-hour flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-darkest-hour" />
            </div>
            <h2 className="pixel-font font-bold text-darkest-hour text-xl mb-4">
              Your appointment has been scheduled
            </h2>
            <div className="border-4 border-darkest-hour p-4 mb-4 bg-cloud-dancer">
              <p className="pixel-font text-darkest-hour text-sm mb-2">kata-kata semangat</p>
              <div className="space-y-1">
                <div className="h-1 bg-darkest-hour"></div>
                <div className="h-1 bg-darkest-hour"></div>
                <div className="h-1 bg-darkest-hour"></div>
                <div className="h-1 bg-darkest-hour"></div>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('main')}
              className="w-full bg-blue-violet text-cloud-dancer py-3 pixel-font font-bold hover:bg-opacity-80 transition-colors border-4 border-darkest-hour"
            >
              Back to Main
            </button>
          </div>
        </div>
      )
    }
  }

  // ADD2CART APP VIEWS (DEFAULT)
  if (currentView === 'main') {
    return (
      <div className="min-h-screen bg-cloud-dancer">
        <NavigationInterceptor navigationHandler={props.navigationHandler} />
        
        {/* Header */}
        <div className="bg-blue-violet text-cloud-dancer p-4 text-center">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold pixel-font">add2cart</h1>
            <button
              onClick={() => props.navigationHandler?.goToHome?.()}
              className="bg-darkest-hour text-cloud-dancer px-3 py-1 rounded pixel-font font-bold text-sm"
            >
              HOME
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 bg-cloud-dancer border-b-4 border-darkest-hour">
          <div className="flex items-center space-x-2 mb-3">
            <button 
              onClick={() => setCurrentView('filter')}
              className="w-12 h-12 bg-sun-glare border-4 border-darkest-hour flex items-center justify-center pixel-font font-bold hover:bg-opacity-80 transition-colors"
            >
              <Filter className="w-5 h-5 text-darkest-hour" />
            </button>
            
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-darkest-hour" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-4 border-darkest-hour text-darkest-hour placeholder-darkest-hour bg-cloud-dancer focus:outline-none pixel-font"
              />
            </div>
            
            <button 
              onClick={() => setCurrentView('cart')}
              className="w-12 h-12 border-4 border-darkest-hour flex items-center justify-center relative bg-cloud-dancer hover:bg-opacity-80 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-darkest-hour" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-exuberant-orange text-cloud-dancer text-xs w-5 h-5 flex items-center justify-center pixel-font font-bold border-2 border-darkest-hour">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-exuberant-orange text-cloud-dancer px-4 py-2 border-4 border-darkest-hour appearance-none pr-8 focus:outline-none pixel-font font-bold"
            >
              <option value="Best Match">Best Match</option>
              <option value="Price Low">Price Low</option>
              <option value="Price High">Price High</option>
              <option value="Newest">Newest</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cloud-dancer pointer-events-none" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {products.filter(p => 
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((product) => (
              <div 
                key={product.id}
                className="bg-cloud-dancer border-4 border-darkest-hour cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedProduct(product)
                  setCurrentView('product')
                }}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover border-b-4 border-darkest-hour"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCart(product.id)
                    }}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-exuberant-orange text-cloud-dancer flex items-center justify-center hover:bg-opacity-80 transition-colors border-2 border-darkest-hour"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-3">
                  <h3 className="pixel-font font-bold text-darkest-hour mb-1 text-sm">{product.name}</h3>
                  <p className="text-lg pixel-font font-bold text-darkest-hour mb-1">{formatPrice(product.price)}</p>
                  <p className="text-xs pixel-font text-darkest-hour mb-2">{product.timeAgo}</p>
                  <button className="w-full bg-blue-violet text-cloud-dancer py-2 text-sm hover:bg-opacity-80 transition-colors flex items-center justify-center space-x-1 pixel-font font-bold border-2 border-darkest-hour">
                    <MessageCircle className="w-3 h-3" />
                    <span>Message Seller</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Sell Button */}
        <button
          onClick={() => setCurrentView('sell')}
          className="fixed bottom-20 right-4 w-16 h-16 bg-blue-violet text-cloud-dancer shadow-lg hover:bg-opacity-80 transition-colors flex items-center justify-center text-sm pixel-font font-bold border-4 border-darkest-hour"
        >
          $ Sell
        </button>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-cloud-dancer border-t-4 border-darkest-hour">
          <div className="flex justify-around items-center py-3">
            <button 
              className="p-3 text-blue-violet"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button 
              className="p-3 text-darkest-hour"
              onClick={() => props.navigationHandler?.goToCounselling?.()}
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button 
              className="p-3 text-darkest-hour"
              onClick={() => props.navigationHandler?.goToHome?.()}
            >
              <Home className="w-6 h-6" />
            </button>
            <button 
              className="p-3 text-darkest-hour"
              onClick={() => props.navigationHandler?.goToMatching?.()}
            >
              <Search className="w-6 h-6" />
            </button>
            <button 
              className="p-3 text-darkest-hour"
              onClick={() => props.navigationHandler?.goToProfile?.()}
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // OTHER VIEWS (filter, sell, product, cart) - ALL YOUR EXISTING VIEWS
  if (currentView === 'filter') {
    return (
      <div className="min-h-screen bg-cloud-dancer">
        <NavigationInterceptor navigationHandler={props.navigationHandler} />
        
        <div className="bg-blue-violet text-cloud-dancer p-4 flex items-center border-b-4 border-darkest-hour">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer mr-4" 
            onClick={() => setCurrentView('main')}
          />
          <h1 className="text-xl pixel-font font-bold">Filters</h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
            <h3 className="pixel-font font-bold mb-3 text-darkest-hour">Category</h3>
            <select className="w-full p-2 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Games</option>
              <option>Art</option>
            </select>
          </div>

          <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
            <h3 className="pixel-font font-bold mb-3 text-darkest-hour">Price Range</h3>
            <input type="range" className="w-full" min="0" max="100000" />
          </div>

          <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
            <h3 className="pixel-font font-bold mb-3 text-darkest-hour">Condition</h3>
            <div className="space-y-2">
              {['New', 'Like New', 'Good', 'Fair'].map(condition => (
                <label key={condition} className="flex items-center space-x-2">
                  <input type="checkbox" className="border-2 border-darkest-hour" />
                  <span className="pixel-font text-darkest-hour">{condition}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'sell') {
    return (
      <div className="min-h-screen bg-cloud-dancer">
        <NavigationInterceptor navigationHandler={props.navigationHandler} />
        
        <div className="bg-blue-violet text-cloud-dancer p-4 flex items-center border-b-4 border-darkest-hour">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer mr-4" 
            onClick={() => setCurrentView('main')}
          />
          <h1 className="text-xl pixel-font font-bold">Sell Item</h1>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block pixel-font font-bold mb-2 text-darkest-hour">Photos</label>
            <div className="border-4 border-dashed border-darkest-hour p-8 text-center bg-cloud-dancer">
              <Plus className="w-8 h-8 text-darkest-hour mx-auto mb-2" />
              <p className="text-darkest-hour pixel-font">Add Photos</p>
            </div>
          </div>

          <div>
            <label className="block pixel-font font-bold mb-2 text-darkest-hour">Title</label>
            <input type="text" className="w-full p-3 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour" placeholder="Item name..." />
          </div>

          <div>
            <label className="block pixel-font font-bold mb-2 text-darkest-hour">Price (원)</label>
            <input type="number" className="w-full p-3 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour" placeholder="0" />
          </div>

          <div>
            <label className="block pixel-font font-bold mb-2 text-darkest-hour">Description</label>
            <textarea rows={4} className="w-full p-3 border-4 border-darkest-hour pixel-font bg-cloud-dancer text-darkest-hour" placeholder="Describe your item..."></textarea>
          </div>

          <button className="w-full bg-blue-violet text-cloud-dancer py-3 pixel-font font-bold hover:bg-opacity-80 transition-colors border-4 border-darkest-hour">
            List Item
          </button>
        </div>
      </div>
    )
  }

  if (currentView === 'product' && selectedProduct) {
    return (
      <div className="min-h-screen bg-cloud-dancer">
        <NavigationInterceptor navigationHandler={props.navigationHandler} />
        
        {/* Header */}
        <div className="bg-blue-violet text-cloud-dancer p-4 flex items-center border-b-4 border-darkest-hour">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer mr-4" 
            onClick={() => setCurrentView('main')}
          />
          <h1 className="text-xl pixel-font font-bold">{selectedProduct.name}</h1>
        </div>

        <div className="p-4">
          {/* Main Product Image */}
          <div className="mb-4">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover border-4 border-darkest-hour"
            />
          </div>

          {/* Additional Images */}
          {selectedProduct.additionalImages && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {selectedProduct.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedProduct.name} ${index + 1}`}
                  className="w-full h-20 object-cover border-4 border-darkest-hour"
                />
              ))}
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between mb-6 p-4 border-4 border-darkest-hour bg-cloud-dancer">
            <div className="text-2xl pixel-font font-bold text-darkest-hour">
              {formatPrice(selectedProduct.price)}
            </div>
            <div className="flex space-x-2">
              <button className="w-10 h-10 border-4 border-darkest-hour flex items-center justify-center hover:bg-sun-glare transition-colors bg-cloud-dancer">
                <Share2 className="w-5 h-5 text-darkest-hour" />
              </button>
              <button
                onClick={() => toggleCart(selectedProduct.id)}
                className="w-10 h-10 flex items-center justify-center text-cloud-dancer border-4 border-darkest-hour bg-exuberant-orange hover:bg-opacity-80"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
            <h3 className="pixel-font font-bold text-darkest-hour mb-2">Description</h3>
            <p className="text-darkest-hour mb-4 pixel-font">{selectedProduct.description}</p>
            
            {selectedProduct.brand && (
              <div>
                <span className="pixel-font font-bold">Brand: </span>
                <span className="text-darkest-hour pixel-font">{selectedProduct.brand}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'cart') {
    return (
      <div className="min-h-screen bg-cloud-dancer">
        <NavigationInterceptor navigationHandler={props.navigationHandler} />
        
        <div className="bg-blue-violet text-cloud-dancer p-4 flex items-center border-b-4 border-darkest-hour">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer mr-4" 
            onClick={() => setCurrentView('main')}
          />
          <h1 className="text-xl pixel-font font-bold">My Cart</h1>
        </div>

        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-darkest-hour mx-auto mb-4" />
              <p className="text-darkest-hour mb-4 pixel-font">Your cart is empty</p>
              <button
                onClick={() => setCurrentView('main')}
                className="bg-blue-violet text-cloud-dancer px-6 py-2 hover:bg-opacity-80 transition-colors pixel-font font-bold border-4 border-darkest-hour"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((product) => (
                  <div key={product.id} className="border-4 border-darkest-hour p-4 flex items-center space-x-4 bg-cloud-dancer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover border-2 border-darkest-hour"
                    />
                    <div className="flex-1">
                      <h3 className="pixel-font font-bold text-darkest-hour">{product.name}</h3>
                      <p className="text-lg pixel-font font-bold text-darkest-hour">{formatPrice(product.price)}</p>
                    </div>
                    <button
                      onClick={() => toggleCart(product.id)}
                      className="w-8 h-8 bg-exuberant-orange text-cloud-dancer flex items-center justify-center hover:bg-opacity-80 border-2 border-darkest-hour pixel-font font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
                <div className="flex justify-between items-center mb-4">
                  <span className="pixel-font font-bold text-darkest-hour">Total ({cartItems.length} items)</span>
                  <span className="text-xl pixel-font font-bold text-darkest-hour">
                    {formatPrice(cartItems.reduce((sum, item) => sum + item.price, 0))}
                  </span>
                </div>
                <button className="w-full bg-exuberant-orange text-cloud-dancer py-3 pixel-font font-bold hover:bg-opacity-80 transition-colors border-4 border-darkest-hour">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-cloud-dancer">
        <NavigationInterceptor navigationHandler={props.navigationHandler} />
        
        <div className="bg-blue-violet text-cloud-dancer p-4 flex items-center border-b-4 border-darkest-hour">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer mr-4" 
            onClick={() => setCurrentView('main')}
          />
          <h1 className="text-xl pixel-font font-bold">Profile</h1>
        </div>

        <div className="p-4 space-y-4">
          {/* User Info */}
          <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-sun-glare border-4 border-darkest-hour flex items-center justify-center">
                <User className="w-8 h-8 text-darkest-hour" />
              </div>
              <div>
                <h2 className="pixel-font font-bold text-darkest-hour text-lg">STUDENT_USER</h2>
                <p className="pixel-font text-darkest-hour text-sm">Computer Science Major</p>
              </div>
            </div>
          </div>

          {/* Counseling Section */}
          <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
            <h3 className="pixel-font font-bold text-darkest-hour mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Student Counseling
            </h3>
            <p className="pixel-font text-darkest-hour text-sm mb-4">
              Schedule a confidential appointment with our counseling services
            </p>
            <button
              onClick={() => setCurrentView('counseling')}
              className="w-full bg-blue-violet text-cloud-dancer py-3 pixel-font font-bold hover:bg-opacity-80 transition-colors border-4 border-darkest-hour"
            >
              Schedule Appointment
            </button>
          </div>

          {/* Account Settings */}
          <div className="border-4 border-darkest-hour p-4 bg-cloud-dancer">
            <h3 className="pixel-font font-bold text-darkest-hour mb-3">Account Settings</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-sun-glare transition-colors pixel-font text-darkest-hour border-2 border-darkest-hour">
                Edit Profile
              </button>
              <button className="w-full text-left p-2 hover:bg-sun-glare transition-colors pixel-font text-darkest-hour border-2 border-darkest-hour">
                My Orders
              </button>
              <button className="w-full text-left p-2 hover:bg-sun-glare transition-colors pixel-font text-darkest-hour border-2 border-darkest-hour">
                Selling History
              </button>
              <button className="w-full text-left p-2 hover:bg-sun-glare transition-colors pixel-font text-darkest-hour border-2 border-darkest-hour">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-cloud-dancer">
      <NavigationInterceptor navigationHandler={props.navigationHandler} />
      <div className="p-4">
        <h1 className="pixel-font font-bold text-darkest-hour">Error: Unknown view</h1>
        <button 
          onClick={() => setCurrentView('main')}
          className="bg-blue-violet text-cloud-dancer px-4 py-2 pixel-font font-bold border-4 border-darkest-hour"
        >
          Go to Main
        </button>
      </div>
    </div>
  )
}

export default App
