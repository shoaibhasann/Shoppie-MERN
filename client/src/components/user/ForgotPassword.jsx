import React, { useEffect, useState } from 'react'
import Loader from '../Loader';
import MetaData from '../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessage, forgotPassword } from '../../redux/ForgotPasswordSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgotPassword() {

    const { message, error, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submitHandler = async(e) => {
      e.preventDefault();
      
      dispatch(clearErrors());

      const formData = new FormData();
      formData.append('email', email);

      dispatch(forgotPassword(formData));

    }

    useEffect(() => {
      if (error) {
        toast.error(error.message);
        dispatch(clearErrors());
      }

      if (message) {
        toast.success(message);
        navigate("/account");
        dispatch(clearMessage());
      }
    }, [error, message, dispatch, loading]);

  return (
    <>
      <MetaData title="Forgot Password - Shoppie" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center mt-14">
          <div className="p-8 shadow-2xl w-80 lg:w-[400px]">
            <h1 className="text-2xl font-bold text-center mb-4">
              Forgot Password
            </h1>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 p-2 pr-10 border border-slate-900  "
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-4 text-lg bg-slate-950 px-6 py-2 text-white font-semibold mt-6 w-full border-2 border-transparent hover:text-slate-950 hover:bg-white hover:border-slate-950"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword