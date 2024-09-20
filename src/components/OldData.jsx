import React, { useContext } from 'react'
import { DataContext} from './context'
import UserCard from './UserCard'

function OldData() {
    const {data} = useContext(DataContext)
  return (

    data.length>0?
    <div className='oldusercard'>
        {
            data.map((user)=>
                <UserCard user={user} key={user.id+user.name} />
            )
            
        }
    </div>:<div>No User data</div>
  )
}

export default OldData