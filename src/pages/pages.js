const path = require("path");
const Message = require("../models/message");

class Pages {
  home(req, res) {
    try {
      return res.render("home");
    } catch (error) {
      console.error(error);
    }
  }

  signUp(req, res) {
    try {
      return res.render("signup");
    } catch (error) {
      console.error(error);
    }
  }

  login(req, res) {
    try {
      return res.render("login");
    } catch (error) {
      console.error(error);
    }
  }

  async messages(req, res) {
    try {
      const existingMessages = await Message.find({
        sender: req.user._id,
        deleteForMe: false,
      });

      const messages = [];
      existingMessages.map((m) => {
        messages.push({
          content: m.content,
          sendAt: formatDateString(m.createdAt),
        });
      });
      return res.render("messages", { messages });
    } catch (error) {
      console.error(error);
    }
  }

  async dashboard(req, res) {
    try {
      const myMessages = await Message.find({
        sender: req.user._id,
        deleteForMe: false,
      }).populate("sender");

      const othersMessages = await Message.find({
        sender: { $ne: req.user._id },
      }).populate("sender");

      res.render("dashboard", {
        user: req.user,
        myMessages,
        othersMessages,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

function formatDateString(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return date.toLocaleString("en-US", options);
}
