---
title: "How to implement Field Conditions?"
slug: "how-to-implement-field-conditions"
category: "How Tos"
summary: "This article gives an overview of the field conditions feature in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-04"
featured: false
---
Within an Orgzit workspace, data is stored in tables with [data fields](/articles/how-to-set-up-table-fields) and [records](/articles/explore-records-how-to-create-edit-copy-delete-records). Orgzit data fields can store different types of values and have different functionalities added to them by using appropriate field attributes. There's also a feature to group together data fields, using [Field Sections](/articles/how-to-manage-field-sections), to keep the data more organized and easy to read.

Very often, a data field depends on another data field. This dependency can be of different types and is dealt with in the Orgzit workspace by the use of a field attribute called **Field Condition**.  
  
Using this attribute, you can set the conditions on which your field is dependent, and also specify the action you want to perform if those conditions are met.

*   In your Invoicing system, Hide the Discount Rate if _Discount Applicable?_ field is No
    
*   In your Invoicing system, make the Discount Rate as Required, if _Discount Applicable?_ field is Yes  
    ​
    

# Uses

Using the **Field Condition** field attribute, you can perform three types of operations on the dependent field:

1.  **Hide:** You can use this action if you want to hide a field if the specified conditions hold true.  
    For instance, if you have an Invoice table and you ask for the tax rate if the value of tax applicable? the field is yes, you can hide the tax rate field whenever the value of the tax applicable field is no using Field Condition.  
      
    ​
    
2.  **Read Only:** You can use this action if you want to convert a field to read-only the specified conditions hold true.  
      
    ​
    
3.  **Required:** You can use this action if you want to convert a field to a required one if the specified conditions hold true.  
    For instance, if the tax applicable value is yes, you can make the tax rate as required. Once you make a field required, you cannot proceed before setting the field's value.
    

You can set the Field Condition attribute while creating a new field or to an already existing field.  
​

_Note: Only a user with the Access Level of an Administrator can add a field attribute._

# Set Up the Field Condition Attribute

To add the **Field Condition** attribute, click on the arrow next to the field name in the table, and click on edit.

Add the **Field Condition** attribute in the **Attributes section**. Set the conditions on which your field is dependent.

![](/images/how-to-implement-field-conditions/img-1.gif)

You can set more than one condition or dependency in one of the two ways:

1.  If you want to perform an action if all specified conditions are satisfied, add conditions by clicking on the **+New Condition** button within the same dependency.  
    ​
    
2.  If you want to perform different actions on different conditions, add conditions by clicking on the **+New Field Condition** button on the top right.
    

![](/images/how-to-implement-field-conditions/img-2.png)

3\. Once you specify all the dependencies, choose the appropriate action that you want to perform. You can hide a field, make it read-only or required, according to your requirement.  
​

![](/images/how-to-implement-field-conditions/img-3.png)

4\. Once you set the condition(s) and action(s), click on done!

In this way, you can set the field condition attribute based on your business requirement.  
  
**Note**  
  
Within a Dependency, you can set up multiple conditions which will have an AND effect on them -> `Condition1 AND Condition2 AND Condition3`  
  
You can also create multiple Dependencies, which will have an OR effect on them -> `Dependency1 OR Dependency2 OR Dependency3`  
  
​

## Check out this video to understand Field Conditions!

<iframe src="https://www.youtube.com/embed/3IdJeECGJP8?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
