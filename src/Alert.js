import React, { useEffect } from 'react'

const Alert = ({type,message,setAlert,list}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({show:false,message:"",type:""});
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}` }>{message}</p>
}

export default Alert