import { Search, MoreVertical, Send, Paperclip } from 'lucide-react'

export default function MessagesPage() {
  // Mock conversations data
  const conversations = [
    {
      id: '1',
      participant: {
        name: 'TransFast Sp. z o.o.',
        avatar: 'TF',
        verified: true
      },
      listing: {
        title: 'Transport mebli Warszawa - Kraków'
      },
      lastMessage: {
        content: 'Czy możemy ustalić dokładną godzinę odbioru?',
        timestamp: '10:30',
        unread: true,
        sender: 'other'
      },
      unreadCount: 2
    },
    {
      id: '2',
      participant: {
        name: 'Jan Kowalski',
        avatar: 'JK',
        verified: false
      },
      listing: {
        title: 'Przeprowadzka mieszkania'
      },
      lastMessage: {
        content: 'Dziękuję za szybką realizację!',
        timestamp: 'wczoraj',
        unread: false,
        sender: 'other'
      },
      unreadCount: 0
    },
    {
      id: '3',
      participant: {
        name: 'AutoTransport Pro',
        avatar: 'AP',
        verified: true
      },
      listing: {
        title: 'Transport samochodu'
      },
      lastMessage: {
        content: 'Potwierdzam odbiór na jutro o 14:00',
        timestamp: '2 dni temu',
        unread: false,
        sender: 'me'
      },
      unreadCount: 0
    }
  ]

  const currentConversation = conversations[0]
  
  // Mock messages for current conversation
  const messages = [
    {
      id: '1',
      content: 'Dzień dobry! Interesuje mnie Państwa oferta na transport mebli.',
      timestamp: '9:15',
      sender: 'me'
    },
    {
      id: '2',
      content: 'Dzień dobry! Tak, możemy zrealizować ten transport. Czy ma Pan dokładny spis rzeczy do przewiezienia?',
      timestamp: '9:20',
      sender: 'other'
    },
    {
      id: '3',
      content: 'Tak, to głównie: sofa 3-osobowa, stół z 4 krzesłami, szafa 2-drzwiowa, komoda i kilka kartonów.',
      timestamp: '9:25',
      sender: 'me'
    },
    {
      id: '4',
      content: 'Rozumiem. Czy możemy ustalić dokładną godzinę odbioru? Najlepiej byłoby rano, około 8:00.',
      timestamp: '10:30',
      sender: 'other'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Wiadomości</h1>
        <p className="text-gray-600 mt-2">Komunikuj się z klientami i przewoźnikami</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Szukaj konwersacji..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  conversation.id === currentConversation.id ? 'bg-primary-50 border-primary-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {conversation.participant.avatar}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.participant.name}
                        {conversation.participant.verified && (
                          <span className="ml-1 text-green-500">✓</span>
                        )}
                      </p>
                      <div className="flex items-center space-x-1">
                        <p className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</p>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 truncate mb-1">
                      {conversation.listing.title}
                    </p>
                    <p className={`text-sm truncate ${
                      conversation.lastMessage.unread ? 'font-medium text-gray-900' : 'text-gray-600'
                    }`}>
                      {conversation.lastMessage.sender === 'me' ? 'Ty: ' : ''}
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {currentConversation.participant.avatar}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentConversation.participant.name}
                    {currentConversation.participant.verified && (
                      <span className="ml-2 text-green-500">✓</span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">{currentConversation.listing.title}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'me'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-primary-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">
                <Paperclip className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Napisz wiadomość..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button className="btn btn-primary">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}