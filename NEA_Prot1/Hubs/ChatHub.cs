using Microsoft.AspNetCore.SignalR;


namespace NEA_Prot1.Hubs
{
	public class ChatHub : Hub  
		// this is another hub but specifically with chat 
	{

		public async Task SendMessage (string user, string message) // a client can call this procedure to send the message, passing the parameters 
		{
			Clients.All.SendAsync("ReceiveMessage", user, message);
			// the collection of all the clients that are connected to the Chat hub 
			// broadcasting to all the clents 
			// We called SendMessage from the Client, and now Hub is going to call a remote client method, so that method is ReceiveMessage
			// SendAsync then accepts multiple arguments, as user and the message for hub to do something with those on the client side 


		}
	}
}
