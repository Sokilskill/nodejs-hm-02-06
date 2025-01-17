const express = require("express");
const { validation, authenticate, upload } = require("../../middlerwares");
const { schemas } = require("../../models/user");
const { authController: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { errMsg4 } = require("../../messages/messagesError");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);
// router.posr("/singup")

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));
// roter.post('/singin')

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(schemas.resendVerifyEmailSchema, errMsg4),
  ctrlWrapper(ctrl.resendVerifyEmail)
);
router.patch(
  "/",
  authenticate,
  validation(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
