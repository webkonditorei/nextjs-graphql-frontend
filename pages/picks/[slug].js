import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";



export default function Slug({pick}) {
 

    return <>

  
    
    <h1>{pick.PickTitel}</h1>
    <p>{pick.Steckbrief}</p>


<div className="hoch"></div>

    </>
}


export async function getStaticPaths() {


const GET_PICKS = gql `
    
    query {
  picks {
    data {
      attributes {
        Slug
      }
    }
  }
}

    `


  const { data } = await client.query({query: GET_PICKS});

  const paths = data.picks.data.map((pick)=> {
    return {params: {slug: pick.attributes.Slug}}
  });

  return {
    paths,
  fallback: false
  }
}

export async function getStaticProps({ params }) {

const GET_INDIVIDUAL_PICK = gql`
query ($pickSlug: String!) {
    picks(filters: { Slug: { eq: $pickSlug } }) {
      data {
        attributes {
           PickTitel
        Steckbrief
        }
      }
    }
  }
`;


const { data } = await client.query ({
  query: GET_INDIVIDUAL_PICK, 
    variables: { pickSlug: params.slug }
  
});

const pick = data.picks.data[0].attributes;

return {
  props: {
    pick
  }
}

}

