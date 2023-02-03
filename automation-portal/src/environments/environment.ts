// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const auth =
{
    "credentials": {
        "clientId": "1113af18-9546-4ddd-8a70-e31db0ae7523",
        "tenantId": "5d098803-d76b-4f44-8857-59aa60b63af4"
    },
    "resources": {
        "todoListApi": {
            "resourceUri": "https://localhost:44379/api",
            "resourceScopes": ["api://1113af18-9546-4ddd-8a70-e31db0ae7523/access_as_user"]
        }
    }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
