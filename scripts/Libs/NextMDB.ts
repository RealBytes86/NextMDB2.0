import { world } from "@minecraft/server";

const configs = {
  name: "NextMDB:",
  id: "TmV4dE1EQjo="
}

export class NextMDB {

  #base64 = new Base64();

  Collection(collection: string) {

  }

  createCollection(collection: string) {
    if(typeof collection == "string") {
      const collections:any = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}`)
      const name:string = `${configs.name}${collection}`; 
      for(let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        if(collection.id == id) {
          world.scoreboard.addObjective(id, name);
          return { text: "Collection created.", status: "ok" };
        }
      }
      return { text: "Collection exists.", status: "no" };

    } else {
      return { text: "Collection name is not a string.", status: "no" };
    } 
    
  }

  existsCollection(collection: string) {
    if(typeof collection == "string") {
      const collections:any = world.scoreboard.getObjectives();
      const id:string = this.#base64.encode(`${configs.name}${collection}`)
      const name:string = `${configs.name}${collection}`; 
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

  }

  resetCollection(collection: string) { 

  }

  getCollection(collection: string) {

  }

  getALLCollection() { 

  }

  resetAllCollection() {
    
  }
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