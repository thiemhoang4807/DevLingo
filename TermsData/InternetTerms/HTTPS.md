---
title: "HTTPS"
category: "Internet Terms"
relatedTerms:
  - "HTTP"
  - "Protocol"
  - "WWW"
  - "TLS"
  - "SSL"
  - "Web Server"
  - "Certificate"
  - "Web Browser"
  - "Encryption"
  - "E-commerce"
  - "Encrypts"
  - "Web"
  - "HTML"
  - "Cookie"
  - "JavaScript"
  - "Handshake"
  - "Address Bar"
  - "URLs"
  - "Login"
---

# HTTPS

Stands for "HyperText Transport Protocol Secure."

HTTPS is a secure version of the **HTTP** protocol that **encrypts** web traffic. It adds encryption and authentication using **TLS** (formerly **SSL**) to protect data exchanged between a **web server** and the client's web browser. While it was initially only used by sites to protect login credentials and financial information from eavesdropping, it is now used by most web servers to encrypt all traffic and verify that every page reaches the browser without being modified or corrupted during transit.

All HTTPS **web** traffic uses TLS protocol for encryption, including every **HTML** page, **cookie**, image, and **JavaScript** file. To use HTTPS, the web server first needs a digital **certificate** that establishes the identity and authenticity of the site's owner. The web server and the client's **web browser** conduct a brief **handshake** where the browser verifies the server's certificate, and they work together to generate a temporary session encryption key. This key encrypts and decrypts all traffic between the server and the client, protecting it from any eavesdropping or man-in-the-middle attacks.

![A padlock icon in a browser's address bar indicates that the current webpage is using HTTPS](https://techterms.com/img/xl/https_751.png)

You can identify whether a site uses HTTPS by looking at your browser's **address bar**. Addresses that start with `https://` are secure. If your browser hides the beginning of **URLs**, it will instead show a padlock icon before the rest of the address. You can click this icon to view the site's security certificate and verify the person or business responsible for it. You should always check that a website is secure before entering **login** credentials or your credit card information by looking for the padlock; in fact, most browsers now actively label sites that don't use HTTPS as "Not Secure" to indicate that traffic is not encrypted.

---

### **References**
*Pickle, B. (2023, July 5). HTTPS Definition. Retrieved 2026, Apr 28, from https://techterms.com*