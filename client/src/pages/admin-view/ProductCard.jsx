import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProduct, updateProduct } from '../../store/slices/productSlice'


function ProductCard({product,setOpen}) {
  console.log(product,"in card")
  console.log(product._id)

  const dispatch = useDispatch()
   
  const onClickUpdateHandler = (productId)=>{
         
    console.log(productId,"edit id")
    dispatch(updateProduct(productId))
    setOpen(true)
  }


  const onClickDeleteHandler = (productId)=>{
    console.log(productId,"delete id")
    dispatch(deleteProduct(productId))
  }
  return (
    <div className='w-full max-w-sm shadow-md bg-white rounded-t-lg  '>
      <div>
      <div className='relative'>
      <img className='h-[300px] w-full object-cover rounded-t-lg' 
       src={product?.image}
       alt={product?.title}
      />
      </div>
      </div>
      <div className=' px-4 py-3'>
        <h2 className='text-xl font-bold text-gray-800'>{product?.title}</h2>
      </div>
      <div className='flex justify-between items-center mb-2 px-4 py-2 '>
        <span className={`${product.salesPrice>0?'line-through':''} text-xl font-bold text-gray-800 lesding-tight`}>${product?.price}</span>
        <span className='text-2xl font-extrabold leading-tight text-gray-800'>${product?.salesPrice}</span>
      </div>
      <div className='flex justify-center gap-3 mb-5 mt-5'>
      <button type="button" className="text-white bg-gray-800 
      hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 
      font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
      dark:hover:bg-gray-700 dark:focus:ring-gray-700 
      dark:border-gray-700 cursor-pointer" onClick={()=>onClickUpdateHandler(product._id)}> Edit </button>
      <button type="button" className="text-white bg-gray-800 
      hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 
      font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
      dark:hover:bg-gray-700 dark:focus:ring-gray-700 
      dark:border-gray-700 cursor-pointer" onClick={()=>onClickDeleteHandler(product._id)}> Delete </button>

      </div>
    </div>
  )
}

export default ProductCard