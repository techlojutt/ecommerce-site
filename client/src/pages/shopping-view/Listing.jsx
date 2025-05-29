import React ,{useState,useRef,useEffect} from 'react'
import ProductFilter from './Filter'
import { LuArrowUpDown } from 'react-icons/lu';
import { sortOptions } from '../../constants/constants';
import {useDispatch,useSelector} from 'react-redux'

import ShoppingProductTile from './ProductTile';
import { fetchAllFilteredProducts } from '../../store/slices/shopProductSlice';

function ShoppingListing() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch()
  const {products} = useSelector(state=>state.shopProducts)
  console.log(products,"product i listing page")

  useEffect(() => {
    
    dispatch(fetchAllFilteredProducts())
    
  }, [])
  

  // Close dropdown if clicked outside


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
       <ProductFilter/>
       <div className='w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b border-gray-200 flex items-center justify-between'>
           <h2 className='text-lg font-extrabold'>All Products</h2>
        <div className='flex items-center gap-3'>
          <span className='text-gray-400'>10 Products</span>
          <div className="relative inline-block text-left" ref={menuRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex justify-center items-center gap-1 px-2 py-1.5 border border-gray-200  rounded-md bg-white text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <LuArrowUpDown/>
        Sort By
      </button>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white   z-50">
          <div className="py-1 text-sm text-gray-700">
            {
              sortOptions.map(sortItem=>(
                <button key={sortItem.id} className="w-full text-left px-4 py-2 hover:bg-gray-100">{sortItem.label}</button>
              ))
            }

          </div>
        </div>
      )}
    </div>

        </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
         {
          products && products.length > 0 ?
          products.map(productItem=><ShoppingProductTile product={productItem} key={productItem._id}/>):null
         }
        </div>
       
       </div>
    </div>
  )
}

export default ShoppingListing