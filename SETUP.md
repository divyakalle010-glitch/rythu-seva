# SETUP & DEPLOYMENT GUIDE

## Local Development Setup

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/divyakalle010-glitch/rythu-seva.git
cd rythu-seva
```

### Step 2: Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Configure your database
# Edit .env file:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=rythu_seva
# DB_USER=postgres
# DB_PASSWORD=your_password

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

### Step 4: IVR Setup (Optional)
```bash
cd ivr
npm install
npm run dev
```

IVR will run on `http://localhost:5001`

## Docker Deployment

### Using Docker Compose
```bash
# From project root
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Backend on port 5000
- Frontend on port 3000
- IVR on port 5001

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Stop Services
```bash
docker-compose down
```

## Database Setup

### Create Database
```bash
sudo -u postgres psql
CREATE DATABASE rythu_seva;
\q
```

### Run Migrations
```bash
cd backend
npm run migrate
```

### Seed Sample Data
```bash
npm run seed
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rythu_seva
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRY=7d
OTP_EXPIRY=300
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Code Quality

### Linting
```bash
# Backend
cd backend && npm run lint

# Fix linting issues
npm run lint:fix
```

## Deployment

### Production Build

#### Frontend
```bash
cd frontend
npm run build
# Build output in frontend/build/
```

#### Backend
```bash
cd backend
npm install --only=production
```

### Cloud Deployment (Heroku Example)

#### Create Heroku Apps
```bash
heroku create rythu-seva-backend
heroku create rythu-seva-frontend
```

#### Set Environment Variables
```bash
heroku config:set -a rythu-seva-backend JWT_SECRET=your_secret
heroku config:set -a rythu-seva-backend DATABASE_URL=your_db_url
```

#### Deploy
```bash
git push heroku main
```

## Monitoring & Logging

### Backend Logs
```bash
cd backend
npm run dev  # With full logging
```

### Database Monitoring
```bash
sudo -u postgres psql -d rythu_seva
\dt  # Show tables
\d tablename  # Show table structure
```

## Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U postgres -d rythu_seva
```

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend

# Kill process
kill -9 <PID>
```

### Node Modules Issues
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

## API Documentation

API endpoints are documented in `ARCHITECTURE.md`

## Support

For issues and questions:
- Open GitHub Issues
- Check documentation in `/docs`
- Review API examples in `/examples`

---

**Happy Farming! 🌾**
