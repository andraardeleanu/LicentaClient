import { useCookies } from 'react-cookie';
import { getWorkPointsByCompanyId } from '../utils/apiCalls';

export const WorkPointsFragment = () => {
  const [cookies] = useCookies();
  return (
    <button
      onClick={async () => {
        await getWorkPointsByCompanyId(1, cookies.userToken);
      }}
    >
      get companii
    </button>
  );
};
