// The request succeeded. The result meaning of "success" depends on the HTTP method
const ok = ({ h, data, message }) => {
  const response = h.response({
    status: 'success',
    message,
    data,
  });
  response.code(200);
  return response;
};

// The request succeeded, and a new resource was created as a result.
// This is typically the response sent after POST requests, or some PUT requests
const created = ({ h, data, message }) => {
  const response = h.response({
    status: 'success',
    message,
    data,
  });
  response.code(201);
  return response;
};

module.exports = {
  ok,
  created,
};
