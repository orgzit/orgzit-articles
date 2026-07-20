---
title: "API Integration: How to Create Records?"
slug: "api-integration-how-to-create-records"
category: "How Tos"
summary: "This article describes the process to create a record in Orgzit through API."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-22"
featured: false
---
The Orgzit Web API is an interface for querying information _from_ and enacting change _in_ an Orgzit workspace. You can use the API not only to create records but also to [fetch](/articles/api-integration-how-to-fetch-records) and [update](/articles/api-integration-how-to-update-records) records in Orgzit.

Below is a snapshot of a **Task Tracker** workspace. Let’s see the steps to create new records in the Task Tracker table by API Integration.

![](/images/api-integration-how-to-create-records/img-1.png)

# Create Records

Creating records through API is a three-step process:

1.  Accessing the API Key
    
2.  Making a Record Create Request
    
3.  Making the Requests to Create the Record and Getting the Response
    

## **1\. Accessing the API Key**

To access your API Key, [follow the steps mentioned in the support doc here.](/articles/how-to-access-your-api-key)

## **2\. Making a Record Create Request**

Once you retrieve the API key from your account, you can start making requests with the API.

*   You will need to pass the key to the API in the header of your requests. Paste the key you copied in the **Authorization Header.**  
    Below is a snapshot of the Postman software Headers section.
    

![](/images/api-integration-how-to-create-records/img-2.png)

*   Set the Request Method to **POST**.
    

![](/images/api-integration-how-to-create-records/img-3.png)

*   The **Request URL** has the following format:  
    _[https://account\_name.orgzit.com/api/1/ozrecord/](https://account_name.orgzit.com/api/1/record/)_  
    where the account\_name is the name of your Orgzit account.  
      
    _Here, it is [https://orgzitapidemo.orgzit.com/api/1/ozrecord/](https://orgzitapidemo.orgzit.com/api/1/record/)_  
    ​
    

*   Set the **Request Payload** in the **JSON** format.
    

```
{    "dataform_id": "jhtxltf37l",        "dataform": "/api/1/dataform/jhtxltf37l/",    "fields": {        "task_name": "test new record 1"    }}
```

![](/images/api-integration-how-to-create-records/img-4.png)

**Dataform(Table) ID**

You can find the dataform\_id in the URL just before your dataform/table name.

Here, the URL is  
[https://orgzitapidemo.orgzit.com/app/#p/p569l5eo7u/task-tracker/jhtxltf37l/tasks](https://orgzitapidemo.orgzit.com/app/#p/p569l5eo7u/task-tracker/jhtxltf37l/tasks)

Here, **task tracker** is the dataform/table, and _jhtxltf37l_ is the dataform\_id.

**Dataform**

Dataform refers to the Table that you are integrating with.  
Here, dataform contains the resource URL of the format _/api/1/dataform/dataform\_id/_

Here, _jhtxltf37l_is the dataform\_id.

**Fields**

Within fields, you can pass the field names and their respective values with which you want the record to be created.

To get the Field Names, move to the **Table Manage** Page and go to the **Table Fields** section. The **Normalized Name** will be the field name that you have to pass to create a record.

![](/images/api-integration-how-to-create-records/img-5.jpg)

## **3\. Making the Requests to Create the Record and Getting the Response**

Once you set all values for the new record that you are about to create, **send your API request.**

You can now check your workspace dataform/table, you will find that your record has been created with the values passed by you!

![](/images/api-integration-how-to-create-records/img-6.jpg)
