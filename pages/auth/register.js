import React, { useState } from 'react'

import RegisterContent from '@/components/auth/RegisterContent'
import fetchApi from '@/utils/fetchApi'
import useAppStore from '@/store/applicationStateStore'

const RegisterPage = () => {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)
  const [selectedRole, setSelectedRole] = useState('librarian')

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value)
  }

  async function submitHandler(event) {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const name = event.target.name.value

    try {
      const res = await fetchApi('/auth/register', 'POST', {
        username,
        password,
        selectedRole,
        name,
      })
      const { status, message } = res

      if (status) {
        setSuccessMessage(message)
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <RegisterContent
      submitHandler={submitHandler}
      handleRoleChange={handleRoleChange}
      selectedRole={selectedRole}
    />
  )
}

export default RegisterPage
