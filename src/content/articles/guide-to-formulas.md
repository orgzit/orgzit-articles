---
title: "Guide to Formulas"
slug: "guide-to-formulas"
category: "Uncategorized"
summary: "This article describes the different formulas that can be used in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-16"
featured: false
---
In Orgzit there are many different [table fields](/articles/how-to-set-up-table-fields) and attributes that you can add to a table; one of them is the formula attribute. Formulas let you reference other fields in a table and create different functions based on the content of those fields. This article will cover how to write and format formulas and use it not only in fields but also workflows, emails, pdfs, record names, and many other places.

# Use of Formulas

Formulas allow you to compute a value based on values in other fields. Note that these formula field types are slightly different from formulas in a spreadsheet. In a spreadsheet, you can put a formula in any cell, and have it reference any other cell in the sheet. In Orgzit, you configure formula fields that apply the same formula to every record in the table. As such, these formulas reference other fields rather than other cells so that they apply to every record.

You can use formulas in Orgzit to configure the following:  
  
(**_Note_**: All formulas in Orgzit are written in Python.)

*   **Fields**: You can use the formula field attribute and compute the field value on the basis of the formula applied. For eg., you can make computations using values from other fields in the same record.  
    ​
    

![](/images/guide-to-formulas/img-1.png)

For instance, you can have a formula field to calculate the amount, by setting the formula as price \* quantity, where price and quantity are the normalized field names for the fields containing the price and quantity of an item respectively.  
  
_Remember: Field Values with the formula attribute cannot be edited._

*   **[Workflows](/articles/how-do-automations-work):** With workflows, you can automate your business processes and perform condition-based actions. As an automated action, you can also set the value of a field and apply a formula in the same.
    

![](/images/guide-to-formulas/img-2.jpeg)

  
You can simply use a formula in a workflow by setting the action as set field/child field value and choosing the field value type as a formula.  
For instance, you can calculate the Amount field of an Order as soon as the Price and Quantity values are entered.  
​

*   **[emails](/articles/how-to-customize-email-templates-in-email-action-config), [PDFs](/articles/how-to-customize-pdf-template), and [SMSs](/articles/how-to-customize-sms-template)**: Templates for all these are written as Django templates. Formulas can be used within these templates to compute values, whenever required.  
    ​
    
*   **[Title Formula:](/articles/how-to-set-up-the-table-details)** You can use formulas to set the record title. You can customize the Title according to your requirement and use the power of formulas to do so.
    

![](/images/guide-to-formulas/img-3.jpeg)

*   **Error Message and Notifications:** You can use formulas to include values in error messages in notifications if required.
    

#   
Guide to Writing Formulas

Remember, while writing a formula, you can reference fields by their normalized field names(slugs). You can find the normalized field names or slugs in the Table Fields section in the Table Manage page.  
​

![](/images/guide-to-formulas/img-4.jpeg)

## **Basic Operations**  

**Sum**: You can add two fields using the '+' operator.  
Eg. Set formula for `amount` field as `price + tax`

**Difference**: You can subtract two fields using the '-' operator.  
Eg. Set formula for `amount` field as `price + tax - discount`  
​

**Product:** You can compute the product of two fields using the '\*' operator.  
Eg. Set formula for `total_price` field as `unit_price * quantity`  
​

**Division**: You can divide two fields using the '/' operator.  
Eg. Set formula for `discount` field as `discount_rate/100 * price`

##   
  
**Date and Time Functions**  
  
1\. **Function:** diff\_datetime  

**Syntax:** `diff_datetime(date2, date1, timeunit)`  
**Use:** Returns difference between two dates `date_2 - date_1` converted to appropriate time unit.

The result is always an integer. The difference is rounded down to the nearest integer.

**Examples:**  
If date\_2 = 2021/01/01 and date\_1 = 2020/01/01  
​

year: `diff_datetime(date_2, date_1, ‘year’)` → 1

month: `diff_datetime(date_2, date_1, ‘month’)` → 12

week: `diff_datetime(date_2, date_1, ‘week’)` → 53

You can use this formula to also compute the difference between two dates in terms of days, hours, or minutes.

**2\. Function: datetime(<date\_field\_slug>)**  
  
**Use**: Converts date field (Orgzit's format of date string) to **DateTime** for operations.  

## **3\. Function:** **delta**  

**Syntax:** `delta(days=<number-of-days>)`  
Note: number-of-days can be a constant number or can refer to a field containing the required number.  
**Use:** To get a future or past date. Generates a **TimeDelta** object representing number of days which can be added/removed from DateTime (not string representation)  
  
**Example:**

Let manufacturing\_date be a date field  
​

**Get a Future Date:** `datestr(datetime(manufacturing_date) + delta(days=10))`  
Eg. Formula to get product\_expiry\_date:  
`datestr(datetime(batch_date) + delta(days=days_to_expiry))`  
​

**Get a Previous Date:** `datestr(datetime(manufacturing_date) - delta(days=10)`  
  
**Use Case Examples:**

Computation of Warranty Expiry

Computation of Product Expiry Date

**4\. Function: age**  
  
**Syntax:** `_age(fieldslug, ‘’)`

`_age(fieldslug, ‘’, ‘sat’, ‘sun’)`  
**Use:** Compute age of a record vis-a-vis today.

You can also exclude regular weekly offs while computing age.  
​

**Note:** The age includes both the start and end date.

## **Title Formula, Workflow Error and Notifications**

You can use formulas to format the Title Formula, Workflow Errors, and Notifications. You can include strings and values from a record to customize the end result for a particular record.

**Function: format()**  
  
You can simply write the string or message and include '{}' wherever you want to include a field value. Then, by using the format function, you can pass all field values using the normalized field names as values in the function.  
  
**Syntax:**`{ } .format(value)`

Parameters :

(value) : Can be an integer, string, characters or even variables. You can use normalized field names as value, to get the field value specific to a record.

Returntype : Returns a formatted string with the value passed as parameter in the placeholder( {} ) position.  
​

**Use:** It helps in string formatting. This method lets us concatenate elements within a string through positional formatting.  
​

**Example:**

For Title Formula: `"[{}] SO: {}".format(client.company_name, so_number)`

![](/images/guide-to-formulas/img-5.jpeg)

For Notification: `Lead has been assigned to you: {} - {}".format(company, lead_name)`  
  
This was a guide to walk you through the most commonly used formulas within Orgzit that can help you compute values and cutomize notifications, etc according to your need. Using formulas make your computations more accurate and also increases the overall efficiency of your business workflow.  
  
**_If you need help with formulas, reach out to our Support Team at support@orgzit.com_**  
​
