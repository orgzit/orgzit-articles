---
title: "How do Webforms work?"
slug: "how-do-webforms-work"
category: "How Tos"
summary: "This article describes the process to set up webforms."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-02"
featured: false
---
For any organization, business, and team, data is extremely important. Data comes in different forms and from different sources and it becomes very essential to capture and manage data in the right way.

**Webforms** are an effective way to capture the data that you want. Within Orgzit, webforms let you collect information from anyone and save it automatically as a record in your workspace [table](/articles/how-to-set-up-a-new-table). Any user who is not a part of the Orgzit workspace can fill this webform.  
  
Webforms are perfect for logging requests, enquiries, tickets, collecting customer feedback, and many other purposes. You can very easily set up a webform in Orgzit, share its link, and capture information into your workspace from people outside your workspace as well!

# Creating a Webform

*   To create a webform in Orgzit, go to the [Table Manage](/articles/how-to-validate-clone-reset-or-delete-table) page and move to the webforms section. **Enable** the Webform by clicking on the toggle button.
    

![](/images/how-do-webforms-work/img-1.png)

*   Set the **title** and **description** of the webform.
    

One of the best things about Orgzit webforms is that you do not need to build it from scratch, **Orgzit webforms are automatically generated from your existing table. It shows the same form as the _create record_ form.**

*   You can click on **Go to Form**, to view the webform.
    

![](/images/how-do-webforms-work/img-2.png)

*   Orgzit also provides the code which you can embed in your website and capture data from the form there. You can click on **Embed Code** to view the code.
    

![](/images/how-do-webforms-work/img-3.png)

# Prefilling a Webform

There may be times, where you need to prefill data for some fields in the form.

Within an Orgzit webform, you can use parameters in the URL of the form to prefill specific fields, for which you already have values.

*   To prefill a specific value in a field, find the URL for the form you wish to prefill. You can view the form by clicking on the **Go to Form** button and get the URL from there.
    
*   Once you get the form URL, you can manually add parameters in the form URL to prefill fields.
    
*   Start by adding a `?` to the end of the URL.
    
*   Then, type the **normalized name** of the field you wish to prefill. Once you've typed in the normalized field name, you can then type in an equals sign (=) and the information you wish to prefill.  
    You can get the normalized name from the Table Fields section in the Table Manage page.
    
*   If you wish to prefill more fields, enter an ampersand (`&`) and then enter more parameters.
    

For eg., adding this to the URL will prefill the company name with the specified values:  
​

`?company=Orgzit`  
  
Once you prefill the value of a field, it gets disabled, which means that you can no longer edit it.

![](/images/how-do-webforms-work/img-4.png)

[You can also create customized webforms in Orgzit.](/articles/how-to-create-prefilled-webforms)

## **Check out this video to understand Webforms in Orgzit!**

<iframe src="https://www.youtube.com/embed/hwlY2s-AFvI?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
