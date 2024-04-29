import React, {useState} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay'

const Home = () => {

    const [category, setCategory] = useState("All");

  return (
    <>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <ItemDisplay category={category} />
    </>
  )
}

export default Home
