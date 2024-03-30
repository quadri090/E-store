import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import RegisterForm from './RegisterForm'
import { getCurrentUser } from '@/actions.ts/getCurrentUser'

const page = async () => {

  const currentUser = await getCurrentUser()

  return (
    <Container>
        <FormWrap>
            <RegisterForm currentUser={currentUser}/>
        </FormWrap>
    </Container>
  )
}

export default page