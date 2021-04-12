import React, { useState, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type SearchBoxProps = any;

const SearchBox = ( { ...props }: SearchBoxProps ) => {
  const [ searchValue, setSearchValue ] = useState( '' )

  return (
    <input
      className={clsx(
        'w-4/6 px-4 py-1 ',
        'text-black',
        'rounded-lg font-medium',
      )}
      value={searchValue}
      onChange={e => { console.log( props ); props.onSearchChange( e.target.value ); setSearchValue( e.target.value ) }}
      placeholder="Search Movies"

    />
  )
}

export default SearchBox
