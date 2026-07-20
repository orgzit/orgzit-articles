---
title: "How to integrate with Google Calendar using Zapier?"
slug: "how-to-integrate-with-google-calendar-using-zapier"
category: "How Tos"
summary: "This article describes the process to integrate with Google Calendar using Zapier."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-08-01"
featured: false
---
You can connect your Orgzit workspace with Google Calendar using Zapier, an online automation tool that can connect Orgzit with different apps, such as Google Forms, ZenDesk, Calendly, Mailchimp, and more. You can easily connect your workspace with different apps using Zapier to automate repetitive tasks, saving you time and effort.

**By setting up a Zap, you can easily schedule a meeting on Google Calendar by creating a record in your Orgzit table.**

To integrate your Orgzit table with Google Calendar using Zapier, the following steps need to be performed:  
  
**Within Orgzit**

*   Create a [Table](/articles/how-to-set-up-a-new-table) in Orgzit (which has all the details required for the Calendar invite in the respective [data fields](/articles/how-to-set-up-table-fields) created for the same).
    

![](/images/how-to-integrate-with-google-calendar-using-zapier/img-1.png)

*   For every date and time combination required, create an extra field with these two attributes:  
    **hidden**  
    **formula** - datestr(date\_field\_slug) + 'T' + time\_field\_slug\[0:5\].  
    (This is to make the date+time formats compatible.)  
    Here, the _date\_field\_slug_ and _time\_field\_slug_ refer to the normalized field names which you can get from the table fields section on the Table Manage page.
    

**Within Zapier**

![](/images/how-to-integrate-with-google-calendar-using-zapier/img-2.png)

*   Once you create a new Zap, choose Trigger App as Orgzit and event as Create Record
    
*   Choose your Account and the concerned Table.
    
*   For the Zap - Action, choose Google Calendar.
    
*   Log the required Google Account into Zapier. This is the calendar for whom the meeting will be set up.
    
*   Customize the Calendar Event. In this step, you have to map Calendar’s field with Orgzit field(s).
    

## Notes

*   The timezone needs to be set up in the Zap’s setting.
    
*   Per zap Google Calendar of only 1 individual is set up.
    

By setting up this Zapier, you can take a step further towards your increased efficiency and productivity.

From connecting with different apps using Zapier to creating [PDFs](/articles/how-to-generate-pdfs-based-on-conditions), sending [SMSs](/articles/how-to-trigger-an-sms-based-on-a-condition), [emails](/articles/how-to-send-emails-manually-using-custom-action-buttons), making calls, integrating with [WhatsApp](/articles/how-to-set-up-whatsapp-integration), Orgzit provides you the power to perform a wide range of actions from your workspace itself. You can explore these and leverage the power of automation using Orgzit!  
  
**_Note: To connect with the Orgzit Zapier app, let us know at [support@orgzit.com](mailto:support@orgzit.com)_**
