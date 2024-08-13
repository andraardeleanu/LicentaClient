import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUserCompanyData, setUserData } from '../slices/userSlice';
import MoonLoader from 'react-spinners/MoonLoader';
import { LOADER_COLOR } from '../utils/constants';
import { Footer } from './Footer';
import { getCompanyById } from '../utils/apiCalls';

export const AppContainer = ({
  forGuest = false,
  needAuth = false,
  needRank,
  children
}) => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);
  const [getFinished, setGetFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies();
  const { getUser } = useAuth(cookies.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!getFinished) {
        setLoading(true);
        await getUser().then(async (res) => {
          setGetFinished(true);
          setIsLoggedIn(res?.id !== undefined);
          if (res?.id) {
            dispatch(setUserData(res));
            const companyRes = await getCompanyById(
              res?.companies[0]?.id,
              cookies.userToken
            );
            dispatch(setUserCompanyData(companyRes));
          }
        });
      }
      setLoading(false);
    };

    fetchUserData();

    return () => {};
  }, [cookies.userToken, dispatch, getFinished, getUser]);

  if (loading) {
    return (
      <div className='h-[100vh] flex items-center justify-center'>
        <MoonLoader color={LOADER_COLOR} />
      </div>
    );
  } else if (forGuest && isLoggedIn) navigate(-1);
  else if (needAuth) {
    if (isLoggedIn) {
      if (needRank) {
        if (needRank === data.roles[0]) {
          return (
            <div className='flex flex-col min-h-screen'>
              <div className='flex-grow'>{children}</div>
              <Footer />
            </div>
          );
        } else {
          navigate(-1);
        }
      } else {
        return (
          <div className='flex flex-col min-h-screen'>
            <div className='flex-grow'>{children}</div>
            <Footer />
          </div>
        );
      }
    } else navigate(-1);
  } else {
    return (
      <div className='flex flex-col min-h-screen'>
        <div className='flex-grow'>{children}</div>
        <Footer />
      </div>
    );
  }
};
