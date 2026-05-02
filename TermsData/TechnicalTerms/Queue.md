---
title: "Queue"
category: "Technical Terms"
imageUrl: "https://techterms.com/img/xl/queue_224.png"
---

# Queue

A queue is a list of tasks waiting to be processed. After new tasks join a queue, they wait their turn as the system processes other tasks that are were there first or are of a higher priority. Computer hardware and software applications use queues to know which data to process or transmit next after completing the previous task.

Most job queues execute tasks in the same order that they were added, known as First In, First Out (FIFO). However, some tasks benefit from other ordering methods. The Last In, First Out (LIFO) method prioritizes the most recently added task instead of the oldest one. Priority scheduling assigns each task a priority level using pre-determined criteria — for example, the task with the earliest deadline or the task that requires the least processing time — and processes the job with the highest priority first.

Every operating system includes a software component, known as a task scheduler, which creates a queue of processes when several programs are running simultaneously. The task scheduler gives the process at the front of the queue CPU time to execute its instructions; when one task finishes, it is removed from the queue so that the next one in line has its turn. Some applications create their own task queues for processor-intensive tasks, which may allow the user to customize the order in which some jobs get carried out. For example, video encoding applications like HandBrake allow you to create a batch process queue that encodes one video at a time and automatically starts the next video after the previous encoding job finishes.

In addition to computers, other devices also use queues to manage data. Network devices like switches and routers create queues when forwarding data packets across a network, ensuring packets arrive at the destination in the same order that they were transmitted. Printers also use queues to manage multiple print jobs, printing them in the order they were received. Most printers include software that allows users to manually sort, cancel, and add jobs in the queue.

---

### **References**
*Pickle, B. (2023, August 3). Queue Definition. Retrieved 2026, Apr 30, from https://techterms.com*