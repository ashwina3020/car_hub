import { CarCard, Hero } from "@/components";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { fetchCars} from '@/utils';

export default async function Home({searchParams}) {

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2024,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
   <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x
      padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl 
          font-extrabold"> Car Catalouge</h1>
          <p>Explore the cars you like!</p>
          <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <CustomFilter title="fuel"/>
              <CustomFilter title="year" />
            </div>
          </div>
        </div>

        {
          !isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car, index) => (
                <CarCard 
                key = {index}
                car = {car}
                />
              ))}
              </div>
            </section>
          ): (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-black">Oops.. No Results!!!</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        }

      </div>
   </main>
  );
}
