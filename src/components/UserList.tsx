import React from 'react';
import { User, Role } from '../types';
import { Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface UserListProps {
  users: User[];
  roles: Role[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export default function UserList({ users, roles, onEditUser, onDeleteUser }: UserListProps) {
  // Role color mapping
  const getRoleColor = (roleName?: string) => {
    const roleColors = {
      'Admin': 'bg-purple-900/60 text-purple-300 border border-purple-800',
      'Manager': 'bg-blue-900/60 text-blue-300 border border-blue-800',
      'Editor': 'bg-green-900/60 text-green-300 border border-green-800',
      'Viewer': 'bg-gray-900/60 text-gray-300 border border-gray-800',
      'default': 'bg-indigo-900/50 text-indigo-300 border border-indigo-800'
    };
    
    return roleName 
      ? (roleColors[roleName as keyof typeof roleColors] || roleColors['default'])
      : roleColors['default'];
  };

  return (
    <div className="bg-gray-950 min-h-screen p-8 text-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-8">
        Users Overview
        </h1>
        
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  {['User', 'Role', 'Status', 'Actions'].map((header) => (
                    <th 
                      key={header}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const userRole = roles.find((role) => role.id === user.roleId);
                  
                  return (
                    <tr 
                      key={user.id} 
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-700" 
                              src={user.avatar} 
                              alt={`${user.name}'s avatar`} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`
                          px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${getRoleColor(userRole?.name)}
                          transition-all duration-300 ease-in-out
                        `}>
                          {userRole?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`
                          px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full 
                          ${user.status === 'active' 
                            ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-800' 
                            : 'bg-red-900/60 text-red-300 border border-red-800'}
                          transition-all duration-300 ease-in-out
                        `}>
                          {user.status === 'active' ? (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-2" />
                          )}
                          {user.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => onEditUser(user)}
                            className="
                              text-indigo-400 hover:text-indigo-200 
                              bg-indigo-900/30 hover:bg-indigo-900/50 
                              p-2 rounded-full 
                              transition-all duration-300 ease-in-out 
                              transform hover:scale-110 hover:rotate-6
                            "
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => onDeleteUser(user.id)}
                            className="
                              text-red-400 hover:text-red-200 
                              bg-red-900/30 hover:bg-red-900/50 
                              p-2 rounded-full 
                              transition-all duration-300 ease-in-out 
                              transform hover:scale-110 hover:-rotate-6
                            "
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}