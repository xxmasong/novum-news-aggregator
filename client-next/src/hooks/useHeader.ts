import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLayer, showAuthModal } from '@/store/core';
import { logout } from '@/services/AuthService';
import useAuth from './useAuth';

export default function useHeader() {
  const dispatch = useDispatch();  
  const { setUnauthorized } = useAuth();

  const onLogin = useCallback(() => {
    dispatch(showAuthModal('LOGIN'));
  }, [dispatch]);

  const onLogout = useCallback(async () => {
    dispatch(setLayer(true));
    await logout();
    setUnauthorized();
  }, [setUnauthorized]);

  return { 
    onLogin, 
    onLogout
  };
}
