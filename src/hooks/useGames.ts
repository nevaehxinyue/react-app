import { GameQuery } from "../App";
import apiClient from "../services/api-client";
import  { FetchResponse } from "../services/api-client";
import { Genre } from "./useGenres";
import { useQuery } from "@tanstack/react-query";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[]; // An array of objects, with each object having a property called 'platform' of type 'Platform'.
  metacritic: number;
  genres: Genre[];
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) => {
  return useQuery<FetchResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Game>>("/games", {
          params: {
            genres: gameQuery.genre?.id,
            parent_platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
          },
        })
        .then((res) => res.data),
  });
};

export default useGames;
