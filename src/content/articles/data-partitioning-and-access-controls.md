---
title: "Data Partitioning and Access Controls"
slug: "data-partitioning-and-access-controls"
category: "Features"
summary: "This article describes how to perform Data Partitioning."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-15"
featured: false
---
While working with organizational data and workflows, a big challenge is to set up an environment with controlled access to users. Organizations want specific data to be accessed only by specific users, who have the authority and requirement of the same.

*   Lead Owner should access only their leads
    
*   Task Owner should only access the tasks assigned to him
    
*   A salesperson should only be able to track his customer's orders, quotations and invoices, and so on!
    

  
For this, Orgzit provides a [multiple-level access control system](/articles/how-to-set-up-a-user-access-control-system).

By using Data Partitioning access control features, users can create different partitions of their data. And by using these partitions, they can control the access of users to the data.  
  
In this article we will mention 2 different features that enable you to perform Data Partitioning in Orgzit:

1.  Display Records To User Mentioned Table Attribute
    
2.  Visible Zone Only (VZO) Table Attribute
    

# Display Records To User Mentioned

One of the very powerful features to control access is by performing data partitioning. The feature for this is the **Display Records To User Mentioned** [Table Attribute](/articles/how-to-set-table-attributes).  
  
Using this attribute, you can partition your data (records) and make it available for use only to the users specified.

For instance, you have a **Lead Management System,** having the details of all your leads, where each Lead has a Lead Owner assigned for it. In this case, you can use this feature to make sure that a user can only view and track his own leads.

Here is a snapshot of a lead management system with different leads and lead owners.

![](/images/data-partitioning-and-access-controls/img-1.png)

Using the **Display Records To User Mentioned** Table Attribute, you can specify the [roles](/articles/how-to-manage-different-roles-in-a-workspace) and users who should be able to access the data (records).  
  
**To add this attribute you need to perform the following steps:**

1.  Go to Table Settings.
    

![](/images/data-partitioning-and-access-controls/img-2.png)

2\. Move to Table Attributes.

3\. Choose the attribute: **Display records only to the user mentioned.**

4\. Select the **[Roles](/articles/how-to-manage-different-roles-in-a-workspace)** and **Users** that you want to grant access to.

{Here, the user field Lead Owner is specified and in the roles, management is specified. Hence, a user will only be able to access the leads if he is the lead owner or has the management role. }

![](/images/data-partitioning-and-access-controls/img-3.png)

Hence, by using this attribute, you can successfully control the access of your users by specifying the relevant users and groups.

Here is the snapshot of the lead management system for a specific lead owner. Only the leads of that lead owner are visible and the user cannot access the other leads in the system.

![](/images/data-partitioning-and-access-controls/img-4.png)

## Watch this video to understand How to perform Data Partitioning with Display Records Only to User Mentioned Table Attribute!  
  

<iframe src="https://www.youtube.com/embed/IUndjr9jRNU?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>

# Visible Zone Only

Want to set up data partitioning not just for individual team members but for groups and teams? The Visible Zone Only Table Attribute is the solution for this.

The VZO table attribute helps you set up access control for different teams, groups, and projects in your organization.

Let's understand this feature with the help of an example.

You have a Project Management system with different tasks in every project, and you want that only members of a Project should be able to access all tasks of that Project. In this case, you can set up the VZO Table Attribute and control the access of users.  
​

![](/images/data-partitioning-and-access-controls/img-5.png)

  
  
To set up the Visible Zone Only Table Attribute, you have to perform the following steps:

1.  Move to the Table settings
    
2.  Move to the Table Attributes section
    
3.  Click on +Add Attribute and select Visible Zone Only
    
4.  Select the Zone Field - the field by which you want to partition your data, for instance, your project or department
    
5.  Select User - Zone Relation  
    Choose the Table with the User Zone mapping for instance Team Directory  
    ​
    
    ![](/images/data-partitioning-and-access-controls/img-6.png)
    
6.  Specify the Zone Field eg. Project
    
7.  Specify the User Field eg. Member
    
8.  Click on Add!  
      
    ​
    
    ![](/images/data-partitioning-and-access-controls/img-7.png)
    

  
Once you set this up, you must have successfully implemented the VZO feature!  
  
This means that your access control is now in place and your team members can view and work on tasks from their project only.  
  
**Here is a snapshot of how the tasks will look like for a member of the Management Team.**  
  
​

![](/images/data-partitioning-and-access-controls/img-8.png)

Apart from these features, Orgzit provides multiple features to set up an access control system within your Orzgit workspace. You can explore [Orgzit'z multiple level access control features here](/articles/how-to-set-up-a-user-access-control-system).
