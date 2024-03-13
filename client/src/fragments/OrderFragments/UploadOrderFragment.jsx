import {
    Card,
    Heading,
    CardFooter,
    CardBody,
    Image,
    Stack,
    Text,
    Button,
    Flex,
    Icon,
    Divider
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';

export const UploadOrderFragment = () => {
    return (
        <>
            <Divider my={4} />
            <Flex justify={'space-between'}></Flex>
            <Button
                leftIcon={<Icon as={FaPlusCircle} />}
                colorScheme='blue'           
            >
                Creaza comanda manual
            </Button>
            <Divider my={4} />
            <Card
                borderRadius='30px'
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={require('../../images/upload-file2.png')}
                />

                <Stack>
                    <CardBody >
                        <Heading size='md'>Incarca fisier</Heading>

                        <Text py='2' color={'grey'} >

                            Adauga fisierul din computerul tau ce contine noua comanda.
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                            Incarca
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </>
    );
};
