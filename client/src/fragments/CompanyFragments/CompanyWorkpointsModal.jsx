import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getWorkpointsFromCompany } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { WorkpointsTable } from '../WorkpointFragments/WorkpointsTable';

export const CompanyWorkpointsModal = ({
  isOpen,
  onClose,
  companyName,
  companyId
}) => {
  const [cookies] = useCookies();
  const [needWorkpointsCall, setNeedWorkpointsCall] = useState(true);
  const [workpointsLoading, setWorkpointsLoading] = useState(false);
  const [workpoints, setWorkpoints] = useState([]);

  useEffect(() => {
    setNeedWorkpointsCall(true);
  }, [companyId]);

  useEffect(() => {
    (async () => {
      try {
        if (needWorkpointsCall) {
          setWorkpointsLoading(true);
          await getWorkpointsFromCompany(cookies.userToken, companyId).then(
            (res) => {
              setWorkpointsLoading(false);
              setWorkpoints(res);
            }
          );
          setNeedWorkpointsCall(false);
        }
      } catch (err) {
        return err;
      }
    })();
  }, [workpoints, cookies.userToken, needWorkpointsCall, companyId]);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={'3xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Puncte de lucru - {companyName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={12}>
            {workpointsLoading ? (
              <ResultsLoading />
            ) : workpoints.length > 0 ? (
              <WorkpointsTable
                workpoints={workpoints}
                onClose={onClose}
              />
            ) : (
              <>Nu exista puncte de lucru.</>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
