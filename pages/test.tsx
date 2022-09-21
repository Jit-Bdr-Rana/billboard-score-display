import React, { useEffect, useState } from 'react'

const test = () => {
  return (
    <Test/>
  )
}

export default test

const Test=()=>{
  
        const [name, setName] = useState("");
      
        const onStorageUpdate = (e:any) => {
          const { key, newValue } = e;
          if (key === "name") {
            setName(newValue);
          }
        };
      
        const handleChange = (e:any) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          };
        
          useEffect(() => {
            setName(localStorage.getItem("name") || "");
            window.addEventListener("storage", onStorageUpdate);
            return () => {
              window.removeEventListener("storage", onStorageUpdate);
            };
          }, []);
          return(
            <div className='p-4'>
                 <input className='border border-gray-600' value={name} onChange={handleChange} />
            </div>
          )
}