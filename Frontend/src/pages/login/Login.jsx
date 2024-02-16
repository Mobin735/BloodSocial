import login_icon from "../../assets/login_icon.png";
import Whitetext from "../../components/small/Whitetext";
import Logo from "../../components/small/Logo";
import "./Login.css";
import { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [otp, setOtp] = useState();
  const [submitText, setSubmitText] = useState("Login");
  const [forgetPasswordForm, setForgetPasswordForm] = useState(false);

  async function userExist() {
    let userFind = await axios.post(`http://localhost:5000/user/login`, {
      userEmail: email,
      userPassword: password,
    });
    return userFind;
  }

  async function submitfunction(e) {
    e.preventDefault();
    if (email?.trim() === "" || password?.trim() === "" || password === undefined || email === undefined) {
      alert("Enter Email and Password!");
      return;
    } else {
      if (forgetPasswordForm) {
        forgetPasswordSubmit();
        return;
      } else {
        //login part from here
        const userFind = await userExist();

        if (userFind.data) {
          if (userFind.data === "success") {
            alert("logged In");
            return;
          } else if (userFind.data === "incorrect") {
            alert("Incorrect Password!");
            return;
          }
        } else {
          //signup part starts from here
          setSubmitText("SignUp");
          document.getElementById("verify").style.display = "flex";
          document.getElementById("forgetPassword").style.display = "none";
          document.getElementById("email").disabled = true;

          let result = await axios.post(`http://localhost:5000/user/signup`, {
            otp: otp,
            userEmail: email,
            userPass: password,
            forgetPass: false,
          });
          if (result.data === "otp sent") {
            alert("OTP has sent to your mail");
          } else if (result.data === "account created") {
            setSubmitText("Login");
            document.getElementById("verify").style.display = "none";
            document.getElementById("forgetPassword").style.display = "flex";
            document.getElementById("email").disabled = false;
            setOtp("");
            alert("Account Created!");
          } else if (result.data === "wrong otp") {
            alert("Invalid OTP!");
          } else {
            alert("Failed to create account!");
          }
          return;
        }
      }
    }
  }

  function showPassword() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  async function forgetPasswordSubmit() {
    let result = await axios.post(`http://localhost:5000/user/signup`, {
      otp: otp,
      userEmail: email,
      userPass: password,
      forgetPass: "otp verify",
    });

    if (result.data === "otp sent") {
      setOtp("");
      alert("OTP has sent to your mail");
    } else if (result.data === "pass updated") {
      setForgetPasswordForm(false);
      setSubmitText("Login");
      document.getElementById("verify").style.display = "none";
      document.getElementById("forgetPassword").style.display = "block";
      document.getElementById("email").disabled = false;
      setOtp("");
      alert("Password changed!");
    } else if (result.data === "wrong otp") {
      setOtp("");
      alert("Invalid OTP!");
    }
  }

  async function forgetPassword() {
    if (email?.trim() === "" || email === undefined) {
      alert("Enter email for password recovery!");
    } else {
      const isUserExist = await userExist(); //checking this email exist in DB or not!

      if (isUserExist.data) {
        setForgetPasswordForm(true);
        setSubmitText("Submit");
        document.getElementById("verify").style.display = "flex";
        document.getElementById("forgetPassword").style.display = "none";
        document.getElementById("email").disabled = true;
        await axios.post(`http://localhost:5000/user/signup`, {
          userEmail: email,
          forgetPass: "otp",
        });
        alert("OTP has sent to your mail!");
      } else {
        alert("User does not exist!");
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="rightHalf">
          <img className="loginIcon" src={login_icon} alt="login_icon" />
          <Logo font_size="2rem" />
          <Whitetext
            text="Connecting Blood Donors and Recipients"
            colour="white"
            textsize="1.8rem"
            textweight="600"
            margin_top="8px"
          />
          <Whitetext
            text="Find blood donors, by blood type or proximity, easily on a map."
            colour="white"
            textsize="15px"
            textweight="200"
            margin_top="0px"
          />
        </div>
        <div className="leftHalf">
          <div className="leftContainer">
            <div className="mobileUi">
              <img className="loginIcon" src={login_icon} alt="login_icon" />
              <Logo font_size="2rem" style={{width:"fit-content",margin_top:"-3vh"}} />
            </div>
            <Whitetext
              text="Login/Signup form"
              colour="white"
              textsize="2rem"
              textweight="600"
            />
            <form className="loginForm">
              <Whitetext
                text="Email Address"
                colour="white"
                textsize="20px"
                textweight="200"
                margin_top="0px"
              />
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
                autoComplete="on"
              />
              <Whitetext
                text="Password"
                colour="white"
                textsize="20px"
                textweight="200"
                margin_top="0px"
              />
              <input
                id="Password"
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="verify" id="verify">
                <Whitetext
                  text="Verify Email"
                  colour="white"
                  textsize="20px"
                  textweight="200"
                  margin_top="0px"
                />
                <input
                  type="number"
                  name="OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  placeholder="Enter OTP"
                />
              </div>
              <div className="showpassword">
                <input
                  type="checkbox"
                  value="Show Password"
                  name="showPassword"
                  onClick={showPassword}
                />
                <Whitetext
                  text="Show Password"
                  colour="white"
                  textsize="1rem"
                  textweight="200"
                />
              </div>
              <button className="submitButton" onClick={submitfunction}>
                {submitText}
              </button>
            </form>
            <div
              id="forgetPassword"
              onClick={forgetPassword}
              style={{ width: "100%" }}
            >
              <Whitetext
                text="Forgot your password?"
                colour="white"
                textsize="15px"
                textweight="200"
                margin_top="0px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
