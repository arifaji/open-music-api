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

// The server could not understand the request due to invalid syntax.
const bad = ({ h, data, message = 'Bad Request...' }) => {
  const response = h.response({
    status: 'fail',
    message,
    data,
  });
  response.code(400);
  return response;
};

// Result Not Found.
const notFound = ({ h, data, message = 'Not Found...' }) => {
  const response = h.response({
    status: 'fail',
    message,
    data,
  });
  response.code(404);
  return response;
};

// Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".
// That is, the client must authenticate itself to get the requested response.
const unauthorized = ({ h, data, message = 'Unauthorized...' }) => {
  const response = h.response({
    status: 'fail',
    message,
    data,
  });
  response.code(401);
  return response;
};

// The client does not have access rights to the content;
// that is, it is unauthorized, so the server is refusing to give the requested resource.
// Unlike 401 Unauthorized, the client's identity is known to the server.
const forbidden = ({ h, data, message = 'Forbidden...' }) => {
  const response = h.response({
    status: 'fail',
    message,
    data,
  });
  response.code(403);
  return response;
};

// The server has encountered a situation it does not know how to handle.
const internalServerError = ({
  h,
  data,
  message = 'Internal Server Error...',
}) => {
  const response = h.response({
    status: 'fail',
    message,
    data,
  });
  response.code(500);
  return response;
};

module.exports = {
  ok,
  created,
  bad,
  notFound,
  unauthorized,
  forbidden,
  internalServerError,
};
