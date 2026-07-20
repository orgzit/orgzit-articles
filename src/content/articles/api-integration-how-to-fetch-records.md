---
title: "API Integration: How to Fetch Records?"
slug: "api-integration-how-to-fetch-records"
category: "How Tos"
summary: "This article describes how to fetch records using API."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-18"
featured: false
---
The Orgzit Web API is an interface for querying information _from_ and enacting change _in_ an Orgzit workspace. You can use the API not only to fetch records but also to [create](/articles/api-integration-how-to-create-records) records and [update](/articles/api-integration-how-to-update-records) records in Orgzit.

Below is a snapshot of a **Task Tracker** workspace. Let’s see the steps to fetch records from the Task Tracker table by API Integration.

![](/images/api-integration-how-to-fetch-records/img-1.png)

# Fetch Records

Fetching records through API is a three-step process:

1.  Accessing the API Key
    
2.  Making a Record Fetch Request
    
3.  Making the Requests to Fetch the Records and Getting the Response
    

## **1\. Accessing the API Key**

To access your API Key, [follow the steps mentioned in this support article.](/articles/how-to-access-your-api-key)

## **2\. Making a Record Fetch Request**

Once you retrieve the API key from your account, you can start making requests with the API.

*   You will need to pass the key to the API in the header of your requests. Paste the key you copied in the **Authorization Header**.  
    ​
    

![](/images/api-integration-how-to-fetch-records/img-2.jpg)

*   Set the Request Method to **PUT**.  
    ​
    

![](/images/api-integration-how-to-fetch-records/img-3.png)

*   The **Request URL** has the following format:  
    https://account\_name.orgzit.com/api/1/ozrecord/filter/?limit=20  
    where the account\_name is the name of your Orgzit account.  
      
    In the shared collection, it is _[https://orgzitapidemo.orgzit.com/api/1/ozrecord/filter/?limit=20](https://orgzitapidemo.orgzit.com/api/1/record/filter/?limit=20)_
    

In the above-mentioned Request URL, the Query Parameter is limit. The value of **limit** shows the number of records you will fetch at a time.

![](/images/api-integration-how-to-fetch-records/img-4.png)

*   Set the **Request Payload** in the **JSON** format.
    

```
{  "dataform": "jhtxltf37l",  "filters": null,  "getfieldvalues": false}
```

![](/images/api-integration-how-to-fetch-records/img-5.png)

**Dataform**

Dataform refers to the Table that you are integrating with. Here, _jhtxltf37l_ is the dataform\_id.

You can find the dataform\_id in the URL just before your dataform/table name.

Here, the URL is _[https://orgzitapidemo.orgzit.com/app/#p/p569l5eo7u/task-tracker/jhtxltf37l/tasks](https://orgzitapidemo.orgzit.com/app/#p/p569l5eo7u/task-tracker/jhtxltf37l/tasks)_

Here, **task tracker** is the dataform/table, and _jhtxltf37l_ is the dataform\_id.

## **3\. Making the Requests to Fetch the Records and Getting the Response**

Once you send your API request now, you will fetch the first 20 records from your specified table.

Here is a snapshot of the response. It has successfully fetched the first 20 records from the Task Tracker table.

![](/images/api-integration-how-to-fetch-records/img-6.png)

# Fetch Records with Pagination Offset

To fetch records with a pagination offset, you can set the offset query parameter in your request URL.

_https://account\_name.orgzit.com/api/1/ozrecord/filter/dataform\_id/?limit=20&offset=20_

![](/images/api-integration-how-to-fetch-records/img-7.png)

# Fetch Records with Filters

To fetch records with filters applied, you can mention the filters in your Request Payload.

```
{  "dataform": "jhtxltf37l",  "filters": [    {      "field": "status",      "op": "contains",      "values": [        "new"      ]    }  ],  "getfieldvalues": false}
```

![](/images/api-integration-how-to-fetch-records/img-8.png)

Here, the **field** depicts the name of the field on which the filter is applied, **op** depicts the condition on which data is being filtered (here, it is ‘contains’) and **values** show the value on which the filter condition is being applied.  
  
You can find the [list of all possible Filter Conditions according to the data type in the support doc here.](/articles/filter-conditions)
