---
title: "Expense Docket Process"
slug: "expense-docket-process"
category: "Project PnL and Expense Management"
summary: "Manage expenses in a simple way that enables you to track profitability of each project or business function."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2019-02-08"
featured: false
---
# Step 1 of 8: Overview of Expense Dockets

This articles describes the lifecycle for an Expense Docket.  
  
An Expense Docket represents a group of expenses for a specific purpose.  For instance, a trip to Client Location includes many expense items like travel, food, lodging, etc. These expense items constitute an expense docket.

When expenses are in question, there are two types of expenses listed in Orgzit.

![](/images/expense-docket-process/img-1.png)

1.  **Paid by employee**  
    These are the expenses paid by the employee from his own funds. For such expenses, the employee should receive a reimbursements from the company. 
    
2.  **Paid by company**  
    These are expenses that have been paid using the company's funds. That is, any expense paid by the company account and not the employee’s personal account. Such expenses do not have to be reimbursed by the company to the employee. 
    

Lifecycle of Expense Dockets is depicted in the below image.

![](/images/expense-docket-process/img-2.jpg)

_Bonus Tip: Expense Dockets have limited access. That is, a user cannot view all expense dockets. Expense dockets are viewable only to the person who has submitted the expense docket. Management & Account users can view all expense dockets._

# Step 2 of 8: Let’s create an expense docket

a. Switch to the "Expense Dockets" table by clicking on the tab named “**11-Expense Dockets**”.

![](/images/expense-docket-process/img-3.png)

b. Close to the top right corner of your screen, you will see a button called "**_+Expense docket_**".

c.Clicking on this button will open a popup with a form for creating an expense docket.

![](/images/expense-docket-process/img-4.png)

d. On the form, you need to fill the data in the respective fields. Some of these fields can be filled from the dropdown menu available against the field.  
  
For eg. The field called "**Project**" which lists the existing projects.

e. Let me explain you the purpose of the field "**Type of Transaction**" field.

![](/images/expense-docket-process/img-5.png)

f. The "**Project**" is also an important field that deserves a description. All expenses entered in the system are associated with one project. This is irrespective of the type of transaction.

By associating expenses with a project, the system is able track all the expenses for each of the projects. This can be used to compute the Profit/Loss summary of the project.  
  
g. Click on the "**_Create_**" button to create the expense docket.

# Step 3 of 8: Let’s add expense items under expense dockets

a. Let’s view the complete details of the expense docket you just created. 

You can do this clicking on the double arrow button that appears in the beginning of the row for each expense docket.

b. You should be able to see a popup with the complete expense docket details. It should look similar to the below screenshot.

![](/images/expense-docket-process/img-6.png)

c. Scroll down the popup and you will see a section named “**Related Apps**". This section lists the child records for this expense docket. 

d. You should see a blue button named “**\+ New expense item**”.

e. Clicking on this button will open a popup where you can fill the expense item's details. 

![](/images/expense-docket-process/img-7.png)

f. After feeding the data, click on the “**Create**” button. A record will be added in the “**Expense items**” table.

g. There can be several expense items under one expense docket. So, feel free to add multiple expense items.

# Step 4 of 8: Submit an Expense Docket

To submit an expense docket for approval, you should change its status to "**01-Submitted**".

Once an expense docket is submitted, new expense items cannot be added to it.

![](/images/expense-docket-process/img-8.png)

# Step 5 of 8: Management Approves Expense Docket 

An Expense Docket has to be approved in 2 steps:

1.  Approval by Management
    
2.  Approval by Accounts
    

Management users can approve or reject an Expense Docket. At this stage, management users typically do a basic verification to check that the submitter has the authority to submit the expense report.

To give management approval for an expense docket, change its status to "**02-Approved By Head**".

![](/images/expense-docket-process/img-9.png)

_Note: In your pre-installed workspace, you would be an admin user and hence will be able to approve the expense dockets._

_Bonus Tip: Management also has the capability to reject selected expense items of an expense docket and approve all the other items._

# Step 6 of 8: Accounts Approves Expense Docket 

Once an expense docket has been approved by the management, it is then forwarded to the Accounts department for a second approval and payout. 

Accounts typically does a more comprehensive review of the expense, typically including following checks:

1.  Budgetary checks
    
2.  Review expense bills
    

To give management approval for an expense docket, change its status to "**03-Approved By Accounts**".

![](/images/expense-docket-process/img-10.png)

  
Once approved, the expense docket will automatically get added to the projects' total expenses. 

# Step 7 of 8: Accounts reimburses Expense Docket

The last step in the Expense Docket lifecycle is for the accounts department to pay out and settle the expense docket of type "**_Paid by Employee"_**. 

Payments made against Expense Dockets should be entered in the "**13-Employee Payments**" table. 

![](/images/expense-docket-process/img-11.png)

Once the payment has been settled, the accounts department can close the expense docket by changing its status to "**04-Closed**". 

# Step 8 of 8: Management or Accounts Rejects Expense Docket

Either the management or the accounts can reject an expense docket while it is pending approval. 

To do this, change the expense docket's status to "**05-Rejected**".

![](/images/expense-docket-process/img-12.png)

_Bonus tip: It's also possible to reject specific expense items and approve the rest._

![](/images/expense-docket-process/img-13.gif)

Are you ready to setup Expense Management with Orgzit your team? You can get started with a meeting with an Orgzit expense management expert.

<div class="intercom-container intercom-align-center"><a class="intercom-h2b-button" target="_blank" href="https://calendly.com/teamorgzit/30min">Setup Meeting with Orgzit Team</a></div>
