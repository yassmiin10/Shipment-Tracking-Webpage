# Shipment Tracking Webpage (Arabic Interface)

This is a React.js + TypeScript application for tracking shipments, presented entirely in Arabic. The application prompts the user to enter a tracking number and then fetches relevant shipping data from the Bosta tracking API. The data is then displayed in a user-friendly and fully Arabic interface, including translated fields, Cairo font styling, and a default branch assumption if branch data is not provided.

## Features

- **Arabic Interface**: All text and UI elements are in Arabic.
- **Progress Indicator Based on Shipment Status**: A visual progression bar is displayed to reflect the shipment’s current status (e.g., "تم إنشاء الشحنة", "تم استلام الشحنة من التاجر", "الشحنة خرجت للتسليم", "تم التسليم").
- **Real-Time Shipment Tracking**: Retrieves and displays key shipment details such as:
  - Tracking Number
  - Last Update Date
  - Provider
  - Status
  - Branch - Defaults to "مدينة نصر" if not provided by the API.
- **Responsive UI**: Works across various screen sizes.
- **Cairo Font Styling**: Uses the Cairo font for all Arabic text.

## Data Flow

1. The user enters a shipment tracking number.
2. The app sends a GET request to `https://tracking.bosta.co/shipments/track/<TRACKING_ID>`.
3. The API returns a JSON object containing details, for example:

    ```json
    {
      "provider": "Bosta",
      "PromisedDate": "2020-07-22T19:07:50.883Z",
      "TrackingNumber": "1094442",
      "TrackingURL": "bosta.co/tracking-shipment/?track_num=1094442",
      "SupportPhoneNumbers": ["19043"],
      "CreateDate": "2020-07-21T17:37:31.147Z",
      "isEditableShipment": false,
      "nextWorkingDay": [{
        "dayDate": "2020-07-23",
        "dayName": "Thrusday"
      }],
      "isOnlinePaymentFeatureEnabled": false
    }
    ```

4. The application extracts relevant fields, translates and formats them into Arabic, and displays them in the UI. The progression bar updates according to the shipment’s lifecycle stages.

## Getting Started

### Prerequisites

- **Node.js** (v12+ recommended)
- **npm** (v6+ recommended)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yassmiin10/Shipment-Tracking-Webpage.git
    ```

2. Navigate into the project directory:
    ```bash
    cd Shipment-Tracking-Webpage
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and visit:
    ```arduino
    http://localhost:3000
    ```
