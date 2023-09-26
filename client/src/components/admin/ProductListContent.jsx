import React, { useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from './SideBar';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductReset, productsReset } from '../../redux/admin/AdminSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import '../../styles/ProductListContent.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import Loader from '../layout/Loader';
import { deleteProduct, fetchAllProudcts } from '../../redux/admin/AdminAsyncActions';


function ProductListContent() {
      const dispatch = useDispatch();

      const { error, products, productDeletion: { loading, isDeleted, error: deletionError} } = useSelector((state) => state.admin);


      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(productsReset());
        }

        if(deletionError){
          toast.error(deletionError);
        }

        if(isDeleted){
          toast.success('Product deleted successfuly!');
          dispatch(deleteProductReset());
        }

        dispatch(fetchAllProudcts());
      }, [dispatch, error, toast, isDeleted, deletionError]);

      const handleDelete = (id) => {
        dispatch(deleteProduct(id));
      };

 const columns = [
   { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

   {
     field: "name",
     headerName: "Name",
     minWidth: 350,
     flex: 1,
   },
   {
     field: "stock",
     headerName: "Stock",
     type: "number",
     minWidth: 150,
     flex: 0.3,
   },

   {
     field: "price",
     headerName: "Price",
     type: "number",
     minWidth: 270,
     flex: 0.5,
   },

   {
     field: "actions",
     flex: 0.3,
     headerName: "Actions",
     minWidth: 150,
     type: "number",
     sortable: false,
     renderCell: (params) => {
       return (
         <>
           <div className='flex gap-3.5 items-center'>
             <Link to={`/admin/product/${params.id}`}>
               <AiOutlineEdit className="text-lg lg:text-xl font-medium" />
             </Link>

             <Button onClick={() => handleDelete(params.id)} className="p-1.5">
               <AiOutlineDelete className="text-lg lg:text-xl font-medium" />
             </Button>
           </div>
         </>
       );
     },
   },
 ];

 const rows = [];

 products &&
   products.forEach((item) => {
     rows.push({
       id: item._id,
       stock: item.stock,
       price: item.price,
       name: item.name,
     });
   });

 return (
   <>
     <MetaData title={`All Products - Admin`} />

     {loading ? (
       <Loader />
     ) : (
       <div className="max-w-[1240px] mt-8 mx-auto flex flex-col lg:flex-row">
         <Sidebar />
         <div className="bg-gray-100 lg:max-w-[calc(1240px-256px)]">
           <div className="m-6">
             <h1 className="text-2xl font-semibold mb-4">ALL PRODUCTS</h1>

             <DataGrid
               rows={rows}
               columns={columns}
               pageSize={10}
               disableSelectionOnClick
               className="productListTable"
               autoHeight
             />
           </div>
         </div>
       </div>
     )}
   </>
 );
}

export default ProductListContent