sap.ui.define([
    "com/app/sampleui5auth/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function(
    BaseController,
    JSONModel,
    MessageBox
) {
    "use strict";

    return BaseController.extend("com.app.sampleui5auth.controller.Signup", {

        onInit: function() {
            var oModel = new JSONModel({
                username: "",
                password: "",
                confirmPassword: "",
                email: ""
            });
            this.getView().setModel(oModel, "signup");
        },

        onSignup: function() {
            var oView = this.getView();
            var oModel = oView.getModel("signup");
            var oData = oModel.getData();
            var oAppModel = this.getOwnerComponent().getModel();

            // Validation
            if (!oData.username || !oData.password || !oData.confirmPassword || !oData.email) {
                MessageBox.error("All fields are required");
                return;
            }

            if (oData.username.length < 3) {
                MessageBox.error("Username must be at least 3 characters");
                return;
            }

            if (oData.password.length < 5) {
                MessageBox.error("Password must be at least 5 characters");
                return;
            }

            if (oData.password !== oData.confirmPassword) {
                MessageBox.error("Passwords do not match");
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(oData.email)) {
                MessageBox.error("Invalid email format");
                return;
            }

            var oAppData = oAppModel.getData();
            var bUserExists = oAppData.users.some(function(user) {
                return user.username === oData.username;
            });

            if (bUserExists) {
                MessageBox.error("Username already exists");
                return;
            }

            // Add new user
            oAppData.users.push({
                username: oData.username,
                password: oData.password,
                email: oData.email
            });
            oAppModel.setData(oAppData);

            MessageBox.success("Signup successful! Please login.", {
                onClose: function() {
                    this.getRouter().navTo("loginRoute");
                }.bind(this)
            });
        },

        onNavigateToLogin: function() {
            this.getRouter().navTo("loginRoute");
        }
    });
});
