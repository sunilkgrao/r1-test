# Excel AI Processing Service

A production-ready TypeScript service for processing Excel files and analyzing data using AI.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
4. Update the environment variables in `.env`

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Upload an Excel file using the API endpoint:
   ```bash
   curl -X POST -F "file=@example.xlsx" http://localhost:3000/api/upload
   ```

## API Documentation

### POST /api/upload
Uploads an Excel file for processing.

#### Request:
- File: Excel file (xlsx, xls, csv)
- Headers: X-Auth-Token: your_jwt_token

#### Response:
```json
{
  "success": boolean,
  "data": string,
  "error": string | null
}
```

## Environment Variables

- `PORT`: Server port
- `OPENROUTER_API_KEY`: OpenRouter API key
- `MAX_FILE_SIZE`: Maximum file size in bytes
- `RATE_LIMIT_WINDOW_MS`: Rate limit window in milliseconds
- `RATE_LIMIT_MAX`: Maximum number of requests per window

## Features

- Excel file parsing and data extraction
- AI integration with OpenRouter
- File validation and security measures
- Rate limiting and file size restrictions
- Comprehensive error handling and logging
- JWT-based authentication
- Production-ready configuration
