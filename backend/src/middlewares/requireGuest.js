const requireGuest = (req, res, next) => {
  if (req.session.userId) {
    return res
      .status(403)
      .json({ success: false, message: 'You are already logged in.' });
  }

  next();
};

export default requireGuest;
