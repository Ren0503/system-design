# Availability: System Design Concept

Many of us may have experienced moments where we could not access certain applications due to an outage or unavailability. Recently, YouTube faced a global outage that stopped users from streaming videos for about an hour. You may wonder about the reason behind it and How one can prevent it from happening? Let’s Find Out.

## What is Availability?

Availability is the percentage of time in a given period that a system is available to perform its task and function under normal conditions. One way to look at is how resistant a system is to failures. The percentage of availability that a system requires depends on the business logic or usage of the system. Let us take some examples. 

Air Traffic Control systems are among the best examples of systems that require high availability. In today’s world, where air travel is so complex and busy, a single error in directing airplanes can lead to catastrophic results. In contrast, a system with few visitors and not prone to catastrophic failures require slightly lesser available systems. High Availability comes with a cost, so we have to optimize according to our needs.

## How is Availability Measured?

A system’s availability is measured as the percentage of a system’s uptime in a given time period or by dividing the total uptime by the total uptime and downtime in a given period of time.

Availability = Uptime ÷ (Uptime + downtime)

### The Nine’s of Availability

Availability can also be expressed in terms of Nines. In high-demand applications, we usually measure availability in terms of Nines rather than percentages. If availability is 99.00 percent available, it is said to have “2 nines” of availability, and if it is 99.9 percent, it is called “3 nines,” and so on. A system with 5 nines (i.e., 99.999%) of availability is said to have a Gold Standard of Availability. Let's take a look at different Nines of Availability.

![](./assets/availability-system-design-concept-cover.svg)

## How do we achieve High Availability?

High Availability comes with its own tradeoffs, such as higher latency or lower throughput, and achieving high availability is very difficult. To make highly available systems, we need to make sure that the system does not have any **single point of failure**. So, How do we eliminate a single point of failure in a system? To eliminate any single point of failure, we need to make our system more redundant. 

Redundancy is the act of duplicating or adding certain parts of our system. Let's take an example; imagine you have a system consisting of two identical web servers that are installed behind a load balancer. The traffic coming from clients will be distributed between the web servers, but if one of the servers goes down, the load balancer will redirect all traffic to the remaining server, which is working.

![](./assets/single-point-of-failure.png)

Now that we have made our servers redundant and prone to failure as the load balancer can detect the failure and respond accordingly. But, in this scenario, the load balancing layer itself remains the single point of failure. To avoid this, a simple way out is to make the load balancing layer redundant. An essential thing to note here is that redundancy alone cannot ensure high availability. A device also needs mechanisms for detecting failures. It is also important to be able to perform high-availability testing and to be able to take corrective action any time one of the stack’s components becomes unavailable. 

Top-to-bottom or distributed highavailability approaches may include both work and hardware, or software-based downtime reduction techniques are also successful. Redundancy is a hardware-based approach. The implementation of high availability techniques, on the other hand, almost always requires software.
- **Passive Redundancy**: When you have multiple components at a given layer in your system, and if at any point, one of them dies, the remaining servers take over and prevent any failure.
- **Active Redundancy**: When you have multiple machines that work together, only one or a few of the machines will typically be handling traffic or doing work. If one of them fails, the other machines are going to know somehow and then take over.

## Difference Between High Availability and Fault Tolerance

Both high availability and fault tolerance apply to methods for providing high uptime levels. Fault-tolerant and high availability methods, however, accomplish the objective differently.

Fault-tolerant computing requires full hardware redundancy. To achieve fault tolerance, several systems run in parallel, mirroring programs identically and executing instructions together. If the main system fails, with no loss in uptime, another system can take charge.

It would be best if you had advanced hardware to achieve fault-tolerant computing. It must be able to detect component faults immediately and allow the various systems to operate in conjunction.

This form of machine preserves the programs’ memory and records, a major advantage. However, it may take longer for networks and devices that are more complicated to respond to malfunctions. In comparison, technical issues that cause crashing systems may also cause a similar breakdown of redundant systems running parallel, creating a system-wide failure. 

A high-value strategy instead uses a software-based approach to minimize server downtime rather than a hardware-based approach. A high-display cluster finds a collection of servers together instead of using physical hardware to achieve maximum redundancy.
