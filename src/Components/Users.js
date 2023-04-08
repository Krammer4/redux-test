import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUsers, clearUsers, closeIsCleared, removeUser, renderUsers, setUsersValue, fetchUsers, setUsers } from '../Redux/usersSlice'
import axios from 'axios'
import { UserItem } from './UserItem'

export const Users = () => {
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    const counter = useSelector(state => state.counter.count)
    const usersValue = useSelector(state => state.users.usersInputValue)
    const isCleared = useSelector(state => state.users.isCleared)
    const status = useSelector(state => state.users.status)
    const error = useSelector(state => state.users.error)
    
  // useEffect(()=>{
  //   dispatch(fetchUsers())
  // },[])

 

  useEffect(()=>{
    localStorage.setItem('Users', JSON.stringify(users))
  }, [users])

  useEffect(()=>{
    const userStorageData = JSON.parse(localStorage.getItem('Users'))
    if(userStorageData){
      dispatch(setUsers(userStorageData))
    }
    return localStorage.clear
  }, [])

  return (
    <div className='mt-6'>
        <input  className='text-lg' value={usersValue} 
        onChange={(e)=> dispatch(setUsersValue(e.target.value))} 
        onKeyDown={(e)=>{
          if(e.key === 'Enter'){
            dispatch(addUsers(usersValue))
          }
        }}
        placeholder='Имя пользователя'/>
        <button className='text-lg' onClick={()=>{
          if(usersValue){
            dispatch(addUsers(usersValue))
          }}
        }
        >Добавить пользователя</button>
        {status === 'loading' && <h2>Loading...</h2>}
        {status === 'rejected' && <h2>Error: {error}</h2>}

        <UserItem/>

        {/* <div className='pt-5'>{users.map((item, id)=>{
            return(<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <p className='text-lg'>{item.name}</p>
                <button className='ml-3' onClick={()=> dispatch(removeUser(item.id))}>&times;</button>
                </div>)
        })}</div> */}
        <button className='text-base bg-red-400 rounded-2xl px-2 py-1 mt-5' onClick={()=>dispatch(clearUsers())}>Очистить пользователей</button>
        {isCleared && <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <p >Пользователи были очищены!</p>
            <button onClick={()=>dispatch(closeIsCleared())}>&times;</button>
            </div>}
    </div>
  )
}
