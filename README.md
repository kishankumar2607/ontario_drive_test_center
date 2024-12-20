﻿# Book DriveTest

## Overview

Book DriveTest is a web application that allows users to book driving tests for G and G2 licenses. The platform provides an intuitive interface for drivers, examiners, and administrators to manage schedules and test bookings effectively.

## Features

- **User-friendly Interface**: Easy navigation for booking driving tests.
- **Responsive Design**: Accessible on various devices including mobile phones and tablets.
- **Separate Interfaces**:
  - **Driver Interface**: For users who want to book G or G2 driving tests.
  - **Examiner Interface**: For examiners to manage and conduct driving tests.
  - **Admin Panel**: For administrators to add and manage schedules.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime for building the application.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **EJS**: Templating engine for rendering dynamic HTML.
- **Bootstrap**: CSS framework for responsive design.
- **MongoDB**: NoSQL database for storing user data and schedules (upcoming feature).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (for future data storage)

### Installation

1. **Clone the repository**:

    - git clone https://github.com/kishankumar2607/ontario_drive_test_center.git
   
    - cd ontario_drive_test_center

2. **Install dependencies**:

   npm install

3. **Create .env file and add below code**

   PORT = 3000
   URI = 'mongodb url'

3. **Run the application**:

   npm start

   **To run using nodemon**:
   
   npm run dev

5. **Open your web browser and navigate to**: http://localhost:3000.


**For questions or feedback, please reach out to**:

Kishan Kumar Das - kishank2607@gmail.com
