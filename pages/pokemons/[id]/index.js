import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Pokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        {/*just to be safe check if the router is not ready, return early; because it's possible that the router can be empty/null */ }
        if (!router.isReady) return;
        {/*if we just provide the id of the pokemon we get the specific information about that pokemon */ }
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setIsLoading(false);
                setPokemon(json);
            });
        {/*only want to trigger this fetch when the router is ready*/ }
    }, [router.isReady])

    return (
        <div class="container">
            {isLoading ? (
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ) : null}
            {pokemon ? (
                <div className="card">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "500px", width: "500px" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                        <p className="card-text">Weight: {pokemon.weight} Hg</p>
                        <Link href="/" legacyBehavior>
                            <a className="btn btn-primary">
                                back
                            </a>
                        </Link>
                    </div>

                </div>
            ) : null}
        </div>
    );
}