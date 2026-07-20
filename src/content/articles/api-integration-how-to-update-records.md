---
title: "API Integration: How to Update Records?"
slug: "api-integration-how-to-update-records"
category: "How Tos"
summary: "This article describes the process to update records in Orgzit through API."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-23"
featured: false
---
The Orgzit Web API is an interface for querying information _from_ and enacting change _in_ an Orgzit workspace. You can use the API not only to update records but also to [fetch](/articles/api-integration-how-to-fetch-records) records and [create](/articles/api-integration-how-to-create-records) records in Orgzit.

# Update Records

Updating records through API is a three-step process:

1.  Accessing the API Key
    
2.  Making a Record Update Request
    
3.  Making the Requests to Update the Record  
    ​
    

Below is a snapshot of a **Task Tracker** workspace. Let’s see the steps to update the Status data field of a record in the Task Tracker table by API Integration.

**Here, we will change the status of record ID 8 from 00-New to 02-On Hold.**

![](/images/api-integration-how-to-update-records/img-1.jpg)

## **1\. Accessing the API Key**

To access your API Key, [follow the steps mentioned in the support article here.](/articles/how-to-access-your-api-key)

## **2\. Making a Record Update Request**

Once you retrieve the API key from your account, you can start making requests with the API.

*   You will need to pass the key to the API in the header of your requests. Paste the key you copied in the **Authorization Header**.
    

![](/images/api-integration-how-to-update-records/img-2.png)

*   Set the Request Method to **PUT.**
    
*   The **Request URL** has the following format:  
    https://account\_name.orgzit.com/api/1/ozrecord/record\_id/
    

where the **account\_name** is the name of your Orgzit account and the **record\_id** is the ID of the record you have to update.  
​

To find the **record ID** of a record, open the expanded view of the record and copy its permalink.

![](/images/api-integration-how-to-update-records/img-3.jpg)

Within the **permalink**

[https://orgzitapidemo.orgzit.com/app/#r/](https://orgzitapidemo.orgzit.com/app/#r/)**kjp793idxg**/jhtxltf37l/tasks/sales-performance-reporting

, the ID right after /#r/ is the record ID.

*   Set the **Request Payload** in the JSON format.
    

```
{  "dataform_id": "jhtxltf37l",  "dataform": "/api/1/dataform/jhtxltf37l/",        "fields": {        "status": "02-On Hold"    }}
```

![](/images/api-integration-how-to-update-records/img-4.png)

**Dataform ID**

Here, _jhtxltf37l_ is the dataform\_id. You can find the dataform\_id in the URL just before your dataform/table name.

For eg.

[https://orgzitapidemo.orgzit.com/app/#p/p569l5eo7u/task-tracker/jhtxltf37l/tasks](https://orgzitapidemo.orgzit.com/app/#p/p569l5eo7u/task-tracker/jhtxltf37l/tasks)

  
Here, task-tracker is the dataform/table, and jhtxltf37l is the dataform\_id.

**Dataform**

Dataform refers to the Table that you are integrating with. Here, dataform contains the resource URL of the format _/api/1/dataform/dataform\_id/_

Here, _jhtxltf37l_ is the dataform\_id.

**Fields**

Within fields, you can pass the field names and their respective values that you want to update.

To get the **Field Names**, move to the **Table Manage** Page and go to the **Table Fields** section. The **Normalized Name** will be the field name that you have to pass to create a record.

![](/images/api-integration-how-to-update-records/img-5.jpg)

## **3\. Making the Requests to Update the Record**

Once you set all values for the record that you are about to update, send your API request.

You can now check your workspace dataform/table, you will find that your record has been updated with the values passed by you.

![](/images/api-integration-how-to-update-records/img-6.jpg)
