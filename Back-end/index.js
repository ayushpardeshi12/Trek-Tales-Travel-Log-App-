const express = require("express");
const dbConnect = require("../Back-end/databases/connect");
const User = require("../Back-end/databases/userSchema");
const bcrypt = require("bcrypt");
const app = express();
let PORT = process.env.PORT || 8080;

// database connection
dbConnect;

// middleware forquire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// views

app.get("/", (req, res) => {
  return res.send("200 Success!");
});

app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password, number } = req.body;
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    if (password.length > 5) {
      const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        number: number,
        password: hashedPassword,
      });

      return res.status(200).send("User Created Successfully");
    } else {
      return res.status(404).send("Password Length Less Then 5");
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

app.post("/loginFromEmail", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(404).send("Password Not Matched");
    }

    return res.status(200).send("Welcome To Trek Tales");
  } catch (error) {
    return res.status(404).send("Error: " + error.message);
  }
});

app.post('/loginFromNumber', async(req,res)=>{
    const {number, password} = req.body;

    let user = await User.findOne({number:number});
    if(!user){
        return res.status(404).send("User Not Found");
    }
})

app.listen(PORT, () => {
  console.log(`Server Running On http://localhost:${PORT}`);
});
