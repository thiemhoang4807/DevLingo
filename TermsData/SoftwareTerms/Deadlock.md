---
title: "Deadlock"
category: "Software Terms"
imageUrl: "https://tas-dp-prod-media.s3.amazonaws.com/blog/deadlock.jpg"
---

# **Deadlock**

A deadlock is a condition where a **program** cannot access a resource it needs to continue. When an active **application** hits a deadlock, it may "hang" or become unresponsive.

Resources, such as saved or cached **data**, may be locked when accessed by a specific **process** within a program. Locking the data prevents other processes from overwriting the data prematurely. If a process or **query** needs to access locked data, but the process locking the data won't let it go, a deadlock may occur.

For example, the following situation will cause a deadlock between two processes:

* Process 1 requests resource B from process 2.
* Resource B is locked while process 2 is running.
* Process 2 requires resource A from process 1 to finish running.
* Resource A is locked while process 1 is running.

The result is that process 1 and process 2 are waiting for each other to finish. Since neither process can continue until the other one completes, a deadlock is created.

## **Avoiding Deadlocks**

**Developers** can prevent deadlocks by avoiding locking conditions in their programming logic. For example, instead of having two processes rely on each other, the **source code** can be written so that each **thread** finishes before another thread needs its resources. By ensuring data is accessible when needed, programmers can protect their **applications** from hanging or crashing.

---

### **References**
*Christensson, P. (2020, January 18). Deadlock Definition. Retrieved 2026, Apr 29, from https://techterms.com*