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
import { getCompanyById } from '../../utils/apiCalls';
import { ResultsLoading } from '../../components/ResultsLoading';
import { CompanyDetailsTable } from '../CompanyFragments/CompanyDetailsTable';

export const CompanyDetailsModal = ({
    isOpen,
    onClose,
    companyName,
    companyId
}) => {
    const [cookies] = useCookies();
    const [needCompanyCall, setNeedCompanyCall] = useState(true);
    const [companyLoading, setCompanyLoading] = useState(false);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        setNeedCompanyCall(true);
    }, [companyId]);

    useEffect(() => {
        (async () => {
            try {
                if (needCompanyCall) {
                    setCompanyLoading(true);
                    await getCompanyById(cookies.userToken, companyId).then(
                        (res) => {
                            setCompanyLoading(false);
                            setCompanies(res);
                        }
                    );
                    setNeedCompanyCall(false);
                }
            } catch (err) {
                return err;
            }
        })();
    }, [companies, cookies.userToken, needCompanyCall, companyId]);

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
                    <ModalHeader>Detalii - {companyName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={12}>
                        {companyLoading ? (
                            <ResultsLoading />
                        ) : companies.length > 0 ? (
                            <CompanyDetailsTable
                                companies={companies = {}}
                                onClose={onClose}
                            />
                        ) : (
                            <>Nu exista detalii pentru aceasta companie.</>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
