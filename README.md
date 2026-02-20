# Approval Corner - SAP Fiori Application

A beautiful and user-friendly SAP Fiori application for managing approval workflows integrated with SAP ECC system.

## Features

- **Modern Fiori Design**: Built with SAP UI5 and follows Fiori design guidelines
- **Status-based Navigation**: Three tabs for New, In Progress, and Closed approvals
- **Action Toolbar**: Review, Reassign, Lock, Terminate, and Filter actions
- **Data Table**: Comprehensive table with all approval details
- **OData Integration**: Connected to SAP ECC system for real-time data
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Search Functionality**: Quick search across multiple fields

## Project Structure

```
ApprovalCorner/
├── ui5.yaml               # UI5 project configuration (most important)
├── package.json           # Node.js dependencies
├── neo-app.json          # SAP Cloud Platform routing config
├── webapp/                # Application source files
│   ├── index.html        # Entry point
│   ├── manifest.json     # Application descriptor
│   ├── Component.js      # Main component
│   ├── controller/
│   │   └── App.controller.js  # Main controller
│   ├── view/
│   │   └── App.view.xml       # Main view
│   ├── model/
│   │   └── models.js          # Data models
│   ├── i18n/
│   │   └── i18n.properties    # Internationalization
│   └── css/
│       └── style.css          # Custom styles
└── README.md
```

## OData Service Configuration

The application is configured to connect to SAP ECC system via OData service:

- **Service URL**: `/sap/opu/odata/sap/ZAPPROVAL_CORNER_SRV/`
- **Entity Set**: `ApprovalItemsSet`
- **OData Version**: 2.0

### Required OData Service Structure

The ECC system should expose an OData service with the following entity structure:

**Entity: ApprovalItems**
- Connector (String)
- JobId (String)
- ReviewCycleName (String)
- FiscalYear (String)
- FiscalQuarter (String)
- ReviewType (String)
- UserName (String)
- FirstName (String)
- LastName (String)
- Status (String)

## Setup Instructions

### 1. Local Development

1. Install SAP UI5 CLI (if not already installed):
```bash
npm install -g @ui5/cli
```

2. Serve the application:
```bash
npm start
# or
ui5 serve
```

3. Open in browser:
```
http://localhost:8080/webapp/index.html
```

### 2. SAP Cloud Platform Deployment

1. Configure the destination in SAP Cloud Platform Cockpit:
   - Name: `ECC_BACKEND`
   - Type: HTTP
   - URL: Your ECC system URL
   - Authentication: Basic or OAuth2

2. Deploy the application to SAP Cloud Platform

3. Update the OData service URL in `manifest.json` if needed

### 3. ECC System Configuration

1. Create OData service in ECC system (transaction SEGW)
2. Implement the service with the required entity structure
3. Activate the service
4. Configure service URL in the application manifest

## Configuration

### Update OData Service URL

Edit `webapp/manifest.json` and update the `serviceUrl` in the OData model configuration:

```json
"serviceUrl": "/sap/opu/odata/sap/ZAPPROVAL_CORNER_SRV/"
```

### Update Destination

For SAP Cloud Platform, configure the destination in `neo-app.json`:

```json
{
  "path": "/sap/opu/odata",
  "target": {
    "type": "destination",
    "name": "ECC_BACKEND"
  }
}
```

## Features Overview

### Navigation Tabs
- **New**: Shows all new approval items
- **In Progress**: Shows items currently being processed
- **Closed**: Shows completed approval items

### Action Buttons
- **Review**: Mark selected items as "In Progress"
- **Reassign**: Reassign approval items to other users
- **Lock**: Lock approval items to prevent changes
- **Terminate**: Terminate approval items
- **Filter**: Apply advanced filters
- **Refresh**: Reload data from ECC system

### Data Table
Displays all approval information in a sortable, filterable table with:
- Multi-select capability
- Search functionality
- Status indicators with color coding
- Responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- SAP UI5 Framework 1.100.0 or higher
- SAP Fiori Horizon theme

## License

Copyright © 2024

