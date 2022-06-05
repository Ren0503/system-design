# Server Sent Events: System Design Concept

Whenever we build any web application dealing with real-time data, we need to consider delivering data to the Client. While making such a web application, one needs to think about what delivery mechanism would be best, right! We are presenting a series of three concept blogs focusing on data transfer between clients and servers.
- Web Sockets
- Server-Sent Events
- Long Polling
This blog will give you an insight into the internal working of Server-Sent Events and the underlying features. So Let’s dive in and get started :)

## What are the Server-Sent Events?

There are two general approaches for data delivery from servers to the Client. Suppose we are dealing with a web application, in which our web browser is the Client. When the browser asks for data from the Server, it is called Client Pull; similarly, when the Server keeps on pushing updates to the browser, it is called Server Push. Server-Sent Events is a Server Push technology that aims to establish a long persistent connection between the Client and the Server. It enables a server to automatically send updates to a client via an HTTP connection without making an initial request. They open a single directional channel between Client and Server for data delivery. 

**Server-Sent Events rely on Javascript API** named EventSource for continuously updating the Client. They are designed to enhance the native cross-browser streaming by establishing a unidirectional connection to send updates and continuous data streams to the Client.

## How Server-Sent Events Work?

Before getting into Server-Sent Events’ working details, let’s understand the basic understanding of how communication happens over the internet by focusing on HTTP requests. HTTP is used as the most common way for data transfer in client-server based architecture to deal with this issue, right!

To mitigate this, the Client tries to reconnect to an event source by sending the ID of the last event as HTTP header “Last-Event-ID” to the Server via a new HTTP request. The Server listens to this and again start sending events that have happened since the supplied ID.

**Let’s look into the internal architecture of Server-Sent Events.**

Server-Sent Events are real-time events that are emitted by the Server and received by the browser. In Server-Sent Events, the Client initiates the communications between Client and Server by creating a new JavaScript EventSource object. It passes the endpoint’s URL, which is expected to return a stream of events. The EventSource interface connects to a server over HTTP and receives events from the Server in eventstream or text format. The Client sends a regular HTTP request to the Server and expects a series of event messages from the Server. Whenever the Server writes an event to the HTTP response, the Client receives it and processes it in a listener callback function. The HTTP response connection remains open until it can be considered stale or until the Client closes it. The messages/events transmitted in Server-Sent Events are formatted according to the Server-Sent Events standard. Each event consists of key/value pairs separated by a set of the colon, with each pair terminated by a newline, while two newlines terminate the events.
Let’s look at how Client and Server are implemented in SSE

### Client-Side Implementation

As explained earlier, the Client creates a new EventSource object for receiving the events from the Server. EventSource takes a URL from where the events have to be drawn as “text/event-stream.”

The Client receives the events and processes them in a listener callback function. Callback functions are event handlers, which are registered to handle events. A method named addEventListener of the EventSource object is used to register these handlers. Suppose in the original event message, multiple data lines existed. In that case, these all will be concatenated together by the browser to form one string, and then only the callback functions are called. However, there is a limit to the SSE connections that one can have at any instant. Each browser is limited to only six SSE connections.

### Server-Side Implementation

As compared to Client Side Implementation, the server-side can be coded in any language like Java, C, Python, Go, etc., while Client-Side has relied on JavaScript. The Server received an HTTP request from the Client and responded with valid Server Sent Event messages. The Server instructs the Client about the content type and guides the Client to keep the connection alive so that the events can be easily sent over the same established connection.

The Server can only accept EventSource requests, and at the same time, it needs to maintain a list of all the connected users for emitting new stream events. Server also has to maintain a history of messages so that it would be easy to catch up with the missed messages. Servers should also be able to remove the dropped connections from the connected user’s list.

### Stopping an Event Stream

Once the requirement is fulfilled, it is necessary to close the connection and stop the event stream. Depending on the Client and Server, there are two ways to stop an event stream.
- **Client-Side**: The Client has the facility to stop the events using the .close() method of the EventSource object. When this method is called, the Server detects this and stops sending events to the Client by closing the corresponding HTTP response.
- **Server Side**: The Server can also stop the event stream by sending a final event with a unique ID which corresponds to the “end of stream” event. Or the Server can also stop the event stream by closing the HTTP response connection with the Client.

Hence in this manner, both Client and Server have the authenticity of closing the connection and stop the event streams.
### Connection Failure 

In the real world, nothing can be fully persistent. In Server Side Events, the connection is established via HTTP, and the connection may probably get dropped out due to the network inconsistency. This may affect the event transfer and sometimes even results in an incomplete event message. Hence there must be some mechanism to deal with this issue, right! 

To mitigate this, the Client tries to reconnect to an event source by sending the ID of the last event as HTTP header “Last-Event-ID” to the Server via a new HTTP request. The Server listens to this and again start sending events that have happened since the supplied ID.

## Applications of Server-Sent Events

Server-Sent Events are highly used in building real-time web applications. They are also used in building real-time notification service, which is used in almost all applications to notify users or admins. Tech giants such as Uber also relied on Server-Sent Events for refreshing the trip updates both for driver and customer. An Uber trip is a coordinated movement in the physical environment between participants such as riders and drivers. As the voyage progresses, these two entities must keep up with backend systems and each other.

Consider the following scenario: a rider has requested a ride, and a driver is available to give the service. Uber’s matching technology finds a match in the backend and sends a trip offer to a driver. Everyone (rider, driver, and backend) should now be aware of each other’s intentions. Every few seconds, the driver app can poll the server to see if a new offer is available. Likewise, a rider app can also poll the server every few seconds to see if a driver has been assigned.

## Conclusion

Server-Sent Events are beneficial for delivering fast updates. As compared to other alternatives, there is no overhead in its implementation. Server-Sent Events are highly applicable in systems where there is a need for real-time unidirectional data flows. SSEs are highly used in the News Feed of Twitter, Instagram, or Facebook. They are instrumental in updating the stock price chart and in the live sports update system. In this blog, we tried to cover all the aspects of SSE in a more straightforward manner. Hope you all liked it. Please do share your views in the comments below :)