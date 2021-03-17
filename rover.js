const Command = require('./command.js');
const Message = require('./message.js');

class Rover 
{
   // Write code here!
   constructor(position)
   {
     this.position=position;
     this.mode='NORMAL';
     this.generatorWatts=110;
   }
   receiveMessage(message)
   {
     
     let result=[];
     if(message.commands)
     {
       
      for(let item of message.commands)
      {
        
        if(item.commandType=== "STATUS_CHECK")
        {
          result.push({completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
            }
          });
          
        }
        else if(item.commandType=== "MODE_CHANGE")
        {
          this.mode=item.value;
          result.push({completed: true});
        }
        else if(item.commandType=== "MOVE")
        {
          if(this.mode==="NORMAL")
          {
            this.position=item.value;
            result.push({completed: true});
          }
          else if(this.mode==="LOW_POWER")
          {
            result.push({completed: false});
          }
        }
      }
  }
  return {message: message.name,results: result};
}
   
} 

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);
console.log(response.results);
module.exports = Rover;