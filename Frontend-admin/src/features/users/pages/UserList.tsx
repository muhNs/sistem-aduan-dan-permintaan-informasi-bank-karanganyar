import { useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { useUsers } from '../hooks/useUsers';
import type { User, UserFormData } from '../types/users.types';

export default function UserList() {
  const { users, isLoading, isSubmitting, createUser, updateUser, deleteUser } = useUsers();
  
  const [view, setView] = useState<'table' | 'form'>('table');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<UserFormData>({
    name: '', 
    email: '',
    password: '',
    role: 'ADMIN',
  });

  const handleAddUser = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', password: '', role: 'ADMIN' });
    setView('form');
  };

  const handleEditUser = (user: User) => {
    setEditingId(user.id);
    setFormData({ 
      name: user.name, 
      email: user.email, 
      password: '', // Kosongkan saat edit (opsional di API)
      role: user.role 
    });
    setView('form');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logika Submit yang kini terintegrasi langsung dengan API Hook
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isSuccess = false;
    if (editingId) {
      isSuccess = await updateUser(editingId, formData);
    } else {
      isSuccess = await createUser(formData);
    }

    // Jika API call sukses, kembali ke tampilan tabel
    if (isSuccess) {
      setView('table');
    }
  };

  if (isLoading && users.length === 0) {
    return <div className="p-6 text-center text-gray-500">Memuat data user...</div>;
  }

  return (
    <div className="p-4 md:p-6 bg-[#f4f7fb] min-h-screen">
      {view === 'table' ? (
        <UserTable 
          users={users} 
          onAdd={handleAddUser} 
          onEdit={handleEditUser} 
          onDelete={deleteUser}
        />
      ) : (
        <div className="flex items-center justify-center pt-8">
          <UserForm
            isEditing={!!editingId}
            isLoading={isSubmitting} // Gunakan state loading saat submit dari hook
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBack={() => setView('table')}
          />
        </div>
      )}
    </div>
  );
}