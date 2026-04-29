---
title: "CGI"
category: "Software Terms"
relatedTerms:
  - "Script"
  - "Web Server"
  - "Website"
  - "Perl"
  - "Python"
  - "PHP"
  - "ASP"
  - "Graphics"
  - "Multimedia"
  - "GPU"
---

# CGI

CGI has two different meanings: (1) Common Gateway Interface, and (2) Computer Generated Imagery.

## (1) Common Gateway Interface

The Common Gateway Interface (CGI) is a set of rules for running **scripts** and **programs** on a **web server**. It specifies what information is communicated between the web server and clients' **Web browsers** and how the information is transmitted.

Most Web servers include a `cgi-bin` directory in the **root** folder of each website on the server. Any scripts placed in this **directory** must follow the rules of the Common Gateway Interface. For example, scripts located in the `cgi-bin` directory may be given executable permissions, while files outside the directory may not be allowed to be executed. A CGI script may also request CGI environment variables, such as `SERVER_PROTOCOL` and `REMOTE_HOST`, which may be used as input variables for the script.

Since CGI is a standard interface, it can be used on multiple types of hardware **platforms** and is supported by several types Web server software, such as Apache and Windows Server. CGI scripts and programs can also be written in several different languages, such as **C++**, **Java**, and **Perl**. While many websites continue to use CGI for running programs and scripts, developers now often include scripts directly within Web pages. These scripts, which are written in languages such as **PHP** and **ASP**, are processed on the server before the page is loaded, and the resulting data is sent to the user's browser.

## (2) Computer Generated Imagery

In the computer graphics world, CGI typically refers to Computer Generated Imagery. This type of CGI refers to 3D graphics used in film, TV, and other types of visual **media**. Most modern action films include at least some CGI for special effects, while other movies, such as Pixar animated films, are built completely from computer-generated graphics.

---

### **References**
*Christensson, P. (2010, June 24). CGI Definition. Retrieved 2026, Apr 29, from https://techterms.com*