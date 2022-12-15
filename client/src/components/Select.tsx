import React from 'react'
import ReactSelect from 'react-select'

export default function Select(props: any) {
  return (
    <div className="flex">
      <ReactSelect getOptionLabel={(option) => option.name} getOptionValue={(option) => option.value}
      isLoading={props.loading}
      value={props.value} onChange={props.onChange} isSearchable={false}
      options={props.options} defaultValue={props.options[0]} unstyled
      classNames={{
          control: () =>
              'text-2xl px-3 py-2 outline-none rounded-sm border border-slate-500 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer',
          option: ({ data, isDisabled, isFocused, isSelected }) => 
              !isDisabled ? 'text-2xl px-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer' : 'text-xl text-slate-400 dark:text-slate-600 px-3 bg-slate-50 dark:bg-slate-800',
          menuList: () => 
              'border border-slate-500 bg-slate-50 dark:bg-slate-800',   
          dropdownIndicator: () => 
              'border-l pl-2 border-slate-500 hover:text-slate-600 dark:hover:text-slate-400 ',
          clearIndicator: () => 
              'px-2 hover:text-red-500',
          multiValue: () => 
              'bg-blue-300 dark:bg-blue-800 rounded-sm mr-1',
          multiValueLabel: () => 
              'px-2',
          multiValueRemove: () =>
              'px-1 hover:bg-red-600 hover:bg-opacity-60',
          valueContainer: () => 'mr-3'
      }}
      />
    </div>
  );
}
