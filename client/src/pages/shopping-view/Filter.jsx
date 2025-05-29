import React, { Fragment } from 'react'
import { filterOptions } from '../../constants/constants'

function ProductFilter() {
  return (
    <div className='bg-white rounded-lg shadow-sm  '>
       <div className='p-4 border-b border-gray-200  '>
        <h2 className='text-lg font-extrabold'>Filters</h2>
       </div>
       <div className='p-4 space-y-4 '>
         {
           Object.keys(filterOptions).map((keyItem)=>(
           <Fragment>
               <div>
                <h3 className='text-base font-bold'>{keyItem}</h3>
                <div>
                  {
                   filterOptions[keyItem].map(option=>(
     <div className="flex items-center">
          <input   id="checked-checkbox" type="checkbox" defaultValue className="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="checked-checkbox" className="ms-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">{option.label}</label>
     </div>)

                    )
                  }
                </div>
               </div>
               <div class="h-px bg-gray-300 my-4 w-full"></div>
             </Fragment>
           ))
             
           
         }
       </div>
    </div>
  )
}

export default ProductFilter