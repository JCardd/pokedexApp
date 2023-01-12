import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

function Card(props) {

  const [likes, setLikes] = useState(0);

  return (
    <div
      className="card col-4 d-flex justify-content-center"
    >
      <img src={props.src} className="card-img-top" alt="..." />
      <div className="card-body">{/*Make it so the title is clickable*/}
        <Link href={{ pathname: "pokemons/[id]", query: { id: props.id } }} legacyBehavior>
          <a><h5 className="card-title">{props.title}</h5></a>
        </Link>
        <p className="card-text">{props.text}</p>
        {likes === 0 ? null : <p className="card-text">Likes: {likes}</p>}
        {likes === 10 ? null : (
          <button onClick={() => {
            setLikes(likes + 1);
          }}
            href="#"
            className="btn btn-primary"
          >
            {props.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

function getIDFromPokemon(pokemon) {
  return pokemon.url.replace(
    "https://pokeapi.co/api/v2/pokemon/",
    ""
  ).replace("/", "");
}

export default function Home() {

  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

    setIsLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)

      .then(response => {
        return response.json();
      })

      .then(json => {
        console.log(json);

        setIsLoading(false);

        setPokemonList([...pokemonList, ...json["results"]]);
      })

  }, [offset])

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {pokemonList.map(pokemon => {
            const id = getIDFromPokemon(pokemon);
            return <Card
              key={id}
              id={id}
              title={pokemon["name"].charAt(0).toUpperCase() + pokemon["name"].slice(1)}
              buttonText="like"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            />
          })}
        </div>

        {isLoading == true ? <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> : null}
        <div>
          <button onClick={() => { setOffset(offset + limit) }}>More</button>
        </div>
      </div>
    </div>

  );
}
