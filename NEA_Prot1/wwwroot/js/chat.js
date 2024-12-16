"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
// declare an initial connection to our chat hub  
// as we load the page we connect to the hub 

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) { // create an even handler for ReceiveMessage
    // and passing the user and message
    // this is how we want the client side to respond to the received message 

    var li = document.createElement("li"); // create a list item 
    document.getElementById("messagesList").appendChild(li);
    // refernce to the message list object in the dom (in the html file ) and then append the child to it
    // we are just appending the items (messages) to that bullet list in html

    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you
    // should be aware of possible script injection concerns.

    li.textContent = `${user} says ${message}`;
    // add the items as the bullet point in a form of "user says message"
});


// start of the connection 
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false; // enable the "send message" button for better security 
}).catch(function (err) { // if anything goes wrong - return an error 
    return console.error(err.toString()); // we can go to the Developer Tools and see what specifically happened 
});


// to wire up the "Send" button to actually send messages 
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) { // will ask what method on the hub to invoke 
        // we want to invoke the "SendMessage" with the user and message 
        return console.error(err.toString());
    });
    event.preventDefault();
});
