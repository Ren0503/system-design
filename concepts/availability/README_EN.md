# Availability: System Design Concept

Many of us may have experienced moments where we could not access certain
applications due to an outage or unavailability. Recently, YouTube faced a global outage
that stopped users from streaming videos for about an hour. You may wonder about the
reason behind it and How one can prevent it from happening? Let’s Find Out.
What is Availability?
Availability is the percentage of time in a given period that a system is available to
perform its task and function under normal conditions. One way to look at is how
resistant a system is to failures. The percentage of availability that a system requires
depends on the business logic or usage of the system. Let us take some examples.
Air Traffic Control systems are among the best examples of systems that require high
availability. In today’s world, where air travel is so complex and busy, a single error in
directing airplanes can lead to catastrophic results. In contrast, a system with few visitors
and not prone to catastrophic failures require slightly lesser available systems. High
Availability comes with a cost, so we have to optimize according to our needs.
How is Availability Measured?
A system’s availability is measured as the percentage of a system’s uptime in a given
time period or by dividing the total uptime by the total uptime and downtime in a given
period of time.

Availability = Uptime ÷ (Uptime + downtime)

The Nine’s of Availability