---
title: "How to set up Role Based Workspace Level Access Permissions?"
slug: "how-to-set-up-role-based-workspace-level-access-permissions"
category: "How Tos"
summary: "This article describes how to set up role based access permissions."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-08-28"
featured: false
---
Orgzit provides a [multiple level access control](/articles/how-to-set-up-a-user-access-control-system) system for its users. Using it, you can control access of users at a workspace level, table level, column level, and record level.  
  
You can [create and assign roles](/articles/how-to-manage-different-roles-in-a-workspace), and set up access permissions according to them. Roles, in Orgzit, are groups of people with similar authority and requirements from the system.

Using permissions you can control the right to read, create, update, delete, download, comment, create tasks, attach files, and send emails.  
​

**_Note_**: Only users with [Administrator access level](/articles/how-to-set-the-workspace-access-level) in a workspace can set access permissions.

# **Set Access Permissions**

![](/images/how-to-set-up-role-based-workspace-level-access-permissions/img-1.gif)

1.  Go to Workspace Settings.
    
2.  Click on Permissions.
    
3.  Choose Permission by Roles/Tables.  
    You can set permissions on the basis of roles or tables. If you want to set the permissions for a specific role, choose Roles and if you want to set up permissions for a specific table, choose Tables.
    
4.  Select the Role/Table for which you want to set Permission.
    
5.  From the list of Roles/Tables and Permissions for each of them, you can choose the permissions and define the level of access that you want to grant to a specific role in a specific table.
    

![](/images/how-to-set-up-role-based-workspace-level-access-permissions/img-2.gif)

**Remember**  
The **blue** color on the permission icon signifies that the permission has been granted and the **grey** color signifies that the permission has not been granted. If you want that some specific permissions that should be given only to the admin, you can set them as _Admin Only_ permissions. When you assign the permissions by role, the Admin Only permissions are marked by **red** color.

  
For eg, if you want that nobody except the admin should be able to delete or download any data from a table, you can set those permissions as _Admin Only_.

<div class="intercom-container intercom-align-center"><img src="/images/how-to-set-up-role-based-workspace-level-access-permissions/img-3.png" width="531" height="109" style="height: auto;"></div>

You can set access permissions by this process for all roles and tables.

For instance, if you have an **Order Management system** for your organization and have different user roles for dealers, sales, accounts, and management department, you can set up permissions like this:

## For the **Orders** Table

1.  Delete and Download permissions have been set as admin only.
    
2.  The Management has all permissions except the admin only permissions.
    
3.  The Dealers only have read permission so that they can only view the orders and not make any change.
    
4.  The Accounts department can view and add comments.
    
5.  The Sales department will be actively creating and updating the orders, hence all permissions have been granted except the admin only permissions.
    

![](/images/how-to-set-up-role-based-workspace-level-access-permissions/img-4.png)

## For the **Payments** Table

1.  Delete and Download permissions have been set as admin only.
    
2.  Management and Accounts department has been granted all permissions except the admin only permissions.
    
3.  Dealers do not have any permissions to access the payment details, and hence will not be able to access this table.
    
4.  The Sales team can only read the payment details.  
    ​
    

![](/images/how-to-set-up-role-based-workspace-level-access-permissions/img-5.png)

Likewise, you can select and deselect permission or set it as admin only, according to your business and organizational requirements.

##   
  
Check out this video to understand how to set permissions!  

<iframe src="https://www.youtube.com/embed/bi1YdBN3VVM?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
