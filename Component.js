sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "com/app/sampleui5auth/controller/BaseController"
], function(
    UIComponent,
    JSONModel,
    History,
    BaseController
) {
    "use strict";

    return UIComponent.extend("com.app.sampleui5auth.Component", {
        metadata: {
            manifest: "json"
        },

        init: function() {
            UIComponent.prototype.init.apply(this, arguments);
            
            var oModel = new JSONModel({
                isLoggedIn: false,
                username: "",
                users: []
            });
            this.setModel(oModel);

            this.getRouter().initialize();
        },

        getContentDensityClass: function() {
            if (!this._sContentDensityClass) {
                if (!sap.ui.Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        },

        getRouter: function() {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
    });
});
