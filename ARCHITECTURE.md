# RYTHU SEVA - System Architecture

## Overview

RYTHU SEVA is a three-tier agricultural procurement management platform connecting farmers, procurement centres, and administrators through multiple access channels.

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

## System Components

### 1. Frontend (React.js)
- **Responsive Design**: Mobile, Tablet, Desktop
- **Farmer Application**: Booking, Queue Tracking, Status Updates
- **Admin Dashboard**: Centre Management, Capacity Monitoring
- **Multi-language Support**: English, Telugu, Hindi
- **Real-time Updates**: WebSocket integration

### 2. Backend (Node.js + Express.js)
- **RESTful APIs**: All core operations
- **Database Integration**: PostgreSQL with Sequelize ORM
- **Real-time Communication**: Socket.IO for live updates
- **Authentication**: JWT + OTP
- **Role-based Access Control**: Super Admin, Centre Admin

### 3. Database (PostgreSQL)
- **Relational Model**: All entities with proper relationships
- **Location Hierarchy**: States → Districts → Villages → Centres
- **Transaction Support**: Safe concurrent operations
- **Audit Logging**: All actions tracked

### 4. IVR System
- **Phone Access**: Voice menus in English, Telugu, Hindi
- **DTMF Support**: Keypad navigation
- **Integration**: Connected to same backend and database
- **Features**: Registration, Booking, Status Check

## Database Schema

### Core Tables

```sql
STATES (state_id, state_name, state_code, type)
  ├─ DISTRICTS (district_id, state_id, district_name)
  │   └─ VILLAGES (village_id, district_id, village_name)
  │       ├─ PROCUREMENT_CENTRES (centre_id, ...)
  │       │   ├─ CENTRE_CROPS (centre_crop_id, ...)
  │       │   └─ SLOTS (slot_id, ...)
  │       └─ FARMERS (farmer_id, ...)
  │           ├─ CROPS (crop_id, ...)
  │           ├─ BOOKINGS (booking_id, ...)
  │           │   ├─ WEIGHING (weighing_id, ...)
  │           │   ├─ QUALITY_CHECKS (quality_id, ...)
  │           │   ├─ PAYMENTS (payment_id, ...)
  │           │   └─ QUEUE (queue_id, ...)
  │           └─ NOTIFICATIONS (notification_id, ...)
  └─ ADMIN_USERS (admin_id, ...)
      └─ AUDIT_LOGS (log_id, ...)
```

## API Architecture

### Authentication Endpoints
```
POST   /auth/farmer/send-otp
POST   /auth/farmer/verify-otp
POST   /auth/farmer/register
POST   /auth/admin/login
POST   /auth/logout
GET    /auth/verify
```

### Location Management
```
GET    /api/locations/states
GET    /api/locations/states/:id/districts
GET    /api/locations/districts/:id/villages
GET    /api/locations/centres
GET    /api/locations/centres/:id
GET    /api/locations/centres/:id/capacity
GET    /api/locations/centres/:id/slots
```

### Farmer Operations
```
POST   /api/crops
GET    /api/crops/:id
PUT    /api/crops/:id
GET    /api/bookings
POST   /api/bookings
GET    /api/bookings/:id
PUT    /api/bookings/:id
GET    /api/queue/:id
GET    /api/procurement/:id
GET    /api/payments/:id
```

### Admin Operations
```
POST   /api/admin/queue/call-next
POST   /api/admin/queue/mark-arrived
POST   /api/admin/weighing
POST   /api/admin/quality-check
POST   /api/admin/procurement/complete
GET    /api/admin/reports
POST   /api/admin/centres
PUT    /api/admin/centres/:id
GET    /api/admin/farmers
GET    /api/admin/audit-logs
```

## Data Flow

### Booking Flow
1. Farmer registers via app or IVR
2. Farmer adds crop details (declared quantity)
3. Farmer selects location (State → District → Village)
4. System shows available centres with current capacity
5. Farmer selects centre and available slot
6. System validates capacity and reserves space
7. Digital token generated
8. Booking confirmation sent

### Procurement Flow
1. Admin sees arriving farmer in queue
2. Admin marks farmer as ARRIVED
3. Admin calls next token
4. Admin starts WEIGHING process
5. Admin records actual quantity
6. Admin performs QUALITY_CHECK
7. Result: ACCEPTED or REJECTED
8. If accepted: PROCUREMENT_COMPLETED
9. Payment status tracked
10. Farmer notified at each step

## Security Architecture

### Authentication
- OTP-based farmer authentication (6-digit, 5-min expiry)
- JWT-based admin authentication
- Password hashing with bcryptjs

### Authorization
- Role-Based Access Control (RBAC)
- Farmer sees only own records
- Centre Admin sees only assigned centre
- Super Admin sees system-wide data

### Data Protection
- Input validation and sanitization
- SQL injection prevention via ORM
- CORS configuration
- Helmet.js security headers
- Audit logging of all operations

## Real-time Features

### WebSocket Events (Socket.IO)
```
- booking:created
- queue:updated
- token:called
- weighing:started
- quality:checked
- procurement:completed
- payment:updated
- capacity:changed
- centre:status-changed
- notification:sent
```

## Deployment Architecture

### Docker Containers
1. **PostgreSQL** - Database
2. **Backend** - Node.js API server
3. **Frontend** - React.js application
4. **IVR** - Twilio/Voice gateway

### Docker Compose
- All services on same network
- Database volume for persistence
- Environment variables for configuration
- Health checks for reliability

## Scalability Considerations

1. **Database**: Connection pooling, query optimization, indexing
2. **Backend**: Horizontal scaling via load balancer
3. **Frontend**: CDN for static assets
4. **IVR**: Twilio provides call distribution
5. **Real-time**: Socket.IO adapter for multi-server setup

## Performance Optimization

1. **Caching**: Redis for frequently accessed data
2. **Pagination**: Default 20, max 100 items per page
3. **Database Indexing**: On commonly filtered columns
4. **API Optimization**: Minimal data transfer, gzip compression
5. **Frontend Optimization**: Code splitting, lazy loading

## Monitoring & Logging

1. **Application Logs**: Morgan for HTTP, Winston for application
2. **Database Logs**: Query logs for performance monitoring
3. **Error Tracking**: Sentry for error collection
4. **Audit Logs**: Complete action history for compliance
5. **Health Checks**: Regular endpoint monitoring
