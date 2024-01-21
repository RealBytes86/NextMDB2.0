import { world, system } from "@minecraft/server";
import { config } from "./config";
import { Base64, NextMDB } from "./Libs/NextMDB";

const client = new NextMDB();
const base = new Base64();
const data = client.createCollection("Helllo World!");
console.warn(data.text)

function startEvents() {

  world.beforeEvents.chatSend.subscribe( (ctx) => {

    let message:string = ctx.message;

    if(message.startsWith(config.prefix)) {
      ctx.cancel = true;
  
      const args:any = message.slice(config.prefix.length).trim().split(/ +/g);
      const commandName:string = args.shift().toLowerCase();
  
      if(commandName == "test") {
        ctx.sender.sendMessage("Test Erfolgreich");
  
        return; 
      } else if(commandName == "encode") {
        ctx.sender.sendMessage(base.encode(args.join(" ")));
        return;
      }
  
  
      ctx.sender.sendMessage("§7[§6Command§7]§r §c" + commandName + " not exist.");
      return;
  
    }
    
  })
  
}


world.afterEvents.worldInitialize.subscribe((ctx) => {
  startEvents();
})