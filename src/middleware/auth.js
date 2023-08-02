const jwt = require('jsonwebtoken');
const { secret, accessTokenExpiration } = require('../config/auth');
const { generateAccessToken } = require('../utils/tokens');

async function refreshToken(req, res) {
  try {
    const refreshToken = req.body.token;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token not provided.' });
    }

    jwt.verify(refreshToken, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid refresh token.' });
      }

      const accessToken = generateAccessToken(user);
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not refresh token.' });
  }
}
function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const accessToken = authHeader.split(' ')[1];
    jwt.verify(accessToken, secret, (err, decoded) => {
      if (err) {
        // Token expired or invalid, attempt to refresh token
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
          return res.status(401).json({ error: 'Access token is expired. Please login again.' });
        }
        jwt.verify(refreshToken, secret, (err, decoded) => {
          if (err) {
            return res.status(403).json({ error: 'Refresh token is expired or invalid. Please login again.' });
          }
          // Generate new access token and return it to the client
          const newAccessToken = jwt.sign({ userId: decoded.userId }, secret, { expiresIn: accessTokenExpiration });
          req.accessToken = newAccessToken;
          next();
        });
      } else {
        // Access token is valid, proceed with the request
        req.accessToken = accessToken;
        next();
      }
    });
  } else {
    return res.status(401).json({ error: 'Authorization header with Bearer token not found.' });
  }
}

module.exports = { refreshToken, verifyAccessToken };
