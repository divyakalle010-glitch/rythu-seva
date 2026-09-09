const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id);

    // Join centre queue room
    socket.on('join-queue', (data) => {
      const { centreId } = data;
      socket.join(`centre-${centreId}`);
      console.log(`📍 User joined centre queue: ${centreId}`);
    });

    // Leave queue
    socket.on('leave-queue', (data) => {
      const { centreId } = data;
      socket.leave(`centre-${centreId}`);
      console.log(`📍 User left centre queue: ${centreId}`);
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  return {
    emitQueueUpdate: (centreId, data) => {
      io.to(`centre-${centreId}`).emit('queue:updated', data);
    },
    emitTokenCalled: (centreId, data) => {
      io.to(`centre-${centreId}`).emit('token:called', data);
    },
    emitCapacityChange: (centreId, data) => {
      io.to(`centre-${centreId}`).emit('capacity:changed', data);
    },
    emitBookingUpdate: (bookingId, data) => {
      io.to(`booking-${bookingId}`).emit('booking:updated', data);
    }
  };
};

module.exports = { setupSocketHandlers };
