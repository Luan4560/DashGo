import {Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack} from '@chakra-ui/react'
import Link from 'next/link'
import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'


import {Input} from '../../components/Form/Input'
import {Header} from '../../components/Header'

import { Sidebar } from '../../components/Sidebar'

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confimation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Email invalid'),
  password: yup.string().required('Password is required').min(6, 'The min is 6 '),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'The password and password confimation need to be the same')
})


export default function CreateUser() {
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const {errors} = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async(values) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log(values)
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
        <Sidebar/>

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight='normal'>Create User</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
              name="name" 
              type="text"
              label="Complete nameEE"
              {...register('name')}
              error={errors.name}
              />

              <Input 
                name="email" 
                type="email" 
                label="E-mail"
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="password" 
                type="password" 
                label="Password"
                {...register('password')}
                error={errors.password}
              />
              <Input 
                name="password_confirmation" 
                type="password" 
                label="Confirm password"
                {...register('password_confirmation')}
                error={errors.password_confirmation}
                />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancel</Button>
              </Link>
              <Button 
                type="submit" 
                colorScheme="pink"
                isLoading={formState.isSubmitting}
                >
                  Save
                </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}