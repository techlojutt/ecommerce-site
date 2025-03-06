import React, { useState } from 'react'
import {  MdClose } from "react-icons/md";
import {toast} from 'react-hot-toast';
import ProductUploadImage from '../../components/UploadImage';
import { useDispatch } from 'react-redux';
import { addNewProduct, fetchProducts } from '../../store/slices/productSlice'; 



function AdminProducts() {

const [open,setOpen] = useState()

const [title,setTitle] = useState('');
const [description,setDescription] = useState('');
const [category,setCategory] = useState('');
const [brand,setBrand] = useState('');
const [price,setPrice] = useState('');
const [salePrice,setSalesPrice] = useState('');
const [totalStock,setTotalStock] = useState('');
const [loading,setLoading] = useState(false);
const [errorMessage,setErrorMessage] = useState('')



const [imageFile,setImageFile] = useState('')
const [uploadImageUrl,setUploadImageUrl] = useState('')

const dispatch = useDispatch()



  const togglePanel =()=>{
    setOpen(!open)
  }


  const uploadImage = async()=>{
       
    const file = imageFile
    const formData = new FormData();
    formData.append("file",file)
    formData.append("upload_preset","ecommerce")

    try {

     const response = await fetch(
         "https://api.cloudinary.com/v1_1/dpbayuhxl/image/upload",
         {
             method: "POST",
             body: formData,
         }
     )
     const data = await response.json();
      return data
   
     
    } catch (error) {
      console.log(error)
      
    }
}
 

  const onSubmitAddProduct = async(e)=>{

    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    try{
      const uploadImgUrl = await uploadImage()
      const imageUrl = uploadImgUrl?.secure_url

      if(!imageUrl){
        toast.error("Image upload failed. Please try again.")
        throw new Error("Image upload failed. Please try again.")
      }
       

     let product = {
       title,
       description,
       category,
       brand,
       price,
       salePrice,
       totalStock,
       image:imageUrl
           }
     console.log(product,"product")
     dispatch(addNewProduct(product)).then((data)=>{
         console.log(data,"data in payload")
         if(data?.payload?.success){
          dispatch(fetchProducts())
          setOpen(false)
          setTitle('');
          setDescription('');
          setCategory('');
          setBrand('');
          setPrice('');
          setSalesPrice('');
          setTotalStock('');
          setImageFile('');

          toast("🎉 Product added successfully!", {
            icon: "✅",
            style: {
              borderRadius: "8px",
              background: "#FFFFFF", // White background
              color: "#000000", // Black text color
              padding: "12px",
              height:"80px",
              fontSize: "16px",
              border: "1px solid #ddd", // Light border for a subtle effect
            },
            position: "top-right", // Set toast position
            duration: 3000, // Toast disappears after 3 seconds
          });
          
         }
     })

    

    }catch(error){
      console.error("Error submitting product:", error);
      toast.error(error.message || "Something went wrong. Please try again.")
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      
    } finally{
      setLoading(false)
    }
  }



  return (
    
    <>

{/* Overlay */}
{open && (
  <div
    className="fixed inset-0 z-40 transition-opacity duration-300 transparent-overlay"
    onClick={togglePanel}
  ></div>
)}

/* Sidebar Panel */
<div
  className={`fixed inset-y-0 right-0 w-90 bg-white shadow-xl z-50 transform ${
    open ? "translate-x-0" : "translate-x-full"
  } transition-transform duration-300 p-5 overflow-y-auto max-h-screen scroll-smooth`}
>
  {/* Panel Header */}
  <div className="flex items-center justify-between pb-1 border-b">
    <h2 className="text-xl font-extrabold">Add New Product</h2>
    <button onClick={togglePanel} className="text-gray-700  rounded-2xl p-1
     hover:bg-gray-200 cursor-pointer">
      <MdClose size={25} />
    </button>
  </div>

  {/* Form Fields */}
  <form onSubmit={onSubmitAddProduct} className="mt-4 flex flex-col gap-2">
    <ProductUploadImage imageFile = {imageFile} setImageFile = {setImageFile} 
    uploadImageUrl = {uploadImageUrl} setUploadImageUrl = {setUploadImageUrl}/>
    <input value={title} type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}
     className="border p-2 rounded-md w-full shadow" required  />
    <textarea value={description} placeholder="Description" className="border p-2 rounded-md w-full h-20 shadow"
    onChange={(e)=>setDescription(e.target.value)} required></textarea>

    {/* Category Dropdown */}
    <select value={category} onChange={(e)=>setCategory(e.target.value)} className="border p-2 rounded-md w-full shadow" required>
      <option value="">Select Category</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
      <option value="home_appliances">Home Appliances</option>
      <option value="books">Books</option>
      <option value="beauty">Beauty & Health</option>
    </select>

    {/* Brand Dropdown */}
    <select value={brand} onChange={(e)=>setBrand(e.target.value)} className="shadow border p-2 rounded-md w-full " required>
      <option value="">Select Brand</option>
      <option value="apple">Apple</option>
      <option value="samsung">Samsung</option>
      <option value="nike">Nike</option>
      <option value="adidas">Adidas</option>
      <option value="sony">Sony</option>
    </select>

    <input value={price}  onChange={(e)=>setPrice(e.target.value)} type="number"
     placeholder="Price" className="shadow border p-2 rounded-md w-full"
     required />
    <input value={salePrice} onChange={(e)=>setSalesPrice(e.target.value)} 
    type="number" placeholder="Sale Price" className="shadow border p-2 
    rounded-md w-full" required />
    <input value={totalStock} onChange={(e)=>setTotalStock(e.target.value)} 
    type="number" placeholder="Total Stock" className="shadow border p-2 
    rounded-md w-full" required />

    {/* Save Button */}
    <button type='submit' className="bg-gray-900 text-white p-2 rounded-md 
    mt-2 hover:bg-gray-800 shadow cursor-pointer" >
     {loading?"Adding..." :"Add" }
    </button>
  </form>
</div>



    <div className='mb-5 flex justify-end   '>
    <button onClick={()=>setOpen(true)} type="button" className="cursor-pointer shadow text-white bg-gray-800 hover:bg-gray-900
     focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg
    text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
  dark:focus:ring-gray-700 dark:border-gray-700">Add New Product</button>

    </div>
    </>
  )
}

export default AdminProducts