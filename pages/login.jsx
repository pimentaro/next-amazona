import {
  List,
  Typography,
  ListItem,
  TextField,
  Button,
  Link,
} from "@material-ui/core"
import React, { useState, useContext } from "react"
import Layout from "../components/Layout"
import useStyles from "../utils/styles"
import NextLink from "next/link"
import axios from "axios"
import { Store } from "../utils/Store"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

export default function Login() {
  const router = useRouter()
  const { redirect } = router.query
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  if (userInfo) {
    router.push("/")
  }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles()
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/users/login", { email, password })
      dispatch({ type: "USER_LOGIN", payload: data })
      Cookies.set("userInfo", data)
      router.push(redirect || "/")
    } catch (err) {
      console.log(err)
      alert(err.response.data ? err.response.data.message : err.message)
    }
  }
  return (
    <Layout title="login">
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              label="email"
              inputProps={{ type: "email" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="password"
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ type: "password" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account?
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}