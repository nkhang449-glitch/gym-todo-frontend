import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function LoginModal({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegister ? '/users/register' : '/users/login';
      const res = await axiosClient.post(endpoint, { username, password });
      onLoginSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md shadow-2xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-emerald-400">
          {isRegister ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập Gym To-Do'}
        </h2>
        
        {error && <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-sm text-center border border-red-500/30">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Tài khoản</label>
            <input
              type="text"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Mật khẩu</label>
            <input
              type="password"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 font-bold py-2.5 rounded-lg transition-colors"
          >
            {isRegister ? 'Đăng Ký' : 'Đăng Nhập'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-400">
          {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-emerald-400 underline font-semibold ml-1"
          >
            {isRegister ? 'Đăng nhập' : 'Tạo mới'}
          </button>
        </p>
      </div>
    </div>
  );
}