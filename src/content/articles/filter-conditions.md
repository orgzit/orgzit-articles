---
title: "Filter Conditions"
slug: "filter-conditions"
category: "Uncategorized"
summary: ""
author: "Pavan Verma (CTO - Orgzit)"
authorAvatar: "/images/authors/2356035.png"
date: "2021-02-01"
featured: false
---
Filters can be applied on all types of data fields. You can apply filters based on conditions or values. Different data fields have different condition based operations that can be performed on them. Here is a list of the different data fields and the filter conditions that you can apply on them:

**Remember:** For a choice mentioned as ('notblank', 'Not Blank'), notblank is the exact filter condition name that you will have to mention while passing filter values during API integration.

# Filter Conditions for Integers

('none', 'None'),

('blank', 'Blank'),

('notblank', 'Not Blank'),

('equal', 'Equal'),

('notequal', 'Not Equal'),

('lt', 'Less Than'),

('lte', 'Less Than Equal To'),

('gt', 'Greater Than'),

('gte', 'Greater Than Equal To'),

('values', 'Values'),

## Filter Conditions for Decimals are the same as Integers.

# Filter Conditions for Strings

('none', 'None'),

('blank', 'Blank'),

('notblank', 'Not Blank'),

('equal', 'Equal'),

('notequal', 'Not Equal'),

('lt', 'Less Than'),

('lte', 'Less Than Equal To'),

('gt', 'Greater Than'),

('gte', 'Greater Than Equal To'),

('startswith', 'Starts With'),

('endswith', 'Ends With'),

('contains', 'Contains'),

('notcontains', 'Does not contain'),

('values', 'Values')

## Filter Conditions for Images and Files are the same as Strings.

# Filter Conditions for Date

('none', 'None'),

('blank', 'Blank'),

('notblank', 'Not Blank'),

('equal', 'Equal'),

('notequal', 'Not Equal'),

('lt', 'Less Than'),

('lte', 'Less Than Equal To'),

('gt', 'Greater Than'),

('gte', 'Greater Than Equal To'),

('today', 'Today'),

('past', 'Before Today'),

('past\_today', 'Today and Before'),

('future', 'After Today'),

('future\_today', 'Today and After'),

('tomorrow', 'Tomorrow'),

('yesterday', 'Yesterday'),

('thisweek', 'This Week'),

('nextweek', 'Next Week'),

('lastweek', 'Last Week'),

('thismonth', 'This Month'),

('nextmonth', 'Next Month'),

('lastmonth', 'Last Month'),

('thisquarter', 'This Quarter'),

('nextquarter', 'Next Quarter'),

('lastquarter', 'Last Quarter'),

('thisyear', 'This Year'),

('nextyear', 'Next Year'),

('lastyear', 'Last Year'),

('values', 'Values'),

('older\_last\_n', 'Older Than N Days'),

('in\_last\_n', 'In Last N Days'),

('in\_next\_n', 'In Next N Days'),

('after\_next\_n', 'After Next N Days')

# Filter Conditions for Users

('none', 'None'),

('blank', 'Blank'),

('notblank', 'Not Blank'),

('values', 'Values'),

('currentuser', 'Current User'),

('not\_currentuser', 'Not Current User')

# Filter Conditions for Foreign Key

('none', 'None'),

('blank', 'Blank'),

('notblank', 'Not Blank'),

('values', 'Values'),

('equal', 'Equal'),

('notequal', 'Not Equal'),

# Filter Conditions for Multivalues

('values', 'Values')

# Filter Conditions for Location

('none', 'None'),

('blank', 'Blank'),

('notblank', 'Not Blank'),

('values', 'Values')
