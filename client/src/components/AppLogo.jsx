import { useNavigate } from 'react-router-dom';
import { APP_TITLE } from '../utils/constants';

export const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <h1
      className='text-lg cursor-pointer hover:underline'
      onClick={() => {
        navigate('/');
      }}
    >
      {APP_TITLE}
    </h1>
  );
};
