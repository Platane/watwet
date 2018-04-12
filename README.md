# watwet

[platane.github.io/watwet](https://platane.github.io/watwet)

An application to help you set up an habitat vegetal description.

Every data is sync with a google doc spreadSheet.

# Nomenclature

A **Site** contains severals named **Habitat**.

For each habitat, you can built the list of **Vegetals** representative to this habitat.

Vegetals are sorted into 3 layers, depending of their height.

# Usage

## Create a site

![create site](https://platane.github.io/watwet/create-site.gif)

Being logged to the application _( left on the screenshot )_, you can fill up a form to create a new site.

Once that done, the status in the header will indicate that it is effectively persisted in a new google doc spreadSheet.

You can access your google doc spreadSheet _( rigth on the screenshot )_. You should see a new one.

> Notice the google doc spreadSheet name. It's "ww-site-xxxx". The prefix "ww-site-" indicate that this spreadsheet contains a site data usable for the app.

> Removing the prefix will make the site disappear from the app.

## Create an habitat

![create habitat](https://platane.github.io/watwet/create-habitat.gif)

Same thing, fill the form to create an habitat.

The app will create one sheet _( tab at the bottom of the google doc spreadSheet )_ per habitat.

Notice how the data in the google doc spreadSheet is kept in sync as we work with the app _( rigth on the screenshot )_.

> Notice the sheet names:

> There is one for the information related to the site ( data_info )

> And one for each habitat ( data_xxxx )

> The "data\_" prefix is important, it indicate that the app should use this sheet as habitat.

> You can still have unrelated sheet for your own usage. As long as the name is not "data_xxx" it will be ignore by the app.

## Editing from the google doc spreadSheet

You can also edit the data right from the google doc spreadSheet. The app will pick it up when it synchronize.

It does synchronize automatically every 15min, but you can force a refresh at anytime.

**Edit habitat**

![edit raw data habitat](https://platane.github.io/watwet/edit-raw-data-habitat.gif)

> This screenshot show how to edit a vegetal directly from google doc spreadSheet

**Edit site**

![edit raw data site](https://platane.github.io/watwet/edit-raw-data-site.gif)

> This screenshot show how to remove a site from google doc spreadSheet

# Neat tricks with google doc spreadSheet

**Versioning**

We can check modifications made on the google doc spreadSheet, at what time and by who.

This is handy to rollback to the last version.

**Working with references**

The "data\_" are not pretty. This is part of the plan.

You should import the data into another sheet to do clever computation / pretty presentation.

You can reference a cell from another sheet with the formula `=data_xxx!B2`

In order to have one template duplicated for each habitat, you could use an indirect ref:

assuming the cell A1 contains `data_xxx`

the formula will be `=INDIRECT(A1&"!B2")`

This is handy since for each habitat, you just have to change the value of A1.

# Limitations

This app comes with a few limitations:

* right now there is risk for two users working on the same site to erase each other modification.

# Third party

* [sentry](https://sentry.io/watwet/watwet/)
* [cloudinary](https://cloudinary.com/console/)
