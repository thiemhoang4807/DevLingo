---
title: "Datagram"
category: "Internet Terms"
imageUrl: "https://media.geeksforgeeks.org/wp-content/uploads/20240219171850/User-Datagram-Protocol.webp"
---

# **Datagram**

Datagram is a combination of the words **data** and telegram. Therefore, it is a message containing data that is sent from location to another. A datagram is similar to a **packet**, but does not require confirmation that it has been received. This makes datagrams ideal for **streaming** services, where the constant flow of data is more important than 100% accuracy.

Datagrams are also called "IP datagrams" since they are used by the **Internet protocol** (IP). This protocol defines how information is sent between systems over the Internet. For example, each device connected to the Internet must have an **IP address**, which serves as a unique identifier. Whenever data is transmitted via the Internet protocol, it is broken up into packets or datagrams, which each contain a **header** plus the actual data transmitted.

A datagram header defines the source and destination of the data as well as other information, such as the total length (or size) of the datagram, time to live (**TTL**), and the specific protocol used to transfer the data. Generally, datagrams are sent via the **UDP** protocol, which is used for media streaming and other services that do not require confirmation that the data has been received. Packets, on the other hand, are typically sent via **TCP**, which guarantees all the data sent has been received.

---

### **References**
*Christensson, P. (2016, September 22). Datagram Definition. Retrieved 2026, Apr 28, from https://techterms.com*