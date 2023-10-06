import React, { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import toast from 'react-hot-toast'
import PatronForm from '../add/AddPatronForm'
// import PatronForm from '../add/AddPatronForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

function EditPatronModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    surname: '',
    firstname: '',
    middlename: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    street: '',
    city: 'ijero',
    state: 'ekiti',
    country: 'nigeria',
    barcode: '',
    library: 'AAoJ',
    employerName: '',
    schoolName: '',
    schoolAdress: '',
    schoolEmail: '',
    schoolPhoneNumber: '',
    headOfSchool: '',
    currentClass: '',
    parentName: '',
    parentAddress: '',
    parentPhoneNumber: '',
    relationshipToPatron: '',
    parentEmail: '',
    messagePreferences: 'email,sms,call',
  })

  const clearFormDataExceptLibrary = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      surname: '',
      firstname: '',
      middlename: '',
      email: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: '',
      street: '',
      barcode: '',
      employerName: '',
      schoolName: '',
      schoolAdress: '',
      schoolEmail: '',
      schoolPhoneNumber: '',
      headOfSchool: '',
      currentClass: '',
      parentName: '',
      parentAddress: '',
      parentPhoneNumber: '',
      relationshipToPatron: '',
      parentEmail: '',
    }))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  return (
    <PatronForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  )
}

export default EditPatronModal
