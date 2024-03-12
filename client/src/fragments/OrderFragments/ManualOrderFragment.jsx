import {
    Alert,
    AlertIcon,
    AlertTitle,
    Button,
    Input,
    Stack,
    useToast
  } from '@chakra-ui/react';
  import { Form, Formik } from 'formik';
  import { useState } from 'react';
  import { useCookies } from 'react-cookie';
  import { useNavigate } from 'react-router-dom';
  import { addOrder } from '../../utils/apiCalls';
  
  export const ManualOrderFragment = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userError, setUserError] = useState('');
    const [cookies] = useCookies();
    const toast = useToast();
  
    return (
      <>
      //De creatfragmentu de modal pentru creare comanda manuala
      </>
    );
  };
  