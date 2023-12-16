"use client"
import Hero from "@/components/Hero"
import SearchBar from "@/components/SearchBar"
import CustomFilter from "@/components/CustomFilter"
import { fetchCar } from "@/utils"
import CarCard from "@/components/CarCard"
import { fuels, yearsOfProduction } from "@/constants"
import ShowMore from "@/components/ShowMore"
import { useState ,useEffect} from "react"
import Image from "next/image"


export default function Home({searchParams}:any) {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState(2022)
  const [fuel, setFuel] = useState("")
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    setLoading(true)
    try{
      const result = await fetchCar({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      })
      setAllCars(result)
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getCars()
  },[fuel,year,limit,manufacturer,model])

  return (
    <main className="overflow-hidden"> 
      <Hero />
      <div className="mt-12 padding-x padding-y
      max-width" id="discovery">
        <div className="home__text-container">
          <h1 className="text-4xl
          font-extrabold">
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>
        { allCars.length >0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((cars)=>(
                <CarCard car={cars} />
              ))}
            </div>

              {loading && (
                <div className="mt-16 w-full flex-center">
                  <p>Loading..</p>
                </div>
              )}
            <ShowMore 
            pageNumber={limit /10}
            isNext={limit > allCars.length}
            setLimit={setLimit}

            />
          </section>
        ):(
          <div className="home__error-container">
            <h2 className="text-black text-xl
            font-bold">Oops,no results</h2>
          </div>
        )}
      </div>
    </main>
  )
}
