---
title: "How to Customize Email Templates in Email Action Config?"
slug: "how-to-customize-email-templates-in-email-action-config"
category: "How Tos"
summary: "This article describes the process to customize email templates in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-08-01"
featured: false
---
You can send emails in Orgzit [manually](/articles/how-to-send-emails-manually-using-custom-action-buttons) or by automating them using [workflows](/articles/how-to-trigger-emails-based-on-a-condition). Orgzit empowers you to create customized templates, personalized with the information of the recipient, and having all other required details.  
​

## **Creating Customized** Email **Templates**

While creating your email action config, you can customize your template by fetching values from different datafields.

To add a **field value** in your email template, you can use the **Insert Tag** feature which creates placeholders to fetch the values for you.

You can find the Insert Tag button right above the section where you enter your template.

![](/images/how-to-customize-email-templates-in-email-action-config/img-1.jpeg)

  
**To use the Insert Tag button for customizing your template, the following steps have to be performed:**

1.  Click on the **Insert Tag** button and select the data field. You will get a notification stating that the _Table Tag has been copied to your clipboard_.
    
2.  **Paste** the tag exactly where you want to fetch the data field value.
    

_Note: The Tag is of the format #{{ normalized\_datafield\_name }}_

For instance, if you want to insert customer name in your template and you insert the tag for your Customer Name data field, it will look like this:

```
Hi #{{customer_name}},
```

where _Customer Name_ is the name of the field that you want to add and _customer\_name_ is the normalized field name.

You can insert as many tags as you want to customize your email:  
​

```
Hi #{{customer_name }},Your registration ID for this order is #{{registration_id}} and your expected date of delivery is #{{date_of_delivery}}.Thank you for shopping with us!
```

  
Here, the tags refer to the fields whose value we need to include in our emails.  
​

In this way, you can not only create new customized email templates but also edit the templates in the existing Action Configs as per the requirement.

##   
  
Check out this video to understand How to customize Email Templates in Email Action Config!  

<iframe src="https://www.youtube.com/embed/ZM-w1ugt7No?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
