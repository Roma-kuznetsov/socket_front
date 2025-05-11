import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../app/store/authSlice/authSlice';
import InputWithLabel from '../../entity/inputWithLabel/inputWithLabel';
import Button from '../../shared/ui/button/Button';
import Input from '../../shared/ui/input/input';
import './authModal.css';

const AuthModal = () => {
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      dispatch(login(formData));
    } else {
      dispatch(register(formData));
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-tabs">
          <Button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
            disabled={isLoading}>
            Вход
          </Button>

          <Button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            disabled={isLoading}>
            Регистрация
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <InputWithLabel label={"Логин:"}>
            <Input type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required />
          </InputWithLabel>

          <InputWithLabel label={"Пароль:"}>
            <Input type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required />
          </InputWithLabel>

          {errorMessage && errorMessage}

          <Button
            disabled={isLoading}
            type="submit">
            {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;