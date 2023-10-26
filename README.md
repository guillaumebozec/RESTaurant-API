# RESTaurant API

RESTaurant API is an API for managing restaurant items, categories, and formulas. 
This README provides an overview of the API and instructions on how to use it.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Usage](#usage)
   - [Endpoints](#endpoints)
   - [Examples](#examples)


## Getting Started

### Prerequisites

Before you can use the RESTaurant API, make sure you have the following prerequisites installed:

- Node.js
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/RESTaurant-API.git
   cd restaurant-api

2. Open server.js and edit line 4 to enter your localhost port.

3. Start the server :

Open the terminal and enter into RESTAURANT API folder. Then write "node server.js".
The console will confirm that the server is started.

## Usage
# Endpoints
The API provides the following endpoints:

- GET /items: Get a list of restaurant items, using filters or not.
- GET /items/:id: Get an item by its ID.
- POST /items: Create a new item.
- PUT /items/:id: Update an item by its ID.
- DELETE /items/:id: Delete an item by its ID.
- GET /categories: Get a list of categories.
- GET /categories/:id: Get a category by its ID.
- POST /categories: Create a new category.
- PUT /categories/:id: Update a category by its ID.
- DELETE /categories/:id: Delete a category by its ID.
- GET /formulas: Get a list of formulas, using filters or not.
- GET /formulas/:id: Get a formula by its ID.
- POST /formulas: Create a new formula.
- PUT /formulas/:id: Update a formula by its ID.
- DELETE /formulas/:id: Delete a formula by its ID.

# Examples

You have a RESTaurant API collection.postman_collection JSON file in the repository.