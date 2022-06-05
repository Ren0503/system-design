# Storage and Redundancy

A storage device is a piece of hardware used mostly for data storage. Storage is a mechanism that allows, either temporarily or permanently, a computer to preserve data. A fundamental component of most digital devices is storage devices such as flash drives and hard drives. They allow users to store all kinds of information, such as videos, documents, photographs, and raw data.

**Persistence**: Persistence refers to characteristics of the entity and process that continue to exist even after the process that generated it ceases or is turned off by the computer on which it is operating. When an object or state is created and needs to be persistent, it is saved in a non-volatile storage location, like a hard drive, versus a temporary file or volatile random access memory (RAM).

## Types of Storages

Storage is one of a computer system’s core components and can be categorized into
many types, but there are two primary types:

### Volatile Storage (Memory)

A continuous supply of electricity is required for data storage/retention. It serves as the primary storage of a device for temporarily storing data and managing workloads of applications. Cache memory and random access memory are examples of nonvolatile storage (RAM).

### Non-Volatile Storage

A sort of storage device that preserves digital data even though it is turned off or electrical power is not supplied. This is often referred to as a secondary storage device and is used for I/O operations involving permanent data storage. A hard disc, USB storage, and optical media are examples of volatile storage.

## Redundancy

Redundancy is a concept that implies the replication of a system’s essential components or functions to increase system reliability, typically in the form of a backup or fail-safe, or to enhance actual system performance. The term redundancy is used because if everything is working correctly, the duplicate device or competent does nothing and is redundant.

Redundancy comes into play when we need to prevent a single point of failure (A single point of failure in a system is a point that can lead to the system’s failure). To eliminate any single point of failure, we need to make our system more redundant. Redundancy is the act of duplicating or adding certain parts of our system. Let’s take an example; imagine you have a system consisting of two identical, redundant web servers that are installed behind a load balancer. The traffic coming from clients will be distributed between the web servers, but if one of the servers goes down, the load balancer will redirect all traffic to the remaining server, which is working.

**Passive Redundancy:** When you have multiple components at a given layer in your system, and if at any point, one of them dies, the remaining servers take over and prevent any failure.

**Active Redundancy:** When you have multiple machines that work together, only one or a few of the machines will typically be handling traffic or doing work. If one of them fails, the other machines are going to know somehow and then take over.

## Redundancy vs. Replication

The two words are quite similar at first look, but there is a considerable difference between them. Each of them has something to do with more nodes/components/processes in a system is a common part of the two concepts.
+ **Redundancy** — It explains that you have more than one node/component/process in a system, and it is quite beneficial in managing failovers. Another node in the system will take over and carry on if one of the nodes fails. Redundancy can be:
    - active: all the traffic goes to all nodes at the same time.
    - passive: where one node receives traffic, and in the case of failure, a switch will be made to another node
+ **Replication** — Redundancy is included, but it involves copying data from one node to another or synchronizing the state between nodes. An example of where replication is performed is at the level of databases. Replication can be:
    - **active**: each node receives each message to keep in sync with the rest of the nodes.
    - **passive**: this is the master-slave model, where the master receives all the requests and then forwards them to the slaves.

In short, “Replication is the synchronization of state between redundant nodes” whereas “Redundancy is the duplication of nodes, in case of some of them are failing.”

> “Replication ensures Consistency while Redundancy increases reliability.”