import React from 'react'

export default function Select(props: any) {
  return (
    <div className='relative'>
      <select name={props.name} id={props.name} onChange={props.onChange}
      className='appearance-none text-2xl px-3 py-2 outline-none rounded-sm border border-slate-500 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer'>
          {props.options.map((x: any) => <option className='cursor-pointer' value={x.value} key={x.value}>{x.name}</option>)}
      </select>
    </div>
  )
}
