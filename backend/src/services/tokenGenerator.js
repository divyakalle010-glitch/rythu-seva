const generateToken = (centreId, sequenceNumber) => {
  const prefix = centreId.substring(0, 1).toUpperCase();
  const paddedNumber = String(sequenceNumber).padStart(3, '0');
  return `${prefix}-${paddedNumber}`;
};

const parseToken = (tokenString) => {
  const [prefix, number] = tokenString.split('-');
  return {
    prefix,
    number: parseInt(number)
  };
};

module.exports = { generateToken, parseToken };
