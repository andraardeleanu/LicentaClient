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
  import { WorkPointBox } from '../../components/WorkPointBox';
  import { getWorkPoints } from '../../utils/apiCalls';
  import { AddWorkPointModal } from './AddWorkPointModal';
  
  export const WorkPointsTabContent = () => {
    const [cookies] = useCookies();
    const [needWorkPointsCall, setNeedWorkPointsCall] = useState(true);
    const [workPointsLoading, setWorkPointsLoading] = useState(false);
    const {
      isOpen: isAddWorkPointModalOpen,
      onOpen: onAddWorkPointModalOpen,
      onClose: onAddWorkPointModalClose
    } = useDisclosure();
  
    const [workpoints, setWorkPoints] = useState([]);
    const [selectedWorkPointId, setSelectedWorkPointId] = useState();
    const [selectedWorkPointName, setSelectedCWorkPointName] = useState();
  
    useEffect(() => {
      (async () => {
        try {
          if (needWorkPointsCall) {
            setWorkPointsLoading(true);
            await getWorkPoints(cookies.userToken).then((res) => {
              setWorkPointsLoading(false);
              setWorkPoints(res);
            });
            setNeedWorkPointsCall(false);
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
            workpoints.map((workpoint, index) => (
              <WrapItem
                className='w-full md:w-1/3'
                key={index}
              >
                <WorkPointBox
                  name={workpoint?.name}
                  address={workpoint?.address}
                  author={workpoint?.author}
                  dateUpdated={workpoint?.dateUpdated}                  
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
      </>
    );
  };
  