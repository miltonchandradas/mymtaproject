# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File / Folder | Purpose
---------|----------
`app/` | content for UI frontends go here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps...

- Open a new terminal and run  `cds watch`
- ( in VSCode simply choose _**Terminal** > Run Task > cds watch_ )
- Start adding content, e.g. a [db/schema.cds](db/schema.cds), ...


## Learn more...

Learn more at https://cap.cloud.sap/docs/get-started/

## Commands used:

- cds add hana (add support for SAP HANA - adds a requires section in package.json file)
- cds build/all (builds the entire application - all artifacts are stored in gen folder)
- cf create-service hana hdi-shared mymta-db-hdi-container (create an SAP HANA container - name of container should be from manifest.yml in gen/db folder)
- cf push -f gen/db (push the db artifacts to Cloud Foundry - manifest.yml created automatically when you ran cds build/all command)
- cf push -f gen/srv --random-route (push the srv artifacts to Cloud Foundry - manifest.yml created automatically when you ran cds build/all command)


## Using HANA for local development

- See video on how to bind SAP HANA to local application - this creates a .env file
- But application is looking for default-env.json file - So rename .env file to default-env.json
- You will have to make minor modifications to default-env.json file to make it a valid json file - see video for details
- Now simply run the following commands and you are working with SAP HANA in a local environment
- npm i 
- cds watch