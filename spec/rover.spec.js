const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(1001);
    expect(rover.position).toEqual(1001);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message",function(){
    
    let msg=new Message("Second Test");
    let rover=new Rover(2000);
    let response=rover.receiveMessage(msg);
    expect(response.message).toEqual("Second Test");
  });

it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message=new Message("Third Test",commands);
    let rover=new Rover(2000);
    let response=rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
it("responds correctly to status check command",function(){
    let commands = [new Command('STATUS_CHECK')];
    let message=new Message("Fourth Test",commands);
    let rover=new Rover(2000);
    let response=rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(2000);
     });

it("responds correctly to mode change command",function(){
  let rover = new Rover(100);
    let commands = [
       new Command('MODE_CHANGE', 'LOW_POWER'),new Command("STATUS_CHECK")];
       let message = new Message('Test 11,Check Mode Change', commands);
       let response=rover.receiveMessage(message);
       expect(response.results[0].completed).toEqual(true);
       expect(response.results[1].completed).toEqual(true);
       expect(response.results[1].roverStatus.mode).toEqual("LOW_POWER");
       
});
it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
  let rover = new Rover(100);
    let commands = [
       new Command('MODE_CHANGE', 'LOW_POWER'),new Command("MOVE",98382)];
       let message = new Message('Test 12,Check Move Change', commands);
       let response=rover.receiveMessage(message);
       expect(response.results[0].completed).toEqual(true);
       expect(response.results[1].completed).toEqual(false);
       
});
it("responds with position for move command",function(){
  let rover = new Rover(1000);
    let commands = [
       new Command('MOVE', 98732),new Command("STATUS_CHECK")];
       let message = new Message('Test 13,Check Move Change', commands);
       let response=rover.receiveMessage(message);
       expect(response.results[0].completed).toEqual(true);
       expect(response.results[1].completed).toEqual(true);
       expect(response.results[1].roverStatus.position).toEqual(98732);
});
  
});
