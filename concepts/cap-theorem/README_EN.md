# CAP Theorem: System Design Concept

CAP Theorem is one of the important concepts used in Distributed Systems. In this blog, we’ll cover basic concepts related to the CAP theorem and its applicability to various systems.

## What is the CAP Theorem?

CAP Theorem is necessary for designing networked shared data systems. It allows a distributed database system to have only two of these functionalities: Consistency, Availability, and Partition Tolerance. We can make tradeoffs between the three available functionalities based on the unique use case for our system.

## Why is the CAP theorem important?

In a distributed system, we need to store data over multiple nodes and simultaneously need to communicate over the network. Due to massive dependency on network calls, it is prevalent for a distributed system to fall into the trap of network failures. So partition tolerance is essential. In such a case, we need to choose between consistency or availability based on our requirements.

Whenever consistency is preferred over availability, it is challenging for the system to return the most recent writing. It will return an error if specific information cannot be guaranteed to be up to date. Similarly, whenever availability is preferred over consistency, the system will return the most recent available version of the information. So, it is essential to understand the CAP theorem when designing any cloud app or networked system. It becomes convenient to choose a data management system that meets the critical requirements of the system.

Let’s understand the functionalities of all three concepts.

## Consistency in the CAP theorem

Consistency means that everything should go on in a well-coordinated manner and with proper synchronization. It ensures that all clients should see the same data simultaneously, regardless of which node they are connected with. Performing a read operation will return the most recent write operation value, causing all nodes to return the same data. Whenever data is written on the node, it is the node’s utmost responsibility to instantly pass on the data to all other nodes in the system.

## Availability in the CAP theorem 

Availability means that the system is always there and ready whenever any request is made. When any client requests data, it should get a response, even if one or more nodes are down. Hence, to achieve availability in a distributed system, the system must remain operational every time. Every client should get a response, regardless of the state of any individual node in the system.

## Partition Tolerance in the CAP theorem

Partition Tolerance is necessary for a distributed system. So mostly, we always need to choose between availability and consistency. It corresponds to the condition that the system should work irrespective of any breakdown of nodes or delay between nodes. In other words, this condition states that the system should continue running, irrespective of delay and inconsistency. It should sustain any network failure by sufficiently replicating the data records across various possible nodes and networks to prevent the system from any failure.

## CAP theorem Database Architecture

Distributed networks heavily depend on NoSQL databases as they offer horizontal scalability, and they are highly distributed. Hence, they can easily and rapidly scale across a growing network of multiple interconnected nodes. But as discussed above, one can only have two of the three available functionalities. The different combinations and their use cases are discussed below:
- **CP System**: This system focuses more on consistency and partition tolerance. So these systems are not available most of the time. When any issue occurs in the system, it has to shut down the non-consistent node until the partition is resolved, and during that time, it is not available.
- **AP System**: This type of database focuses more on availability and partition tolerance rather than consistency. When any issue occurs in the system, then it will no longer remain in a consistent state. However, all the nodes remain available, and affected nodes might return a previous version of data, and the system will take some time to become consistent.
- **CA System**: This type of database focuses more on consistency and availability across all nodes than partition tolerance. Fault-Tolerance is the basic necessity of any distributed system, and hence it is almost rare to use a CA type of architecture for any practical purpose.

## Use Cases of CAP Theorem

MongoDB is a popular NoSQL database management system that focuses on a CP database style. It resolves network partitions by maintaining consistency while compromising on availability.

Cassandra is also a popular NoSql database that focuses on AP database style. It concentrates entirely on availability and partition tolerance rather than consistency. But Cassandra provides eventual consistency by figuring out all the inconsistencies in a certain period of time.

Microservices-based applications are also heavily dependent on the CAP theorem to design the most efficient databases for the application. For example, if horizontal scalability is essential to the application with eventual consistency, then an AP database like Cassandra can help meet deployment requirements and simplify deployment. On the other hand, if the application depends heavily on data consistency as in a payment service, it would be better to opt for a relational database like PostgreSQL.

## Conclusion

Distributed systems allow us to achieve a relatively higher level of computing power, availability and give the scope of scalability. It is essential to design the systems by considering real-life practical consequences and choosing the most appropriate design suitable for our application. It is a complex architecture that requires effective network management. So it becomes essential to understand the complexity incurred in distributed systems, make the appropriate trade-offs for the task, and select the right tool.