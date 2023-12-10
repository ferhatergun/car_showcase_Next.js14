import Hero from "@/components/Hero"
import SearchBar from "@/components/SearchBar"
import CustomFilter from "@/components/CustomFilter"
import { fetchCar } from "@/utils"
import CarCard from "@/components/CarCard"


export default async function Home() {
  const allCars = await fetchCar()
  console.log(allCars)
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars
  console.log(isDataEmpty)
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
        <div className="home__fiters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((cars)=>(
                <CarCard car={cars} />
              ))}
            </div>
          </section>
        ):(
          <div className="home__error-container">
            <h2 className="text-black text-xl
            font-bold">Oops,no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
