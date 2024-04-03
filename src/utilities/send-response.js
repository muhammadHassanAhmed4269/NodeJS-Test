function sendResponse(res, status, message, data) {
  return res.status(status).json({
    header: { status, message },
    body: data,
  });
}

module.exports = sendResponse;
