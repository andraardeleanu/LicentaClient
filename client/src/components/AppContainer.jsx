import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useCookies } from 'react-cookie';

export const AppContainer = ({
  forGuest = false,
  needAuth = false,
  children,
  setUserData = null
}) => {
  const navigate = useNavigate();
  const [getFinished, setGetFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies();
  const { getUser } = useAuth(cookies.userToken);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!getFinished) {
        setLoading(true);
        await getUser().then((res) => {
          setGetFinished(true);
          setIsLoggedIn(res?.id !== undefined);
          setUserData(res);
        });
      }
      setLoading(false);
    };

    fetchUserData();

    return () => {};
  }, [forGuest, getFinished, getUser, needAuth, setUserData]);

  if (loading) {
    return <>loading...</>;
  } else if (forGuest && isLoggedIn) navigate(-1);
  else if (needAuth) {
    if (isLoggedIn) return <>{children}</>;
    else navigate(-1);
  } else {
    return <>{children}</>;
  }
};
