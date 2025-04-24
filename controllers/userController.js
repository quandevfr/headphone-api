const users = [
  { id: 1, name: "Nguyễn Văn A", phone: "0123456789" },
  { id: 2, name: "Trần Thị B", phone: "0987654321" },
  { id: 3, name: "Lê Văn C", phone: "0909090909" },
];

exports.getUsers = (req, res) => {
  res.json(users);
};
