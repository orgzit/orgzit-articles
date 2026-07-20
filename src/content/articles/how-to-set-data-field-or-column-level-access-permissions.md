---
title: "How to set Data Field or Column Level Access Permissions?"
slug: "how-to-set-data-field-or-column-level-access-permissions"
category: "How Tos"
summary: "This article describes how to set Data Field or Column Level Access Permissions."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-18"
featured: false
---
Orgzit provides a [multiple level access control system](/articles/how-to-set-up-a-user-access-control-system) to help users control access of users to their data and workflows. You can also set **Data Field or Column Level Access Permissions** within your Orgzit workspace. With this, you can control which columns should be accessed and which should not be accessed by a user with a specific [user role](/articles/how-to-manage-different-roles-in-a-workspace).  
  
For instance, if you want the users having the role of an HR access your table data but not access some particular columns having confidential information, you can set up access permissions for the same.

To implement data field or column level access permissions, you need to perform the following steps:

1.  Go to **Table Settings**.
    
2.  Move to **Table Fields**.
    
3.  For the field for which you want to set the access permissions, you can use the following **field attributes** to control data field or column-level access:  
      
    \- **Visible for Roles:** You can use this attribute if you want the data field to be visible only to specified roles.  
      
    \- **Hidden for Roles:** You can use this attribute if you want the data field to be hidden from specified roles.  
      
    **\- Roles Edit Only:** You can set this attribute if you want only specific roles to have edit access to a particular data field. No other role can set the initial value for such a field while creating a record too.  
      
    For instance, if you that only users with the **_accounts_** role should be able to **edit/enter** payroll information of your employees, you can control that using this attribute.  
      
    **\- Roles Edit Only Create Any:** You can set this attribute if you want only specified roles to edit this data field but any user role can create it initially.  
    ​
    
4.  Set the required field attribute and **choose the roles** you want to grant access.
    

![](/images/how-to-set-data-field-or-column-level-access-permissions/img-1.png)

Once you set this attribute, you can control the access of users at a data field or column level.

## **Check out this video to understand how to set Column Level Access Permissions!**

<iframe src="https://www.youtube.com/embed/fEWxrS6wBYY?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
