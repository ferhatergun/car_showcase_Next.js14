"use client"
import React from 'react'
import { MouseEventHandler } from 'react'

interface CustomButtonProps {
    title:string,
    containerStyles?:string,
    handleClick?:MouseEventHandler<HTMLButtonElement>
}

const CustomButton = ({title,containerStyles,
    handleClick}:CustomButtonProps) => {
  return (
    <button
    disabled={false}
    type='button'
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
    >
      <span className={`flex-1`}>
        {title}
      </span>
    </button>
  )
}
export default CustomButton
