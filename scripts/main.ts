import { world, system, ScoreboardObjective } from "@minecraft/server";
import { config } from "./config";
import { Base64, NextMDB } from "./Libs/NextMDB";

const client = new NextMDB();
const base = new Base64();

const data = client.createCollection("Helllo World!");

function startEvents() {

  world.beforeEvents.chatSend.subscribe( (ctx) => {

    let message:string = ctx.message;

    if(message.startsWith(config.prefix)) {
      ctx.cancel = true;
  
      const args:any = message.slice(config.prefix.length).trim().split(/ +/g);
      const commandName:string = args.shift().toLowerCase();
      const scoreboard: ScoreboardObjective | undefined = world.scoreboard.getObjective("Hello");
  
      if(commandName == "test") {
        for(let i: number = 0; i <= 500000; i++) {
          system.run(() => scoreboard?.setScore("PING#" + i.toString(), i))
        }

        ctx.sender.sendMessage("Test Erfolgreich")
  
        return; 
      } else if(commandName == "encode") {
        ctx.sender.sendMessage(base.encode(args.join(" ")));
        return;
      } else if(commandName == "get") {
        const score:number | undefined = scoreboard?.getScore(`PING#${args[0]}`);
        world.sendMessage(`${score}`);
        return;
      }
  
  
      ctx.sender.sendMessage("§7[§6Command§7]§r §c" + commandName + " not exist.");
      return;
  
    }
    
  })
  
}


world.afterEvents.worldInitialize.subscribe(async (ctx) => {


  startEvents();
})