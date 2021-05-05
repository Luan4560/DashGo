import {Flex, Button, Stack,} from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'


type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email invalid'),
  password: yup.string().required('Password is required'),
})

export default function SignIn() {
  const { register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const {errors} = formState;

  console.log(errors)
  const handleSignIn:SubmitHandler<SignInFormData> = async(values, event) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(values)
  }


  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >

        <Stack spacing="4">
          <Input 
          name="email" 
          type="email" 
          label="email"
          error={errors.email}
          {...register('email')}
          />
         
          <Input 
          name="password" 
          type="password" label="password" 
          error={errors.password}
          {...register('password')}/>        
        </Stack>

        <Button 
          type="submit" 
          mt="6" 
          colorScheme="pink" 
          size="lg"
          isLoading={formState.isSubmitting}
          >
          Entrar
          </Button> 
      </Flex>
    </Flex>
  )
}
