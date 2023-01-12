import Link from "next/link";


export default function Home() {
    return (
        <div>
            <p>Jarred is cool!</p>
            <Link href="/" legacyBehavior>
                <a>back</a>
            </Link>
        </div>
    )
}
