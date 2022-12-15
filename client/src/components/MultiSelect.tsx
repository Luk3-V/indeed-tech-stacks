import React from 'react'
import Select from 'react-select'

export default function MultiSelect(props: any) {

    return (
        <div className='flex'>
            <Select getOptionLabel={(option) => option.name} getOptionValue={(option) => option.name}
            isLoading={props.loading}
            value={props.selectedOptions} onChange={(o) => props.setSelectedOptions(o)} isOptionDisabled={(option) => option.isDisabled || props.selectedOptions.length >= 3}
            options={props.options} closeMenuOnSelect={false} defaultValue={[props.options[0], props.options[1]]} isMulti unstyled
            classNames={{
                control: () =>
                    'text-xl px-3 py-2 outline-none rounded-sm border border-slate-500 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer',
                option: ({ data, isDisabled, isFocused, isSelected }) => 
                    !isDisabled ? 'text-xl px-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer' : 'text-xl text-slate-400 dark:text-slate-600 px-3 bg-slate-50 dark:bg-slate-800',
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
                    'px-1 hover:bg-red-600 hover:bg-opacity-60'
            }}
            />
        </div> 
    )
}
