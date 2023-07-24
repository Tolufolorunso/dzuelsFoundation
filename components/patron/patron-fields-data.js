export const formFields = [
  {
    legend: 'Patron Detail',
    inputs: [
      { label: 'Surname', type: 'text', name: 'surname', required: true },
      { label: 'Firstname', type: 'text', name: 'firstname', required: true },
      { label: 'Middlename', type: 'text', name: 'middlename' },
      { label: 'email', type: 'email', name: 'email', required: true },
      { label: 'Phone Number', type: 'text', name: 'phoneNumber' },
      { label: 'Gender', type: 'select', name: 'gender' },
    ],
  },
  {
    legend: 'Patron Address',
    inputs: [
      { label: 'Street', type: 'text', name: 'street' },
      { label: 'City', type: 'text', name: 'city' },
      { label: 'State', type: 'text', name: 'state' },
      { label: 'headOfSchool', type: 'text', name: 'zipCode' },
      { label: 'Country', type: 'text', name: 'country' },
    ],
  },
  {
    legend: 'Library Managment',
    inputs: [
      { label: 'Barcode', type: 'text', name: 'barcode' },
      { label: 'Library', type: 'text', name: 'library' },
      { label: 'Registered By', type: 'text', name: 'registeredBy' },
    ],
  },
  {
    legend: 'Employer Infomation',
    inputs: [
      { label: 'Employer Name', type: 'text', name: 'employerName' },
      { label: 'School Name', type: 'text', name: 'schoolName' },
      { label: 'School Adress', type: 'text', name: 'schoolAdress' },
      { label: 'Head Of School', type: 'text', name: 'headOfSchool' },
      { label: 'School Email', type: 'text', name: 'schoolEmail' },
      { label: 'School Phone Number', type: 'text', name: 'schoolPhoneNumber' },
    ],
  },
  {
    legend: 'Student School Info',
    inputs: [
      { label: 'School Name', type: 'text', name: 'schoolName' },
      { label: 'School Adress', type: 'text', name: 'schoolAdress' },
      { label: 'Head Of School', type: 'text', name: 'headOfSchool' },
      { label: 'Current Class', type: 'text', name: 'currentClass' },
      { label: 'School Email', type: 'text', name: 'schoolEmail' },
      { label: 'School Phone Number', type: 'text', name: 'schoolPhoneNumber' },
    ],
  },

  {
    legend: 'Parent Information',
    inputs: [
      { label: 'Parent Name', type: 'text', name: 'parentName' },
      { label: 'Parent Address', type: 'text', name: 'parentAddress' },
      { label: 'Parent Phone Number', type: 'text', name: 'parentPhoneNumber' },
      {
        label: 'Relationship To Applicant',
        type: 'email',
        name: 'relationshipToPatron',
      },
      { label: 'Parent Email', type: 'text', name: 'parentEmail' },
    ],
  },
  {
    legend: 'General Information',
    inputs: [
      {
        label: 'Message Preferences',
        type: 'text',
        name: 'messagePreferences',
      },
    ],
  },
]
