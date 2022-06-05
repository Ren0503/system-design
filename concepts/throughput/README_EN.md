# Throughput: System Design Concept

You must have seen how the water comes out of a pipe, right! The flow of water may vary,i.e., sometimes the flow might be less and sometimes the flow is large, but there is an upper bound to the maximum flow that could come out of a pipe, and that is its capacity. Throughput is a fundamental concept in Computer Science and communication networks, analogous to water flow in a pipe. In this blog, we’ll be talking about Throughput and its importance in designing any Computer System. Let’s dive in, and let’s get started!

## Throughput meaning in System Design

Throughput is defined as the total number of items processed per unit of time, or we can say Throughput is the rate at which something is produced. It is generally represented as the number of bits transmitted per second or the number of HTTP operations per day. The system’s Throughput is generally obtained by summing up all the items and dividing the sum by the sample interval. It is a standard way of obtaining the Throughput, but it suffers from ignoring the processing speed variations. Let’s take an example to get a clear understanding of how to obtain Throughput :) Suppose an assembly line is manufacturing cars. Let’s consider the factory can able to produce around 100 cars per day. So the Throughput of the line is **Throughput ~ 100 cars/day**.

## Misconceptions with Latency

Latency is defined as the time interval between making a request and beginning to see a result. It is measured in the unit of time. Latency is always misunderstood with Throughput, and it is taken for granted that **High throughput systems should have low latency**. However, this may not always be true. Consider the data processing in association with disks, which tend to have large Throughput but fail to provide low
latency.

Similarly, in networked connections, the latency increases with Throughput. With the increase in Throughput, more and more packets will be there on a wire and contribute to increased latency. It is also possible to have systems with **Low Throughput and Low Latency also**. Hence the combination of Latency and Throughput is best chosen by considering the system and business requirements.

### Factors Affecting Throughput

The Throughput of the system depends on various factors. It depends on underlying analog limitations, the system’s processing power, accessibility of the service, and various hardware components. It also gets affected by the network’s traffic, interference changes, and transmission errors. Throughput also depends upon the protocol overheads as these overhead affects the data transfer rate and limits the system from achieving the maximum desirable Throughput.

### Analog limitations

Analog physical medium has a profound influence on the maximum attainable Throughput of the system. In networked communication, the medium’s analog limitations affect the Throughput by sticking to an upper bound limit on the amount of shareable information.

### Hardware limitations

There is an upper bound to every computing and processing system. This limits the Throughput of the system as computational systems have some finite processing power only. When a large and complicated query requires massive computations, it causes a sound effect on the processing speed and, hence, the system’s Throughput.

### Accessibility

Accessibility to the service also affects the Throughput of the system. When multiple users share a single communication system simultaneously, it may involve sharing the resources and affecting the system’s Throughput. Moreover, accessibility to many customers also increases the traffic in the network, which is also an important factor in decreasing the Throughput.

## Conclusion

Throughput is a very concept related associated with the design of every system. It is a measure of the amount of data transmitted through a channel. Architects always focus on increasing Throughput as much as possible to increase the system’s capacity and performance. In this blog, we tried to cover all the conceptual aspects of Throughput.