---
title: "How to set up a Pre Save Edit Record Action Config?"
slug: "how-to-set-up-a-pre-save-edit-record-action-config"
category: "How Tos"
summary: "This article describes the use and implementation of the Pre-Save Edit Record Feature in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-07-31"
featured: false
---
While working with organizational data and processes, automation is the key to improved performance and efficiency. Orgzit provides a wide range of features to automate processes, and increase the productivity and efficiency of its users. One such feature is the **Pre Save Edit Record** [Action Config](/articles/action-configs-in-orgzit).

Very often, at some specific time and conditions, you need some field/column value to be edited before proceeding, the Pre Save Edit Record Action Config helps you to do that.  
  
It also helps in the condition, when you want to make sure that some specific value is present in the system, before saving the record and moving forward.

**For instance**, You have an Order Management system for your organization, and you want that nobody should be able to change the status of an order from Dispatched to Closed without specifying the _Paid Amount_, you can do so with the help of Pre Save Edit Record Action Config.

Once you set it up, it will prompt you to enter the required detail and let you proceed only once you do that.

## **To set up a Pre Save Edit Record Action Config, the following steps need to be performed:**

![](/images/how-to-set-up-a-pre-save-edit-record-action-config/img-1.png)

1.  Go to **Table Setting** and move down to **Action Configs**.
    
2.  Select the type of action to be **Pre Save Edit Record**.
    
3.  **Name** the Action Config.
    
4.  Set the **condition(s)** on which you want to trigger it.  
    **Remember:** The conditions have an **AND** operation acting on them. This means that the Action Config will be triggered only when **ALL** the specified conditions are met.
    
5.  Select the **field(s)** whose value you want to edit. Mark them as _Is Required_, if the presence of its value is a must to proceed.
    
6.  **Save** the Action Config.
    

![](/images/how-to-set-up-a-pre-save-edit-record-action-config/img-2.png)

_{In the example above, when the status is changed to Closed, the system asks to edit the specified fields. Here, the Amount Paid is a required field. Once the required information is updated, only then the changes made will be saved.}_

Using the above-mentioned method, you can set up the Pre Save Edit Record Action Config. It's a powerful feature that helps you manage your data and processes in a more efficient way.  
​

##   
Check out this video to understand the feature better!  

<iframe src="https://www.youtube.com/embed/IrGjXGLKuTY?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
