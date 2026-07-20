---
title: "How to set up SMS Action Config?"
slug: "how-to-set-up-sms-action-config"
category: "How Tos"
summary: "This article describes the process to create SMS Action Configs in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2021-04-09"
featured: false
---
## **Creating SMS Action Configs**

To do this, click on the **Table Settings** icon at the top right of your workspace. Now, choose the **Action Configs** section. Configuring this section will eventually lead you to configure the way your SMS will look.

![](/images/how-to-set-up-sms-action-config/img-1.png)

The following steps need to be performed for the same:

1.  Click on **+Create** to create a new Action Config and choose **SMS** as the Action Type.
    
2.  Give a **name** to the Action Config, for instance, _Registration Successful._
    

![](/images/how-to-set-up-sms-action-config/img-2.png)

3\. If you want to send the SMS to a specific phone number, choose **Phone as the recipient** and enter the phone number to which you want to send the SMS.  
OR  
If you want to send the SMS to the phone number stored in a particular field of a record, choose **Field as the recipient** and enter the name of the respective data field.

4\. Next, enter the **Template**.  
This template uses Django tags to refer to the columns of the table for the data. To refer a column/field which has the name as "Customer Name" and the slug as "customer\_name", we will use a tag as #{{customer\_name}}.

![](/images/how-to-set-up-sms-action-config/img-3.png)

5\. You can click on **Preview** to see how your SMS will look like.

You can now use this Action Config to send SMSs manually or through automations.
