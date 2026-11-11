import { Router } from "express";
import { validateMiddleware } from "../../middleware/validate.middleware";
import { updateSettingsValidationSchema, validateUserIdSchema } from "./settings.schema";
import { settingsContollerObj } from "./settings.controller";
import { authMiddleware } from "../../middleware/checkCookie.middleware";

const settingsRoute = Router({ mergeParams: true });

settingsRoute
    .route("/")
    .get(authMiddleware, settingsContollerObj.getSettings)
    .patch(
        authMiddleware,
        validateMiddleware({
            body: updateSettingsValidationSchema,
        }),
        settingsContollerObj.changeSetting
    );

export default settingsRoute;