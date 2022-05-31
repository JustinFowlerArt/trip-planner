
import React from "react";

export default function SkeletonLoader() {
  return (
    <div className='flex h-full flex-none justify-start w-[272px] bg-slate-700 rounded-xl m-2 p-2'>
      <div className='animate-pulse flex flex-col w-full items-center'>
        <div className='bg-slate-500 h-6 w-24 m-2 rounded-xl'></div>
        <div className='flex flex-col w-full items-center mb-3 px-1'>
          <div className='bg-slate-500 h-20 w-full p-4 mx-1 my-2 rounded-xl'></div>
          <div className='bg-slate-500 h-20 w-full p-4 mx-1 my-2 rounded-xl'></div>
          <div className='bg-slate-500 h-20 w-full p-4 mx-1 my-2 rounded-xl'></div>
          <div className='bg-slate-500 h-20 w-full p-4 mx-1 my-2 rounded-xl'></div>
        </div>
        <div className='bg-slate-500 h-12 w-28 rounded-2xl p-3 m-3'></div>
        <div className='flex justify-between items-center w-full px-6 my-3'>
          <div className="bg-slate-500 h-6 w-20 m-0 rounded-xl"></div>
          <div className='bg-slate-500 h-12 w-24 rounded-2xl p-3'></div>
        </div>
      </div>
    </div>
  );
}