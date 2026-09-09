# 🌾 RYTHU SEVA

**Agricultural Procurement Management Platform**

> "Plan Your Visit, Skip the Wait"

---

## 📋 Project Overview

RYTHU SEVA is a comprehensive agricultural procurement management platform designed to connect farmers, procurement centres, and administrators across India. It eliminates unnecessary waiting, provides real-time queue tracking, and enables advance slot booking through a unified digital platform.

### Core Systems

1. **Farmer Mobile Application** - Responsive mobile/tablet/desktop UI
2. **IVR Phone System** - Voice-based access for all farmers
3. **Admin Dashboard** - Procurement centre management and monitoring
4. **Shared Backend** - Common database and API layer

---

## 🎯 Key Features

### Farmer Features
- ✅ One permanent account with multiple crop records
- ✅ Add crops with declared quantity
- ✅ Search procurement centres by location & crop
- ✅ View centre capacity, queue, and estimated waiting time
- ✅ Book advance slots with date/time selection
- ✅ Digital token generation
- ✅ Live queue tracking
- ✅ Real-time procurement status updates
- ✅ Payment status monitoring
- ✅ Multi-language support (English, Telugu, Hindi)
- ✅ GPS-based centre location
- ✅ Push notifications
- ✅ IVR phone access

### Admin Features
- ✅ Farmer management and search
- ✅ Real-time queue management
- ✅ Booking and slot management
- ✅ Procurement workflow (Arrival → Weighing → Quality → Completion)
- ✅ Capacity management
- ✅ Crop procurement configuration
- ✅ Location management (States, Districts, Villages)
- ✅ Reports and analytics
- ✅ Role-Based Access Control (Super Admin, Centre Admin)
- ✅ Audit logs

### System Features
- ✅ India-wide location hierarchy
- ✅ Dynamic crop procurement by season/scheme
- ✅ Safe concurrent booking with atomic transactions
- ✅ Real-time WebSocket queue updates
- ✅ Low-connectivity support with caching
- ✅ Accessibility features
- ✅ OTP-based authentication
- ✅ HTTPS-ready APIs

---

## 🏗️ Architecture

```
                 FARMER
                /      \
        MOBILE APP     IVR
             \          /
              \        /
              COMMON BACKEND
                    |
                    ↓
               DATABASE
                    |
                    ↓
             ADMIN DASHBOARD
                    |
                    ↓
          PROCUREMENT CENTRES
```

---

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Responsive styling
- **React Router** - Navigation
- **Socket.IO** - Real-time queue updates
- **Axios** - HTTP client
- **React Query** - Data fetching
- **i18n** - Multi-language support

### Backend
- **Node.js + Express.js** - REST API server
- **PostgreSQL** - Relational database
- **Sequelize/TypeORM** - ORM
- **Socket.IO** - WebSocket server
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Twilio/Asterisk** - IVR system (integrated)

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Local development
- **GitHub Actions** - CI/CD

---

## 📁 Project Structure

```
rythu-seva/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── api/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── utils/
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── socket/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── config.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── ivr/
│   ├── src/
│   │   ├── handlers/
│   │   ├── menus/
│   │   └── services/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Docker & Docker Compose (optional)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/divyakalle010-glitch/rythu-seva.git
cd rythu-seva
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run seed
npm start
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm start
```

4. **IVR Setup**
```bash
cd ../ivr
npm install
npm start
```

### Using Docker Compose
```bash
docker-compose up -d
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Dark Green | #166534 | Branding, Primary buttons |
| Secondary Teal | #0F766E | Secondary actions |
| Tracking Blue | #0284C7 | Queue, Tracking |
| White | #FFFFFF | Backgrounds |
| Light Grey | #F1F5F9 | Cards, Forms |
| Dark Text | #172033 | Primary text |
| Secondary Text | #64748B | Secondary text |
| Waiting/Pending | #F59E0B | Orange warnings |
| Error/Rejected | #DC2626 | Red errors |
| Success/Accepted | #16A34A | Green success |

---

## 📱 Responsive Design

- **Mobile** (< 640px) - Bottom navigation, touch-friendly
- **Tablet** (640px - 1024px) - Intermediate layout
- **Desktop** (> 1024px) - Sidebar navigation, multi-column

---

## 🗣️ Language Support

- 🇬🇧 English
- 🇮🇳 తెలుగు (Telugu)
- 🇮🇳 हिन्दी (Hindi)

---

## 🔐 Security

- OTP-based farmer authentication
- Secure admin authentication with JWT
- Password hashing with Bcrypt
- Role-Based Access Control (RBAC)
- Input validation and sanitization
- HTTPS-ready APIs
- Session management
- Comprehensive audit logs

---

## 📊 Database Schema

Key entities:

- **STATES** - Indian states and union territories
- **DISTRICTS** - Districts within states
- **VILLAGES** - Villages/mandals/blocks/tehsils
- **FARMERS** - Farmer accounts and profiles
- **PROCUREMENT_CENTRES** - Centre information and capacity
- **CROPS** - Crop master data
- **CENTRE_CROPS** - Crop availability by centre/season/scheme
- **BOOKINGS** - Farmer slot bookings
- **SLOTS** - Centre time slots with capacity
- **QUEUE** - Live queue tracking
- **WEIGHING** - Quality and quantity verification
- **QUALITY_CHECKS** - Acceptance/rejection records
- **PAYMENTS** - Payment status tracking
- **NOTIFICATIONS** - User notifications
- **ADMIN_USERS** - Admin accounts with roles
- **AUDIT_LOGS** - All system actions

---

## 🔄 Procurement Workflow

```
BOOKED
  ↓
ARRIVED
  ↓
TOKEN CALLED
  ↓
WEIGHING
  ↓
QUALITY CHECK
  ↓
ACCEPTED / REJECTED
  ↓
PROCUREMENT COMPLETED
  ↓
PAYMENT PROCESSING
  ↓
PAYMENT COMPLETED
```

---

## 📞 IVR Features

Accessible via phone call:

1. **Register** - First-time caller registration
2. **Add Crop** - Enter crop and quantity
3. **Book Slot** - Select centre and time
4. **Check Token** - View generated token
5. **Queue Status** - Live queue position
6. **Procurement Status** - Track progress
7. **Payment Status** - View payment state
8. **Help** - Support options

Supported languages: English, Telugu, Hindi

---

## 📈 Admin Reports

- Daily bookings
- Completed/rejected procurement
- Crop-wise procurement quantity
- Centre-wise bookings
- Queue length analytics
- Average waiting time
- Capacity utilization
- Payment status overview

---

## ⚙️ API Endpoints

### Authentication
- `POST /auth/farmer/send-otp` - Send OTP
- `POST /auth/farmer/verify-otp` - Verify OTP
- `POST /auth/admin/login` - Admin login

### Locations
- `GET /api/states` - All states
- `GET /api/states/:id/districts` - Districts by state
- `GET /api/districts/:id/villages` - Villages by district
- `GET /api/centres` - Procurement centres

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - User bookings
- `GET /api/bookings/:id` - Booking details
- `PUT /api/bookings/:id` - Update booking

### Queue & Status
- `GET /api/queue/:bookingId` - Live queue
- `GET /api/procurement/:bookingId` - Procurement status
- `GET /api/payments/:bookingId` - Payment status

### Admin Operations
- `POST /api/admin/queue/call-next` - Call next token
- `POST /api/admin/arrival` - Mark arrival
- `POST /api/admin/weighing` - Record weighing
- `POST /api/admin/quality-check` - Quality check
- `POST /api/admin/procurement/complete` - Complete procurement

---

## 🎓 Demo Credentials

### Farmer
- **Mobile:** +91 9876543210
- **OTP:** 123456

### Admin
- **Username:** admin
- **Password:** admin@123

---

## 📝 Development Roadmap

- [x] Project setup and structure
- [x] Database schema design
- [x] Backend API foundation
- [x] Frontend responsive UI
- [x] Authentication system
- [x] Booking workflow
- [x] Queue management
- [x] Admin dashboard
- [ ] IVR system integration
- [ ] Real-time WebSocket implementation
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] SMS integration
- [ ] Performance optimization
- [ ] Production deployment

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request

---

## 📄 License

MIT License - See LICENSE file

---

## 📞 Support

For issues and questions:
- GitHub Issues: [Create issue](https://github.com/divyakalle010-glitch/rythu-seva/issues)
- Email: support@rythu-seva.dev

---

## 🙏 Acknowledgments

Built for Indian farmers with ❤️

**RYTHU SEVA** - "Plan Your Visit, Skip the Wait"
