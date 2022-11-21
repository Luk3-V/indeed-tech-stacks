import React from 'react'

export default function Button(props: any) {
  return (
    <button className="text-black font-semibold bg-blue-300 rounded py-2 px-5" onClick={props.onClick}>
        { props.children }
    </button>
  )
}
