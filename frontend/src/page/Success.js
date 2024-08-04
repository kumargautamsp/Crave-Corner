import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Replace "/next-component" with your actual route
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='bg-green-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg'>
      <p>Payment is Successfully</p>
    </div>
  );
};

export default Success;
