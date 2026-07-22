---
title: "How to set up a workflow to generate professional PDFs by changing the status?"
slug: "how-to-set-up-a-workflow-to-generate-professional-pdfs-by-changing-the-status"
category: "How Tos"
summary: "This articles describes how  to set up a workflow to generate professional PDFs in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2019-02-08"
featured: false
---
It is possible to [generate professional PDFs](/articles/how-to-create-professional-pdfs-in-orgzit) in Orgzit by following a simple procedure. However, the [procedure described](/articles/how-to-create-professional-pdfs-in-orgzit) in attached article can be automated by following few steps. 

Process described in the aforementioned article is a one-time exercise. After the set-up, the process can be AUTOMATED with the help of a workflow.  
That is, at what point of your usage do you want the invoice to be generated automatically, for instance a status change. These workflows (refer to GIF below) also allow you to instruct our system to send the auto-generated invoice to the concerned person/client.

To execute this feature, the following process is to be followed:

1.  Go to Table's settings and select Create Workflow.
    
2.  Give a name to the Workflow.
    
3.  Select Event type as _Post Save._
    
4.  Fill in the conditions when you want the workflow triggered. Say, when the status changes and its value is now Generated.
    
5.  Select the Workflow Action as Action Config.
    
6.  Then, from the list of Action Configs, select the one you want to be triggered when the above conditions are met.
    

![](/images/how-to-set-up-a-workflow-to-generate-professional-pdfs-by-changing-the-status/img-1.gif)

Similarly, you can automate processes other than PDF generation by following similar process.
