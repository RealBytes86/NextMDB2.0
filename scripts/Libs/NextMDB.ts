import { world } from "@minecraft/server";

const configs = {
  name: "NextMDB:",
  id: "TmV4dE1EQj"
}

export class NextMDB {

  #base64 = new Base64();

  Collection(collection: string, json = true) {
    if(typeof collection == "string") {
      return new Collection(collection, json);
    } else {
      return { text: "The collection name is not a string.", status: "no" };
    }
  }

  createCollection(collection: string) {
    if(typeof collection == "string") {
      const collections = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}#1`)
      const name:string = `${collection}#1`; 
      for(let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        if(collection.id == id) {
          return { text: "Collection exists.", status: "no" };
        }
      }
      world.scoreboard.addObjective(id, name);
      return { text: "Collection created.", status: "no" };

    } else {
      return { text: "The collection name is not a string.", status: "no" };
    } 
    
  }

  existsCollection(collection: string) {
    if(typeof collection == "string") {
      const collections = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}#1`)
      for(let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        if(collection.id == id) {
          return true;
        }
      }
      return false;

    } else {
      return false;
    } 
  }

  deleteCollection(collection: string) { 
    if(typeof collection == "string") {
      const collections = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}`)
      let count = 0;
      for(let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        if(collection.id.startsWith(id)) {
          world.scoreboard.removeObjective(collection.id)
          count++;
        }
      }

      if(count == 0) {
        return { text: "Collection not found.", status: "no" };
      } else {
        return { text: `Collection deleted. Number of deleted clusters: ${count}`, status: "ok" };
      }
    
    } else {
      return { text: "The collection name is not a string.", status: "no" };
    } 
  }

  resetCollection(collection: string) {

    if(typeof collection == "string") {
      const collections = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}`)
      let count = 0;
      for(let i = 0; i < collections.length; i++) {
        const collection = collections[i];
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

        return { text: `Collection reseted. Number of reseted clusters: ${count}`, status: "ok" };
      }
    
    } else {
      return { text: "Collection name is not a string.", status: "no" };
    } 

  }

  getCollection(collection: string) {

    if(typeof collection == "string") {
      const collections = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}`);
      const chunks = [];
      for(let i = 0; i < collections.length; i++) { 
        const collection = collections[i];
        if(collection.id.startsWith(id)) {
          chunks.push({
            name: collection.displayName,
            id: collection.id,
            size: collection.getScores().length,
          });
        }
      }
      
      if(chunks.length == 0) {
        return { text: "Collection not found.", status: "no" };
      } else {
        return { text: "Collection found.", status: "ok", json: chunks };
      }

    } else {
      return { text: "The collection name is not a string.", status: "no" };
    }

  }

  getALLCollections() { 
    const collections = world.scoreboard.getObjectives();
    const chunks = [];
    for(let i = 0; i < collections.length; i++) { 
      const collection = collections[i];
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
      return { text: "Collection not found.", status: "no" };
    } else {
      return { text: "Collection found.", status: "ok", json: chunks };
    }
  }

  deleteAllCollections() {
    const collections = world.scoreboard.getObjectives();
    let count = 0;
    for(let i = 0; i < collections.length; i++) {
      const collection = collections[i];
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

  resetAllCollections() {
    const collections = world.scoreboard.getObjectives();
    let count = 0;
    const saves:any = [];
    for(let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      if(collection.id.startsWith(configs.id)) {
        world.scoreboard.removeObjective(collection.id);
        count++;
        if(collection.displayName.endsWith("#1")) {
          saves.push({name: collection.displayName, id: collection.id});
          continue;
        }
      }
    }

    if(saves.length == 0) {
      return { text: "Collection not found.", status: "no" };
    } else {

      for(let i = 0; i < saves.length; i++) {
        const save = saves[i];
        world.scoreboard.addObjective(save.id, save.displayName);
        continue;
      }

      return { text: `All collection reseted. Number of reseted clusters: ${count}`, status: "ok" };
    }
  }
}

class Collection {

  private async chunksCollections() {

    const collections = world.scoreboard.getObjectives();
    for(let i = 0; i < collections.length; i++) { 
      const collection = collections[i];
    }
  }

  collection: string;
  mem: any;
  json: boolean;
  constructor(collection: string, json:boolean) {
    this.collection = collection;
    this.json = json;
  }

  async findAsync() {

    const chunks = [];

  }

  async insertAsync() { 

  }

  async updateAsync() {

  }

  async deleteAsync() {

  }

  async hasAsync() { 

  }

}

class PlayerCollection {

}

export class Base64 {

  #chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

  encode(string: string) {
    let encoded:string = "";
    let padding:string = "";

    for(let i = 0; i < string.length % 3; i++) {
        padding += "=";
        string += "\0";
    }

    for(let i = 0; i < string.length; i += 3) {
        const n = (string.charCodeAt(i) << 16) 
        + (string.charCodeAt(i + 1) << 8)
        + string.charCodeAt(i + 2);

        encoded += this.#chars.charAt((n >>> 18) & 63) 
        + this.#chars.charAt((n >>> 12) & 63) 
        + this.#chars.charAt((n >>> 6) & 63) 
        + this.#chars.charAt(n & 63);
    }

    return encoded.substring(0, encoded.length - padding.length) + padding;
  }

  decode(string: string) {

    let decoded:string = "";
  
    string = string.replace(/=+$/, "");
  
    for(let i = 0; i < string.length; i += 4) {
        const n = (this.#chars.indexOf(string.charAt(i)) << 18) |
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