---
title: "How to Send Emails Manually using Custom Action buttons?"
slug: "how-to-send-emails-manually-using-custom-action-buttons"
category: "How Tos"
summary: "This article describes the process to send emails manually in Orgzit by using custom action buttons."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-07-20"
featured: false
---
Using Orgzit, you can send emails manually as well as based on a particular condition, like a stage change or a specific date, by using [workflows](/articles/how-do-automations-work).  
  
​

You can send emails manually by clicking on a (Custom Action) button or by sending mails through the record's Interactions tab.

The process of sending emails using Custom Action buttons is divided into three steps:

1.  Creating Orgzit [Action Configs](/articles/action-configs-in-orgzit) to configure the emails
    
2.  Creating [Custom Actions](/articles/how-to-set-up-a-custom-action) to trigger the emails
    
3.  Sending the emails
    

## **Creating Orgzit Action Configs**

To do this, click on the **Table Settings** icon at the top right of your workspace. Now, move down to the **[Action Configs](/articles/action-configs-in-orgzit)** section. Configuring this section will eventually lead you to configure the way your email will look.

The following steps need to be performed for the same:

![](/images/how-to-send-emails-manually-using-custom-action-buttons/img-1.png)

1.  Click on **+Create** to create a new Action Config and choose **email** as the Action Type.
    
2.  Give a **name** to the Action Config, for instance, _Registration Successful._
    
3.  If you want to send the SMS to a specific email address, choose **Email as the recipient** and enter the email address to which you want to send the email.  
    OR  
    If you want to send the SMS to the email address stored in a particular field of a record, choose **Field as the recipient** and enter the name of the respective data field.  
    You can also configure the +CC and +BCC option in a similar manner.  
    Enter the Subject of the email.
    
4.  Next, enter the **[Template](/articles/how-to-customize-email-templates-in-email-action-config)**.  
    This template uses Django tags to refer to the columns of the table for the data. To refer a column/field which has the name as "Customer Name" and the slug as "customer\_name", we will use a tag as #{{customer\_name}}.
    
5.  You can click on **Preview** to see how your email will look like.
    

![](/images/how-to-send-emails-manually-using-custom-action-buttons/img-2.png)

## **Creating Custom Actions**

**[Custom Actions](/articles/how-to-set-up-a-custom-action)** are used to invoke the Action Configs. You can click on them to trigger the Action as per your requirement.

The following steps are to be performed to set up the Custom Action:

1.  Go to Table's settings and click on **Custom Action+**_._
    
2.  Give a **name** to the Custom Action, for instance, _Registration email._
    
3.  **Select the Action Config** that will be executed upon pressing this Custom Action's button. In this case, the action config will be _Registration Successful_.
    
4.  Select the groups/**roles** that can access this button of Custom Action.
    
5.  Click on **Save.**
    

![](/images/how-to-send-emails-manually-using-custom-action-buttons/img-3.png)

## **Sending the email**

Now that you have completed the first two steps of the process, it is time to reap the benefits.

There are two different ways to send the email manually:

1.  Click on the “three-dot” button at the beginning of a record and select the custom action. For instance, click on _“Registration email”._
    

![](/images/how-to-send-emails-manually-using-custom-action-buttons/img-4.png)

2\. You can also find the Custom Action in the list of **Actions** when you view the expanded version of your record.

![](/images/how-to-send-emails-manually-using-custom-action-buttons/img-5.png)

You can also automate this process if you want to send emails based on particular conditions. For this, there is an underlying process called [workflow](/articles/how-do-automations-work), which needs to be defined.

##   
Watch this video to see how can you send emails manually in Orgzit!

<iframe src="https://www.youtube.com/embed/_OFPryQn7QU?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
