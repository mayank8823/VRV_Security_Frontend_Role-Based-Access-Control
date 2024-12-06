import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import RoleList from './components/RoleList';
import Modal from './components/Modal';
import UserForm from './components/forms/UserForm';
import RoleForm from './components/forms/RoleForm';
import { api } from './services/api';
import { User, Role } from './types';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, rolesData] = await Promise.all([
        api.getUsers(),
        api.getRoles(),
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const handleCreateUser = async (data: Partial<User>) => {
    try {
      await api.createUser(data as Omit<User, 'id'>);
      toast.success('User created successfully');
      loadData();
      setIsUserModalOpen(false);
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (data: Partial<User>) => {
    if (!selectedUser) return;
    try {
      await api.updateUser(selectedUser.id, data);
      toast.success('User updated successfully');
      loadData();
      setIsUserModalOpen(false);
      setSelectedUser(undefined);
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await api.deleteUser(userId);
      toast.success('User deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleCreateRole = async (data: Partial<Role>) => {
    try {
      await api.createRole(data as Omit<Role, 'id'>);
      toast.success('Role created successfully');
      loadData();
      setIsRoleModalOpen(false);
    } catch (error) {
      toast.error('Failed to create role');
    }
  };

  const handleUpdateRole = async (data: Partial<Role>) => {
    if (!selectedRole) return;
    try {
      await api.updateRole(selectedRole.id, data);
      toast.success('Role updated successfully');
      loadData();
      setIsRoleModalOpen(false);
      setSelectedRole(undefined);
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      await api.deleteRole(roleId);
      toast.success('Role deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete role');
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/users"
              element={
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <button
                      onClick={() => {
                        setSelectedUser(undefined);
                        setIsUserModalOpen(true);
                      }}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Add User
                    </button>
                  </div>
                  <UserList
                    users={users}
                    roles={roles}
                    onEditUser={(user) => {
                      setSelectedUser(user);
                      setIsUserModalOpen(true);
                    }}
                    onDeleteUser={handleDeleteUser}
                  />
                </div>
              }
            />
            <Route
              path="/roles"
              element={
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
                    <button
                      onClick={() => {
                        setSelectedRole(undefined);
                        setIsRoleModalOpen(true);
                      }}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Add Role
                    </button>
                  </div>
                  <RoleList
                    roles={roles}
                    onEditRole={(role) => {
                      setSelectedRole(role);
                      setIsRoleModalOpen(true);
                    }}
                    onDeleteRole={handleDeleteRole}
                  />
                </div>
              }
            />
          </Routes>
        </main>

        <Modal
          isOpen={isUserModalOpen}
          onClose={() => {
            setIsUserModalOpen(false);
            setSelectedUser(undefined);
          }}
          title={selectedUser ? 'Edit User' : 'Add User'}
        >
          <UserForm
            user={selectedUser}
            roles={roles}
            onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
            onCancel={() => {
              setIsUserModalOpen(false);
              setSelectedUser(undefined);
            }}
          />
        </Modal>

        <Modal
          isOpen={isRoleModalOpen}
          onClose={() => {
            setIsRoleModalOpen(false);
            setSelectedRole(undefined);
          }}
          title={selectedRole ? 'Edit Role' : 'Add Role'}
        >
          <RoleForm
            role={selectedRole}
            onSubmit={selectedRole ? handleUpdateRole : handleCreateRole}
            onCancel={() => {
              setIsRoleModalOpen(false);
              setSelectedRole(undefined);
            }}
          />
        </Modal>

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;