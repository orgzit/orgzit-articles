---
title: "How to Validate, Clone, Reset, or Delete the Workspace?"
slug: "how-to-validate-clone-reset-or-delete-the-workspace"
category: "How Tos"
summary: "This article describes what happens when you validate, clone, reset or delete a workspace."
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2020-09-03"
featured: false
---
Your account in Orgzit can have one or more workspaces. Each workspace stores different types of data, relationships, and has different processes going on around them in every table. These processes can be [workflows](/articles/how-do-automations-work), formula computation in a table's [data fields](/articles/how-to-set-up-table-fields), etc. To manage a workspace and set up workspace level configurations, multiple options are available on the Workspace Setting Page.

To go to the Workspace Setting page, click on the arrow next to the name of your workspace and click on Workspace Settings.

![](/images/how-to-validate-clone-reset-or-delete-the-workspace/img-1.gif)

On the top right of the Workspace Setting page, four buttons are available. These are used to validate workspace, clone workspace, reset workspace, and delete the workspace.

![](/images/how-to-validate-clone-reset-or-delete-the-workspace/img-2.png)

_Note: Only users with Administrator [Access Level](/articles/how-to-set-the-workspace-access-level) can access the Workspace Setting page._

**Validate Workspace**

You can use this button to validate all your workspace configurations.

Within workspace tables, you can have fields with formula computations, [workflows](/articles/how-do-automations-work) for automation, [custom actions](/articles/how-to-set-up-a-custom-action) to trigger workflows and actions manually, and [action configs](/articles/action-configs-in-orgzit) to perform actions like sending [SMSs](/articles/how-to-send-sms-manually-in-orgzit), [emails](/articles/how-to-trigger-emails-based-on-a-condition), [generating PDFs](/articles/how-to-generate-pdfs-based-on-conditions), and much more from within the workspace. All these are configured with different conditions and values to perform the required operations. An inconsistency or error in any one of them can have a negative impact at more than one place within the workspace, thus impacting your entire system.

To make sure, that there's no such inconsistency or error anywhere in a workspace, **Validate Workspace** is used. It checks all the configurations and points out the faulty ones(if any) to you. It's a great practice to use this button after setting up any configuration to make sure that there's no such discrepancy and the system is ready for use.

![](/images/how-to-validate-clone-reset-or-delete-the-workspace/img-3.gif)

You can see a notification once the workspace is successfully validated. In case of an error or inconsistency too, you will get a message.

**Clone Workspace**

By using this option, you can create a new workspace with the same configuration as your present workspace. You can choose if you want to clone with or without the data.

![](/images/how-to-validate-clone-reset-or-delete-the-workspace/img-4.gif)

Once you clone a workspace and **refresh** your page, you will be able to see the copy of the workspace you just cloned.

You can very quickly create a new workspace with the same configuration and then customize it according to your requirement, saving the time of creating a workspace from scratch.

**Reset Workspace**

You can use this option to delete all data from your workspace. When you reset a workspace, no configuration is deleted.

For instance, once you configure a workspace and test it with some test data, you can reset the workspace to delete all the test data and get it ready for use.

![](/images/how-to-validate-clone-reset-or-delete-the-workspace/img-5.gif)

**Delete Workspace**

You can use the Delete Workspace option to remove a workspace from your account if it is no longer required. It will delete all the data and configuration to remove the workspace entirely from the account.

![](/images/how-to-validate-clone-reset-or-delete-the-workspace/img-6.gif)

In the **Workspace** **Settings Page**, you can also explore:  
​

Workspace Settings

[Tables](/articles/how-to-set-up-a-new-table)

[User Roles](/articles/how-to-manage-different-roles-in-a-workspace)

[Permissions](/articles/how-to-set-up-role-based-workspace-level-access-permissions)

Webhook Integrations

Slack Integrations
