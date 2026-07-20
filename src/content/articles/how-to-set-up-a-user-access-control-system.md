---
title: "How to set up a User Access Control System?"
slug: "how-to-set-up-a-user-access-control-system"
category: "How Tos"
summary: "This article describes all access control features in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-06-11"
featured: false
---
While working with organizational data and [workflows](/articles/how-do-automations-work), a big challenge is to set up an environment with controlled access to users. Organizations want their data to be accessed only by specific users, who have the authority and requirement of the same.

  
Orgzit provides a multiple-level role-based access control system for users to leverage for the workflow automation and collaboration software they build on Orgzit.

The access controls in Orgzit are at the following levels:

1.  Workspace level access permissions
    
2.  Table level access permissions
    
3.  Data Field or Column-Level access permissions
    
4.  Record or Row-Level access permissions
    
5.  Stage Transition Rules
    

These different levels of access permissions are explained below. The users can use one or more of these in their workflows to achieve very granular role-based access permissions.

# 1\. Workspace Level Access Permissions

Every account in Orgzit can have one or more workspaces. For each workspace and user that has access to the workspace, you can control the access using the following.

Here, access levels are of 4 types:  
​

**Workspace Administrator Users**

*   These users have access to all the tables, records, and data in the workspace.
    
*   The **[user-defined roles](/articles/how-to-manage-different-roles-in-a-workspace)** and **[stage rules](/articles/how-to-set-up-stage-transition-rules)** do not apply to administrators.
    
*   You can have as many administrator users as you want on your workspace.
    
*   The Administrator users can make changes to the database, workflow, integrations, and system configurations.
    
*   Administrator users can invite other users to collaborate on their workspace.
    

**Manager Users**

*   You can have as many manager users as you want on your workspace.
    
*   They also have access to all data.
    
*   User-defined roles apply to Managers.
    
*   They cannot access the configuration of any other workspace in the account.
    
*   They can manage workspace users.
    

**Edit Users**

*   This is the most common type of access level. It is mostly for the regular users of the workspace.
    
*   Ownership restrictions, territory restrictions, and role-based access control apply to them.
    
*   They cannot manage any workspace configuration.
    

**View Users**

*   They have read-only access to data.
    

To set Workspace Level Access Permissions, [you can read this document.](/articles/how-to-set-the-workspace-access-level)

# 2\. Table Level Access Permissions

To set up Table Level Access Permissions, you can create different user roles and set permissions according to roles.  
  
Roles are groups of users with similar authority and requirements from the workspace. You can use roles to represent different departments/teams of your organization and then set access control permissions for each role separately.

![](/images/how-to-set-up-a-user-access-control-system/img-1.png)

For instance, you can create user roles like sales, management, accounts, hr, and assign table level permissions to each role. Once you assign a role to a user, the user has access permissions according to his role.

![](/images/how-to-set-up-a-user-access-control-system/img-2.png)

To set up Role-Based Access Control in a Table in your workspace, [you need to perform the following steps.](/articles/how-to-manage-different-roles-in-a-workspace)

# 3\. Data Field or Column Level Access Permissions

In a Table, you can set access permissions at a Data Field/Column level as well. You can do so just by adding additional functionality to that field and controlling to whom is it visible. Using this you can control the access of a particular user role at a column level.

![](/images/how-to-set-up-a-user-access-control-system/img-3.png)

To implement this, you have to [follow the steps mentioned in the document here.](/articles/how-to-set-data-field-or-column-level-access-permissions)

# 4\. Record or Row-Level Access Permissions

You can also set up role-based access control within a table, at a record level with the help of a Table Attribute. Using the **display records only to the user mentioned** table attributes attribute, you can partition your data (records) and make it available for use only to the users specified.

![](/images/how-to-set-up-a-user-access-control-system/img-4.png)

To implement this, you have to [follow the steps mentioned in the document here.](/articles/data-partitioning-and-access-controls)  
​

# 5\. Stage Transition Rules

To provide permission to change the stage from one to another in a table record, you can provide Stage level access permissions. You can set the transition rules and control the users who can or cannot make a particular transition.

![](/images/how-to-set-up-a-user-access-control-system/img-5.png)

To implement Stage Transition Rules, you can [follow the steps mentioned in the document here.](/articles/how-to-set-up-stage-transition-rules)

These were the different methods to set up the Access Control system at Orgzit. This feature can help you make your workspace more powerful, efficient, and secure.
