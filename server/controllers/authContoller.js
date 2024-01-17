const Session = require("../models/sessions");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.registerUser = async function (req, res) {
  try {
    if (!req?.body?.userName || !req?.body?.password) {
      return res.json({
        status: "failed",
        message: "Please provide username and password",
      });
    }

    let user = await User.findOne({ userName: req.body.userName });

    if (user) {
      return res.json({
        status: "failed",
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user = await User.create({
      userName: req.body.userName,
      password: hashedPassword,
    });

    return res.json({
      status: "Success",
      user,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      status: "failed",
      message: "Internal Server error",
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    if (!req?.body?.userName || !req?.body?.password) {
      return res.json({
        status: "failed",
        message: "Please provide username and password",
      });
    }

    let user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      return res.json({
        status: "failed",
        message: "No User found please login",
      });
    }

    const passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatched) {
      return res.json({
        status: "failed",
        message: "Incorrect password",
      });
    }

    let session = await Session.findOne({ user: user._id });

    let AllSessions = await Session.find({});

    // If we don't have any last session we create a new session with user
    if (AllSessions.length === 0) {
      session = await Session.create({
        user: user._id,
        sessionStart: Date.now(),
        sessionEnd: Date.now() + 60 * 5 * 1000,
      });

      return res.json({
        status: "success",
        session: session,
        user: user,
        message: `Logged in`,
      });
    }

    AllSessions = AllSessions.sort((a, b) => b.sessionEnd - a.sessionEnd);

    const lastSession = AllSessions[0];

    // If we have user session already in our DB
    if (session) {
      //modify the session if needed
      const currentTime = Date.now();
      //if the current time is less than session end time this means we don't need to modify session
      if (
        session.sessionEnd >= currentTime &&
        session.sessionStart <= currentTime
      ) {
        // logged in user
        return res.json({
          status: "success",
          session: session,
          user: user,
          message: "You are already logged in",
        });
      }
      // else we will modify the session
      else {
        if (
          session.sessionStart > currentTime &&
          session.sessionEnd > currentTime
        ) {
          return res.json({
            status: "success",
            session: session,
            user: user,
            message: `You are in the queue, you can login at ${new Date(
              session.sessionStart
            )}`,
          });
        }

        session.sessionStart =
          lastSession.sessionEnd > Date.now()
            ? lastSession.sessionEnd
            : Date.now();
        session.sessionEnd =
          lastSession.sessionEnd > Date.now()
            ? lastSession.sessionEnd + 60 * 5 * 1000
            : Date.now() + 60 * 5 * 1000;
        await session.save();
      }
    } else {
      // create and push session
      session = await Session.create({
        sessionStart:
          lastSession.sessionEnd > Date.now()
            ? lastSession.sessionEnd
            : Date.now(),
        sessionEnd:
          lastSession.sessionEnd > Date.now()
            ? lastSession.sessionEnd + 60 * 5 * 1000
            : Date.now() + 60 * 5 * 1000,
        user: user._id,
      });
    }

    return res.json({
      status: "success",
      session: session,
      user: user,
      message: `You can login at ${new Date(session.sessionStart)}`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      status: "failed from",
      message: "Internal Server error",
    });
  }
};
