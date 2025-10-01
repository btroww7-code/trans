'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Truck, User, Bell, Settings, Search, Plus, MessageSquare, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userRole, setUserRole] = useState('ADMIN')
  const [notifications, setNotifications] = useState(3)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowUserMenu(false)
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Truck className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Transport Marketplace</span>
              <span className="text-xl font-bold text-gray-900 sm:hidden">TM</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/listings" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Zlecenia
            </Link>
            <Link href="/carriers" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Przewoźnicy
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Dashboard
                </Link>
                <Link href="/listings/new" className="btn btn-primary text-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Dodaj zlecenie
                </Link>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Powiadomienia</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900">Nowa oferta</p>
                          <p className="text-xs text-gray-500">Otrzymałeś nową ofertę na zlecenie "Transport mebli"</p>
                          <p className="text-xs text-gray-400 mt-1">5 min temu</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900">Wiadomość</p>
                          <p className="text-xs text-gray-500">Jan Kowalski wysłał wiadomość</p>
                          <p className="text-xs text-gray-400 mt-1">15 min temu</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900">Status zlecenia</p>
                          <p className="text-xs text-gray-500">Zlecenie zostało zakończone</p>
                          <p className="text-xs text-gray-400 mt-1">1 godz. temu</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-200">
                        <Link href="/notifications" className="text-sm text-primary-600 hover:text-primary-700">
                          Zobacz wszystkie
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/messages" className="relative p-2 text-gray-500 hover:text-primary-600 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </Link>

                {userRole === 'ADMIN' && (
                  <Link href="/admin" className="text-red-600 hover:text-red-700 transition-colors font-medium">
                    Admin Panel
                  </Link>
                )}
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">JK</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Jan Kowalski</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 inline mr-2" />
                        Mój profil
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="w-4 h-4 inline mr-2" />
                        Ustawienia
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Wyloguj się
                      </button>
                    </div>
                  )}
                </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Zaloguj się
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Zarejestruj się
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/listings" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
              Zlecenia
            </Link>
            <Link href="/carriers" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
              Przewoźnicy
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
                  Dashboard
                </Link>
                <Link href="/messages" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
                  Wiadomości
                </Link>
                <Link href="/listings/new" className="block px-3 py-2 text-primary-600 font-medium">
                  Dodaj zlecenie
                </Link>
                <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
                  Mój profil
                </Link>
                {userRole === 'ADMIN' && (
                  <Link href="/admin" className="block px-3 py-2 text-red-600 hover:text-red-700 font-medium">
                    Admin Panel
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
                  Zaloguj się
                </Link>
                <Link href="/register" className="block px-3 py-2 text-primary-600 font-medium">
                  Zarejestruj się
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}