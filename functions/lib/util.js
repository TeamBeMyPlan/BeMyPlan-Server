module.exports = {
    success: (data) => {
      return {
        data
      };
    },
    fail: (statusCode, message) => {
      return {
        statusCode,
        message,
      };
    },
  };