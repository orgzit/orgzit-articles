---
title: "How to set up the Table Details?"
slug: "how-to-set-up-the-table-details"
category: "How Tos"
summary: "This article describes how to set up the Table Details."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-01"
featured: false
---
Orgzit [Tables](/articles/how-to-set-up-a-new-table) allow you to store, organize, and analyze organizational data. Every workspace can have multiple tables. With Tables, you can track every activity that constitutes a workspace.

Orgzit lets you create as many tables as you need so that every aspect of your information workflow is neatly organized and tracked. You can create a new table from scratch or create one by a [CSV upload](/articles/how-to-create-a-new-table-using-csv-upload). Like any other database application, Orgzit Tables are made up of [fields](/articles/how-to-set-up-table-fields) and [records.](/articles/explore-records-how-to-create-edit-copy-delete-records)

To set up table-specific configurations and perform different operations, many [options](/articles/how-to-validate-clone-reset-or-delete-table) are available on the Table Manage page.

You can click on the gear icon at the top right of your workspace screen to go to the Table Manage page.

![](/images/how-to-set-up-the-table-details/img-1.png)

The very first section on the Table Manage page is that of **Table Details**, where you can set the basic information and settings for a table.

![](/images/how-to-set-up-the-table-details/img-2.png)

**List of Table Details**

**Name**

Here you can set the name of your table. It's best to keep a name that well defines the purpose and content of that table. It makes it easy to understand for all users.

![](/images/how-to-set-up-the-table-details/img-3.png)

**Description**

Here you can set the table description and enter relevant information that describes the table.

**Record Name**

You can also set a name for your record.

![](/images/how-to-set-up-the-table-details/img-4.png)

You can now see the button with the name you have set instead of the _+Record_ button. You can set a relevant name that matches with the table data. For eg,

![](/images/how-to-set-up-the-table-details/img-5.png)

**Title Formula**

You can also set a record title, which can be customized on the basis of requirements. You can format it to show specific information and details of a record.

_(Note: The Title Formula is written in Python language.)_

![](/images/how-to-set-up-the-table-details/img-6.png)

For instance, in case you want to view a record's key details as the _Title_ when you open the expanded view of a record, you can do so by setting the **Title Formula** in the Table Settings.

![](/images/how-to-set-up-the-table-details/img-7.png)

To see the value of some specific fields in the Title, you can specify its **Normalized Name** in the formula.

For instance, the Normalized Name for the field Customer Name will be customer\_name. You can find the normalized names in the Table Fields section in the Table Settings.

**Order By**

This is used to specify the order in which you want to view your records. You can sort your orders on the basis of any of your table fields. For eg, if you want to see the records in ascending order of ID you can choose the ID field. To view in the descending order, you can choose -ID.

![](/images/how-to-set-up-the-table-details/img-8.png)

**Search Fields**

In a related table, you can search for the field value by using Search Fields.

For instance, if you have a Leads table and an Interactions table to store the information about all lead interactions:

You can set the Search Field as Lead Name in the Interactions Table, which is related to the Leads table.

![](/images/how-to-set-up-the-table-details/img-9.png)

You can then use this to search for Leads in the Leads table and get the name you searched for.

![](/images/how-to-set-up-the-table-details/img-10.gif)

**Default View**

Here, you can set the default [view](/articles/how-to-create-custom-tabular-views) for your table. Each time you open a table, it opens to the default view. You can set any saved view as the default view of your table.

![](/images/how-to-set-up-the-table-details/img-11.gif)

**Default Filter**

You can set a default [filter](/articles/how-to-filter-data-in-orgzit) for your table. Each time you open a table, it will open up with the default filter applied. You can choose any one of the [saved filters](/articles/how-do-saved-filters-work) to act as the default filter.

![](/images/how-to-set-up-the-table-details/img-12.gif)

You can set the table details as per your requirement.

_Note: Only users with Administrator [Access Level](/articles/how-to-set-the-workspace-access-level) can set and edit the table details._

**You can watch this video to understand Table Details:**  
​

<iframe src="https://www.youtube.com/embed/Lh7nmvTFUjw?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
