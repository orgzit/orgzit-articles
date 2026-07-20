---
title: "How to trigger Emails based on a condition?"
slug: "how-to-trigger-emails-based-on-a-condition"
category: "How Tos"
summary: "This article describes the process to send emails triggered by workflows in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-08-01"
featured: false
---
In Orgzit, you can not only send emails [manually](/articles/how-to-send-emails-manually-using-custom-action-buttons) but also automate them by some quick additional steps.  
​

The process of sending emails manually is a one-time exercise. After the set-up, the same process can be automated with the help of [automation(previously known as **workflow)**.](/articles/how-do-automations-work) This process saves time, manual effort, and sends emails based on required conditions.

**The process to execute this is divided into two parts:**

1.  Creating an [Action Config](/articles/action-configs-in-orgzit).  
    In this part, you will configure your email.
    
2.  Setting up automation.  
    In this part, you will set up the automation to automatically send emails based on the conditions you specify.
    

**Creating Orgzit Action Configs**  
​

To do this, click on the **Table Settings** icon at the top right of your workspace. Now, move down to the **Action Configs** section. Configuring this section will eventually lead you to configure the way your email will look.

**The following steps need to be performed for the same:**

![](/images/how-to-trigger-emails-based-on-a-condition/img-1.png)

1.  Click on **+Create** to create a new Action Config and choose **email** as the Action Type.
    
2.  Give a **name** to the Action Config.
    
3.  If you want to send the SMS to a specific email address, choose **Email as the recipient** and enter the email address to which you want to send the email.  
    OR  
    If you want to send the SMS to the email address stored in a particular field of a record, choose **Field as the recipient** and enter the name of the respective data field.  
    You can also configure the +CC and +BCC option in a similar manner.
    
4.  Enter the Subject of the email.
    
5.  Next, enter the **[Template](/articles/how-to-customize-email-templates-in-email-action-config)**.  
    This template uses Django tags to refer to the columns of the table for the data. To refer a column/field which has the name as "Customer Name" and the slug as "customer\_name", we will use a tag as #{{customer\_name}}.
    
6.  You can click on **Preview** to see how your email will look like.
    

![](/images/how-to-trigger-emails-based-on-a-condition/img-2.png)

## **Setting up an** automation

To set up an automation, the following process is to be followed:

1.  Go to Table's settings and select **Create Automation+**.
    
2.  Give a **name** to the **Automation**.
    
3.  Select Event Type as **Post Save**_._
    
4.  Fill in the **condition(s)** at which you want the **Automation** triggered. For instance, after a particular time period or at a change of state to some particular state.
    

![](/images/how-to-trigger-emails-based-on-a-condition/img-3.png)

  
5\. Select the **Automation Action** as Action Config.

6\. Then, from the list of [Action Configs](/articles/how-to-send-emails-manually-using-custom-action-buttons), select the one you want to be triggered when the above conditions are met.

![](/images/how-to-trigger-emails-based-on-a-condition/img-4.png)

Once you set up an Automation, to trigger the Action Config you have prepared to send emails, Orgzit will automatically send the email as soon as the set conditions are met. A similar process can also help automate the process of [generating PDFs](/articles/how-to-generate-pdfs-based-on-conditions), [sending SMSs](/articles/how-to-trigger-an-sms-based-on-a-condition), and calling.

##   
  
Watch this video to understand how to trigger emails based on conditions!  
  

<iframe src="https://www.youtube.com/embed/7Kl2u3y_ANY?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
