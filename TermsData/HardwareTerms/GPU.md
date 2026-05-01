---
title: "GPU"
category: "Hardware Terms"
imageUrl: "https://techterms.com/img/lg/gpu_166.jpg"
---

# GPU

Stands for "Graphics Processing Unit." A GPU is a **processor** designed to handle **graphics** operations. This includes both 2D and 3D calculations, though GPUs primarily excel at rendering 3D graphics.

## History

Early **PCs** did not include GPUs, which meant the **CPU** had to handle all standard calculations and graphics operations. As **software** demands increased and graphics became more important (especially in video games), a need arose for a separate processor to render graphics. On August 31, 1999, NVIDIA introduced the first commercially available GPU for a **desktop computer**, called the GeForce 256. It could process 10 million polygons per second, allowing it to offload a significant amount of graphics processing from the CPU.

The success of the first graphics processing unit caused both **hardware** and software developers alike to quickly adopt GPU support. **Motherboards** were manufactured with faster **PCI** slots and **AGP** slots, designed exclusively for **graphics cards**, became a common option as well. Software **APIs** like **OpenGL** and **Direct3D** were created to help developers make use of GPUs in their programs. Today, dedicated graphics processing is standard – not just in desktop PCs – but also in **laptops**, **smartphones**, and video game consoles.

## Function

The primary purpose of a GPU is to render 3D graphics, which are comprised of polygons. Since most polygonal transformations involve decimal numbers, GPUs are designed to perform **floating point** operations (as opposed to **integer** calculations). This specialized design enables GPUs to render graphics more efficiently than even the fastest CPUs. Offloading graphics processing to high-powered GPUs is what makes modern gaming possible.

While GPUs excel at rendering graphics, the raw power of a GPU can also be used for other purposes. Many **operating systems** and software **programs** now support **GPGPU**, or general-purpose computation on graphics processing units. Technologies like **OpenCL** and **CUDA** allow developers to utilize the GPU to assist the CPU in non-graphics computations. This can improve the overall performance of a computer or other electronic device.

---

### **References**
*Christensson, P. (2016, November 25). GPU Definition. Retrieved 2026, Apr 28, from https://techterms.com*