import React from 'react'

export default function Button(props: any) {
  return (
    <>
    {props.active ? 
      <button className="text-2xl px-3 py-2 outline-none rounded-t-sm border-b-2 border-slate-900 dark:border-slate-50 bg-slate-100 dark:bg-slate-800 cursor-pointer" onClick={props.onClick}>
          { props.children }
      </button> :
      <button className="text-2xl px-3 py-2 outline-none rounded-t-sm cursor-pointer" onClick={props.onClick}>
          { props.children }
      </button>
    }
    </>
  )
}
