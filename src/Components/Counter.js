import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../Redux/counterSlice'


export const Counter = () => {

    const count = useSelector(state => state.counter.count)
    const dispatch = useDispatch()

  return (
    <div>
        <p className="text-3xl">{count}</p>
      <div className='flex justify-center'>
        <button className="bg-red-400 px-2 py-1 rounded-xl w-36 mr-3" onClick={()=>dispatch(decrement())}>Отнять</button>
        <button className="bg-green-400 px-2 py-1 rounded-xl w-36 ml-3" onClick={()=>dispatch(increment())}>Прибавить</button>
      </div>
    </div>
  )
}
