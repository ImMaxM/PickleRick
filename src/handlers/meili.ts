import MeiliSearch from "meilisearch";
import { config } from "../utils/config";
// import axios from "axios";

const client = new MeiliSearch({
  host: config.MEILISEARCH_HOST,
  apiKey: "masterKey",
});

export default class Meili {
  static async search(i: string, query: string) {
    const index = client.index(i);
    const search = await index.search(query, {
      attributesToHighlight: ["name"],
      limit: 25,
    });
    return search;
  }

  static async get(i: string, id: string) {
    const index = client.index(i);
    const get = await index.getDocument(id);
    return get as CharacterData;
  }
}

type CharacterData = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string | null;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
