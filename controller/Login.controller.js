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

    return BaseController.extend("com.app.sampleui5auth.controller.Login", {

        onInit: function() {
            var oModel = new JSONModel({
                username: "",
                password: ""
            });
            this.getView().setModel(oModel, "login");
        },

        onLogin: function() {
            var oView = this.getView();
            var oModel = oView.getModel("login");
            var oData = oModel.getData();
            var oAppModel = this.getOwnerComponent().getModel();

            if (!oData.username || !oData.password) {
                MessageBox.error("Please enter username and password");
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

            var oAppData = oAppModel.getData();
            var bUserFound = oAppData.users.some(function(user) {
                return user.username === oData.username && user.password === oData.password;
            });

            if (bUserFound) {
                oAppData.isLoggedIn = true;
                oAppData.username = oData.username;
                oAppModel.setData(oAppData);
                MessageBox.success("Login successful!");
                this.getRouter().navTo("home");
            } else {
                MessageBox.error("Invalid username or password");
            }
        },

        onNavigateToSignup: function() {
            this.getRouter().navTo("signupRoute");
        }
    });
});
