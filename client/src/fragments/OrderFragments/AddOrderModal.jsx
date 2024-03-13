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
  
  export const AddOrderModal = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userError, setUserError] = useState('');
    const [cookies] = useCookies();
    const toast = useToast();
  
    return (
      <>
      </>
    );
  };
  