---
title: "How to Bulk Update Records by CSV Upload?"
slug: "how-to-bulk-update-records-by-csv-upload"
category: "How Tos"
summary: "This article describes the process to update records in bulk by CSV upload."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-16"
featured: false
---
Within your Orgzit workspace, you can add, edit, manage and analyze your data. You can use Orgzit's features to successfully implement your desired business workflows and make your system much more efficient and productive!

Orgzit provides an **Import/Export** feature for the following  
  
​

![](/images/how-to-bulk-update-records-by-csv-upload/img-1.jpeg)

1.  **[Download Excel:](/articles/how-to-download-your-orgzit-data-in-an-excel-sheet)** You can use this option to export your data from Orgzit to an excel sheet.
    
2.  **Upload CSV**: You can upload a CSV file from your system to [create new records](/articles/how-to-bulk-create-new-records-by-csv-upload) within the table or update the existing ones.  
      
    _Note: You also have an option to [create a new table by CSV upload](/articles/how-to-create-a-new-table-using-csv-upload)._
    

# Update Records by CSV Upload  

![](/images/how-to-bulk-update-records-by-csv-upload/img-2.png)

You can update records by uploading a CSV by following these steps:

  
1\. **Download the Excel**: By downloading the excel of your data in Orgzit, you will get the template to upload for making the update. You can use this to make the changes and then upload the CSV.  
  
While downloading the excel, make sure you download the columns **including the system internal database values.**  
  
​

![](/images/how-to-bulk-update-records-by-csv-upload/img-3.jpeg)

**2\. Update Field Values**: Once your sheet is downloaded, make the changes, and update the values wherever required.  
  
You will find a _record\_id_ for every downloaded record. This id identifies the specific record within your table. (Once you upload the data, it will be mapped against the same record id in the table for which you updated the values.)  
  
​

![](/images/how-to-bulk-update-records-by-csv-upload/img-4.jpeg)

## Updating Relationship and User Fields

When you download an excel containing a relationship field like the _Customer Name_ field, an ID is generated with the relationship data field. This ID identifies the record to which this relationship field is linked to another table. You can change the Field ID to update the relationship field value.  
  
Similarly, in the case of a user field like the _Created By_ field, every user field has an ID field that contains the e-mail address of the user to identify the user. You can update this ID field with the email address of any other user.  
  
Hence, by updating the Field IDs in both the above-mentioned cases, you can update the field values accordingly.  
  
​

**3\. Upload the CSV**: Once all the changes are made, save your file as a CSV. You can then choose the Upload CSV option by clicking on the Import/Export button to upload the CSV.

![](/images/how-to-bulk-update-records-by-csv-upload/img-5.gif)

You will get a notification stating that your records have been successfully updated. **In case of an error, you will get an email for the same.**  
  
​

![](/images/how-to-bulk-update-records-by-csv-upload/img-6.jpeg)

Once your CSV is successfully uploaded, refresh your workspace to see the changes you have made in your data.

# Common Errors and their Causes

In case of an error in the CSV upload process, you will get an email for the same. The email gives you information about the exact upload which has resulted in the error. It also points out the exact row and field where the error has occurred.  
  
Below are some email snapshots for some common errors made by users.

*   **Incorrect Header:** As mentioned, the column/field names in your CSV should exactly match the ones in your table. In this case, you can see the error tells you about the uploaded fields that do not match any table field.
    

![](/images/how-to-bulk-update-records-by-csv-upload/img-7.png)

*   **Missing Header Fields:** If you do not mention the header fields in your CSV and only pass the data, you will get an error. The header fields are a must to map the right data to the right columns in the table.
    

*   **User Not Present:** In the User field, you can only add users that are a part of your workspace. You will get an error if you add a user who is not present in your Orgzit workspace.
    

![](/images/how-to-bulk-update-records-by-csv-upload/img-8.png)

*   **Value Not Allowed:** You have to update a field with only permissible values. In the example here, the _status_ field is a dropdown that can only take values that have already been specified. If you pass a new value which it doesn't recognize, you'll get a similar error.  
      
    It is good for validation as in this case, **06-Pulblished** is passed instead of **06-Published.** With the help of such an error, you can identify and get rid of spelling or formatting errors.
    

![](/images/how-to-bulk-update-records-by-csv-upload/img-9.png)

*   **Got Bad Value:** This error is due to formatting issues. A particular datatype expects a particular type of value only. It will give an error if you pass a different format of data.  
    In this case, **29/10/1996** is passed in a **Date** field. The standard format for a date field in Orgzit is yyyy-mm-dd.
    

![](/images/how-to-bulk-update-records-by-csv-upload/img-10.png)

# **Check out this video to understand how to bulk update records by CSV Upload!**

<iframe src="https://www.youtube.com/embed/gqgfR8egU4c?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
