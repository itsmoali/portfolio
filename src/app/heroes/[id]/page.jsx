'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getHeroes } from "@/app/api/hero_data/details"


const page = () => {

  const [hero, setHeroe] = useState(null)
  const searchParams = useSearchParams()
  const heroId = searchParams.get("id")

  useEffect(() => {
    (async () => {
      const heroes = await getHeroes()
      const hero = heroes.find((hero) => hero.id == heroId)
      setHeroe(hero)
      console.log(hero.localized_name)
    })();
  },[heroId])




  return (
      <div>
        {hero ? (
          <div>page {hero.localized_name}</div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
)
}

export default page

// export default async function SingleHero() {
//   const heroes = await getHeroes()


//   return (

//     <div>
//         Hero Page {heroId}
//     </div>
//   )
// }
