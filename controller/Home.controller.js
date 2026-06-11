sap.ui.define([
    "com/app/sampleui5auth/controller/BaseController",
    "sap/m/MessageBox"
], function(
    BaseController,
    MessageBox
) {
    "use strict";

    return BaseController.extend("com.app.sampleui5auth.controller.Home", {

        onInit: function() {
        },

        onLogout: function() {
            var oAppModel = this.getOwnerComponent().getModel();
            var oAppData = oAppModel.getData();
            
            oAppData.isLoggedIn = false;
            oAppData.username = "";
            oAppModel.setData(oAppData);
            
            MessageBox.success("Logged out successfully!");
            this.getRouter().navTo("loginRoute");
        }
    });
});
