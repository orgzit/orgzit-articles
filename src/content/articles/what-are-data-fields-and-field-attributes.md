---
title: "What are data fields and field attributes?"
slug: "what-are-data-fields-and-field-attributes"
category: "Uncategorized"
summary: "Learn about all the field attributes in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2019-02-08"
featured: false
---
You can store your data in Orgzit in data fields. Data fields are similar to columns in a spreadsheet.

#   
  
List of Data Field Types

**You can choose from the following data field types in Orgzit:**  
  
**String:** This data type is used to store a sequence of letters and words like customer name, order status, etc.  
  
**Integer:** This data type is used to store integer values like the quantity of an item, number of orders, etc.  
  
**Decimal:** This data type stores decimal values. You can use it for fields like item prices, etc.  
  
**Date:** This data type stores data in a date format. You can use it to store dates like date of dispatch, date of employment, etc. according to your requirement.  
  
**Time:** This data type can be used is you want to store time in your field.  
  
**Document:** This data type can be used is you want to store a document like an invoice or payslip, etc. in your field.  
  
**Image:** This data type can be used is you want to store an image in your field.  
  
**User:** This data type can be used if you want to assign a [user](/articles/how-to-add-a-new-user-to-your-orgzit-account) to a record. For eg., you can assign an order to a salesperson or assign a task to a team member using this field. It's one of the ways to collaborate with other users in the workspace.  
  
**Location:** This data type can be used is you want to store a location in your field. Using this, you can also leverage the power of the [map view](/articles/map-view-in-orgzit) of your data.  
  
**Relationship:** You can use this data type if you want to link one table to another through this field.  
_For eg_. You have a Customer table with all your customer details and you have an Orders table with all order details. You can link the Order to a Customer by creating a Customer relationship field in your Orders table. By doing this, each order record will be linked to a customer from your customer table.  
  
**Relationship Value:** You can use this data type if you want to get the field value of a field from the table with which you have set up a relationship.  
_For eg.,_ if you want the Customer email address in your Orders table, and it's present in the related Customer table, you can use this data type and select the field whose value you want.  
  
[Learn more about how to add a new data field from this support article.](/articles/how-to-add-a-new-data-field)  
  
You can assign different field attributes to your data fields, according to your requirement. These attributes help in making your workflow more efficient.  
  
**Below is a list of all the Orgzit Field Attributes and what they are used for!**

[You can learn about which field attribute can be applied to which data type in this support article.](/articles/what-field-attributes-can-be-used-for-each-data-type)  
  
​

# List of Field Attributes  

**Admin Edit Only -** This attribute can be used to make a field editable only for the admin user.  
​

**Admin Only -** This attribute can be used to make a field accessible only for the admin user.  
​

**Auto Capture Location -** This attribute is used to automatically capture the location.  
​

**Auto Last Modified** \- This field attribute is used to automatically capture the last modified time/date/user.  
​

**Auto Select Relationship -** This attribute is used to automatically select the relationship.  
​

**Auto user except when admin -** This attribute is used to automatically select the user except when the user is admin.  
​

**Automatically assign value -** You can use this attribute to automatically assign values for a specific field.  
​

**Automatically increment -** This attribute is used to automatically increment the field's value. For instance your ID field.  
​

**Currency -** This attribute is used for a field in which you want to store some currency.  
​

**DB Index -** This attribute is used for performance improvement. We recommend applying the DB Index attribute to the **user** and **relationship** fields.  
​

**Default Country Code Prefix -** This attribute is used to set up a default country code prefix for phone numbers. For instance +91, +1, etc.  
​

**Default Relationship Value -** This attribute is used to make the default value the value captured from the relationship.  
​

**Default Today -** You can mark the date's default value as today using this attribute.  
​

**Default Value -** You can assign the default value of a field by using this attribute.  
For instance, the default value of a field Tax Rate can be set to 18%.  
​

**Default Value - Current User -** This attribute is used to set the default value of the user field as the current user.  
​

**Depends On -** If a field depends on a relationship field, this attribute can be used.  
​

**Detail Only -** If you do not require a field in the default view of your table and want it to be only in the expanded detail view, you can use this attribute.  
​

**Disable Comma -** You can use this to disable the comma in a decimal or integer field.  
​

**Disable View -** If you do not wish to create a view directly from a field, use this attribute.  
​

**Display records only to user mentioned in the field -** You can use this attribute to control the access of users to a record. Only the user mentioned in the field will be able to access the record.  
​

**Dropdown -** This attribute is used with a string field to create a dropdown list of field values.  
​

**Dropdown of administrators -** This attribute is used to list down all administrators in a dropdown.

  
​

**Dropdown of users -** This attribute is used to create a dropdown of all users. You can select the user in a field by selecting one from the dropdown.

  
​

**Dropdown of Users in Groups -** This attribute is used to list down users in a specific group or [role](/articles/how-to-manage-different-roles-in-a-workspace) in a dropdown.

  
​

**Email -** This attribute is used for a field in which you want to store an email.

  
​

**Field Condition -** Very often, a data field depends on another data field. This dependency can be of different types and is dealt with in the Orgzit workspace by the use of a field attribute called Field Condition.  
[Check out this support article to know about Field Conditions.](/articles/how-to-implement-field-conditions)

  
​

**Formula -** This attribute can be used if you want to configure a formula field to store some computed value. [Check out the guide to formulas in Orgzit.](/articles/guide-to-formulas)

  
​

**Hidden -** If you want to hide a particular field, you can use this attribute.

  
​

**Hidden During Create-** This attribute hides a data field from the create record form. You can use it for fields that are not required to be filled during record creation.

  
​

**Hidden for Roles -** If you want to hide a field from specific roles, you can use this attribute to set up a data field-level access control system.

  
​

**Make User Follow Record -** Using this attribute, you can enable a user to be notified about updates in a record.  
  
​

**Maximum Decimal Places -** This attribute defines the maximum decimal places you want for your decimal field.  
  
​

**Maximum Length -** You can use this attribute if you want to set a maximum permissible length for your string data field.  
  
​

**Maximum Value -** You can set a maximum value for your integer, decimal, string, date, and time data fields using this attribute.  
  
​

**Minimum Length -** You can use this attribute if you want to set a minimum permissible length for your string data field.  
  
​

**Minimum Value -** You can set a minimum value for your integer, decimal, string, date, and time data fields using this attribute.  
  
​

**Money -** You can use this attribute if you are using your integer or decimal field to store an amount of money.

**Notification when user changes -** If you want to be notified when the user in your user field changes, you can use this attribute.

**Phone Number -** You can use this attribute if you want to store a phone number in your string data field.

  

**Read Only -** This attribute makes a field read-only which means that you cannot edit the field's value once it is saved.

  
​

**Regular Expression Validation -** You can use this attribute if you want the values for that field to match the specified regular expression mentioned.  
  
​

**Related Aggregation -** You can use this attribute if you want to fetch the aggregated value of a field in a related table.

**Related Filter -** You can use this attribute if you want to filter values of a field according to a relationship field.

  
​

**Required -** This attribute makes a data field mandatory. You cannot proceed without filling in its value.

  
​

**Roles Edit Only -** You can set this attribute if you want only specific roles to have edit access to a particular data field. No other role can set the initial value for such a field while creating a record too.  
  
​

**Roles Edit Only Create Any-** You can set this attribute if you want only specified roles to edit this data field but any user role can create it initially.

**Show in Record List (Android) -** This attribute is applicable only to Image data fields. The images stored in these fields are shown directly in the records list on mobile.

  
​

**Stages -** This attribute is similar to the dropdown attribute with a special ability. Stage Transition Rules enable you to control who can make a particular stage change. You can set rules for every possible stage change within your table.  
[Check out this support article to know more.](/articles/how-to-set-up-stage-transition-rules)  
​

**Textarea -** You can use this attribute to set up a text area for your String field.

**Unique -** You can use this attribute if you want the values in this data field to be unique.

**URL -** You can use this attribute if you want to store a URL in the field.

**Visible for Roles -** If you want to make the field visible for specific roles, you can use this attribute to set up a data field-level access control system.  
​

**Visible only to admin -** You can use this attribute if you want the field to be visible only to the admin.

**WhatsApp Action -** You can use this attribute if you want to connect to WhatsApp Web using your contacts saved in Orgzit. [Check out this article to know more!](/articles/how-to-set-up-whatsapp-integration)
