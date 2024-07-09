# Image Processing System

## Table of Contents
1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Services](#services)
   - [Handler Service](#interface-service)
   - [Compression Service](#compression-service)
4. [API Endpoints](#api-endpoints)
5. [Installation](#installation)
6. [Usage](#usage)

## Introduction

This project is an image processing system that handles CSV files containing image data. It extracts information from the CSV, saves it to a database, compresses images by 50%, and updates the processing status.

## System Architecture

The system consists of two main services:
1. Handler Service
2. Compression Service

These services work together to process incoming CSV files, manage image compression, and update request status.

## Services

### Handler Service

The Interface Service is responsible for:
- Receiving CSV files
- Extracting data from the CSV
- Saving data to the database
- Sending images to the Compression Service
- Updating request statuses
- Providing an API endpoint for checking processing status

### Compression Service

The Compression Service is responsible for:
- Receiving images from the Interface Service
- Compressing images by 50%
- Calling the handler Service webhook to update request status
- Saving processed images


## API Endpoints

The Interface Service provides the following API endpoints:

1. `POST /image-process` - Upload a CSV file for processing
2. `GET /status/:requestId` - Check the status of a processing request
3. `POST /webhook/confirmation` - Webhook for the Compression Service to update request status

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/tanmax22end/main-service.git
   ```

2. Install dependencies:
   ```
   cd main-service
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     ```

4. Start the services:
   ```
   node index.js
   ```

## Usage

1. Prepare a CSV file with image data.
2. Send a POST request to `/image-process` endpoint with the CSV file.
3. The system will process the file and return a `requestId`.
4. Use the `requestId` to check the status of the processing using the `/status/:requestId` endpoint.
