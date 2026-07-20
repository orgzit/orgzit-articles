---
title: "How to create Prefilled Webforms?"
slug: "how-to-create-prefilled-webforms"
category: "How Tos"
summary: "This article will help you create prefilled webforms."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-12-30"
featured: false
---
In case you want to send [emails](/articles/how-to-send-emails-manually-using-custom-action-buttons) or generate [PDFs](/articles/how-to-create-professional-pdfs-in-orgzit) with the link to the webform to multiple people, you can customize the form for your target audience.  
  
This is a simple 2 step process:

1.  Creating the Webform
    
2.  Prefilling the Webform
    

# Creating the Webform

[Read this product doc to learn how to create webforms in Orgzit.](/articles/how-do-webforms-work)

# Prefilling the Webform

This can be done by using the normalized names or slugs to specify the field values.  
  
For instance, if you send an email from Orgzit with a feedback form link to a customer, and you already have the company name in the record, you can use its normalized name to prefill the form with the name.  
  
You can get the normalized name from the Table Fields section on the Table Manage page.  
​

![](/images/how-to-create-prefilled-webforms/img-1.jpg)

Adding this to the URL will fetch the company name of the person to whom you send the email:

`?company=#{{company}}`

Here _company_ is the respective normalized field name.  
  
​

![](/images/how-to-create-prefilled-webforms/img-2.png)

In this way, you can use customized webforms to capture data and very easily link it to your website, emails, PDFs, or share directly with people.

##   
  
Check out this video to learn how to create customized webforms in Orgzit!  
  

<iframe src="https://www.youtube.com/embed/Hn4NjlKq61k?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
