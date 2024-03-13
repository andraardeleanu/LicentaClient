import {
  Button,
  Divider,
  Icon,
  Wrap,
  WrapItem,
  useDisclosure
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { ResultsLoading } from '../../components/ResultsLoading';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { ProductBox } from '../../components/ProductBox';
import { getUsers } from '../../utils/apiCalls';
import { AddUserModal } from '../UsersFragments/AddUserModal';

export const UsersTabContent = () => {
  const [cookies] = useCookies();
  const [needUsersCall, setNeedUsersCall] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const {
    isOpen: isAddUserModalOpen,
    onOpen: onAddUserModalOpen,
    onClose: onAddUserModalClose
  } = useDisclosure();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (needUsersCall) {
          setUsersLoading(true);
          await getUsers(cookies.userToken).then((res) => {
            console.log('res: ', res);
            setUsersLoading(false);
            setUsers(res);
          });
          setNeedUsersCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [cookies.userToken, needUsersCall]);

  return (
    <>
      <Divider my={4} />
      <Button
        leftIcon={<Icon as={FaPlusCircle} />}
        colorScheme='blue'
        onClick={onAddUserModalClose}
      >
        Adauga client
      </Button>
      <Divider my={4} />
      {usersLoading && <ResultsLoading />}
      <Wrap spacing={0}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <WrapItem
              className='w-full md:w-1/3'
              key={index}
            >
              <ProductBox
                firstname={user?.firstname}
                lastname={user?.lastname}
                companyId={user?.companyId}
                username={user?.username}
                email={user?.email}
                dateUpdated={user?.dateUpdated}
              />
            </WrapItem>
          ))
        ) : (
          <>Nu s-au gasit clientii.</>
        )}
      </Wrap>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={onAddUserModalClose}
      />
    </>
  );
};
