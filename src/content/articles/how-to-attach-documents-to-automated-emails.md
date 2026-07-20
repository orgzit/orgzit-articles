---
title: "How to attach documents to automated emails?"
slug: "how-to-attach-documents-to-automated-emails"
category: "How Tos"
summary: "This article describes the process of attaching documents to emails."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-08-01"
featured: false
---
Orgzit empowers its users to send emails [manually](/articles/how-to-send-emails-manually-using-custom-action-buttons) as well as automatically based on some specified conditions, using [workflows](/articles/how-do-automations-work).

Very often, we need to send some documents as attachments along with our emails. For eg. monthly payslips of employees, invoice PDFs for some orders, or any other required document. To do so, you only have to add additional functionality to your (Django) email template.  
  
To attach a document to an email that you are sending from Orgzit, the following steps need to be performed:

1.  Go to **Table Settings**.
    
2.  Move down to your **email Action Config**, to configure the email template and attach the required document.
    
3.  Add the command, `{% attach_doc 'document_field_name' %}` in your template.  
    **Note**: The _document\_field\_name_ is the normalized name of the field that contains your PDF that you want to attach.  
      
    You can attach multiple documents as well using multiple `attach_doc` commands.  
      
    You can also attach documents from any of the related tables. For instance, if you sending the email from the _Employee_ table, and want to attach a doc from the connected _Loan_ table, you can do so by adding the command `{% attach_doc 'employee.loan' %}`where `employee` is the related field's name in the current table, and `loan` is the document field name in the related _Loan_ table.  
    ​
    
4.  **Save** it.
    

```
{% load dataform_tags %}Hi #{{employee.employee_name}},<br>The monthly salary slip for the month of #{{month}} is attached along with this mail, along with the loan document.<br>{% attach_doc 'payslip' %}{% attach_doc 'employee.loan' %}Regards <br>
```

  
By using the above-mentioned steps, you can attach documents in your emails. You can send these emails [manually](/articles/how-to-send-emails-manually-using-custom-action-buttons) or automate them using workflows.

## Check out this video to understand how to attach documents to email action configs!

<iframe src="https://www.youtube.com/embed/_KQTlBIPoNw?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
