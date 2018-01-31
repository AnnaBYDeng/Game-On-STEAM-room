var sendScience = function(conn, target, username, logger, content, user)
{
  logger.debug("Target \"" + target + "\" asked for examination.")
  var sendTarget = target
  var sendMessageType = "player"
  var messageObject = {
    type: "event",
    bookmark: 2223,
    content: {
    }
  }
  var fuelTypes = []
  
  fuelTypes['PAPER'] =  []
  fuelTypes['PAPER'].grabDescr = "You pick up a stack of fresh PAPER. It looks perfect for burning... why not IGNITE it quick..."
  fuelTypes['PAPER'].igniteDescr = "You ignite the PAPER. It burns quickly and bright... this does not look like a sustainable fuel source for our engine... try again!"
  fuelTypes['WOOD'] =  []
  fuelTypes['WOOD'].grabDescr = "You pick up a pile of WOOD. It looks nice and dry... this should burn nicely... are you thinking you should IGNITE it?"  
  fuelTypes['WOOD'].igniteDescr = "You ignite the WOOD. It starts to burn. You observe that it burns consistently and for awhile but does not produce a lot of heat. You also note that it burns much faster at higher temperatures... it appears to be a decent fuel source, but it does not seem like it will work to sustain an engine still... hmm what could?"
  fuelTypes['GAS'] =  []
  fuelTypes['GAS'].grabDescr = "You pick up a can of GAS marked flammable. I can not imagine why they would mark it like that... should we see how flammable it truly is? IGNITE it!"
  fuelTypes['GAS'].igniteDescr = "You ignite the GAS. It burns fast and bright. It seems like it would need to be contained and controlled... Although it seems like a feasible fuel source, our engine does not seem to be designed for this type of fuel either... I wonder what else we could use?"
  fuelTypes['COAL'] =  []
  fuelTypes['COAL'].grabDescr = "You pick up a lump of COAL. The only time you are happy to find a lump of COAL...  have you been naughty or nice this year... I would bet you are about to be naughty and IGNITE it!"
  fuelTypes['COAL'].igniteDescr = "You ignite the COAL. It burns sustainability and seems to produce a lot of heat. This could be used to boil water for a STEAM engine... Maybe a big pile of it could be used for sustained travel... GREAT JOB! You have solved the Science room and now have the fuel source for your engine!"

  logger.debug("HERE BEFORE")
  if ( content.substr(1, 5) == "GRAB " ) {
      // error message set by default for grab. If the user enters a valid command, it will be overridden. Otherwise, it will be sent. 
      messageObject.content[target] = "What you asked to grab is not something that is in the room... why don't you /EXAMINE again and see what types of fuel are around.";
	  
	  for (fuel in fuelTypes) {
		  if(content.substr(6, fuel.length) == user.items['Fuel']){
			 messageObject.content[target] = "You are already holding " + user.items['Fuel'] + " try to GRAB another fuel source or IGNITE this one."
	   
		  }
		  else if(content.substr(6, fuel.length) == fuel){
			 messageObject.content[target] = fuelTypes[fuel].grabDescr;
		     user.items['Fuel'] = fuel;
		  }
		  
		  
	  }
	  
  }
  if ( content.substr(1, 6) == "IGNITE" ) {
	  if(user.items['Fuel'] == 'NONE'){
		 messageObject.content[target] = "You have nothing to ignite... miraculously nothing happens... try to GRAB some fuel first..."
	  }
	  else if(user.items['Fuel'] == 'PAPER'){
		 messageObject.content[target] = "You ignite the PAPER. It burns quickly and bright... this does not look like a sustainable fuel source for our engine... try again!" 
		 user.items['Fuel'] = 'NONE'
	  }
	  else if(user.items['Fuel'] == 'WOOD'){
	     messageObject.content[target] = "You ignite the WOOD. It starts to burn. You observe that it burns consistently and for awhile but does not produce a lot of heat. You also note that it burns much faster at higher temperatures... it appears to be a decent fuel source, but it does not seem like it will work to sustain an engine still... hmm what could?"		 
		 user.items['Fuel'] = 'NONE'
	  }
	  else if(user.items['Fuel'] == 'GAS'){
		 messageObject.content[target] = "You ignite the GAS. It burns fast and bright. It seems like it would need to be contained and controlled... Although it seems like a feasible fuel source, our engine does not seem to be designed for this type of fuel either... I wonder what else we could use?" 
	     user.items['Fuel'] = 'NONE'
	  }
	  else if(user.items['Fuel'] == 'COAL'){
		 messageObject.content[target] = "You ignite the COAL. It seems to be sustainable and produces a lot of heat. This could be used to boil water for a STEAM engine... Maybe a big pile of it could be used for sustained travel... GREAT JOB! You have solved the Science room and now have the fuel source for your engine!" 
		 user.items['Fuel'] = 'NONE'
		 user.MAIN['S'] = 'S'
		 user.updateMain = 1
	  }
  
  }
	
	  
	  
  logger.debug("HERE AFTER")
  
  var messageToSend = sendMessageType + "," +
            sendTarget + "," +
            JSON.stringify(messageObject)

  conn.sendUTF(messageToSend)
}

module.exports = sendScience;
