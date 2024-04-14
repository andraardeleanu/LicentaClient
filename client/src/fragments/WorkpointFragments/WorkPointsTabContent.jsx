import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Icon,
  Wrap,
  WrapItem,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { ResultsLoading } from '../../components/ResultsLoading';
import { useCookies } from 'react-cookie';
import { getWorkPointsByUserId } from '../../utils/apiCalls';
import { AddWorkPointModal } from './AddWorkPointModal';
import { setNeedWorkPointsCall } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { WorkPointBox } from '../../components/WorkPointBox';
import { UpdateWorkpointModal } from './UpdateWorkpointModal';
import { ConfirmationModal } from './ConfirmationModal';

export const WorkPointsTabContent = () => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const [workPointsLoading, setWorkPointsLoading] = useState(false);
  const [workpoints, setWorkPoints] = useState([]);
  const { data } = useSelector((store) => store.user);
  const [selectedWorkpoint, setSelectedWorkpoint] = useState();
  const [selectedWorkpointId, setSelectedWorkpointId] = useState();
  const needWorkPointsCall = useSelector(
    (state) => state.user.needWorkPointsCall
  );
  const [searchTerm, setSearchTerm] = useState('');

  const {
    isOpen: isAddWorkPointModalOpen,
    onOpen: onAddWorkPointModalOpen,
    onClose: onAddWorkPointModalClose
  } = useDisclosure();

  const {
    isOpen: isUpdateWorkpointModalOpen,
    onOpen: onUpdateWorkpointModalOpen,
    onClose: onUpdateWorkpointModalClose
  } = useDisclosure();

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose
  } = useDisclosure();
  
  useEffect(() => {
    (async () => {
      try {
        if (needWorkPointsCall) {
          setWorkPointsLoading(true);
          await getWorkPointsByUserId(data.id, cookies.userToken).then(
            (res) => {
              setWorkPointsLoading(false);
              setWorkPoints(res);
            }
          );
          dispatch(setNeedWorkPointsCall(false));
        }
      } catch (err) {
        return err;
      }
    })();
  }, [workpoints, cookies.userToken, needWorkPointsCall]);

  // Funcție pentru filtrarea punctelor de lucru în funcție de termenul de căutare
  const filteredWorkpoints = workpoints.filter(wp => 
    wp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
     <Divider my={4} />
      <Button
        leftIcon={<Icon as={FaPlusCircle} />}
        colorScheme='blue'
        onClick={onAddWorkPointModalOpen}
      >
        Adauga punct de lucru
      </Button>
      <Divider my={4} />
      <Input
        placeholder='Cauta dupa nume punct de lucru...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      {workPointsLoading && <ResultsLoading />}
      <Wrap spacing={0}>
        {filteredWorkpoints.length > 0 ? (
          filteredWorkpoints.map((wp, index) => (
            <WrapItem
              className='w-full md:w-1/3'
              key={index}
            >
              <WorkPointBox
                name={wp?.name}
                address={wp?.address}
                author={wp?.author}
                dateUpdated={wp?.dateUpdated}
                onUpdateClick={() => {
                  setSelectedWorkpoint(wp);                  
                  onUpdateWorkpointModalOpen();
                }}
                onDeleteClick={() => {
                  setSelectedWorkpointId(wp.id);
                  onConfirmationModalOpen();
                }}
              />
            </WrapItem>
          ))
        ) : (
          <>Nu s-au gasit puncte de lucru.</>
        )}
      </Wrap>

      <AddWorkPointModal
        isOpen={isAddWorkPointModalOpen}
        onClose={onAddWorkPointModalClose}
      />
      <UpdateWorkpointModal
        isOpen={isUpdateWorkpointModalOpen}
        onClose={onUpdateWorkpointModalClose}
        workpoint={selectedWorkpoint}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={onConfirmationModalClose}
        workpoint={selectedWorkpointId}
      />
    </>
  );
};
