---
title: "How to send SMS manually in Orgzit?"
slug: "how-to-send-sms-manually-in-orgzit"
category: "How Tos"
summary: "This article describes the process to manually send SMSs from your workspace at Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-07-09"
featured: false
---
Using Orgzit, you can send SMS manually as well as based on a [particular condition](/articles/how-to-trigger-an-sms-based-on-a-condition), like a stage change or a specific date.  
​

The process of sending SMS manually is divided into three steps:

1.  Creating Orgzit [Action Configs](/articles/action-configs-in-orgzit) to send SMS
    
2.  Creating [Custom Actions](/articles/how-to-set-up-a-custom-action) to trigger the required action
    
3.  Sending the SMS  
    ​
    

## **Creating Orgzit Action Configs**

To do this, click on the **Table Settings** icon at the top right of your workspace. Now, choose the **Action Configs** section. Configuring this section will eventually lead you to configure the way your SMS will look.

![](/images/how-to-send-sms-manually-in-orgzit/img-1.png)

The following steps need to be performed for the same:

1.  Click on **+Create** to create a new Action Config and choose **SMS** as the Action Type.
    
2.  Give a **name** to the Action Config, for instance, _Registration Successful._
    

![](/images/how-to-send-sms-manually-in-orgzit/img-2.png)

3\. If you want to send the SMS to a specific phone number, choose **Phone as the recipient** and enter the phone number to which you want to send the SMS.  
OR  
If you want to send the SMS to the phone number stored in a particular field of a record, choose **Field as the recipient** and enter the name of the respective data field.

4\. Next, enter the **Template**.  
This template uses Django tags to refer to the columns of the table for the data. To refer a column/field which has the name as "Customer Name" and the slug as "customer\_name", we will use a tag as #{{customer\_name}}.

![](/images/how-to-send-sms-manually-in-orgzit/img-3.png)

5\. You can click on **Preview** to see how your SMS will look like.

## **Creating Custom Actions**

**Custom Actions** are used to invoke the Action Configs. You can click on them to trigger the Action as per your requirement.

The following steps are to be performed to set up the Custom Action:

1.  Go to Table's settings and click on **Custom Action+** _._
    
2.  Give a **name** to the Custom Action, for instance, _Send SMS._
    
3.  **Select the Action Config** that will be executed upon pressing this Custom Action's button. In this case, the action config will be _Registration Successful_.
    
4.  Select the groups/**roles** that can access this button of Custom Action.
    
5.  Click on **Save**
    

![](/images/how-to-send-sms-manually-in-orgzit/img-4.png)

## **Sending the SMS**

Now that you have completed the first two steps of the process, it is time to reap the benefits.

There are two different ways to send the SMS manually:

![](/images/how-to-send-sms-manually-in-orgzit/img-5.png)

1.  Click on the “three-dot” button at the beginning of a record and select the custom action. For instance, click on “Send SMS”.
    

2\. You can also find the Custom Action in the list of Actions when you view the expanded version of your record.

You can also send SMS based on particular conditions. For this, there is an underlying process called **[workflow](/articles/how-to-trigger-an-sms-based-on-a-condition)**, which needs to be defined. The article attached will guide you through the process of creating condition-based workflows and sending SMS based on that.

**You can also check out the video for this process here:**  
​

<iframe src="https://www.youtube.com/embed/jckf1bm0u4I?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
