import { world, system, ScoreboardObjective } from "@minecraft/server";
import { config } from "./config";
import { Base64, NextMDB } from "./Libs/NextMDB";

const client = new NextMDB();
const base = new Base64();

const database = client.Collection("database");

function startEvents() {

  world.beforeEvents.chatSend.subscribe( async (ctx) => {

    let message:string = ctx.message;

    if(message.startsWith(config.prefix)) {
      ctx.cancel = true;
  
      const args:any = message.slice(config.prefix.length).trim().split(/ +/g);
      const commandName:string = args.shift().toLowerCase();

      if(commandName == "test") {
        for(let i:number = 0; i <= 5000; i++) {
          await database.insertAsync(i.toString(), {id: i});
        }
        return; 
      } else if(commandName == "encode") {
        ctx.sender.sendMessage(base.encode(args.join(" ")));
        return;
      } else if(commandName == "get") {
        return;
      }
  
  
      ctx.sender.sendMessage("§7[§6Command§7]§r §c" + commandName + " not exist.");
      return;
  
    }
    
  })
  
}


world.afterEvents.worldInitialize.subscribe(async (ctx) => {
  await client.deleteCollection("database").then((response) => {
    console.warn(response.text)
  })
  await client.createCollection("database");

  startEvents();
})