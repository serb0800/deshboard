'use client'
import { Popover } from 'antd'
import React, { FC, useState } from 'react'

interface Props {}

const FilterPopover:FC<Props> = () => {
    const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
    return (
      <Popover
        
      
      >
          
      </Popover>
    )
}

export default FilterPopover