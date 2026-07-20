---
title: "How to customize PDF template?"
slug: "how-to-customize-pdf-template"
category: "How Tos"
summary: "This article describes the process of customizing PDF templates in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-08-01"
featured: false
---
Using Orgzit, you can generate PDFs [manually](/articles/how-to-create-professional-pdfs-in-orgzit) or [automatically](/articles/how-to-generate-pdfs-based-on-conditions) based on some specified conditions. You can store these PDFs and also send them via emails, as per the requirement.

Orgzit gives you the power to customize your PDFs. You can change its structure, design, content, and make it the way you want!

**Creating Customized PDF Templates**

While setting up an Action Config, you can configure your PDF as per your requirement. In Orgzit, PDFs are made of basic **Django Templates**. While creating a customized PDF, the following points need to be kept in mind:

*   To add a **field value** in the PDF, you can use the **Insert Tag** button to fetch values from specific data fields. You can find the Insert Tag button right above the section where you enter your template.
    

![](/images/how-to-customize-pdf-template/img-1.jpeg)

These tags are basically the **Normalized Field Name** with double curly braces #{{}} around it.  
  
For instance, if you want to include the data field customer name, the tag will look like this:

```
#{{customer_name}}
```

where _Customer Name_ is the name of the field that you want to add and _customer\_name_ is the normalized field name.

**To use the Insert Tag button for customizing your template, the following steps have to be performed:**

1.  Click on the **Insert Tag** button and select the data field. You will get a notification stating that the _Table Tag has been copied to your clipboard_.
    
2.  **Paste** the tag exactly where you want to fetch the data field value.
    

You can insert as many tags as you want to customize your PDF.

*   You can also add values from a child table by using the Insert Tag option.
    

*   You can also include fields and data based on conditions by using the if statement or the _for loop_.
    

```
<p style="font-size:16px">  <strong>#{{account.contact_name}}</strong><br>  {% if account.email %}E-mail: #{{ account.email }}<br/>{% endif %}  {% if account.billing_address %}Address:<br>      #{{account.billing_address|linebreaksbr }} <br> {% endif %}</p>
```

*   While setting up the Action Config for your PDF, you can also set the **Page Size**, **Orientation**, and the **Margins** as per requirement.
    

Using this method, you can not only create new customized PDF templates but also edit the templates in the existing Action Configs as per the requirement. You can also send the created PDFs by [email](/articles/how-to-automatically-generate-and-email-pdf-documents) if required.

## Check out this video to learn how to customize PDF Templates!

<iframe src="https://www.youtube.com/embed/hzHS2Cc7Pf4?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
