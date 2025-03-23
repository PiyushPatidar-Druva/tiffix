import { useNavigate } from 'react-router-dom';

let navigate: ((path: string) => void) | null = null;

export const useAuthRedirect = () => {
  navigate = useNavigate();
  return navigate;
};

export const redirectToLogin = () => {
  if (navigate) {
    navigate('/login');
  }
}; 