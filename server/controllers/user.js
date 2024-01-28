import User from "../models/user.js"

////////////////////
// User Login,    //
// token is given //
////////////////////
export const login = async (req, resp) => {
  const body = req.body
  const { email, password } = body

  try {
    const loginUser = await User.findByCredentials(email, password)
    // console.log("loginUser", loginUser)

    const user = {
      name: loginUser.name,
      email: loginUser.email,
    }

    if (loginUser.tokens.length > 0) {
      resp.status(200).send({
        message: "Login SuccessFully",
        user: user,
        token: loginUser.tokens[0].token,
      })
    } else {
      const token = await loginUser.generateAuthToken()
      resp.status(200).json({
        message: "Login SuccessFully",
        user: user,
        token: token,
      })
    }
  } catch (error) {
    resp.status(400).send({
      message: "Login Fails",
    })
  }
}

/////////////////////
// User is created //
// token is given  //
/////////////////////

export const register = async (req, resp) => {
  const { name, email, password } = req.body
  // console.log(req.body)
  const userExists = await User.findOne({ email })

  if (userExists) {
    resp.status(400)
    return resp.status(400).send({ message: "User already exists" })
    // throw new Error("User already exists");
  }

  try {
    const createUser = await User.create({
      name,
      email,
      password,
    })
    // const user = new User(req.body);
    // await user.save();

    const token = await createUser.generateAuthToken()
    // console.log(token);

    const user = {
      name: createUser.name,
      email: createUser.email,
    }
    // console.log("USER", user)

    resp.status(210).send({
      message: "Registered Successfully",
      user: user,
      token: token,
      // name: user.name,
    })
  } catch (error) {
    resp.status(400).send({
      message: "Registeration Failed",
    })
  }
}

export const registerGoogle = async (req, resp) => {
  const { displayName: name, user: email, token } = req.body

  const userExists = await User.findOne({ email: email })

  // if (userExists) {
  //     resp.status(400)
  //     return resp.status(400).send({ error: "User already exists" })
  //     // throw new Error("User already exists");
  // }

  if (userExists) {
    userExists.tokens = { token: token }
    await userExists.save()
    resp.status(200).json({
      message: "Login Successfully",
      user: email,
      token: token,
    })
  } else {
    try {
      await User.create({
        name: name,
        email: email,
        password: "t876876876emp",
      })

      resp.status(210).json({
        message: "Registered Successfully",
        user: decoded.email,
        token: token,
      })
    } catch (error) {
      resp.status(400).json({
        message: "Registeration Failed",
      })
    }
  }
}
