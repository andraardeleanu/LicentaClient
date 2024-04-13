import {
  Button,
  Divider,
  Icon,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { ResultsLoading } from '../../components/ResultsLoading';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { WorkPointBox } from '../../components/WorkPointBox';
import { getWorkPointsByUserId, removeWorkpoint } from '../../utils/apiCalls';
import { AddWorkPointModal } from './AddWorkPointModal';
import { setNeedWorkPointsCall } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
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
      {workPointsLoading && <ResultsLoading />}
      <Wrap spacing={0}>
        {workpoints.length > 0 ? (
          workpoints.map((wp, index) => (
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
