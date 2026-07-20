---
title: "How to transfer data from a disabled user to a new user?"
slug: "how-to-transfer-data-from-a-disabled-user-to-a-new-user"
category: "How Tos"
summary: "This article describes the process to transfer data from a disabled user to a new user."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2021-04-28"
featured: false
---
Within organizations, roles change and very often shift from one member to another. In this article, we will discuss how can we transfer data from a disabled user to another user.  
  
This will help you in situations like:

1.  A team member has left the team and you want to assign his tasks to another member
    
2.  You want to change the Lead Owner from one to another because there have been some changes in the team  
    ​
    

There are two methods to transfer data from one user to another:

1.  With the [Bulk Edit Feature](/articles/how-to-bulk-edit-records)
    
2.  With the [Upload CSV to Update Records Feature](/articles/how-to-bulk-update-records-by-csv-upload)  
      
    ​
    
    * * *
    

#   
Transferring Data with Bulk Edit

With the help of the Bulk Edit feature, you can edit the user field for multiple records at once.  
  
For instance, you have to transfer leads from a Lead Owner Chris Bay to Julia Evans.  
  
You have to perform these two steps to get this done:

1.  The first step is to [filter](/articles/how-to-filter-data-in-orgzit) on the Lead Owner field to get all records where Chris Bay is the Lead Owner.  
      
    ​
    
    ![](/images/how-to-transfer-data-from-a-disabled-user-to-a-new-user/img-1.png)
    
2.  Once the filter is applied, use [Bulk Edit](/articles/how-to-bulk-edit-records) to change the Lead Owner from Chris Bay to Julia Evans at one go!  
      
    ​
    
    ![](/images/how-to-transfer-data-from-a-disabled-user-to-a-new-user/img-2.png)
    

* * *

# Transferring Data with Upload CSV to Update Records Feature

You can also use the [Bulk Update by Upload CSV](/articles/how-to-bulk-update-records-by-csv-upload) feature to update the Lead Owner field in one go.  
  
To do this, you have to perform the following steps:

1.  [Filter](/articles/how-to-filter-data-in-orgzit) on the Lead Owner field to get all records where Chris Bay is the Lead Owner.
    
2.  Once the filter is applied, download the current view with system internal values using the [download excel feature](/articles/how-to-download-your-orgzit-data-in-an-excel-sheet).  
      
    Here is a snapshot of the downloaded Excel.  
    ​
    
    ![](/images/how-to-transfer-data-from-a-disabled-user-to-a-new-user/img-3.PNG)
    
3.  Update the Lead Owner Field for the records.  
    For this, you will have to update the **<Lead\_Owner>\_id** field from Chris Bay's email address to Julia Evans's.  
      
    ​
    
    ![](/images/how-to-transfer-data-from-a-disabled-user-to-a-new-user/img-4.PNG)
    
4.  Once the **<Lead\_Owner>\_id** field is updated, save the CSV and upload it in Orgzit.
    

Once you perform these steps, your data will be successfully transferred from one user to another.

**These were the two methods of transferring data from a disabled user to another user in Orgzit! Check out the video to understand it better.**  
  
​

<iframe src="https://www.youtube.com/embed/H33tde6Zb2w?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>

  
​
