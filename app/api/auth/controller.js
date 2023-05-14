const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
              },
            },
            "secretketjwt", { expiresIn : '1h' }
          );
          res.status(200).json({ message: "Berhasil login", token: token });
        } else {
          res.status(403).json({ message: "Invalid password" });
        }
      } else {
        res.status(403).json({ message: "Invalid email" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  signUp: async (req, res, next) => {
    try {
      const { name, email, password, gender, role } = req.body;

      const checkEmail = await User.findOne({ where: { email: email } });
      if (checkEmail) {
        return res.status(403).json({ message: "Email sudah terdaftar" });
      }

      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        gender,
        role
      });

      console.log(user,dataValues.password);
      delete user.dataValues.password;


      res.status(200).json({
        message: "Berhasil melakukan registrasi",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "gender", "role"],

        offset: req.query.page,
        limit: req.query.size,
      });
      const userCount = await User.count();

      res.status(200).json({
        message: "Success Mendapatkan semua data user",
        data: users,
        meta: {
          page: req.query.page,
          count: userCount,
          size: users.length,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getByIdUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "name", "email", "gender", "role"],
      });

      res.status(200).json({
        message: "Success Mendapatkan data user berdasarkan id",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password, gender, role } = req.body;
      const checkUser = await User.findOne({
        where: {
          id: id,
        },
      });

      const users = await checkUser.update({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        gender: gender,
        role: role,
      });
      res.status(200).json({
        message: "Success Update data users",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteUser: (req, res, next) => {
    User.findOne({
      where: { id: req.params.id },
    })
      .then((user) => {
        if (user) {
          user.destroy();

          res.status(200).json({
            message: "Success hapus data user",
            data: user,
          });
        }
      })
      .catch((err) => next(err));
  },
  
};


