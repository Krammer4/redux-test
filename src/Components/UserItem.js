import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../Redux/usersSlice'



export const UserItem = () => {
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
  return (
    <div className='pt-5'>{users.map((item, id)=>{
        return(<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <p className='text-lg'>{item.name}</p>
            <button className='ml-3' onClick={()=> dispatch(removeUser(item.id))}>&times;</button>
            </div>)
    })}</div>
  )
}
