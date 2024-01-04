import Link from "next/link"
import {getHeroes} from "../api/hero_data/details"



export default async function HeroList() {
  const heroes = await getHeroes()

  return (
    <div>
      <ul>
        {heroes.map((hero) => (
          <div>
            <li key={hero.id}>{hero.localized_name}</li>
            <img src={"http://cdn.dota2.com"+hero.icon} alt="" />
            <Link  href={{
              pathname : `/heroes/${hero.id}`,
              query : {id : hero.id}
            }}>
              <button>View</button>
            </Link>
            
          </div>
        ))}
      </ul>
    </div>
  )
}
