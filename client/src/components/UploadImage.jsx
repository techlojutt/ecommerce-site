import React,{useRef,useState} from 'react';
import { FiUploadCloud  } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdUpload } from "react-icons/md";

function ProductUploadImage({
    imageFile,
    setImageFile,
    uploadImageUrl,
    setUploadImageUrl
}) {

   const inputRef = useRef(null)

   

   const handleImageFileChange = (event)=>{
         console.log(event.target.files)
         const choosedFile = event.target.files?.[0];
         if(choosedFile){
            console.log(choosedFile,"choosed file")
            setImageFile(choosedFile)
            console.log(imageFile,"image file")
         }
   }

   const handleDragOver = (event)=>{
     event.preventDefault()
     
     
   }

   const handleDrop = (event)=>{
      event.preventDefault()
      const droppedFile = event.dataTransfer.files?.[0]
      if(droppedFile){
        setImageFile(droppedFile)
      }
      console.log(droppedFile,"droppedFile")
   }

   const handleRemoveImage = ()=>{
     setImageFile(null)
     if(inputRef.current){
        inputRef.current.value = "" 
     }
   }

   
 

  return (
    <div className='w-full max-w-md mx-auto mt-4'>
       <label className = "font-semibold text-lg mb-2 block">Upload Image</label>
       <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg border-gray-300 p-4'>
         <input id='image-upload' type='file' className='hidden' ref={inputRef} 
         onChange={handleImageFileChange}/>
         {
            !imageFile?<label htmlFor='image-upload' className=' flex flex-col items-center justify-center h-32 cursor-pointer'>
              <FiUploadCloud size={35} className='w-10 h-10 mb-2 text-gray-500'/>
              <span>Drag & drop or click to upload image</span>

            </label>:<div className='flex items-center justify-between gap-1'>
               <div className='flex items-center'>
                <FaRegFileAlt className='w-8 h-8 mr-2'/>
               </div>
               <p className='text-sm font-medium'>{imageFile.name}</p>
               <button className='' onClick={handleRemoveImage}>
                 <IoIosClose  className='w-8 h-8 text-gray-500 cursor-pointer hover:text-red-400'/>
                 <span className='sr-only'>Remove File</span>
               </button>
            </div>
         }
       </div>
    </div>
  )
}

export default ProductUploadImage