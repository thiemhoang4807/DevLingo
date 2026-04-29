---
title: "JavaScript"
category: "Internet Terms"
relatedTerms:
  - "Programming Language"
  - "Web Development"
  - "Java"
  - "Syntax"
  - "C"
  - "Source Code"
  - "Web Browser"
  - "Web Server"
  - "Functions"
  - "Fields"
  - "PHP"
  - "ASP"
  - "HTML"
  - "Webpage"
  - "Output"
  - ".JS"
  - "Alert Box"
  - "Script"
  - "jQuery"
  - "HTML5"
  - "Form"
---

# JavaScript

JavaScript is a **programming language** commonly used in **web development**. It was originally developed by Netscape as a means to add dynamic and interactive elements to websites. While JavaScript is influenced by **Java**, the **syntax** is more similar to **C** and is based on ECMAScript, a scripting language developed by Sun Microsystems.

JavaScript is a client-side scripting language, which means the **source code** is processed by the client's **web browser** rather than on the **web server**. This means JavaScript **functions** can run after a webpage has loaded without communicating with the server. For example, a JavaScript function may check a web form before it is submitted to make sure all the required **fields** have been filled out. The JavaScript code can produce an error message before any information is actually transmitted to the server.

Like server-side scripting languages, such as **PHP** and **ASP**, JavaScript code can be inserted anywhere within the **HTML** of a **webpage**. However, only the **output** of server-side code is displayed in the HTML, while JavaScript code remains fully visible in the source of the webpage. It can also be referenced in a separate **.JS** file, which may also be viewed in a browser.

Below is an example of a basic JavaScript function that adds two numbers. The function is called with the parameters 7 and 11. If the code below were included in the HTML of a webpage, it would display the text "18" in an **alert box**.

```html
<script>
  function sum(a,b)
  {
    return a + b;
  }
  var total = sum(7,11);
  alert(total);
</script>
```

JavaScript functions can be called within `<script>` tags or when specific events take place. Examples include onClick, onMouseDown, onMouseUp, onKeyDown, onKeyUp, onFocus, onBlur, onSubmit, and many others. While standard JavaScript is still used for performing basic client-side functions, many web developers now prefer to use JavaScript libraries like **jQuery** to add more advanced dynamic elements to websites.

---

### **References**
*Christensson, P. (2014, August 8). JavaScript Definition. Retrieved 2026, Apr 28, from https://techterms.com*