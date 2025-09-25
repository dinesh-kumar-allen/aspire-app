"use client";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface IInputProps  extends InputHTMLAttributes<HTMLInputElement>    {
    onInputChange?: (value: string) => void;
    onSearchSubmit?: (searchText: string) => void;
    
}


const Input = ({ onInputChange, onSearchSubmit, ...props }: IInputProps) => {
    const [searchText, setSearchText] = useState("");
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        onInputChange?.(String(e.target.value)); // Parent should take care of throttling / debounce and call api
    }
    const handleOnSubmit = () => {
        onSearchSubmit?.(searchText);
    }
  return (
    <div className="flex flex-row justify-center items-center border-1 border-gray-300 rounded-md p-2">
        <input className="" type="text" value={searchText} onChange={handleOnChange} {...props} />
        <button onClick={handleOnSubmit}>Submit</button>
    </div>
  )
}

export default Input;