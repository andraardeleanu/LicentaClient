import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getProducts } from '../utils/apiCalls';
import {
  Table,
} from '@chakra-ui/react'

export const ProductBox = () => {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [setUserError] = useState('');
  const [cookies] = useCookies();

  useEffect(() => {
    getProductsAsync(cookies.userToken);
  }, []);

  const getProductsAsync = async () => {
    setLoading(true);
    const response = await getProducts(cookies.userToken);
    setLoading(false);
    if (response.errorMessage) {
      setUserError(response.errorMessage);
    }
    setProductsData(response.map(row => ({ Id: row.id, Name: row.name, Price: row.price, DateCrated: row.dateCreated })));
    setLoading(false);
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'Nume',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Pret',
      dataIndex: 'Price',
      key: 'price',
    },
    {
      title: 'Data creare',
      dataIndex: 'DateCreated',
      key: 'dateCreated',
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
        dataSource={productsData}
        loading={loading}
      />
    </>
  );
};
