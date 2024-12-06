import React from 'react';
import { Role } from '../types';
import { Edit, Trash2, Shield, Lock, Unlock } from 'lucide-react';

interface RoleListProps {
  roles: Role[];
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
}

export default function RoleList({ roles, onEditRole, onDeleteRole }: RoleListProps) {
  // Determine role color based on name
  const getRoleColor = (roleName: string) => {
    const roleColors = {
      'Admin': 'bg-purple-900/60 text-purple-300 border-purple-800',
      'Manager': 'bg-blue-900/60 text-blue-300 border-blue-800',
      'Editor': 'bg-green-900/60 text-green-300 border-green-800',
      'Viewer': 'bg-gray-900/60 text-gray-300 border-gray-800',
      'default': 'bg-indigo-900/60 text-indigo-300 border-indigo-800'
    };
    
    return roleColors[roleName as keyof typeof roleColors] || roleColors['default'];
  };

  return (
    <div className="bg-gray-950 min-h-screen p-8 text-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-8">
        Role Overview
        </h1>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className="
                bg-gray-900 rounded-2xl 
                shadow-2xl border border-gray-800 
                overflow-hidden 
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-2xl
              "
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-indigo-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">
                      {role.name}
                      <span 
                        className={`
                          ml-3 text-xs px-2 py-1 rounded-full 
                          ${getRoleColor(role.name)}
                          inline-block
                        `}
                      >
                        {role.name}
                      </span>
                    </h3>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEditRole(role)}
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
                      onClick={() => onDeleteRole(role.id)}
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
                </div>
                
                <p className="text-sm text-gray-400 mb-4 italic">
                  {role.description}
                </p>
                
                <div className="space-y-3">
                  {Object.entries(role.permissions).map(([resource, permissions]) => (
                    <div key={resource} className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        {permissions.length > 0 ? (
                          <Unlock className="h-4 w-4 text-emerald-400 mr-2" />
                        ) : (
                          <Lock className="h-4 w-4 text-red-400 mr-2" />
                        )}
                        <span className="text-sm font-medium text-gray-300 uppercase">
                          {resource}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {permissions.length > 0 ? (
                          permissions.map((permission) => (
                            <span
                              key={permission}
                              className="
                                px-2 py-1 
                                text-xs font-medium 
                                rounded-full 
                                bg-indigo-900/50 text-indigo-300
                                border border-indigo-800
                              "
                            >
                              {permission}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500 italic">
                            No permissions
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}