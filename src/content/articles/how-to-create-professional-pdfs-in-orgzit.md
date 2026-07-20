---
title: "How to create professional PDFs in Orgzit?"
slug: "how-to-create-professional-pdfs-in-orgzit"
category: "How Tos"
summary: "This article describes how to generate professional PDFs in Orgzit."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2019-02-08"
featured: false
---
Using Orgzit, you can generate professional PDFs like custom invoices, quotations, packing slips, label, etc. in a matter of minutes.  
  
You can generate PDFs manually by the click of a button, and also [automate the process of PDF generation by setting up an Orgzit Automation.](/articles/how-to-generate-pdfs-based-on-conditions)  
​

Using this feature you can:

1.  Quickly create standardized PDFs for your business workflow
    
2.  Save Time and Resources spent on creating and managing PDFs
    
3.  Create accurate PDFs in a timely manner leading to increased customer satisfaction
    

The process of pdf generation is divided into three steps.

1.  Making a [template](/articles/how-to-customize-pdf-template) for the custom PDF using Orgzit [Action Configs](/articles/action-configs-in-orgzit)
    
2.  Creating [Custom Actions](/articles/how-to-set-up-a-custom-action) for Generating the PDF manually with the click of a button
    
3.  Generating the PDF
    

# Creating the PDF Action Config

The following steps have to be performed to create the PDF Action Config:

1.  Go to Table's settings and select PDF in the type of Action Configs after clicking on _Create._
    
2.  Give a name to the Action Config, for instance, say "Invoice".
    
3.  Select where to store the PDF Document to be generated which could either be a table's column (field with the data type as Document) or as the Record's file.
    
4.  Give a name to the file that will be generated.
    
5.  Select the Page Size as well as Orientation.
    
6.  Select Child Tables and assign them slugs, i.e. name them (A child table is one that is directly associated with the present table).
    
7.  Next, enter the code for the [Template](/articles/how-to-customize-pdf-template).  
    This HTML template uses field's normalized names to refer to the columns of the table for the data. To refer to a column/field which has the name as "Invoice Number" and the normalized name as "invoice\_number", we will use a tag as  #{{invoice\_number}}. You can insert tags for fields using the **Insert Tag** button.
    
8.  After successfully saving it, one can use the preview option on a record and see in real-time how the PDF will come out.
    

![](/images/how-to-create-professional-pdfs-in-orgzit/img-1.gif)

# Creating the Custom Action

[Custom Actions](/articles/how-to-set-up-a-custom-action) are used to invoke the Action Configs, for instance, clicking the _Generate Invoice_ custom action will trigger the _Invoice_ action config and generate the PDF Doc as mentioned in the action config.  
  
Configuring this section (refer to GIF below) will conclude step two of the process.

The following settings  (refer to gif below)  are to be done to set up the Custom Action:

1.  Go to Table's settings and select Custom Action's _Create._
    
2.  Give a name to the Custom Action, for instance, _Generate Invoice._
    
3.  Select the Action Config that will be executed upon pressing this Custom Action button.
    
4.  Select the roles that can access this button of Custom Action.
    

![](/images/how-to-create-professional-pdfs-in-orgzit/img-2.gif)

Now that you have completed the first two steps of the process, it is time to reap the benefits. 

# Generate the PDF

There are two different ways to generate PDFs with the help of Custom Action buttons:

1.  Click on the “three-dot” button and select the name you gave to your custom action. For instance, Click on “Generate Invoice”. (refer to GIF below)
    

![](/images/how-to-create-professional-pdfs-in-orgzit/img-3.gif)

2\. You can also generate the PDF by clicking on the Action button in the detailed record view.

In both the aforementioned ways, a document will be available for you to view/download.  
  
​

## Check out this video on PDF generation in Orgzit!  

<iframe src="https://www.youtube.com/embed/Lmixsl4YfqQ?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>

  
​
