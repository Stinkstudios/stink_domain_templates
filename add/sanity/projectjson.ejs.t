--
to: project-wide-config/project.json
after: "\"baseEnv\": {"
inject: true
--
        "SANITY_PROJECT_ID": "<%= sanityProjectID =>",
        "SANITY_DATASET": "<%= sanityProjectDataset =>",
        "SANITY_TOKEN": "XXXXXXXXX"

