import React, { useState } from 'react'

import RegisterContent from '@/components/auth/RegisterContent'
import fetchApi from '@/utils/fetchApi'
import useAppStore from '@/store/applicationStateStore'
import { useRouter } from 'next/router'

const RegisterPage = () => {
  const { setErrorMessage, setSuccessMessage, clearMessage } = useAppStore(
    (state) => state
  )
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState('librarian')

  const router = useRouter()

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value)
  }

  async function submitHandler(event) {
    event.preventDefault()
    setLoading(true)

    const username = event.target.username.value
    const password = event.target.password.value
    const name = event.target.name.value

    try {
      const res = await fetchApi('/auth/register', 'POST', {
        username,
        password,
        role: selectedRole,
        name,
      })
      const { status, message } = res

      if (status) {
        setSuccessMessage(message)
        setTimeout(() => {
          clearMessage()
          router.push('/auth/login')
        }, 1500)
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterContent
      submitHandler={submitHandler}
      handleRoleChange={handleRoleChange}
      selectedRole={selectedRole}
      loading={loading}
    />
  )
}

export default RegisterPage
