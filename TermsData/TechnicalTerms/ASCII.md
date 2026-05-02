---
title: "ASCII"
category: "Technical Terms"
imageUrl: "https://linuxhandbook.com/content/images/size/w1000/2023/01/2.png"
---

# ASCII

Stands for "American Standard Code for Information Interchange." ASCII is a character encoding that uses numeric codes to represent characters. These include upper and lowercase English letters, numbers, and punctuation symbols.

## Standard ASCII

Standard ASCII can represent 128 characters. It uses 7 bits to represent each character since the first bit of the byte is always 0. For instance, a capital "T" is represented by 84, or 01010100 in binary. A lowercase "t" is represented by 116 or 01110100 in binary. Other keyboard keys are also mapped to standard ASCII values. For example, the Escape key (ESC) is 27 in ASCII and the Delete key (DEL) is 127.

## Extended ASCII

The 128 (2^7) characters supported by standard ASCII are enough to represent all standard English letters, numbers, and punctuation symbols. However, it is not sufficient to represent all special characters and characters from other languages. Extended ASCII helps solve this problem by adding an extra 128 values, for a total of 256 (2^8) characters. The additional binary values start with a 1 instead of a 0. For example, in extended ASCII, the character "é" is represented by 233, or 11101001 in binary. The capital letter "Ö" is represented by 214, or 11010110 in binary.

While extended ASCII doubles the character set of standard ASCII, it does not include nearly enough characters to support all languages. Some Asian languages, for example, require thousands of characters. Therefore, other character encodings, such as Latin-1 (ISO-8859-1) and UTF-8 are now more commonly used than ASCII for documents and webpages. UTF-8 supports over one million characters.

---

### **References**
*Christensson, P. (2020, April 27). ASCII Definition. Retrieved 2026, Apr 30, from https://techterms.com*