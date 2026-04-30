---
title: "Zip Bomb"
category: "Software Terms"
relatedTerms:
  - "Zip"
  - "Archive"
  - "Compression"
  - "File Compression"
  - "Utility"
  - "Recursion"
  - "Email Bomb"
---

# Zip Bomb

A zip bomb is a compressed file that consumes a massive amount of storage space when decompressed. When a zip bomb is opened, it can quickly take up all the free space on a storage device.

Most Zip files have a compression ratio between 2:1 and 10:1. For example, a 3 megabyte compressed .ZIP file might expand to 15 megabytes. A zip bomb, on the other hand, may have a compression ratio of over 1,000,000:1. A small 40 kilobyte zip bomb may expand to over 5 gigabytes. A 10 megabyte zip bomb may expand to over 280 terabytes.

Zip bombs achieve astronomic compression ratios using one of two methods:

1. Recursive compression
2. Overlapping files

Recursive compression, which is the most common way to create a zip bomb, stores layers of compressed files in a single archive. When the primary archive is decompressed, it recursively expands the nested archives. As multiple layers of compressed files are opened, the output grows exponentially.

A zip bomb may also be created using overlapping files. Instead of storing layers of compressed archives, the archive contains multiple directory headers that point to a single file. By "overlapping" files within the archive, it can exceed the maximum compression ratio of 1,032.

Zip bombs are considered malware because they can be used for malicious purposes. For instance, the rapid decompression may use 100% of system resources, rendering the computer unresponsive. Fortunately, most antivirus programs can detect zip bombs and warn against opening them. If you unknowingly open a zip bomb on your PC, most Zip utilities allow you to stop the decompression in mid-process.

---

### **References**
*Christensson, P. (2021, February 2). Zip Bomb Definition. Retrieved 2026, Apr 30, from https://techterms.com*