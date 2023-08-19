import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { signOut } from 'next-auth/react'
import classes from './header.module.css'

function Profile(props) {
  const { data } = props
  const user = data?.user
  const nameParts = user?.name.split(' ')
  const initials = nameParts?.map((part) => part.charAt(0)).join('')

  return (
    <ul className={classes.links}>
      <li className='item'>
        <Avatar sx={{}} alt={user?.name} src='/images/book-default.jp'>
          {initials?.toUpperCase()}
        </Avatar>
      </li>
      {data?.user && (
        <li className='item'>
          <Button onClick={() => signOut()} variant='outlined'>
            Log out
          </Button>
        </li>
      )}
    </ul>
  )
}

export default Profile
