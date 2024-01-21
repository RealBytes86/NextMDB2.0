import { world, system } from "@minecraft/server";


world.beforeEvents.chatSend.subscribe( (ctx) => {
  
  let message = ctx.message;

  if(message.startsWith(".")) {
    ctx.cancel = true;
    let command = message.replace(".", "");
    if(command == "test") {
      ctx.sender.sendMessage("Hello World!");
    }
  }
  
})