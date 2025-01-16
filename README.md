# Bicycle Shop Backend

This project is a backend service for Marcus's bicycle shop, allowing him to sell bicycles online with customizable options. The backend is built using Node.js, Express, Sequelize, and SQLite, and is designed to be extensible for future products like skis.

## Table of Contents

- Installation
- Usage
- API Endpoints
  - Parts
  - Combinations
  - Customization
- Database Initialization
- Project Structure
- Future Enhancements

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bicycle-shop.git
   cd bicycle-shop

2. Install dependencies:
    ```bash
    npm install

3. Ensure you are using Node.js version 18 or later.
    ```bash
    Usage
    Development

4. To run the server in development mode with automatic restarts:
    ```bash
    npm run dev
    Production

5. To build and run the server in production mode:
    ```bash
    npm run build
    npm start
6. API Endpoints
    ```bash
    Parts
    Get all parts

Method: GET
Route: /parts
Description: Retrieves all parts available in the database.
Create a new part

Method: POST
Route: /parts
Description: Creates a new part in the database.
Request Body:
{
  "name": "string",
  "type": "string",
  "category": "string",
  "price": "number",
  "inStock": "boolean"
}
Mark a part as out of stock

Method: PUT
Route: /parts/:id/out-of-stock
Description: Marks a specific part as out of stock.
Path Parameter: id (ID of the part)
Get parts by category and type

Method: GET
Route: /parts/filter
Description: Retrieves parts filtered by category and type.
Query Parameters:
category (string): The category of the parts.
type (string): The type of the parts.
Combinations
Get all combinations

Method: GET
Route: /combinations
Description: Retrieves all allowed and prohibited combinations in the database.
Create a new combination

Method: POST
Route: /combinations
Description: Creates a new combination in the database.
Request Body:
{
  "part1": "string",
  "part2": "string",
  "allowed": "boolean"
}
Update an existing combination

Method: PUT
Route: /combinations/:id
Description: Updates a specific combination in the database.
Path Parameter: id (ID of the combination)
Request Body:
{
  "part1": "string",
  "part2": "string",
  "allowed": "boolean"
}
Delete a combination

Method: DELETE
Route: /combinations/:id
Description: Deletes a specific combination from the database.
Path Parameter: id (ID of the combination)
Customization
Validate a combination of parts
Method: POST
Route: /customization/validate
Description: Validates a combination of parts and calculates the total price.
Request Body:
{
  "parts": [
    { "name": "string" },
    { "name": "string" }
  ]
}
Database Initialization
To initialize the database with sample data, run the following command:

npm run init-db
This will create the necessary tables and insert sample data for parts and combinations.

Project Structure
bicycle-shop/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── combinationController.ts
│   │   ├── customizationController.ts
│   │   └── partController.ts
│   ├── models/
│   │   ├── Combination.ts
│   │   └── Part.ts
│   ├── services/
│   │   ├── combinationService.ts
│   │   ├── customizationService.ts
│   │   └── partService.ts
│   ├── routes/
│   │   ├── combinations.ts
│   │   ├── customization.ts
│   │   └── parts.ts
│   ├── utils/
│   │   └── errorHandler.ts
│   ├── app.ts
│   ├── server.ts
│   └── initDB.ts
└── tsconfig.json
Future Enhancements
Expand Product Categories: Add support for new product categories like skis, surfboards, roller skates, etc.
Advanced Stock Management: Implement more advanced stock management features, such as automatic restocking notifications.
User Authentication: Add user authentication and authorization to secure the admin interface.
Enhanced Customization: Allow more complex customization options and dependencies between parts.
