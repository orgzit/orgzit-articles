---
title: "How to generate PDFs based on conditions?"
slug: "how-to-generate-pdfs-based-on-conditions"
category: "How Tos"
summary: "This article describes the process to generate PDFs based on conditions."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-07-31"
featured: false
---
In Orgzit, you can not only generate PDFs [manually](/articles/how-to-create-professional-pdfs-in-orgzit) but also automate them by some quick additional steps.  
​

The process of generating PDFs manually is a one time exercise. After the set-up, the same process can be automated with the help of a [workflow](/articles/how-do-automations-work). This process saves time, manual effort, and generates PDFs based on required conditions.  
​

**The process to execute this is divided into two parts:**

1.  Creating an [Action Config](/articles/action-configs-in-orgzit).  
    In this part, you will configure your PDF.  
    ​
    
2.  Setting up an [automation](/articles/how-do-automations-work).  
    _Note: Automation was previously known as workflow in Orgzit_  
    In this part, you will set up the automation to automatically generate PDF based on the conditions you specify.
    

**Creating an Action Config**

![](/images/how-to-generate-pdfs-based-on-conditions/img-1.png)

1.  Go to **Table Settings** and select PDF in the type of **Action Configs** after clicking on _Create+._
    
2.  Give a **name** to the Action Config, for instance, say "Payslip".
    
3.  Select where to store the PDF Document to be generated which could either be a table's column (field with the data type as Document) or as the Record's file.
    
4.  Give a **name** to the file that will be generated.
    
5.  Select the **Page Size** as well as **Orientation**.
    
6.  Next, enter the code for the **[PDF Template](/articles/how-to-customize-pdf-template)**.  
    This template uses Django tags to refer to the columns of the table for the data. To refer a column/field which has the name as "Invoice Number" and the slug as "invoice\_number", we will use a tag as #{{invoice\_number}}.
    
7.  After successfully saving it, one can use the **preview** option on a record and see in real-time as to how the PDF will come out.  
    ​
    

![](/images/how-to-generate-pdfs-based-on-conditions/img-2.png)

##   
  
Setting up an Automation

1.  In the Table Settings, click on **Create** Automation+.
    
2.  Give a **name** to the automation.
    
3.  Select Event Type as **Post Save**_._
    
4.  Fill in the **condition(s)** at which you want the automation triggered. For instance, after a particular time period or at a change of state to some particular state.
    

![](/images/how-to-generate-pdfs-based-on-conditions/img-3.png)

5\. Select the **Automation Action** as _Action Config_.

6\. Then, from the list of Action Configs, select the one you want to be triggered when the above conditions are met. In this case, choose _Payslip,_ the action config you just created above.

![](/images/how-to-generate-pdfs-based-on-conditions/img-4.png)

Once you set up an automation, to trigger the Action Config you have prepared to send PDFs, Orgzit will automatically generate the PDFs as soon as the set conditions are met.  
​

![](/images/how-to-generate-pdfs-based-on-conditions/img-5.gif)

A similar process can also help automate the process of [sending SMSs](/articles/how-to-trigger-an-sms-based-on-a-condition), [sending emails](/articles/how-to-trigger-emails-based-on-a-condition), and calling.  
​

**Check out this video to understand PDF Generation in Orgzit!**  
  
​

<iframe src="https://www.youtube.com/embed/Lmixsl4YfqQ?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
