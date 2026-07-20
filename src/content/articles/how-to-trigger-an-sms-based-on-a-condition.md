---
title: "How to trigger an SMS based on a condition?"
slug: "how-to-trigger-an-sms-based-on-a-condition"
category: "How Tos"
summary: "This article describes the process to send SMSs triggered by workflows in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-07-10"
featured: false
---
In Orgzit, you can not only send SMSs [manually](/articles/how-to-send-sms-manually-in-orgzit) but also automate them by some quick additional steps.  
  
By using this feature you can:

1.  Send SMS notifications to leads, customers, team members etc
    
2.  Send SMSs when a particular task is completed
    
3.  Send SMSs at a particular date
    
4.  Send SMSs when a particular condition is met  
    ​
    

Triggering SMSs based on a condition is a two-step process:

1.  [Create the SMS Action Config](/articles/how-to-set-up-sms-action-config) - Read the linked document to learn how to create SMS Action Configs
    
2.  Set up an Automation (Workflow) to trigger it based on condition
    

## Set up an Automation (Workflow) to trigger SMSs

The process of sending SMSs manually is a one-time exercise. After the set-up, the same process can be automated with the help of automations (previously workflows). This process saves time, manual effort and sends SMSs based on required conditions.  
​

To execute this feature, the following process is to be followed:

![](/images/how-to-trigger-an-sms-based-on-a-condition/img-1.png)

1.  Go to Table's settings and select **Create Automation+**.
    
2.  Give a **name** to the Automation.
    
3.  Select Event Type as **Post Save**_._
    
4.  Fill in the **condition(s)** at which you want the workflow triggered. For instance, after a particular time period or at a change of state to some particular state.
    

![](/images/how-to-trigger-an-sms-based-on-a-condition/img-2.png)

5\. Select the **Workflow Action** as [Action Config](/articles/action-configs-in-orgzit).

6\. Then, from the list of Action Configs, select the one you want to be triggered when the above conditions are met.

![](/images/how-to-trigger-an-sms-based-on-a-condition/img-3.png)

Once you set up a workflow, to trigger the Action Config you have prepared to send SMSs, Orgzit will automatically send the SMSs as soon as the set conditions are met.  
  
A similar process can also help automate the process of [generating PDFs](/articles/how-to-set-up-a-workflow-to-generate-professional-pdfs-by-changing-the-status), sending emails, and calling.

**You can also check out the video for this process here:**  
​

<iframe src="https://www.youtube.com/embed/y3wJutiOwZw?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
