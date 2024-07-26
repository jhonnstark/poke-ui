export type Pokemon = {
  id: any;
  name: string;
  url: string;
  is_favorito: boolean;
}

export type PokemonItem = {
  name: string;
  url: string;
  img: string;
  id: number;
  is_favorite: boolean;
}

export type PokemonDetails = {
  id: any;
  name: string;
  img: string;
  height: string;
  weight: string;
  abilities: Array<any>;
  is_favorito?: boolean;
}
