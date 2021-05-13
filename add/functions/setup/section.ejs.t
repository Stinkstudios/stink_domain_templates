---
inject: true
to: README.md
after: <!-- section additions -->
---

# **Cloud Functions**

Certain functionality must be provided via services during the experience. These services are hosted as Google Cloud Functions. Each service is developed under its own directory within the _functions_ directory in the root. **local development instructions tba**

# Developer workflow

To start developing, follow the quickstart, then branch off of **_dev_** with a branched named based on the following logic:

-   If you are doing global work, create a branch name with your own git handle (e.g. **_bpriddy_**)
-   If you are doing work in either web or cms, but cannot group your work into a feature, do the following: \<section\>/\<git handle\> (e.g. **_functions_/bpriddy\_**)
-   If you are doing work in either web or cms, and **can** group your work logically into a feature, do the following: \<section\>/feature/\<feature name\> (e.g. **_functions/feature/fileupload_**)

<br />