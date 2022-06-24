# System Design Concepts for Interview Preparation

![](./assets/background.svg)

System design is one of the essential topics that large tech companies ask about during the interview process. On the other hand, it is also necessary for solving large-scale software problems.

After reading this blog, you will get familiar with the basic concept related to system design. Developing a good understanding of these topics helps you explore the system design at an advanced level and solve problems.

## What is System Design?

System design deals with designing a system that meets functional and business requirements. While designing systems, one needs to consider various trade-offs and choose between complexity vs. the system's performance.
- Understanding the most common principles, key features, and shortcomings is essential for making well-informed decisions.
- It would be best to have an excellent conceptual understanding of all the essential terms encountered in system design. We need to know about the concept of scalability (horizontal & vertical), caching, load balancing, data partitioning, databases, networks, protocols, sharding, and many more.

Similarly, we need to consider many tradeoffs while considering the core functionality of the application that we are designing. As per our requirements, we need to decide upon: latency vs. throughput, performance vs. scalability, consistency vs. availability, etc.

Overall, system design is an open-ended discussion topic. That's why most top tech firms prefer to have one or two system design interview rounds. So let’s dive in to get familiar with the essential topics or concepts used in system design.

![](./assets/concepts.jpeg)

## [Availability](./availability/)

**Availability** is one way of ensuring the reliability of the system. It means the system should always remain up and return the response when any client fetches it for any operation. Whenever any user seeks the service, it remains available, and it must satisfy the user query.

Availability can be quantified by measuring the percentage of time the system’s services and functionalities remain operational in a given time window. We usually define the "availability percentages" for systems by the number of 9s of availability, as shown in the following table:

![](./assets/availability.jpeg)

Availability of the service is generally increased by redundancy. Replication is used to offer redundancy by deploying a copy of the same server so that if one server goes down, it won’t affect the availability of the service.

## [Throughput](./throughput/)

**Throughput** is the maximum rate of transfer or capacity of the system. It is used as a metric to determine how much work the system can do in a given time frame. The throughput of the system can be increased by scaling the system. One more promising way to increase the Throughput of the System is by splitting up the requests and distributing them to various resources.

## [Proxies](./proxies/)

**Proxy** is a middle-man that sits between the client and server. When a client sends a request, it passes through the proxy and then reaches the server. Proxies are of two types: Forward Proxy and Reverse Proxy.

The forward proxy acts as a mask for clients and hides the client’s identity from the server, e.g., VPN. Similarly, Reverse Proxy acts as a mask for servers and hides the server’s identity from the response comes, e.g., Load Balancer

## [Latency](./latency/)

**Latency** is a measure of the time duration to produce the result. Latency is the time to spend or lags in generating the desired output. Latency is the measure of the speed of the system. Lower the Latency, the higher the speed of the system.

## [Network & Protocols](./network-protocols/)

Almost every system has an extreme dependency on the networks. **Networks** act as a platform for communications between user and server or among different servers. In contrast, **Protocols** are the set of rules that governs how the servers or machines communicate over the network. Some of the most common network Protocols are HTTP, TCP/IP, etc.

![](./assets/protocols.jpeg)

## Databases

Databases are used for storage. Every system is associated with some amount of data that needs to be stored somewhere so that when required, that can be fetched easily, and hence databases are used. Databases are broadly classified into Relational and NonRelational Databases.

**Relational Databases** are those that strictly enforce a strong relationship among the data. Relational Databases are highly structured in nature. Example: MySQL, PostgreSQL, etc

**Non Relational Databases** have flexible structures, i.e., they are less rigid. Data is stored in an unstructured way, and these databases are generally used in services that require high speed and are distributed in nature. Example: Cassandra, Redis, etc 

**Database Partition** is another critical concept used to improve the Latency and throughput of the service so that more and more requests can be entertained. Sharding is the way of dividing the database into smaller chunks to increase the performance of the service.

![](./assets/database.png)

## ACID vs BASE

Relational Databases and Non-Relational Databases ensure different types of compliance. Relational Databases are associated with ACID, while Non-Relational associated with BASE compliance.

### ACID: Atomicity, Consistency, Isolation, Durability

ACID compliance ensures the relational nature of the databases and ensures the transaction happens in a guided manner. The transaction is an interaction with the databases.

- **Atomicity** comprises one or more operations and ensures that if any of these operations fail, then the entire transaction fails. It’s like “All or Nothing,” which is vital in the case of transactions.
- **Consistency** ensures that each transaction must be valid according to a given set of rules. Whenever database states change, it won’t corrupt the data, and transactions move from one valid state to another.
- **Isolation** means that all the transactions are occurring independently without affecting other transactions. This ensures concurrency in database operations.
- **Durability** ensures that whatever is written in the databases remains there, i.e., ensuring the databases’ persistence.

### BASE: Basically Available Soft State Eventual Consistency

BASE compliancy maintains the integrity of No-SQL databases and ensures the proper functioning of the NO-SQL databases, and is the main reason to build the No-SQL databases’ scalability.

- **Basically Available** ensures that the system should remain available and guarantees its availability.
- **Soft state** gives flexibility to the system and allows the system to change over time to ensure faster access.
- **Eventual Consistency** ensures that the system takes some time to reach a consistent state and eventually become consistent.

## [SQL vs NoSQL](./sql-vs-nosql/)

While designing any application, one needs to be clear about the type of storage according to the system requirements. If the system is distributed in nature and speed, the system’s scalability is essential, then No-SQL databases are the best choice to go with. No-SQL databases are also preferred when the amount of data is huge.

Simultaneously, SQL databases are favorable when the data structure is more important and generally preferred when complex queries and databases require fewer updates. However, there is always a trade-off while choosing between No-SQL vs. SQL database.

Hence sometimes, according to business, a Polyglot architecture comprising of both SQL and No-SQL databases is used to ensure the performance of the application.

## Scaling

Whenever your services grow, and more and more requests come to the system, then, in that case, your service will become slow and hence affect the performance. The best way to mitigate this is by scaling, i.e., increasing the potential of the system. There are two ways of doing so: Horizontal Scaling and Vertical Scaling.

Horizontal Scaling means scaling the service by adding more servers to your applications to distribute the requests. Similarly, Vertical Scaling corresponds to increasing the same machine’s power or capacity by upgrading it to handle more and more traffic.

## [Caching](./caching/)

Caching ensures the performance of the system and helps in reducing the Latency of the System. To make our application faster, it is convenient to store some of the frequently used data to be accessed in a lesser time to ensure the system’s speed. A cache is used to store these certain data pieces, so instead of querying the database, the data can be easily fetched from the cache. However, with the addition of cache, the system's complexity increases. It is of utmost necessity to maintain synchronization between the data stored in the disk and the cache so that the system should remain consistent.

Moreover, cache memory is too expensive; then, one can’t have a cache beyond a specific limit. Hence various data eviction algorithms like LIFO, FIFO, LRU, LFU, etc., are used to ensure the service’s performance.

## [Distributed System](./distributed-system/)

A distributed system collects many independent machines that work together by coordinating with each other to achieve a common goal. Distributed Systems work in such a manner that it appears as a single entity to the outside user. Distributed systems operate concurrently and are highly scalable. Nowadays Distributed System is a necessity and almost every application relied on distributed computing. Distributed Systems are highly scalable, reliable, and offer low latency services.

## [Consistent-Hashing](./consistent-hashing/)

Consistent Hashing is the most widely used concept in a distributed system as it offers considerable flexibility in the Scaling of the application. Consistent hashing is an improvement over normal Hashing. The traditional hashing method is ineffective in handling requests over a network. Here, inconsistent hashing, the user and servers are located virtually in a circular ring structure called the Hash ring. The ring is considered infinite and can accommodate any number of servers irrespective of no fixed allocation and assign them random locations based on some hash function. This concept allows the distribution of requests or data in the servers and their mapping to servers efficiently. It helps in achieving Horizontal Scaling and increases the throughput and Latency of the application.

## [CAP Theorem](./cap-theorem/)

CAP Theorem is one of the essential concepts necessary for designing networked shared data systems. CAP Theorem is an essential concept that helps make trade-offs between the three available functionalities, based on the unique use case that we need for our system:
- **Consistency**: Consistency means that everything should go on in a very wellcoordinated manner and with proper synchronization. Consistency ensures that the system should remain consistent and return the results such that any read operation should give the most frequent write operation.
- **Availability**: Availability means that the system is always there and ready whenever any request is made to it. Whenever any client requests the server for the result, the system should remain available and give the response irrespective of the failure of one or more nodes. Replication is used to ensure redundancy, which directs contributes to the availability of the system.
- **Partition Tolerance**: Partition Tolerance is necessary for any distributed system; we always need to choose between availability and Consistency. Partition Tolerance corresponds to the condition that the system should work irrespective of any harm or breakdown of nodes. Due to massive dependency on-network calls, it is prevalent for a distributed system to fall into the trap of network failures; hence partition tolerance is essential. So, in that case, we have to choose judiciously between Consistency or availability as per our requirement.

## [Load Balancer](./load-balancers/)

Load Balancers are machines that balance the load among various servers. With Scaling, more and more servers are added to the system, and hence there must be a way to direct the requests to these servers in such a manner, so there is no heavy load on one server to prevent it from failure. Hence to deal with this, Load Balancers are used.
- Load Balancers distribute the traffic, prevent the service from breakdown, and contribute to maintaining the service’s reliability.
- Load Balancers act as traffic managers and help maintain the service's throughput and availability.

## Conclusion

System Design is an essential skill to have and is equally important from the interview point of view at most top tech companies. One needs to be well aware of all the tradeoffs while designing any system. In this blog, We tried to cover all the basic concepts necessary for getting started. We hope that after reading this blog, you’ll be now familiar with the basics of systems.
