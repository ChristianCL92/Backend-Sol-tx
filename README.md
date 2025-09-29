## Solana Wallet Tracker API
A RESTful API service for managing Solana wallet data, transaction preferences, and historical tracking.
## 🌟 Overview
This backend service provides persistent data storage and API endpoints for the Solana Transaction Tracker frontend application. 
Built with NestJS and PostgreSQL, it handles wallet data management, user preferences, and maintains transaction history records.
## ✨ Features

- Wallet Management: Create, read, update wallet records
- Preference Storage: Persist user settings for spam filtering and display options
- History Tracking: Maintain detailed logs of wallet activities and changes
- Data Validation: Input validation using class-validator

## 🛠️ Tech Stack

Framework: NestJS with TypeScript
Database: PostgreSQL
ORM: TypeORM
Validation: class-validator & class-transformer
Environment Config: @nestjs/config
Architecture: Modular architecture with DTOs and service patterns

## 📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher)
PostgreSQL (v12 or higher)
npm package manager

## 🚀 Getting Started
1. Installation

- Clone the repository: https://github.com/ChristianCL92/Backend-Sol-tx
- cd backend-sol-tx

2. Install dependencies

- npm install

3. Set up environment variables: Create a .env file in the root directory
  # Database Configuration
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=your_db_username
  DB_PASSWORD=your_db_password
  DB_NAME=solana_wallet_tracker

  # Application
  NODE_ENV=development
  PORT=3001 

4. Setting up Database:
## Option A
 1. Create a free database at https://neon.tech
 2. Copy your connection string from the Neon dashboard
 3. Update your .env file with the connection details

## Option B
Create the database locally
- createdb solana_wallet_tracker

5. Start the development server
- npm run start:dev
  or
-nest start run:dev

## 🔗 Frontend Integration 
This API is designed to work with the Solana Transaction Tracker frontend application(https://github.com/ChristianCL92/Sol_tx_tracker). 
The frontend connects to this API to:

Store wallet preferences persistently
Track wallet activity over time
Synchronize user settings across sessions

## 🔧 Configuration
Database Connection
The application uses TypeORM with PostgreSQL. Database configuration is managed through environment variables for security and flexibility.

## CORS
CORS is enabled by default in development to allow the frontend application to connect from http://localhost:3000