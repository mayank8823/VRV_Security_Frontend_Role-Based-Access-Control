import React, { useState, useEffect } from 'react';
import { Users, Shield, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRoles: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const users = await api.getUsers();
      const roles = await api.getRoles();

      setStats({
        totalUsers: users.length,
        activeUsers: users.filter((user) => user.status === 'active').length,
        totalRoles: roles.length,
      });
    };

    loadStats();
  }, []);

  const dashboardStats = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      change: '+4.75%',
      color: 'bg-indigo-900/50 text-indigo-300',
      iconBg: 'bg-indigo-800',
    },
    {
      name: 'Active Roles',
      value: stats.totalRoles,
      icon: Shield,
      change: '+2.02%',
      color: 'bg-emerald-900/50 text-emerald-300',
      iconBg: 'bg-emerald-800',
    },
    {
      name: 'Active Users',
      value: stats.activeUsers,
      icon: AlertCircle,
      change: `${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%`,
      color: 'bg-amber-900/50 text-amber-300',
      iconBg: 'bg-amber-800',
    },
  ];

  return (
    <div className="bg-gray-950 min-h-screen p-8 text-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-8">
          Dashboard Overview
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardStats.map((stat) => {
            const Icon = stat.icon;
            
            return (
              <div 
                key={stat.name} 
                className={`${stat.color} rounded-2xl shadow-2xl border border-gray-800 overflow-hidden transform transition-all duration-300 hover:scale-105`}
              >
                <div className="p-6 flex items-center">
                  <div className={`${stat.iconBg} rounded-full p-3 mr-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-75">{stat.name}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </div>
                <div className="bg-white/10 px-6 py-3">
                  <p className="text-sm font-medium">
                    <span className="text-green-500 mr-2">▲</span>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}