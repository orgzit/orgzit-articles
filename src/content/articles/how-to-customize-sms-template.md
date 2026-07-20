---
title: "How to customize SMS template?"
slug: "how-to-customize-sms-template"
category: "How Tos"
summary: "This article describes the process to customize SMS templates in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-07-10"
featured: false
---
You can send SMSs in Orgzit [manually](/articles/how-to-send-sms-manually-in-orgzit) or by automating them [using workflows](/articles/how-to-trigger-an-sms-based-on-a-condition). Orgzit empowers you to create customized templates, personalized with the information of the recipient, and having all other required details.  
  
​

## **Creating Customized SMS Templates**

To add a **field value** in the SMS, we refer to the **Normalized Field Name** with double curly braces #{{}} around it.

  
For instance, if you want to greet a particular customer by his name, you can write:

```
Hi #{{customer_name}}, 
```

where Customer Name is the name of the field that you want to add.

You can add any field value by referring to its **Normalized Field Name**. In this way, the SMS will be customized for each customer, having values related to that particular customer only.

For instance, if you have to send a message to all your new customers, thanking them to connect with you and informing them of their registration ID and date of delivery of their ordered products, you can create a template like this:

```
Hi #{{customer_name }},Your registration ID for this order is #{{registration_id}} and your expected date of delivery is #{{date_of_delivery}}.Thank you for shopping with us!
```

Here, the normalized names refer to the fields whose value we need to include in our SMSs.

In this way, you can not only create new customized SMS templates but also edit the templates in the existing Action Configs as per the requirement.

## Check out this video to learn how to customize SMS Templates!

<iframe src="https://www.youtube.com/embed/wm7wdYRMnrg?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
