sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
 
    "use strict";
 
   
    var aMockData = [
 
        {
            connector: "SAP",
            jobId: "1001",
            reviewCycleName: "User Access Review 2025",
            fiscalYear: "2025",
            fiscalQuarter: "Q1",
 
            reviewType: "FULL ACCESS",
            reviewMode: "SINGLE",
 
            firstName: "Akash",
            lastName: "Jawanjalkar",
 
            role: "SAP_ADMIN",
 
            totalUsers: 1,
            sensitiveCount: 2,
            sodCount: 0,
 
            Status: "New"
        },
 
        {
            connector: "SAP",
            jobId: "1002",
 
            reviewType: "SENSITIVE ACCESS",
            reviewMode: "GROUP",
 
            firstName: "Rohit",
            lastName: "Sharma",
 
            role: "FI_USER",
 
            totalUsers: 5,
            sensitiveCount: 6,
            sodCount: 0
        },
 
        {
            connector: "SAP",
            jobId: "1003",
 
            reviewType: "SOD",
            reviewMode: "GROUP",
 
            firstName: "System",
            lastName: "Admin",
 
            role: "MM_ADMIN",
 
            totalUsers: 10,
            sensitiveCount: 3,
            sodCount: 4
        }
 
    ];
 
    return Controller.extend("com.approvalcorner.app.controller.Review", {
 
        onInit: function () {
 
            var oModel = new JSONModel({
 
                reviewMode: "",
                reviewType: "",
 
                showFull: false,
                showSensitive: false,
                showSOD: false,
 
                screenTitle: "",
 
                fullData: [],
                sensitiveData: [],
                sodData: []
 
            });
 
            this.getView().setModel(oModel, "reviewModel");
 
            this._loadComments();
 
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
 
            oRouter.getRoute("RouteReview")
                .attachPatternMatched(this._onRouteMatched, this);
 
        },
        onNavBack: function () {
    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    oRouter.navTo("RouteApp", {}, true); // true = replace history (optional)
},
 
 
        _onRouteMatched: function (oEvent) {
 
            var sMode = oEvent.getParameter("arguments").mode;
            var sType = oEvent.getParameter("arguments").type;
 
            var oModel = this.getView().getModel("reviewModel");
 
            oModel.setProperty("/screenTitle",
                sType + " Access " + sMode + " Review");
 
            oModel.setProperty("/showFull", false);
            oModel.setProperty("/showSensitive", false);
            oModel.setProperty("/showSOD", false);
 
            if (sType === "FULL ACCESS") {
 
                oModel.setProperty("/showFull", true);
                this._loadFullData();
 
            }
            else if (sType === "SENSITIVE ACCESS") {
 
                oModel.setProperty("/showSensitive", true);
                this._loadSensitiveData();
 
            }
            else if (sType === "SOD") {
 
                oModel.setProperty("/showSOD", true);
                this._loadSODData();
 
            }
 
        },
 
       
        _loadFullData: function () {
 
            var oModel = this.getView().getModel("reviewModel");
 
            var aFull = aMockData
                .filter(item => item.reviewType === "FULL ACCESS")
                .map(item => {
 
                    return {
 
                        connector: item.connector,
 
                        fullName:
                            item.firstName + " " + item.lastName,
 
                        roleName: item.role,
 
                        roleDescription:
                            "Role for " + item.role,
 
                        licenseType: "Professional",
 
                        fromDate: "01-01-2025",
 
                        toDate: "31-12-2025",
 
                        tcodeCount: item.totalUsers * 5,
 
                        action: "",
                        comment: ""
 
                    };
 
                });
 
            oModel.setProperty("/fullData", aFull);
 
        },
 
 
        _loadSensitiveData: function () {
 
            var oModel = this.getView().getModel("reviewModel");
 
            var aSensitive = aMockData
                .filter(item => item.reviewType === "SENSITIVE ACCESS")
                .map(item => {
 
                    return {
 
                        connector: item.connector,
 
                        fullName:
                            item.firstName + " " + item.lastName,
 
                        roleName: item.role,
 
                        roleDescription:
                            "Sensitive role for " + item.role,
 
                        licenseType: "Professional",
 
                        fromDate: "01-04-2025",
 
                        toDate: "31-03-2026",
 
                        tcodeCount:
                            item.sensitiveCount * 3,
 
                        action: "",
                        comment: ""
 
                    };
 
                });
 
            oModel.setProperty("/sensitiveData", aSensitive);
 
        },
 
 
 
        // _loadSODData: function () {
 
        //     var oModel = this.getView().getModel("reviewModel");
 
        //     var aSOD = aMockData
        //         .filter(item => item.reviewType === "SOD")
        //         .map(item => {
 
        //             return {
 
        //                 connector: item.connector,
 
        //                 username: item.userName,
 
        //                 fullName:
        //                     item.firstName + " " + item.lastName,
 
        //                 userGroup: "SAP_GROUP",
 
        //                 riskType: "Segregation of Duties",
 
        //                 riskId: "RISK_" + item.jobId,
 
        //                 riskDescription: "Conflict between functions",
 
        //                 riskLevel:
        //                     item.sodCount > 3 ? "Critical" : "Medium",
 
        //                 functionId: "FUNC_" + item.jobId,
 
        //                 functionDescription: "Financial Posting",
 
        //                 businessProcess: "Finance",
 
        //                 roleName: item.role,
 
        //                 roleDescription:
        //                     "Role for " + item.role,
 
        //                 mitigationId: "MIT_" + item.jobId,
 
        //                 startDate: "01-01-2025",
 
        //                 endDate: "31-12-2025",
 
        //                 action: "",
        //                 comment: ""
 
        //             };
 
        //         });
 
        //     oModel.setProperty("/sodData", aSOD);
 
        // }
        


        _loadSODData: function () {

    var oModel = this.getView().getModel("reviewModel");

    var aSOD = aMockData
        .filter(item => item.reviewType === "SOD")
        .map(item => {

            return {

                connector: item.connector,

                jobId: item.jobId,                

                //username: item.userName || item.jobId,  

                fullName: item.firstName + " " + item.lastName,

                userGroup: "SAP_GROUP",

                riskType: "Segregation of Duties",

                riskId: "RISK_" + item.jobId,

                riskDescription: "Conflict between functions",

                riskLevel: item.sodCount > 3 ? "Critical" : "Medium",

                functionId: "FUNC_" + item.jobId,

                functionDescription: "Financial Posting",

                businessProcess: "Finance",

                roleName: item.role,

                roleDescription: "Role for " + item.role,

                mitigationId: "MIT_" + item.jobId,

                startDate: "01-01-2025",

                endDate: "31-12-2025",

                action: "",
                comment: ""

            };

        });

    oModel.setProperty("/sodData", aSOD);

},

 
        // COMMENTS LOAD
        _loadComments: function () {
 
            var commentModel = new JSONModel({
 
                comments: [
 
                    { key: "RETAIN", text: "Business Required" },
                    { key: "TEMP", text: "Temporary Access" },
                    { key: "APPROVED", text: "Approved by Manager" },
                    { key: "REMOVE", text: "Remove Access" }
 
                ]
 
            });
 
            this.getView().setModel(commentModel, "commentModel");
 
        },
 
 
        // Export button click
onExport: function () {
 
    var oModel = this.getView().getModel("reviewModel");
    var aData = [];
    var sTitle = oModel.getProperty("/screenTitle") || "Review_Report";
 
    // determine which data is active
    if (oModel.getProperty("/showFull")) {
        aData = oModel.getProperty("/fullData");
    }
    else if (oModel.getProperty("/showSensitive")) {
        aData = oModel.getProperty("/sensitiveData");
    }
    else if (oModel.getProperty("/showSOD")) {
        aData = oModel.getProperty("/sodData");
    }
 
    if (!aData || aData.length === 0) {
        sap.m.MessageToast.show("No data to export");
        return;
    }
 
    this._exportExcel(aData, sTitle);
 
},
 
 
// Excel Export Function
_exportExcel: function (aData, sTitle) {
 
    var aCols = Object.keys(aData[0]);
 
    var sExcel = "<table border='1'><tr>";
 
    // Header row
    aCols.forEach(function (col) {
        sExcel += "<th>" + col + "</th>";
    });
 
    sExcel += "</tr>";
 
    // Data rows
    aData.forEach(function (row) {
 
        sExcel += "<tr>";
 
        aCols.forEach(function (col) {
            sExcel += "<td>" + (row[col] || "") + "</td>";
        });
 
        sExcel += "</tr>";
 
    });
 
    sExcel += "</table>";
 
    var blob = new Blob([sExcel], {
        type: "application/vnd.ms-excel"
    });
 
    var link = document.createElement("a");
 
    link.href = URL.createObjectURL(blob);
 
    link.download = sTitle + ".xls";
 
    link.click();
 
},


onCancel: function () {
    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    oRouter.navTo("RouteApp", {}, true); // true = replace history (optional)
},
 
 
        onActionChange: function (oEvent) {
 
            var action =
                oEvent.getSource().getSelectedKey();
 
            var obj =
                oEvent.getSource()
                    .getBindingContext("reviewModel")
                    .getObject();
 
            obj.action = action;
 
        },
 
        onCommentChange: function (oEvent) {
 
            var comment =
                oEvent.getSource().getSelectedKey();
 
            var obj =
                oEvent.getSource()
                    .getBindingContext("reviewModel")
                    .getObject();
 
            obj.comment = comment;
 
        },
 
        onSubmitReview: function () {
 
            var model =
                this.getView().getModel("reviewModel");
 
            console.log("Submit Data:",
                model.getData());
 
            MessageToast.show("Review Submitted Successfully");
 
        }
 
    });
 
});