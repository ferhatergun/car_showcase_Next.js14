"use client"
import React ,{useState} from 'react'
import SearchManufacturer from './SearchManufacturer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SearchButton = ({otherClasses}:{otherClasses:string}) => (
  <button className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src='/magnifying-glass.svg'
      width={40}
      height={40}
      alt='magnifying-glass' />

  </button>
)

const SearchBar = ({setManufacturer,setModel}:any) => {
    const [searchManufacturer, setSearchManufacturer] = useState("")
    const [searchModel, setSearchModel] = useState("")
    const router = useRouter()
    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(searchManufacturer === "" && searchModel === "") {
       return alert('Please fill in all the fields')

      }
      setModel(searchModel)
      setManufacturer(searchManufacturer)
    }
  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer 
        selected={searchManufacturer}
        setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image 
        src="/model-icon.png"
        width={25}
        height={25}
        alt="model-icon"
        className='absolute w-[20px] h-[20px] ml-4' />
        <input
          type="text"
          name='model'
          className='searchbar__input'
          placeholder='Tiguan'
          value={searchModel}
          onChange={(e)=>setSearchModel(e.target.value)}/>
          <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />

    </form>
  )
}

export default SearchBar
