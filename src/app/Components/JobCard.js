
import Image from 'next/image'

export default function JobCard({ posting }) {

    return (
        <section>

            <div>
                <Image src={`/${posting.Image}.png`} width="200" height="200" />
               </div>


        </section>


    )


}