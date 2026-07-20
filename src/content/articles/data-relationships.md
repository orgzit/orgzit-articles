---
title: "Data relationships"
slug: "data-relationships"
category: "Overview Guide"
summary: "Orgzit is a relational database where you can interconnect your information the way you like."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2019-02-08"
featured: false
---
# Data Relationships 

You can use **relationships** to relate records to each other between apps. This feature allows you to link records between the apps in a given project.

**Example:**

In the case of an organization using Orgzit for project management, projects could be listed in an Table called "Projects" while the work items that make up each project could be listed in a Table called "Work Items". A relationship could be set up whereby records from the **Projects** are linked with those in the **Work Items**. This would make it easy to see which work items are linked to which projects.

# How to set up a relationship

1\. Go to the app where you'd like to set up a relationship field, click on the **gear** icon and click on **Manage App**.

2\. Click on the **Add Field +** button and enter a name for the relationship field. Select **Relationship** from the **Data Type** drop-down menu.

Next, choose the name of the app that you'd like to create a link to from the drop-down list of all apps within the project.

3\. Hit the **Add** button. This will create a new relationship field in your app.

# How to add records with relationship fields

There are two methods for adding records with relationship fields. Let's understand using the same project management example that was discussed above. Let's assume that a relationship field called "**Related Project**" was set up in the Work Items App. The field was related to the Projects App. To enter records with relationship fields in this scenario, you could:

## Method 1: Adding a new work item from the Work Items App 

Go to the Work Items App, click on add **New Record**, and fill in the fields. When entering the value for the **Related Project** field, you will be able to select from a list of projects from the Projects App. Select the relevant project and hit **Save**.

## Method 2: Adding new Work Item directly from the Projects App

1.  Go to the Projects App, and click on the **magnifying glass** in the last column of the record that you'd like to add work items to. This will open a **full-page record view** of the relevant record.
    
2.  Here, scroll down to the **Relationships** section and click on **Add Work Item**. The new Work Items record that you create here will be automatically linked to the Projects app.
    

<iframe src="https://www.youtube.com/embed/Y7dNGp_sfG4?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>
