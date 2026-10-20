import {Router} from "express";
import {validateMiddleware} from "../../middleware/validate.middleware";
import {updateSettingsValidationSchema, validateUserIdSchema} from "./settings.schema";
import {settingsContollerObj} from "./settings.controller";

const settingsRoute = Router({mergeParams: true});

settingsRoute
    .route("/")
    .get(settingsContollerObj.getSettings)
    .post(validateMiddleware(
        {
            body: updateSettingsValidationSchema,
            params: validateUserIdSchema
        }),
        settingsContollerObj.changeSetting
    )

export default settingsRoute

