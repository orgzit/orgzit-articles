---
title: "How to set up Stage Transition Rules?"
slug: "how-to-set-up-stage-transition-rules"
category: "How Tos"
summary: "This article describes the process to set stage level access permissions."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-18"
featured: false
---
Want to control who can change the status of a Lead or an Order?

Standard dropdown fields not helping?

Check out Stages in Orgzit.

**Stages = Dropdown** 🔽 **\+ Role Based Access Control Permissions** 🔐

_Stages are basically dropdown fields with access control permissions_

Orgzit has a [multiple-level access control system](/articles/how-to-set-up-a-user-access-control-system). Using the different access control features provided by Orgzit, you can set up an efficient and secure system in which every user can only access the data and workflows relevant to him.

Stage Transition Rules enable you to control who can make a particular stage change. You can set rules for every possible stage change within your table.

For instance, if you want that only a user with the [role](/articles/how-to-manage-different-roles-in-a-workspace) of **Sales** or **Management** should be able to change the stage of a Lead from _New_ to _Prospecting_, and no user with the role of Accounts should be able to make this change in the Lead Stage, you can set Stage Transition Rules to control the same.  
​

* * *

**To implement stage level permissions based on [User Roles](/articles/how-to-manage-different-roles-in-a-workspace), the following steps need to be performed:**

*   Go to Table Setting and Move to Table Fields.
    
*   Move to the Field in which you want to add this feature.
    
*   In the Field Attribute, add **Stages.**
    
*   To configure stages, enter the choices/list of stages that you want.
    
*   Add the **Transition Rules**.  
      
    ​
    
    ![](/images/how-to-set-up-stage-transition-rules/img-1.png)
    
      
      
    For a stage change from one stage to another, enter the roles to whom you want to grant permission to make the stage change. Only the Transition Rules that you specify will decide which user can make a certain change.  
      
    For instance, in the example above, a Sales user can change the Lead Stage from _New Lead to Junk Lead_ but cannot move the Lead Stage from _Lead Won to Junk Lead._  
      
    Also, if you leave the first stage blank as in the first transition rule above, it means that the state change can happen from any stage to a _New Lead_ and if you leave the second stage blank it means that the state change can happen from a specified stage to any other stage.  
      
    **Remember:** If you leave the Roles field blank, any role will be able to make that particular transition. You can choose to set the Roles for transitions on which you want to set access control and leave the rest in which you do not want to set any constraints.  
      
    ​
    
*   You can assign **Color Scheme** to your stages as well. Assigning different colors to the different stages make your data more presentable and easy to read.  
    ​
    

![](/images/how-to-set-up-stage-transition-rules/img-2.png)

*   Click on **Done** once the configuration is complete.
    

  
​

![](/images/how-to-set-up-stage-transition-rules/img-3.png)

## Common Field Attributes Used with Stages

You can use the following attributes along with your **Stages** data field to make your process more efficient:

*   **Default Value:** You can set a default value for your data field using this attribute. For instance, if your first stage always has to be **"New Bill"**, you can set it as the default value.  
    ​
    
*   **Detail Only:** You can use this attribute if you do not want this data field to be present in the tabular view of your data, and only in the expanded view of the record.  
    If you apply this attribute, you can still view the data field in the tabular view by using the [show/hide fields](/articles/how-to-show-hide-fields) feature, if required.  
    ​
    
*   **Required:** If you want that the value for this field **must** be present in your record, you can set the **required** attribute to do so. While creating a record, if the value for a required field is not present, the system will give an error.  
    ​
    
*   **Hidden During Create:** This attribute hides the data field from the _record create_ form. If this field is not required at the time of record creation, you can use this attribute.  
    ​
    

## Check out this video to understand how to set up stage transition rules!

<iframe src="https://www.youtube.com/embed/0kdJ3F40skU?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
