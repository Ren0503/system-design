# Long Polling in System Design

Whenever we build any Web Application dealing with real-time data, we need to consider delivering data to the Client. While building such a Web Application type, one needs to consider the best delivery mechanism, right! In this blog, we are focusing on long Polling, and here, we will give you a complete insight into its internal working and the underlying features. So Let’s dive in and get started :)

## What is Long Polling?

Let’s first look at what polling is and how it extends to Long polling. Polling is a technique that allows the servers to push information to a client. Long polling is a version of traditional polling that allows the server to send data to a client whenever available. It involves the Client requesting information from the server in the same way that standard polling does, but with the caveat that the server may not respond right away. A complete answer is delivered to the Client once the data is accessible.

Long polling reduces the number of HTTP requests required to send the same amount of information to the Client. However, the server must “hold” unfulfilled client requests and deal with the situation in which it receives new information to deliver, but the Client has not yet issued a new request. Long polling has the advantage of being part of the HTTP protocol, which means it’s widely accepted, and it generates less bandwidth than short polling because it requires fewer queries. Overall, it is a reliable method for continuously updating clients with new information straightforwardly.

The following is the basic life cycle of an application that uses HTTP Long-Polling:
1. The Client sends an HTTP request and then waits for a response.
2. When an update is available, the server provides the Client a complete response.
3. After getting a response, the Client typically sends a new long-poll request, either immediately or after a pause, to allow for an appropriate latency duration.
4. A timeout is set for each Long-Poll request. After a connection is lost owing to timeouts, the Client must rejoin regularly.

## How does long polling work?

Long polling is a more efficient version of the basic polling method. Repeated requests to the server waste resources since each new incoming connection requires establishing a new connection, the parsing of HTTP headers, a new data query, and the generation and delivery of a response. After that, the connection must be ended, and any resources must be cleaned up. Long polling is a strategy in which the server chooses to keep a client’s connection open for as long as feasible, only responding when data becomes available or a timeout threshold is reached, rather than having to repeat the procedure for each client until new data becomes available.

In Long polling, the majority of the work is done on the server. Only one request to the server needs to be managed on the client-side. When the Client receives the response, he or she can make a new request, repeating the process as needed. The only difference between basic polling and essential polling from the Client’s perspective is that a client performing basic polling may intentionally leave a small time window between each request to reduce server load. It may respond to timeouts differently than a server that does not support long polling.

For example, with long polling, the Client may be configured to allow for a longer timeout duration when listening for a response, which is typically avoided because the timeout period is used to identify communication issues with the server.

Apart from these considerations, there isn’t much else a client needs to accomplish that isn’t already covered by basic polling. The server, on the other hand, must handle the state of several unresolved connections. When several servers and load balancers are employed, it may be necessary to create solutions for preserving the session state. It must also gracefully handle connection timeout difficulties, which are far more common than with purpose-built protocols.

## Considerations when using long-polling

As long polling is just an improvisation applied to an underlying request-response mechanism, it comes with an additional degree of complexity in its implementation. As a result, there are various concerns you’ll need to account for when using HTTP longpolling to build real-time interactivity in your application, both developing and scaling.
- As usage grows, how will you orchestrate your real-time backend?
- Does long polling automatically re-establish connections when mobile devices rapidly switch between WiFi and cellular networks or lose connections and the IP address changes?
- With long polling, can you manage the message queue and catch up on missed messages?
- Does long polling provide load balancing or failover support across multiple servers?

When building a real-time application with HTTP long polling for server push, you’ll have to develop your communication management system. This means that you’ll be responsible for updating, maintaining, and scaling your backend infrastructure.

## Challenges in long polling

1. Message ordering and delivery
2. There is a chance that the communication will be lost if the Client was unable to receive it.
3. If the same Client establishes several connections to the server, message ordering cannot be guaranteed.
4. Performance and scaling
5. Device support and fallbacks.

## Conclusion

Long polling helps provide frequent updates. It involves the Client requesting information from the server in the same way that regular polling does but understanding that the server may not respond immediately. Instead of returning an empty response if the server has no new information for the Client when the poll is received, the server keeps the request open and waits for response information to become available. The server provides an HTTP/S response to the Client as soon as it receives new information, completing the open HTTP/S request. The Client frequently issues another server request after receiving the response from the server.

In this way, the usual response latency associated with polling clients is eliminated and as a result, it is heavily used in various applications. Hence, in this blog, a very generic understanding of long Polling is presented. I hope you liked it.

