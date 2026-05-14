/*const db = require('./models');
const bcrypt = require('bcrypt');

async function createAdminUser() {
  try {
    console.log("Models:", Object.keys(db));

    const Admin = db.admin;

    if (!Admin) {
      console.log("❌ Admin model not found");
      console.log("Available models:", Object.keys(db));
      return;
    }

    const email = "admin@bousalaty.com";
    const plainPassword = "Admin@12345";

    const existingAdmin = await Admin.findOne({
      where: { email }
    });

    if (existingAdmin) {
      console.log("❌ Admin already exists:", email);
      return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = await Admin.create({
      email: email,
      name: "Administrator",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin created successfully");
    console.log("Email:", newAdmin.email);
    console.log("Password:", plainPassword);
    console.log("ID:", newAdmin.id);

  } catch (error) {
    console.log("❌ Error:", error);
  } finally {
    process.exit(0);
  }
}


createAdminUser();*/