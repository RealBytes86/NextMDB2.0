import {
  EntityUnderwaterMovementComponent,
  ScoreboardIdentity,
  ScoreboardIdentityType,
  ScoreboardObjective,
  world,
} from "@minecraft/server";

const configs = {
  name: "NextMDB:",
  id: "TmV4dE1EQj",
  max: 5000,
}

export class NextMDB {

  #base64 = new Base64();

  Collection(collection: string, json: boolean = true): Collection {
    return new Collection(collection, json);
  }

  async createCollection(collection: string): Promise<{text: string, status:string}> {
    if(typeof collection == "string") {
      const collections: ScoreboardObjective[] = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}#1`)
      const name:string = `${collection}#1`; 
      for(let i: number= 0; i < collections.length; i++) {
        const collection: ScoreboardObjective = collections[i];
        if(collection.id == id) {
          return { text: "Collection exists.", status: "no" };
        }
      }
      world.scoreboard.addObjective(id, name);
      world.scoreboard.addObjective(this.#base64.encode(collection), collection);
      return { text: "Collection created.", status: "no" };

    } else {
      return { text: "The collection name is not a string.", status: "no" };
    } 
    
  }

  async existsCollection(collection: string): Promise<boolean> {
    if(typeof collection == "string") {
      const collections: ScoreboardObjective[] = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}#1`)
      for(let i:number = 0; i < collections.length; i++) {
        const collection: ScoreboardObjective = collections[i];
        if(collection.id == id) {
          return true;
        }
      }
      return false;

    } else {
      return false;
    } 
  }

  async deleteCollection(collection: string): Promise<{text: string, status: string}> {
    if(typeof collection == "string") {
      const collections: ScoreboardObjective[] = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}`).slice(0, -3);
      world.sendMessage(id)
      let count: number = 0;
      for(let i:number = 0; i < collections.length; i++) {
        const collection: ScoreboardObjective = collections[i];
        if(collection.id.startsWith(id)) {
          world.scoreboard.removeObjective(collection.id)
          count++;
        }
      }

      if(count == 0) {
        return { text: "Collection not found.", status: "no" };
      } else {
        world.scoreboard.removeObjective(this.#base64.encode(collection));
        return { text: `Collection deleted. Number of deleted clusters: ${count}`, status: "ok" };
      }
    
    } else {
      return { text: "The collection name is not a string.", status: "no" };
    } 
  }

  async resetCollection(collection: string): Promise<{text: string, status: string}> {

    if(typeof collection == "string") {
      const collections: ScoreboardObjective[] = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}`).slice(0, -3);
      let count: number = 0;
      for(let i: number = 0; i < collections.length; i++) {
        const collection: ScoreboardObjective = collections[i];
        if(collection.id.startsWith(id)) {
          world.scoreboard.removeObjective(collection.id)
          count++;
        }
      }

      if(count == 0) {
        return { text: "Collection not found.", status: "no" };
      } else {

        const newID:string = this.#base64.encode(`${configs.name}${collection}#1`)
        const newNAME:string = `${collection}#1`; 
        world.scoreboard.addObjective(newID, newNAME);
        world.scoreboard.removeObjective(this.#base64.encode(collection));
        world.scoreboard.addObjective(this.#base64.encode(collection), collection);

        return { text: `Collection reseted. Number of reseted clusters: ${count}`, status: "ok" };
      }
    
    } else {
      return { text: "Collection name is not a string.", status: "no" };
    } 

  }

  async getCollection(collection: string): Promise<{text: string, status: string, json: [{name: string, id: string, size:number}] | null}> {

    if(typeof collection == "string") {
      const collections: ScoreboardObjective[] = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}`).slice(0, -3);;
      const chunks: any = [];
      for(let i: number = 0; i < collections.length; i++) {
        const collection: ScoreboardObjective = collections[i];
        if(collection.id.startsWith(id)) {
          chunks.push({
            name: collection.displayName,
            id: collection.id,
            size: collection.getScores().length,
          });
        }
      }
      
      if(chunks.length == 0) {
        return { text: "Collection not found.", status: "no", json: null };
      } else {
        return { text: "Collection found.", status: "ok", json: chunks };
      }

    } else {
      return { text: "The collection name is not a string.", status: "no", json: null };
    }

  }

  async getALLCollections(): Promise<{text: string, status: string, json: [{name: string, id: string, size:number}] | null}> {
    const collections: ScoreboardObjective[] = world.scoreboard.getObjectives();
    const chunks: any = [];
    for(let i: number = 0; i < collections.length; i++) {
      const collection: ScoreboardObjective = collections[i];
      if(collection.id.startsWith(configs.id)) {
        chunks.push(
          {
            name: collection.displayName,
            id: collection.id,
            size: collection.getScores().length,
          }
        )
      }
    }

    if(chunks.length == 0) {
      return { text: "Collection not found.", status: "no", json: null };
    } else {
      return { text: "Collection found.", status: "ok", json: chunks };
    }
  }

  async deleteAllCollections(): Promise<{text: string, status: string}> {
    const collections: ScoreboardObjective[] = world.scoreboard.getObjectives();
    let count: number = 0;
    for(let i: number = 0; i < collections.length; i++) {
      const collection: ScoreboardObjective = collections[i];
      if(collection.id.startsWith(configs.id)) {
        world.scoreboard.removeObjective(collection.id)
        count++;
      }
    }

    if(count == 0) {
      return { text: "Collection not found.", status: "no" };
    } else {
      return { text: `All collection deleted. Number of deleted clusters: ${count}`, status: "ok" };
    }

  }

  async resetAllCollections() :Promise<{text: string, status: string}> {
    const collections: ScoreboardObjective[] = world.scoreboard.getObjectives();
    let count: number = 0;
    const saves:any = [];
    for(let i: number = 0; i < collections.length; i++) {
      const collection: ScoreboardObjective = collections[i];
      const id: string = collection.id;
      const name: string = collection.displayName;
      if(collection.id.startsWith(configs.id)) {
        world.scoreboard.removeObjective(id);
        count++;
        if(name.endsWith("#1")) {
          saves.push({name: name, id: id});
          continue;
        }
      }
    }

    if(saves.length == 0) {
      return { text: "Collection not found.", status: "no" };
    } else {

      for(let i: number = 0; i < saves.length; i++) {
        const save = saves[i];
        world.scoreboard.addObjective(save.id, save.name);
        continue;
      }

      return { text: `All collection reseted. Number of reseted clusters: ${count}`, status: "ok" };
    }
  }
}


class Collection {

  #base:Base64 = new Base64();

  private async getCluster(document: string, id: number): Promise<ScoreboardObjective> {

    const cluster_id: number = Math.ceil(id / configs.max);
    const cid:string = this.#base.encode(configs.name + this.collection + "#" + cluster_id.toString());
    const cluster:ScoreboardObjective | undefined = world.scoreboard.getObjective(cid);

    if(cluster == undefined) {
      return world.scoreboard.addObjective(cid, this.collection + "#" + cluster_id.toString());
    } else {
      return cluster;
    }
  }

  private async documentToId(document: string): Promise<number | undefined> {
    try {
      return world.scoreboard.getObjective(this.#base.encode(this.collection))?.getScore(document);
    } catch {
      return undefined;
    }
  }

  collection: string;
  json: boolean;

  constructor(collection: string, json: boolean) {
    this.collection = collection;
    this.json = json;
  }

  async findAsync() {

  }

  async insertAsync(key: string, value: object): Promise<{text: string, status: string}> {
    if(typeof key != "string" || key.length == 0) return { text: "The key is not a string.", status: "no"};
    if(typeof value != "object") return { text: "The value is not a object", status: "no"};

    const id: number | undefined = await this.documentToId(key);

    if(id == undefined) {
      const objective :ScoreboardObjective | undefined = world.scoreboard.getObjective(this.#base.encode(this.collection));
      const id: number = (objective?.getScores().length  ?? -1) + 1;

      if(id == 0) {
        throw new Error("NEXTMDB API ERROR: ID of zero");
      }

      objective?.setScore(key, id);

      const cluster: ScoreboardObjective = await this.getCluster(key, id);
      const json_object: {json: any, isValid: boolean} = JParse(
        {
        document: {
          name: key,
          created: new Date().getTime(),
        },
          value
      }, false)

      if(json_object.isValid) {
        cluster.setScore(`${key}:${escapeQuotes(json_object.json)}`, 0);
        return { text: "Document created.", status: "ok" }
      } else {
        return { text: "The value is not a json", status: "no"};
      }

    } else {
      console.warn("i am here")
      return { text: "Document exists.", status: "no" };
    }

  }

  async updateAsync() {

  }

  async deleteAsync() {

  }

  async hasAsync(document: string): Promise <boolean> {
    if(world.scoreboard.getObjective(this.collection)?.getScore(document) == undefined) {
      return false;
    } else {
      return true;
    }
  }

}

class PlayerCollection {

  fetch_get() {

  }

  fetch() {

  }

}

function escapeQuotes(jsonString: string): string {
  return jsonString.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function unescapeQuotes(jsonString: string): string {
  return jsonString.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

export function JParse(object:object, boolean: boolean) {

  if(boolean == true || boolean == undefined || boolean == null) {
    if(typeof object  == "object") return { json: object, isValid: true };
    try {
      const jsonParse = JSON.parse(object);
      return { json: jsonParse, isValid: true };
    }catch {
      return { json: {}, isValid: false };
    }
  } else if(boolean == false) {
    if(typeof object == "object") {
      return { json: JSON.stringify(object), isValid: true };
    } else {
      return {json: {}, isValid: false };
    }
  } else {
    throw new Error("Invalid boolean");
  }

}


export class Base64 {

  #chars:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

  encode(string: string): string {
    let encoded: string = "";
    let padding: string = "";

    for(let i: number = 0; i < string.length % 3; i++) {
        padding += "=";
        string += "\0";
    }

    for(let i: number = 0; i < string.length; i += 3) {
        const n: number = (string.charCodeAt(i) << 16)
        + (string.charCodeAt(i + 1) << 8)
        + string.charCodeAt(i + 2);

        encoded += this.#chars.charAt((n >>> 18) & 63) 
        + this.#chars.charAt((n >>> 12) & 63) 
        + this.#chars.charAt((n >>> 6) & 63) 
        + this.#chars.charAt(n & 63);
    }

    return encoded.substring(0, encoded.length - padding.length) + padding;
  }

  decode(string: string): string {

    let decoded:string = "";
  
    string = string.replace(/=+$/, "");
  
    for(let i: number = 0; i < string.length; i += 4) {
        const n: number = (this.#chars.indexOf(string.charAt(i)) << 18) |
                  (this.#chars.indexOf(string.charAt(i + 1)) << 12) |
                  (this.#chars.indexOf(string.charAt(i + 2)) << 6) |
                  this.#chars.indexOf(string.charAt(i + 3));
  
        decoded += String.fromCharCode((n >>> 16) & 255) +
                    String.fromCharCode((n >>> 8) & 255) +
                    String.fromCharCode(n & 255);
    }
  
    return decoded.replace(/\0+$/, '');
  }
}