import { Search, Filter, MoreVertical, Shield, Ban, Trash2 } from 'lucide-react'

export default function AdminUsersPage() {
  // Mock users data
  const users = [
    {
      id: '1',
      email: 'jan.kowalski@email.com',
      role: 'CLIENT',
      status: 'ACTIVE',
      verified: true,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20',
      profile: {
        company_name: 'Kowalski Transport',
        rating_avg: 4.8,
        rating_count: 23
      }
    },
    {
      id: '2',
      email: 'anna.nowak@transport.pl',
      role: 'CARRIER',
      status: 'ACTIVE',
      verified: true,
      createdAt: '2024-01-10',
      lastLogin: '2024-01-19',
      profile: {
        company_name: 'TransFast Sp. z o.o.',
        rating_avg: 4.9,
        rating_count: 45
      }
    },
    {
      id: '3',
      email: 'piotr.wisniewski@gmail.com',
      role: 'CLIENT',
      status: 'SUSPENDED',
      verified: false,
      createdAt: '2024-01-12',
      lastLogin: '2024-01-18',
      profile: {
        company_name: null,
        rating_avg: 3.2,
        rating_count: 5
      }
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Zarządzanie użytkownikami</h1>
        <p className="text-gray-600 mt-2">Przeglądaj i moderuj konta użytkowników</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Szukaj użytkowników..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
              <option value="">Wszystkie role</option>
              <option value="CLIENT">Klient</option>
              <option value="CARRIER">Przewoźnik</option>
              <option value="ADMIN">Administrator</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
              <option value="">Wszystkie statusy</option>
              <option value="ACTIVE">Aktywny</option>
              <option value="SUSPENDED">Zawieszony</option>
              <option value="DELETED">Usunięty</option>
            </select>
            <button className="btn btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filtry
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Użytkownik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rola
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ocena
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data rejestracji
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ostatnie logowanie
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {user.profile.company_name || user.email}
                          {user.verified && (
                            <Shield className="w-4 h-4 text-green-500 ml-2" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                      user.role === 'CARRIER' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'ADMIN' ? 'Administrator' :
                       user.role === 'CARRIER' ? 'Przewoźnik' : 'Klient'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      user.status === 'SUSPENDED' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'ACTIVE' ? 'Aktywny' :
                       user.status === 'SUSPENDED' ? 'Zawieszony' : 'Usunięty'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.profile.rating_count > 0 ? (
                      <div>
                        <span className="font-medium">{user.profile.rating_avg}</span>
                        <span className="text-gray-500 ml-1">({user.profile.rating_count})</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Brak ocen</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {user.status === 'ACTIVE' ? (
                        <button className="text-yellow-600 hover:text-yellow-900" title="Zawieś użytkownika">
                          <Ban className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900" title="Aktywuj użytkownika">
                          <Shield className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900" title="Usuń użytkownika">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Poprzednia
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Następna
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Pokazano <span className="font-medium">1</span> do <span className="font-medium">3</span> z{' '}
                <span className="font-medium">3</span> wyników
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Poprzednia
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Następna
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}