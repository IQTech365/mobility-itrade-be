const Notify = require("../Models/Notify");
const Notifythem = async (recipient, message) => {
  const Notifydata = await new Notify({
    Notification: message,
    to: recipient,
  });
  await Notifydata.save()
    .then(() => {
      return "Success";
    })
    .catch(() => {
      return "failed";
    });

  return { success: success, failure: failure };
};

exports.Notifythem = Notifythem;
