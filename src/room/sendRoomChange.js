var sendRoomChange = function(conn, target, username, logger, content, user, rooms)
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

  messageObject.content[target] = "We having nothing in here to really examine."
  logger.debug("HERE BEFORE")
  logger.debug(Object.keys(rooms))
  logger.debug("HERE AFTER")
  if ( content.substr(1, 6) == "ENTER " ) {
	  if(user.loc == "MAIN"){
		  
		  for (room in rooms) {
			  logger.debug(room)
			  if(room == content.substr(7, room.length)){
				user.loc = room;  
			  }
		  }
				
		if(user.loc != "MAIN"){
			messageObject.content[target] = "You enter the " + user.loc + " room. " + rooms[user.loc].description
		}
		else {
			messageObject.content[target] = "You did not give a valid room entry. Please try /ENTER followed by SCIENCE, TECHNOLOGY, ENGINEERING, ART, or MATH to enter a new room."
		}
	  }
	  else if(content.substr(7,4) == 'MAIN'){

	  }	  
	  
	  
	  
  }
  else if(content.substr(1, 4) == "EXIT"){
	  if(user.loc == "MAIN"){
	    messageObject.content[target] = 'You cannot EXIT the MAIN room. You may /ENTER SCIENCE, TECHNOLOGY, ENGINEERING, ART, or MATH to enter the room for each other the STEAM fields. You can leave this text adventure and go to others using the /GO command.  '
	  }
	  else{
		messageObject.content[target] = 'You exit the ' + user.loc + 'room and return to the MAIN room. ' + user.MAIN.description
        user.loc = 'MAIN'		
	  }
	  
  }
  
  var messageToSend = sendMessageType + "," +
            sendTarget + "," +
            JSON.stringify(messageObject)

  conn.sendUTF(messageToSend)
}

module.exports = sendRoomChange;
