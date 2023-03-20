const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Add a simple route for testing
app.get('/', (req, res) => {
  res.send('Hello from Auction Backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, users } = require('./models/User');

app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(passport.initialize());

// Passport.js local strategy configuration
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  const user = users.find(u => u.email === email);

  if (!user) {
    return done(null, false, { message: 'Incorrect email.' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    return isMatch ? done(null, user) : done(null, false, { message: 'Incorrect password.' });
  });
}));

// Serialize and deserialize user instances
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Generate a JWT token for the user
const generateJWT = (user) => {
  const payload = { id: user.id, email: user.email };
  const secret = 'your_jwt_secret'; // You should use a proper secret key and store it in an environment variable
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
};

// Sign-up route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already in use.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(Date.now(), email, hashedPassword);
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully.' });
});

// Login route
app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = generateJWT(req.user);
  res.json({ token });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const { User, users } = require('./models/User');
const { Auction, auctions } = require('./models/Auction');

// Create a new auction
app.post('/auctions', (req, res) => {
  const { title, imageUrl, endTime } = req.body;

  const newAuction = new Auction(
    Date.now(),
    title,
    imageUrl,
    new Date(endTime),
    0,
    null
  );

  auctions.push(newAuction);
  res.status(201).json(newAuction);
});

// Get all auctions
app.get('/auctions', (req, res) => {
  res.json(auctions);
});

// Get a specific auction by ID
app.get('/auctions/:id', (req, res) => {
  const auction = auctions.find(a => a.id === parseInt(req.params.id));

  if (!auction) {
    return res.status(404).json({ message: 'Auction not found.' });
  }

  res.json(auction);
});

// Create a new auction
app.post('/auctions', (req, res) => {
    const { title, imageUrl, endTime } = req.body;
  
    const newAuction = new Auction(
      Date.now(),
      title,
      imageUrl,
      new Date(endTime),
      0,
      null
    );
  
    auctions.push(newAuction);
    res.status(201).json(newAuction);
  });
  
  // Get all auctions
  app.get('/auctions', (req, res) => {
    res.json(auctions);
  });
  
  // Get a specific auction by ID
  app.get('/auctions/:id', (req, res) => {
    const auction = auctions.find(a => a.id === parseInt(req.params.id));
  
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found.' });
    }
  
    res.json(auction);
  });
  

  // JWT authentication middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const secret = 'your_jwt_secret';
  
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = decoded;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  
// Place a bid on an auction
app.post('/auctions/:id/bid', authenticateJWT, (req, res) => {
    const auction = auctions.find(a => a.id === parseInt(req.params.id));
  
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found.' });
    }
  
    const { bid } = req.body;
  
    if (bid <= auction.highestBid) {
      return res.status(400).json({ message: 'Bid must be higher than the current highest bid.' });
    }
  
    auction.highestBid = bid;
    auction.highestBidder = req.user.id;
  
    res.status(200).json({ message: 'Bid placed successfully.', highestBid: bid });
  });
  