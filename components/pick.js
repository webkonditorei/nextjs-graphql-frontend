import Image from "next/image"
import pickcard from "../styles/Pickcard.module.css"
import Link from "next/link"

export default function Pick({pick}) {
    return (
        <div className={pickcard.pickcardcontainer}>
            <Link href={"/picks/" + pick.attributes.Slug}>
            <Image src={process.env.NEXT_PUBLIC_WORDPRESS_API_URL + pick.attributes.Bild.data.attributes.url} width={500} height={500} alt="bla"/>
  <h2>{pick.attributes.PickTitel}</h2>
<h3>{pick.attributes.stadtteile.data.attributes.Name}</h3>
 <h3>{pick.attributes.shortTitle}</h3>
 </Link>
        </div>
    )
}