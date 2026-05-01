---
title: "NTP"
category: "Internet Terms"
imageUrl: "https://techterms.com/img/xl/ntp_1380-2.png"
---

# NTP

Stands for "Network Time Protocol." NTP is a **protocol** used to synchronize computer clocks across multiple systems. It supports synchronization over **local area networks** and the **Internet**.

Matching the timestamps of two or more systems may seem like a simple task, but it involves multiple steps. Since all networks have some amount of **latency**, the delay between the request and the response must be taken into account. NTP uses the **client-server model** and calculates the round-trip delay using four values:

1. **client** request timestamp
2. **server** reception timestamp
3. **server** response timestamp
4. **client** reception timestamp

The time between 1 and 2 above is added to the time between 3 and 4 to compute the total round-trip delay. By subtracting half of this delay, it is possible to estimate the exact time on a remote server, usually within a few milliseconds.

Since network conditions can affect the time it takes to transmit or receive NTP **packets**, a single request may not produce an accurate result. Therefore, it is common to make several NTP requests and average the latency to produce a more accurate timestamp. Timestamps may also be averaged across multiple computers to produce a consistent time for all machines on a **network**. When syncing multiple clocks at once, NTP is used as a **peer-to-peer** protocol, in which each system is a time source.

## NTP Examples

The network time protocol is used by several different time-syncing **utilities**, including tools built into **Windows** and **macOS**. In Windows, the Date and Time **Control Panel** includes an "Internet Time" feature that uses NTP to retrieve the current time from a time server. In macOS, the Date & Time **System Preference** uses NTP to retrieve the current time when "Set date and time automatically" is checked. Both Windows and macOS use a simplified version of NTP called Simple Network Time Protocol (SNTP).

---

### **References**
*Christensson, P. (2019, May 20). NTP Definition. Retrieved 2026, Apr 28, from https://techterms.com*