---
title: "Hash"
category: "Software Terms"
imageUrl: "https://www.boardinfinity.com/blog/content/images/2022/10/1_VDRVI-0EfU2v7c43k9IIeA.png"
---

# **Hash**

A hash is a function that converts one value to another. Hashing data is a common practice in computer science and is used for several different purposes. Examples include cryptography, compression, checksum generation, and data indexing.

Hashing is a natural fit for cryptography because it masks the original data with another value. A hash function can be used to generate a value that can only be decoded by looking up the value from a hash table. The table may be an array, database, or other data structure. A good cryptographic hash function is non-invertible, meaning it cannot be reverse engineered.

Different types of compression, such as lossy image compression and media compression, may incorporate hash functions to reduce file size. By hashing data into smaller values, media files can be compressed into smaller chunks. This type of one-way hashing cannot be reversed, but it can produce an approximation of the original data that requires less disk space.

Hashes are also used to create checksums, which validate the integrity of files. A checksum is a small value that is generated based on the bits in a file or block of data such as a disk image. When the checksum function is run on a copy of the file (such as a file downloaded from the Internet), it should produce the same hashed value as the original file. If the file does not produce the same checksum, something in the file was changed.

Finally, hashes are used to index data. Hashing values can be used to map data to individual "buckets" within a hash table. Each bucket has a unique ID that serves as a pointer to the original data. This creates an index that is significantly smaller than the original data, allowing the values to be searched and accessed more efficiently.

---

### **References**
*Christensson, P. (2018, April 21). Hash Definition. Retrieved 2026, Apr 29, from https://techterms.com*