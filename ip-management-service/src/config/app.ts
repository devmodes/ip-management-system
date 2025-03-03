export default {
  port: process.env.APP_PORT,
  jwt_secret: process.env.JWT_SECRET,

  // Constants
  create_ip: "create:ip",
  read_ip: "read:ip",
  update_ip: "update:ip",
  delete_ip: "delete:ip",
};
