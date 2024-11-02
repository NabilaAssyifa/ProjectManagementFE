import { useState } from 'react';
import { motion } from 'framer-motion'; 
import backgroundImage from '../bgLogin.svg';
import { faChevronRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      onLogin(true); 
    } else {
      alert('Username atau password salah');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.form 
        onSubmit={handleSubmit} 
        className="w-11/12 p-6 ml-20"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} 
      >
        <h2 className="text-3xl font-extrabold text-[#272727] mb-2 text-left">Aplikasi Project Management</h2>
        <p className='text-left text-[#272727] mb-3'>kelola proyek anda dengan lebih efisien</p>
        <label className="block mb-1 text-left">
          <span className="text-[#272727] text-xs">Email</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='masukkan alamat email...'
            className="mt-1 block w-full p-2 rounded border border-[#d4d4d4] text-sm text-black"
            required
          />
        </label>
        <label className="block mb-3 text-left relative">
          <span className="text-[#272727] text-xs">Kata sandi</span>
          <input
            type={showPassword ? 'text' : 'password'} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='masukkan kata sandi...'
            className="mt-1 block w-full p-2 rounded border text-sm border-[#d4d4d4] text-black"
            required
          />
          <span 
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" 
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='text-[#727272] mt-7 text-sm'/>
          </span>
        </label>
        <button type="submit" className="w-full bg-black hover:bg-[#2f2f2f] text-white rounded-md h-10">
          Masuk <FontAwesomeIcon icon={faChevronRight} className='text-xs ml-3'/>
        </button>
      </motion.form>

      <img 
        src={backgroundImage} 
        alt="Background" 
        className="w-1/2 h-full object-cover ml-48" 
      />
    </div>
  );
}

export default Login;
