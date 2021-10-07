---
to: '<%= directoryName %>/sanity.json'
---
{
  "root": true,
  "api": {
    "projectId": "<%= sanityProjectID %>",
    "dataset": "stage"
  },
  "project": {
    "name": "Boilerplate"
  },
  "plugins": [
    "@sanity/base",
    "@sanity/components",
    "@sanity/dashboard",
    "@sanity/form-builder",
    "@sanity/default-layout",
    "@sanity/default-login",
    "@sanity/desk-tool",
    "dashboard-widget-netlify",
    "dashboard-widget-document-list",
    "dashboard-widget-structure-menu"
  ],
  "env": {
    "development": {
      "plugins": [
        "@sanity/vision"
      ]
    }
  },
  "parts": [
    {
      "name": "part:@sanity/base/schema",
      "path": "./schemas/schema.js"
    },
    {
      "implements": "part:@sanity/dashboard/config",
      "path": "config/dashboardConfig.js"
    },
    {
      "implements": "part:@sanity/desk-tool/structure",
      "path": "config/deskStructure.js"
    },
    {
      "implements": "part:@sanity/base/document-actions/resolver",
      "path": "./_lib/actions/resolve.js"
    },
    {
      "implements": "part:@sanity/base/brand-logo",
      "path": "./theme/logo"
    },
    {
      "implements": "part:@sanity/base/theme/variables/override-style",
      "path": "./theme/variables.css"
    }
  ]
}
