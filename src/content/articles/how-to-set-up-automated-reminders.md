---
title: "How to set up Automated Reminders?"
slug: "how-to-set-up-automated-reminders"
category: "How Tos"
summary: "This article describes how to set up automated reminders."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2021-02-18"
featured: false
---
Every user has a wide range of tasks every day and keeping track of everything becomes a problem. Due to this, people often miss important tasks and calls.  
  
**Automated Reminders** are very helpful when you want to set up some reminders based on certain pre-specified conditions. They save your time and you no longer have to set a reminder every time at a certain condition, you can simply set up an automated reminder which will be triggered as soon as the conditions specified are met.  
  
Automated Reminders can help you in the following ways:

1.  To set up a scheduled reminder to follow up with a lead
    
2.  To remind you before a task's due date, and in many more ways.
    

# Setting up an Automated Reminder

You can set up an Automated Reminder, by following these steps:  
​

![](/images/how-to-set-up-automated-reminders/img-1.png)

1.  Create an [Automation(Workflow)](/articles/how-do-automations-work).
    
2.  Set the conditions, on which you want to set up a reminder.
    
3.  Choose **Create Reminder** as the Action Type.
    
4.  Enter the **Task Title**.  
      
    **The Task Title type can be Constant or Formula:**  
      
    Select **Constant** if you want to set a constant reminder title, for instance, Follow Up Call Today.  
      
    Select **Formula** if you want to customize the title with details.  
    You can switch to Formula by clicking on the toggle button. Then, write the formula like the one mentioned in the example below `"Meeting scheduled at {}".format(meeting_type)`  
    Here, you can write the content withing quotes "" and mention curly braces {} where you want to dynamically fetch value from a record.  
    You can specify the values in the `.format` function and specify the tags for the data fields by the **Insert Tag** button.  
      
    ​
    
    ![](/images/how-to-set-up-automated-reminders/img-2.png)
    
5.  Choose the **Task Owner Type**.  
    If you want to set this reminder for a specific user, choose the **User**.  
    And if you want to set it for a user that is specified in a particular field, choose the **field** option and specify the relevant field name. For instance, Task Owner.
    
6.  You can also set up a **Due Date and Time** for the task if required.  
      
    Specify the number of due days and time at which you want the reminder to be triggered.  
      
    ​
    
    ![](/images/how-to-set-up-automated-reminders/img-3.png)
    
      
    ​
    
7.  Once you've mentioned all conditions and reminder details, click on **Done**.
    

By performing these steps, you can successfully set up automated reminders for you and your team! Now, whenever your specified conditions will be met, you will receive an automated reminder on the Orgzit App and also on your email.

##   
Check out this video to understand how to set up Automated Reminders!  

<iframe src="https://www.youtube.com/embed/lPcDiQANrNE?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>

##   
  

  
​
