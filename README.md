# Yummy

## Introduction

**Yummy** is a recipe-sharing platform that connects food enthusiasts, home cooks, and chefs from around the world.

## Project Description

**Yummy** allows users to discover, share, and save recipes with ease. From quick weeknight dinners to gourmet meals, users can explore a variety of recipes, upload their own creations, and engage with a community of food lovers.

### [Live Site](https://yummy-navy.vercel.app)

```plaintext
https://yummy-navy.vercel.app
   ```

## Features

- **User Authentication and Authorization:**
  Users can sign up and log in using their email and password. Admins have additional powers for managing facilities and bookings.

- **Recipe Management:**
    Users can create, update, and delete their recipes, adding details such as ingredients, steps, cooking time, and an image.

- **Recipe Discovery:**
  Users can browse through a wide collection of recipes, filter by categories, and search by keywords.

- **Favorites and Bookmarks:**
  Users can save their favorite recipes for easy access later.

- **Ratings and Reviews:**
  Users can leave reviews and ratings on recipes to share their experiences and feedback with others.

- **Content Moderation:**
  Admins have tools to moderate recipes and user-generated content to ensure quality and compliance with platform guidelines.

- **Error Handling:**
  Comprehensive error handling ensures proper responses and messages for validation errors, duplicate entries, and not found routes.

- **Authentication Middleware:**
  Middleware is implemented to protect routes, ensuring that only authenticated users and admins can access their respective routes.

- **Security:**
  Powerful security system is implemented to protect routes and ensure that only authorized users and admins can access their respective routes.

- **Maintainable Codebase:**
  The codebase is written with clean, well-organized, and documented coding practices. Followed by the industry standard, the codebase is written in structured and organized way.

## Technology Stack

- React
- Redux
- TypeScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Shadcn UI

## Installation Guideline

Follow the instructions given below to install and run the project locally.

### Prerequisites

- Node.js
- Code Editor (E.g. Visual Studio Code)

### Installation Steps

1. **Clone the Repository:**

   ```base
   git clone https://github.com/Rahad-Ullah/Yummy-Client.git
   ```

2. **Open in a Code Editor:**
   Open the directory in a code editor like VS Code.
3. **Install Dependencies:**

   ```markdown
   npm install
   ```

4. **Run the project:**

   ```markdown
   npm run dev
   ```

### Configuration

1. Create a `.env.local` file in the root directory of the project.
2. Add these configuration variables in the `.env.local` file.
   Example:
   ```bash
    PORT=5173
    NEXT_PUBLIC_BASE_API=your_server_url
    NEXT_PUBLIC_IMGBB_API_KEY=imagebb_key
   ```

## Usage

Open the website in your browser to explore and share recipes with the Yummy community. Create an account, discover recipes, and connect with fellow food enthusiasts.

## Happy Cooking 🍳