import passport from "passport";
import { Strategy } from "passport-local";
import { comparePasswords } from "../utils/helpers";
import db from "../db";
import { User } from "../types/User";

export default passport.use(
  new Strategy((username, password, done) => {
    try {
      const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
      const user = stmt.get(username) as User | undefined;
      if (!user || !comparePasswords(password, user.password)) {
        return done(null, false, { message: "Invalid Credentials" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const user = stmt.get(id) as User;

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
