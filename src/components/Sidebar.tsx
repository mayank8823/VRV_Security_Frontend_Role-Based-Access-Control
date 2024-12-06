import React from 'react';
import { Users, Shield, Layout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Layout },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Roles', href: '/roles', icon: Shield },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-950 border-r border-gray-800 shadow-2xl">
      <div className="flex h-20 items-center justify-center border-b border-gray-800">
        <Shield className="h-8 w-8 text-indigo-400" />
        <span className="ml-3 text-2xl font-extrabold text-white">
          RBAC Admin
        </span>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center rounded-xl px-4 py-3 
                text-sm font-medium transition-all duration-300 ease-in-out
                transform hover:scale-105 
                ${isActive 
                  ? 'bg-gray-900 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white hover:shadow-md'
                }
              `}
            >
              <Icon className={`
                mr-4 h-6 w-6 
                ${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-indigo-300'}
              `} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}