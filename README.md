
## Health Care Services
=======
# Healthcare Management System - Backend API

A comprehensive healthcare management system backend built with Node.js, Express, TypeScript, and Prisma ORM. This system provides complete functionality for managing healthcare operations including patient management, doctor scheduling, appointments, prescriptions, and payments.

## 🚀 Features

### Core Modules
- **User Management** - Multi-role user system (Admin, Doctor, Patient)
- **Authentication & Authorization** - JWT-based secure authentication
- **Doctor Management** - Doctor profiles, specialties, and availability
- **Patient Management** - Patient records and medical history
- **Appointment System** - Booking, scheduling, and management
- **Schedule Management** - Doctor availability and time slots
- **Prescription System** - Digital prescription management
- **Payment Integration** - Stripe payment processing
- **Review System** - Patient feedback and ratings
- **File Upload** - Cloudinary integration for image/document storage
- **Email Notifications** - Automated email system with templates
- **AI Integration** - OpenAI integration for healthcare assistance

### Technical Features
- **Database** - PostgreSQL with Prisma ORM
- **Real-time Processing** - Automated appointment cancellation with cron jobs
- **Security** - Password hashing, JWT tokens, role-based access control
- **Validation** - Zod schema validation
- **Error Handling** - Global error handling middleware
- **File Processing** - Multer for file uploads
- **CORS** - Cross-origin resource sharing configuration

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer + Cloudinary
- **Payment**: Stripe
- **Email**: Nodemailer
- **Validation**: Zod
- **Scheduling**: node-cron
- **AI**: OpenAI API

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm package manager
- Cloudinary account
- Stripe account
- SMTP email service

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd health-care-server
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/healthcare_db"

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=30d
RESET_TOKEN_EXPIRE_IN=10m

# Password Hashing
BCRYPT_SALT=12

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLIENT_URL=http://localhost:3000

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# AI Configuration
OPEN_ROUTER_AI_KEY=your_openai_api_key
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

## 🚀 Running the Application

### Development Mode
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Reset password

### User Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /user/all` - Get all users (Admin only)
- `PUT /user/status/:id` - Update user status

### Doctor Management
- `GET /doctor` - Get all doctors
- `GET /doctor/:id` - Get doctor by ID
- `PUT /doctor/:id` - Update doctor profile
- `DELETE /doctor/:id` - Delete doctor

### Patient Management
- `GET /patient` - Get all patients
- `GET /patient/:id` - Get patient by ID
- `PUT /patient/:id` - Update patient profile

### Appointment System
- `POST /appoinment` - Create appointment
- `GET /appoinment` - Get appointments
- `PUT /appoinment/:id` - Update appointment
- `DELETE /appoinment/:id` - Cancel appointment

### Schedule Management
- `POST /schedule` - Create schedule
- `GET /schedule` - Get schedules
- `GET /doctor-schedule` - Get doctor schedules

### Specialties
- `POST /specialties` - Create specialty
- `GET /specialties` - Get all specialties
- `PUT /specialties/:id` - Update specialty

### Prescriptions
- `POST /prescription` - Create prescription
- `GET /prescription` - Get prescriptions
- `GET /prescription/:id` - Get prescription by ID

### Reviews
- `POST /review` - Create review
- `GET /review` - Get reviews

### Meta Data
- `GET /meta-data` - Get system statistics

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
│   ├── env.ts       # Environment variables
│   ├── prisma.config.ts
│   └── cloudinary.ts
├── modules/          # Feature modules
│   ├── auth/        # Authentication
│   ├── user/        # User management
│   ├── doctor/      # Doctor management
│   ├── patient/     # Patient management
│   ├── appoinment/  # Appointment system
│   ├── schedule/    # Schedule management
│   ├── prescription/ # Prescription system
│   ├── payment/     # Payment processing
│   ├── review/      # Review system
│   ├── specialties/ # Medical specialties
│   └── meta/        # System metadata
├── middleware/       # Express middlewares
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── routes/          # Route definitions
├── error/           # Error handling
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for password security
- **Role-based Access Control** - Different permissions for Admin, Doctor, Patient
- **Input Validation** - Zod schema validation for all inputs
- **CORS Configuration** - Cross-origin request handling
- **Rate Limiting** - Protection against abuse
- **Secure Headers** - Security middleware implementation

## 🔄 Automated Tasks

The system includes automated cron jobs for:
- **Appointment Management** - Automatic cancellation of unpaid appointments
- **Schedule Cleanup** - Removing expired time slots
- **Email Notifications** - Sending appointment reminders

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test
```

## 📦 Deployment

### Using Docker (Recommended)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔮 Future Enhancements

- [ ] Real-time chat system
- [ ] Mobile app API endpoints
- [ ] Advanced analytics dashboard
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Advanced reporting system
- [ ] Integration with medical devices
- [ ] AI-powered diagnosis assistance

---

**Note**: This is a healthcare management system. Ensure compliance with healthcare regulations (HIPAA, GDPR, etc.) when deploying in production environments.
>>>>>>> 0d0ded7 (Update README.md file)
