exports.remove = function(req, res) {
  var contactId = parseInt(req.params.userId, 10);

  res.json({
    data: {
      id: contactId,
    },
  });
};
