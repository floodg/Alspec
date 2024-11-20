## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Set Up the ASP.NET Core API](#set-up-the-aspnet-core-api)
3. [Running the API](#running-the-api)
4. [Testing the API](#testing-the-api)
5. [API Endpoints](#api-endpoints)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before setting up and running the ASP.NET Core API, make sure you have the following installed:

- [.NET SDK](https://dotnet.microsoft.com/download/dotnet) (preferably .NET 6 or later)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or another database provider if necessary
- [Postman](https://www.postman.com/) or [cURL](https://curl.se/) (for testing the API)

## Set Up the ASP.NET Core API

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository.git
```

### 2. Open the Project

- Open the solution in **Visual Studio** or **Visual Studio Code**.
- Ensure that the correct version of .NET is set for the project (you can check this in the `.csproj` file).
  
### 3. Configure Database Connection (if applicable)

1. Open `appsettings.json` or `appsettings.Development.json`.
2. Update the connection string for your database:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=YourDatabaseName;User Id=youruser;Password=yourpassword;"
  }
}
```

If you're using a different database provider (like PostgreSQL, MySQL, etc.), update the connection string accordingly.

### 4. Install Required Dependencies

Make sure that all required NuGet packages are installed. You can do this by restoring the project dependencies.

In **Visual Studio**, right-click on the solution and select **Restore NuGet Packages**.

In **Visual Studio Code**, open the integrated terminal and run:

```bash
dotnet restore
```

### 5. Set Up Entity Framework (If applicable)

If your project uses **Entity Framework** for database migrations, run the following command to create the initial migration and update the database:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Make sure that the **Entity Framework tools** are installed:

```bash
dotnet tool install --global dotnet-ef
```

---

## Running the API

### 1. Build the Project

In **Visual Studio**, you can build the project by selecting **Build > Build Solution**.

In **Visual Studio Code**, open the integrated terminal and run:

```bash
dotnet build
```

### 2. Run the API

To run the API, use the following command in your terminal (inside the project folder):

```bash
dotnet run
```

By default, the API will be hosted on `http://localhost:5000` for HTTP or `https://localhost:5001` for HTTPS. You can access this in your browser or use it in API testing tools like Postman.

---

## Testing the API

You can test the API using Postman or cURL.

- **Test Endpoint:** To check if the API is working, you can make a simple GET request to:

```bash
GET https://localhost:5001/api/Jobs
```

- **Postman:**
  1. Open Postman.
  2. Enter `https://localhost:5001/api/Jobs` in the URL.
  3. Set the method to **GET** and press **Send** to test the API.

- **cURL Example:**

```bash
curl -X GET https://localhost:5001/api/Jobs
```

---

## API Endpoints

- **GET /api/Jobs**
  - Retrieves a list of all jobs.

- **POST /api/Jobs**
  - Adds a new job.
  - Example request body:

    ```json
    {
      "title": "New Job Title",
      "description": "Job Description",
      "subItems": [
        {
          "title": "SubItem Title",
          "description": "SubItem Description",
          "status": "Pending"
        }
      ]
    }
    ```

- **GET /api/Jobs/{id}**
  - Retrieves a specific job by its ID.

- **PUT /api/Jobs/{id}**
  - Updates the details of a specific job.

- **DELETE /api/Jobs/{id}**
  - Deletes a specific job.

---

## Troubleshooting

- **API Not Starting:**
  - Ensure the project is built correctly using `dotnet build` or through Visual Studio.
  - Double-check the connection string if using a database.
  - Ensure the database is running and accessible.

- **CORS Error:**
  - If you encounter a CORS (Cross-Origin Resource Sharing) issue when testing the API in a browser, you may need to enable CORS in the API.
  - In `Startup.cs`, add the following code inside the `ConfigureServices` method:

    ```csharp
    services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins",
            builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    });
    ```

    Then, in the `Configure` method, call:

    ```csharp
    app.UseCors("AllowAllOrigins");
    ```

- **Database Connection Issue:**
  - Ensure the connection string is correct in `appsettings.json`.
  - Ensure your database is running and accessible.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides all the necessary steps to set up and run your ASP.NET Core API, including how to test it and handle common issues.