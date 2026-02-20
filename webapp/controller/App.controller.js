sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("com.approvalcorner.app.controller.App", {
        onInit: function () {




            var oApprovalModel = new JSONModel({
                ApprovalItems: [],
                SelectedCount: 0,
                NewCount: 0,
                InProgressCount: 0,

                ClosedCount: 0,
                SelectedItemsCount: 0,
                CurrentStatus: "New",
            });
            this.getView().setModel(oApprovalModel, "approval");


            this.loadApprovalData("New");


            var oInProgressData = {
                InProgressData: [
                    {
                        connector: "SAP ECC",
                        jobId: "JOB001",
                        ReviewCyclename: "Q1 Review",
                        fiscalYear: "2025",
                        fiscalQuarter: "Q1",
                        reviewType: "Manager Review",
                        userName: "akash.j",
                        FirstName: "Akash",
                        LastName: "Jawanjalkar"
                    },
                    {
                        connector: "SAP S4",
                        jobId: "JOB002",
                        ReviewCyclename: "Q2 Review",
                        fiscalYear: "2025",
                        fiscalQuarter: "Q2",
                        reviewType: "User Review",
                        userName: "rahul.k",
                        FirstName: "Rahul",
                        LastName: "Kumar"
                    }
                ]
            };

            // Closed demo data
            var oClosedData = {
                ClosedData: [
                    {
                        connector: "SAP ECC",
                        jobId: "JOB003",
                        ReviewCyclename: "Q3 Review",
                        fiscalYear: "2024",
                        fiscalQuarter: "Q3",
                        reviewType: "Manager Review",
                        userName: "priya.s",
                        FirstName: "Priya",
                        LastName: "Sharma"
                    },
                    {
                        connector: "SAP S4",
                        jobId: "JOB004",
                        ReviewCyclename: "Q4 Review",
                        fiscalYear: "2024",
                        fiscalQuarter: "Q4",
                        reviewType: "Admin Review",
                        userName: "amit.p",
                        FirstName: "Amit",
                        LastName: "Patil"
                    }
                ]
            };

            // Create models
            var oInProgressModel = new sap.ui.model.json.JSONModel(oInProgressData);
            var oClosedModel = new sap.ui.model.json.JSONModel(oClosedData);

            // Set models to view
            this.getView().setModel(oInProgressModel, "Inprogress");
            this.getView().setModel(oClosedModel, "Closed");


        },


        loadApprovalData: function (sStatus) {

            var oApprovalModeldata = this.getView().getModel("approval");
            // var oViewModel = this.getView().getModel("view");
            var oTable = this.byId("approvalTable");

            if (oTable) oTable.setBusy(true);



            var aMockData = [

                {
                    connector: "SAP",
                    jobId: "1001",
                    reviewCycleName: "User Access Review 2025",
                    fiscalYear: "2025",
                    fiscalQuarter: "Q1",

                    reviewType: "FULL ACCESS",
                    reviewMode: "SINGLE",
                    configMode: "SINGLE",

                    userName: "akash",
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
                    reviewCycleName: "Sensitive Access Review 2025",
                    fiscalYear: "2025",
                    fiscalQuarter: "Q2",

                    reviewType: "SENSITIVE ACCESS",
                    reviewMode: "GROUP",
                    configMode: "GROUP",

                    userName: "rohit",
                    firstName: "Rohit",
                    lastName: "Sharma",

                    role: "FI_USER",

                    totalUsers: 5,
                    sensitiveCount: 6,
                    sodCount: 0,

                    Status: "New"
                },

                {
                    connector: "SAP",
                    jobId: "1003",
                    reviewCycleName: "SOD Review 2025",
                    fiscalYear: "2025",
                    fiscalQuarter: "Q3",

                    reviewType: "SOD",
                    reviewMode: "GROUP",
                    configMode: "GROUP",

                    userName: "admin",
                    firstName: "System",
                    lastName: "Admin",

                    role: "MM_ADMIN",

                    totalUsers: 10,
                    sensitiveCount: 3,
                    sodCount: 4,

                    Status: "New"
                }

            ];

            oApprovalModeldata.setProperty("/ApprovalItems", aMockData);

            console.log("Loaded data for status:", sStatus, aMockData);


            // counts
            oApprovalModeldata.setProperty("/NewCount", this.getCountByStatus("New", aMockData));
            oApprovalModeldata.setProperty("/InProgressCount", this.getCountByStatus("In Progress", aMockData));
            oApprovalModeldata.setProperty("/ClosedCount", this.getCountByStatus("Closed", aMockData));



            if (oTable) oTable.setBusy(false);
        }
        ,


        onRowRadioSelect: function (oEvent) {

            var oRadioButton = oEvent.getSource();

            var oContext = oRadioButton.getBindingContext("approval");

            if (oContext) {

                var oRowData = oContext.getObject();

                // store selected row globally in controller
                this._oSelectedRow = oRowData;

                console.log("Selected Row Stored:", this._oSelectedRow);

            }

        },
        onSelectionChange: function (oEvent) {
            MessageToast.show("Please click on this button");

        },









        getCountByStatus: function (sStatus, aItems) {
            return aItems.filter(function (oItem) {
                return oItem.Status === sStatus;
            }).length;
        },




        onStatusChange: function (oEvent) {

            console.log("done");

            var sSelectedKey = oEvent.getParameter("item").getKey();

            console.log("Status changed to:", sSelectedKey);

            if (sSelectedKey === "New") {

                this.byId("approvalTable").setVisible(true);
                this.byId("approvalTableInProgress").setVisible(false);
                this.byId("approvalTableClosed").setVisible(false);

            }
            else if (sSelectedKey === "InProgress") {

                this.byId("approvalTable").setVisible(false);
                this.byId("approvalTableInProgress").setVisible(true);
                this.byId("approvalTableClosed").setVisible(false);

            }
            else if (sSelectedKey === "Closed") {

                this.byId("approvalTable").setVisible(false);
                this.byId("approvalTableInProgress").setVisible(false);
                this.byId("approvalTableClosed").setVisible(true);

            }

        },



        //         onStatusChange: function (oEvent) {

        //     var sSelectedKey = oEvent.getParameter("item").getKey();

        //     console.log("Selected Key:", sSelectedKey);

        //     if (sSelectedKey === "New") {

        //         this.byId("approvalTable").setVisible(true);
        //         this.byId("approvalTableInProgress").setVisible(false);
        //         this.byId("approvalTableClosed").setVisible(false);

        //     }
        //     else if (sSelectedKey === "InProgress") {

        //         this.byId("approvalTable").setVisible(false);
        //         this.byId("approvalTableInProgress").setVisible(true);
        //         this.byId("approvalTableClosed").setVisible(false);

        //     }
        //     else if (sSelectedKey === "Closed") {

        //         this.byId("approvalTable").setVisible(false);
        //         this.byId("approvalTableInProgress").setVisible(false);
        //         this.byId("approvalTableClosed").setVisible(true);

        //     }

        // },








        onReview: function () {


            if (!this._oSelectedRow) {

                sap.m.MessageToast.show("Please select a Item before proceeding");

                return;
            }


            var oSelectedRow = this._oSelectedRow;

            console.log("Selected Row:", oSelectedRow);



            var sReviewMode = "";


            if (oSelectedRow.configMode)
                sReviewMode = oSelectedRow.configMode.toUpperCase();

            // default
            else
                sReviewMode = "SINGLE";


            var sReviewType = "FULL";

            if (oSelectedRow.reviewType)
                sReviewType = oSelectedRow.reviewType.toUpperCase();


            console.log("FINAL Review Mode:", sReviewMode);
            console.log("FINAL Review Type:", sReviewType);


            var oRouter =
                sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.navTo("RouteReview", {

                mode: sReviewMode,
                type: sReviewType

            });

        }
        ,







        //        onReassignPress: function ()
        // {
        //     if (!this._oSelectedRow)
        //     {
        //         sap.m.MessageToast.show("Please select an Item before proceeding");
        //         return;
        //     }

        //     var oDialog = this.byId("reassignDialog");

        //     if (!oDialog)
        //     {
        //         sap.m.MessageBox.error("Reassign dialog not found. Check XML.");
        //         return;
        //     }

        //     oDialog.open();
        // },


        // onCloseReassign: function ()
        // {
        //     var oDialog = this.byId("reassignDialog");

        //     if (oDialog)
        //     {
        //         oDialog.close();
        //     }
        // },


        // onConfirmReassign: function ()
        // {
        //     var oView = this.getView();

        //     var oLevel1 = oView.byId("level1Input");
        //     var oLevel2 = oView.byId("level2Input");
        //     var oLevel3 = oView.byId("level3Input");
        //     var oComment = oView.byId("reassignComment");

        //     var bValid = true;

        //     [oLevel1, oLevel2, oLevel3, oComment].forEach(function (oField)
        //     {
        //         oField.setValueState(sap.ui.core.ValueState.None);
        //     });

        //     if (!oLevel1.getValue().trim())
        //     {
        //         oLevel1.setValueState(sap.ui.core.ValueState.Error);
        //         oLevel1.setValueStateText("Level 1 is required");
        //         bValid = false;
        //     }

        //     if (!oLevel2.getValue().trim())
        //     {
        //         oLevel2.setValueState(sap.ui.core.ValueState.Error);
        //         oLevel2.setValueStateText("Level 2 is required");
        //         bValid = false;
        //     }

        //     if (!oLevel3.getValue().trim())
        //     {
        //         oLevel3.setValueState(sap.ui.core.ValueState.Error);
        //         oLevel3.setValueStateText("Level 3 is required");
        //         bValid = false;
        //     }

        //     if (!oComment.getValue().trim())
        //     {
        //         oComment.setValueState(sap.ui.core.ValueState.Error);
        //         oComment.setValueStateText("Reason / Comment is required");
        //         bValid = false;
        //     }

        //     if (!bValid)
        //     {
        //         sap.m.MessageBox.warning("Please fill all mandatory fields.");
        //         return;
        //     }

        //     sap.m.MessageToast.show("Reassigned successfully");

        //     oView.byId("reassignDialog").close();
        // }

        //         ,



        onReassignPress: function () {
            if (!this._oSelectedRow) {
                sap.m.MessageToast.show("Please select an Item before proceeding");
                return;
            }

            var that = this;

            // Create dialog only once
            if (!this._oReassignDialog) {
                this._oReassignDialog = new sap.m.Dialog({
                    title: "Reassign",
                    contentWidth: "500px",
                    stretchOnPhone: true,
                    draggable: true,
                    resizable: true
                });

                var oForm = new sap.ui.layout.form.SimpleForm({
                    editable: true,
                    layout: "ResponsiveGridLayout",
                    labelSpanXL: 3,
                    labelSpanL: 3,
                    labelSpanM: 4,
                    labelSpanS: 12,
                    adjustLabelSpan: false,
                    emptySpanXL: 1,
                    emptySpanL: 1,
                    emptySpanM: 0,
                    emptySpanS: 0,
                    columnsXL: 1,
                    columnsL: 1,
                    columnsM: 1,
                    singleContainerFullSize: false,
                    content: [

                        new sap.m.Label({ text: "Level 1", required: true }),
                        new sap.m.Input("level1Input"),

                        new sap.m.Label({ text: "Level 2", required: true }),
                        new sap.m.Input("level2Input"),

                        new sap.m.Label({ text: "Level 3", required: true }),
                        new sap.m.Input("level3Input"),

                        new sap.m.Label({ text: "Reason / Comments", required: true }),
                        new sap.m.TextArea("reassignComment", {
                            rows: 4
                        })
                    ]
                });

                this._oReassignDialog.addContent(oForm);

                this._oReassignDialog.setBeginButton(
                    new sap.m.Button({
                        text: "Reassign",
                        type: "Accept",
                        press: this.onConfirmReassign.bind(this)
                    })
                );

                this._oReassignDialog.setEndButton(
                    new sap.m.Button({
                        text: "Cancel",
                        type: "Reject",
                        press: this.onCloseReassign.bind(this)
                    })
                );

                this.getView().addDependent(this._oReassignDialog);
            }


            this._oReassignDialog.open();
        },
        onCloseReassign: function () {
            if (this._oReassignDialog) {
                this._oReassignDialog.close();
            }
        },
        onConfirmReassign: function () {
            var oView = this.getView();

            var oLevel1 = sap.ui.getCore().byId("level1Input");
            var oLevel2 = sap.ui.getCore().byId("level2Input");
            var oLevel3 = sap.ui.getCore().byId("level3Input");
            var oComment = sap.ui.getCore().byId("reassignComment");

            var bValid = true;

            [oLevel1, oLevel2, oLevel3, oComment].forEach(function (oField) {
                oField.setValueState("None");
            });

            if (!oLevel1.getValue().trim()) {
                oLevel1.setValueState("Error");
                oLevel1.setValueStateText("Level 1 is required");
                bValid = false;
            }

            if (!oLevel2.getValue().trim()) {
                oLevel2.setValueState("Error");
                bValid = false;
            }

            if (!oLevel3.getValue().trim()) {
                oLevel3.setValueState("Error");
                bValid = false;
            }

            if (!oComment.getValue().trim()) {
                oComment.setValueState("Error");
                bValid = false;
            }

            if (!bValid) {
                sap.m.MessageBox.warning("Please fill all mandatory fields.");
                return;
            }

            sap.m.MessageToast.show("Reassigned successfully");

            this._oReassignDialog.close();
        },

        onLock: function () {
            var oTable = this.byId("approvalTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select at least one ");
                return;
            }

            MessageBox.confirm(
                "Lock " + aSelectedItems.length + " selected item(s)?",
                {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            this.updateApprovalStatus(aSelectedItems, "Locked");
                        }
                    }.bind(this)
                }
            );
        },

        onTerminate: function () {
            var oTable = this.byId("approvalTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageToast.show("");
                return;
            }

            MessageBox.warning(
                "Are you sure you want to terminate " + aSelectedItems.length + " selected item(s)?",
                {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.NO,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            this.updateApprovalStatus(aSelectedItems, "Terminated");
                        }
                    }.bind(this)
                }
            );
        },

        updateApprovalStatus: function (aSelectedItems, sNewStatus) {
            var oModel = this.getView().getModel();
            var iUpdated = 0;
            var iErrors = 0;

            aSelectedItems.forEach(function (oItem) {
                var oContext = oItem.getBindingContext();
                var sPath = oContext.getPath();
                var oData = oContext.getObject();

                // Update via OData service
                oModel.update(sPath, {
                    Status: sNewStatus
                }, {
                    success: function () {
                        iUpdated++;
                        if (iUpdated + iErrors === aSelectedItems.length) {
                            MessageToast.show(iUpdated + " item(s) updated successfully");
                            this.loadApprovalData(this.getView().getModel("view").getProperty("/CurrentStatus"));
                        }
                    }.bind(this),
                    error: function (oError) {
                        iErrors++;
                        console.error("Error updating item:", oError);
                        if (iUpdated + iErrors === aSelectedItems.length) {
                            MessageToast.show("Updated: " + iUpdated + ", Errors: " + iErrors);
                            this.loadApprovalData(this.getView().getModel("view").getProperty("/CurrentStatus"));
                        }
                    }.bind(this)
                });
            }.bind(this));
        },

        onFilter: function () {
            MessageBox.information("Filter functionality - To be implemented");
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.byId("approvalTable");
            var aFilters = [];

            if (sQuery && sQuery.length > 0) {
                aFilters = [
                    new Filter("JobId", FilterOperator.Contains, sQuery),
                    new Filter("UserName", FilterOperator.Contains, sQuery),
                    new Filter("FirstName", FilterOperator.Contains, sQuery),
                    new Filter("LastName", FilterOperator.Contains, sQuery)
                ];
                aFilters = [new Filter(aFilters, false)];
            }

            oTable.getBinding("items").filter(aFilters);
        },

        onRefresh: function () {
            var oViewModel = this.getView().getModel("view");
            var sCurrentStatus = oViewModel.getProperty("/CurrentStatus");
            this.loadApprovalData(sCurrentStatus);
            MessageToast.show("Data refreshed");
        },

        formatStatusState: function (sStatus) {
            if (sStatus === "New") {
                return "Warning";
            } else if (sStatus === "In Progress") {
                return "Information";
            } else if (sStatus === "Closed") {
                return "Success";
            } else if (sStatus === "Locked") {
                return "Error";
            } else if (sStatus === "Terminated") {
                return "Error";
            }
            return "None";
        }
    });
});

