import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";
import Pick from "../../components/pick";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
 
 
 
export default function Picks({ picks }) {
 
   
 
const [selectedStadtteile, setselectedStadtteile] = useState([])
 
const getSelectedStadtteile = (stadtteil) => {
  setselectedStadtteile((prevSelectedStadtteile) =>
    prevSelectedStadtteile.includes(stadtteil)
      ? prevSelectedStadtteile.filter((item) => item !== stadtteil)
      : [...prevSelectedStadtteile, stadtteil]
  );
 
};
 
 
useEffect(() => {
    console.log(selectedStadtteile)
 
},[selectedStadtteile])
 
 
 
    return ( 
       <main className='boxed-container'>
 
<div>
    <h3>Filter</h3>
 
    <ul>
{picks.map((stadtteil) => {
  return <li key={stadtteil.attributes.stadtteile.data.id}>
 
    <input type="checkbox" id={stadtteil.attributes.stadtteile.data.id} onChange={e => getSelectedStadtteile(+e.target.value)} name={stadtteil.attributes.stadtteile.data.id} value={stadtteil.attributes.stadtteile.data.id}></input>
    <label for={stadtteil.attributes.stadtteile.data.id}> {stadtteil.attributes.stadtteile.data.attributes.Name}</label>
  </li>;
})}
</ul>
</div>
 
<div>
 
    <ul>
{picks.map((pick) => {
  return <li key={pick.attributes.Slug}>
    <Pick pick={pick}></Pick>
  </li>;
})}
</ul>
 
</div>
 
        </main>
        
    )
}
 
 
 
export async function getServerSideProps({selectedStadtteile}){
 
 
const stadtteile = selectedStadtteile   
 
 
 
 let GET_PICKS = gql `
 query Stadtteile($stadtteile:[ID]){
  picks(filters:{stadtteile: {id: {in: $stadtteile }}}) {
    data {
      attributes {
        Slug
       PickTitel
        Steckbrief
        shortTitle
        Bild{data{attributes{url}}}
        stadtteile
        { data
            { 
        id        
        attributes
        {
        Name
    }}}
      }
    }
  } 
}
 `
 
 
 const picksResponse = await client.query({
  query: GET_PICKS,
  variables: {
    stadtteile
  }
 }) 
 
 
 
  const picks = picksResponse?.data?.picks.data
  return {
    props: {
     
      picks
    }
  }
 
}