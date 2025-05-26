
## User Identity Management Application

## Overview
This repository contains two separate projects for a simple User Identity Management system:

- Backend API (IdentityApi): ASP.NET Core 8 Web API with Entity Framework Core and Azure SQL Database integration.

- Frontend App (identity-frontend): Angular 15 application that consumes the API.


--- 



## Table of Contents
1. [Prerequisites](#prerequisites)  
2. [Project Structure](#project-structure)  
3. [Backend Setup](#backend-setup)  
4. [Frontend Setup](#frontend-setup)  
5. [Usage](#usage)  
6. [Azure Cloud Deployment](#azure-cloud-deployment)  
7. [Technical Questions](#technical-questions)

## Prerequisites
- **Backend**  
  - [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)  
  - Local or Azure SQL Server instance  
  - (Optional) Visual Studio 2022/2023 or VS Code  
- **Frontend**  
  - [Node.js v16+](https://nodejs.org/)  
  - [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)  
- **General**  
  - Git  

---

## Project Structure


├── IdentityApi/ # ASP.NET Core Web API project

│ ├── Controllers/ # API controllers

│ ├── Data/ # DbContext and migrations

│ ├── Models/ # UserIdentity model

│ ├── appsettings.json # Connection strings & settings

│ └── Program.cs # App startup & DI

└── identity-frontend/ # Angular standalone component app

├── src/

│ ├── app/

│ │ ├── services/ # IdentityService for HTTP calls

│ │ └── app.component.ts

│     ├── environments/

│     └── index.html

├── angular.json

└── package.json


## Backend Setup

1. **Clone the repo & navigate**  
   ```bash
   git clone https://github.com/yourusername/identity-api.git
   cd identity-api

2. **Configure connection string**
- Edit appsettings.json and replace the placeholder under "ConnectionStrings:DefaultConnection":
   ```bash  
    {
    "ConnectionStrings": {
   "DefaultConnection": "Server=tcp:useridentitydb.database.windows.net,1433;Initial Catalog=UseridentityDB;Persist Security Info=False;User ID=sqladmin;Password=P@ssw0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
   }
    }


3. **Run EF Core migrations**
   ```bash
    dotnet ef migrations add InitialCreate
    dotnet ef database update

5. **Run the API**
    ```bash
    dotnet run
The API will listen on https://localhost:7009 (or the port shown).

5. **Swagger UI**
 - Browse to https://localhost:7009/swagger for documentation and testing.

## Frontend Setup
1. **Clone the repo & navigate**
   ```bash
    git clone https://github.com/yourusername/identity-frontend.git
    cd identity-frontend

2. **Install dependencies**
   ```bash
    npm install

3. **Configure API URL**
- In src/app/services/identity.service.ts, set:
  ```ts
  private apiUrl = 'https://localhost:7009/api/identities';

4. **Run the Angular app**
   ```bash
    ng serve --open
- The app opens at http://localhost:4200.

## Usage
1. In the frontend, enter a User ID and click Load User.

2. The form displays the user’s Full Name and Email.

3. Edit fields, click Update User to save via the API.

4. Success and error notifications appear via snackbars.

## Azure Cloud Deployment

This solution is designed for Azure:

- Azure API Management can front the API.

- Azure App Service hosts the .NET API and/or Angular app.

- Azure SQL Database stores identity data.

- Azure Key Vault secures connection strings and secrets.

## High-level Steps
1. Provision an Azure SQL Database, update connection string in appsettings.json.

2. Deploy the Backend API to Azure App Service (via Visual Studio Publish or Azure CLI).

3. Deploy the Angular App to Azure Static Web Apps or App Service.

4. Configure CORS, environment variables, and Key Vault references in the Azure portal.

## Technical Questions
---
1. Azure Integration:
- Answer : To securely connect multiple identity data sources to a centralized API, I’d recommend using Azure API Management (APIM) as the gateway. It provides a scalable, secure front door for APIs with features like throttling, logging, and transformation. For authentication, Azure Active Directory (Azure AD) is ideal—it supports token-based authentication (OAuth 2.0) and can enforce user roles and access policies efficiently.

2. Data Access:
- Answer : When working with large datasets in SQL Server, performance is key. I typically use indexed views, proper indexing, and query optimization techniques like filtering on indexed columns and avoiding SELECT *. For example, I once optimized a slow user search query by creating a non-clustered index on LastName and Email, which drastically reduced response times from over 5 seconds to under 500ms.

3. Security:
- Answer : For securing PII in an Angular + .NET Core app, I focus on both data in transit and data at rest. I use HTTPS/TLS for transport-layer security and Azure Key Vault to manage secrets and encryption keys. On the server side, sensitive data is encrypted at the database level using Transparent Data Encryption (TDE) or column-level encryption. In Angular, I avoid storing PII in local storage and always sanitize user inputs.

4. DevOps:
- Answer : I’d set up CI/CD using GitHub Actions or Azure DevOps Pipelines. The process would build and test both the Angular frontend and the .NET Core backend, then deploy to Azure App Services or Azure Static Web Apps for the frontend. Secrets and configurations would be managed through Azure Key Vault, and staging slots can be used to test deployments before swapping them to production.

### Thank you
=======
