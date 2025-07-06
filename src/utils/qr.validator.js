export const validateQRInput = (req, res, next) => {
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    req.flash("error", "Text or URL is required to generate QR code.");
    return res.redirect("/"); 
  }

  if (text.length > 200) {
    req.flash("error", "Text too long! Max 200 characters.");
    return res.redirect("/");
  }
  if (text.length <= 2) {
    req.flash("error", "Text too short! Min 3 characters.");
    return res.redirect("/");
  }

  next();
};
