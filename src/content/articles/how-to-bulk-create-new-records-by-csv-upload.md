---
title: "How to Bulk Create New Records by CSV Upload?"
slug: "how-to-bulk-create-new-records-by-csv-upload"
category: "How Tos"
summary: "This article describes the process of creating new records in bulk by uploading a CSV."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-07-31"
featured: false
---
You can add data to your table in Orgzit at any time by creating a new record as per your requirement. By doing this, you can add one new record at a time. If you want to create new records in bulk, you can directly upload a CSV from your system into your table. This process saves time and increases the productivity of your system. You can also use the [CSV upload to update existing records in bulk.](/articles/how-to-bulk-update-records-by-csv-upload)

By using the Upload CSV feature to create records you can do the following:

1.  If you already have your data in a CSV file in your system, you can directly add it by creating new records in bulk by uploading the file. It saves you the time taken to create each record.  
    ​
    
2.  If you have data for some particular fields only, you can still upload it. You can then work on the new records created and fill in the other information as per your requirement.  
    For eg. If you are working on an Employee table of your organization and you wish to create records for all the new employees, you can simply upload the CSV which has the list of your newly added team members. By doing this, you can create records in bulk for all employees in one go!
    

## **To create new records in bulk, the following steps have to be performed**

Here's a screenshot of the sample workspace where we will create new records via CSV upload.

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-1.png)

1\. Click on the **Import/Export** button on the top of your table.

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-2.jpeg)

2\. Click on **Download Excel.**

  
The CSV file that you choose to upload must have the same column/field names as your Table in Orgzit. It helps to match the column and add the data in the right fields/columns. For this, the best way is to download the excel of your table data. Once you delete the data, the column names can act as a template for you to add records.  
  
​

3\. **Get your CSV ready** with the data you want to upload

In the mentioned example, you can see that the CSV file has exactly the same column names as the Orgzit table shown above.

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-3.png)

4\. Click on **Upload CSV**, Choose the **CSV file** from your system, and click on **Upload**

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-4.png)

You will get a notification stating that your records have been successfully updated. **In case of an error, you will get an email for the same.**

By performing these steps, you will be able to create new records in your table! You can refresh your screen to see the newly added records.

## **Creating Relationship and User Fields**

When you download an excel containing a relationship field, an ID is generated with the relationship data field. This ID identifies the record to which this relationship field is linked to another table.  
  
Similarly, in the case of a user field like the _Created By_ field, every user field has an ID field that contains the e-mail address of the user to identify the user.  
  
In both the above-mentioned cases, you need the respective field IDs to create the record. You can get the respective ids by downloading the excel of the related table with the **internal database values.** Once you get the record ids, you can use them to create relationship fields. Similarly, you can use the email ids generated with the user field to create the user fields.

For instance, in the picture below is a download from the _Customers_ table. Here, Customer Name is a relationship field, linked to the Customer table and the _Created By_ field is the user field.

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-5.jpeg)

## Common Errors and their Causes

In case of an error in the CSV upload process, you will get an email for the same. The email gives you information about the exact upload which has resulted in the error. It also points out the exact row and field where the error has occurred.  
  
Below are some email snapshots for some common errors made by users.

*   **Incorrect Header:** As mentioned, the column/field names in your CSV should exactly match the ones in your table. In this case, you can see the error tells you about the uploaded fields that do not match any table field.
    

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-6.png)

*   **Missing Header Fields:** If you do not mention the header fields in your CSV and only pass the data, you will get an error. The header fields are a must to map the right data to the right columns in the table.
    

*   **User Not Present:** In the User field, you can only add users that are a part of your workspace. You will get an error if you add a user who is not present in your Orgzit workspace.
    

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-7.png)

*   **Value Not Allowed:** You have to update a field with only permissible values. In the example here, the _status_ field is a dropdown that can only take values that have already been specified. If you pass a new value which it doesn't recognize, you'll get a similar error.  
      
    It is good for validation as in this case, **06-Pulblished** is passed instead of **06-Published.** With the help of such an error, you can identify and get rid of spelling or formatting errors.
    

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-8.png)

*   **Got Bad Value:** This error is due to formatting issues. A particular datatype expects a particular type of value only. It will give an error if you pass a different format of data.  
    In this case, **29/10/1996** is passed in a **Date** field. The standard format for a date field in Orgzit is yyyy-mm-dd.
    

![](/images/how-to-bulk-create-new-records-by-csv-upload/img-9.png)

##   

Apart from creating records in bulk in an existing table, Orgzit also gives you the power to create a new table by uploading a CSV. Check out the process for the same [here](/articles/how-to-create-a-new-table-using-csv-upload)!

You can also [update existing records in bulk by CSV upload](/articles/how-to-bulk-update-records-by-csv-upload).

## **Check out this video to understand the complete process!**  

<iframe src="https://www.youtube.com/embed/chBSKWBsmIA?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
