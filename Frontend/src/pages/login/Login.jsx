import login_icon from "../../assets/login_icon.png";
import Whitetext from "../../components/small/Whitetext";
import Logo from "../../components/small/Logo";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MiniLoader from "../../components/small/MiniLoader";
import Notification from "../../components/small/Notification";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [submitText, setSubmitText] = useState("Login");
  const [forgetPasswordForm, setForgetPasswordForm] = useState(false);
  const [miniLoader, setMiniLoader] = useState(false); 
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  async function userExist() {
    try {
      const isUservalid = await axios.post(`${process.env.REACT_APP_API}/user/login`, {
        userEmail: email,
        userPassword: password,
      }, {
        withCredentials: true,
        mode: 'cors',
      });
      return isUservalid;
    } catch (error) {
      return "server error";
    }
  }

  async function submitfunction(e) {
    e.preventDefault();
    if (email?.trim() === "" || password?.trim() === "" || password === undefined || email === undefined) {
      setNotification("Enter Email and Password!");
      setTimeout(() => {
        setNotification('');
      }, 2000);
      return;
    } else {
      if (forgetPasswordForm) {
        forgetPasswordSubmit();
        return;
      } else {
        //login part from here
        setMiniLoader(true);
        const userFind = await userExist();

        if (userFind === 'server error') {
          setNotification("Server Error");
          setMiniLoader(false);
          setTimeout(() => {
            setNotification('');
          }, 4000);
          return;
        }
        if (userFind.data) {
          if (userFind.data.message === "success") {
            setNotification("logged In");
            const token = userFind.data.token;
            const expDate = new Date("2025-05-30T12:24:51.218Z");
            const formattedExpDate = expDate.toUTCString();

            document.cookie = `access_token=Bearer ${token}; path=/; expires=${formattedExpDate}; secure; samesite=None`;
            navigate('/');
            setMiniLoader(false);
            setTimeout(() => {
              setNotification('');
            }, 4000);
            return;
          } else if (userFind.data === "incorrect") {
            setNotification("Incorrect Password!");
            setMiniLoader(false);
            setTimeout(() => {
              setNotification('');
            }, 4000);
            return;
          }
        } else {
          //signup part starts from here
          setSubmitText("SignUp");
          document.getElementById("verify").style.display = "flex";
          document.getElementById("forgetPassword").style.display = "none";
          document.getElementById("email").disabled = true;

          let result = await axios.post(`${process.env.REACT_APP_API}/user/signup`, {
            otp: otp,
            userEmail: email,
            userPass: password,
            forgetPass: false,
          }, {
            withCredentials: true,
            mode: 'cors',
          });
          if (result.data === "otp sent") {
            setNotification("OTP has sent to your mail");
          } else if (result.data === "account created") {
            setSubmitText("Login");
            document.getElementById("verify").style.display = "none";
            document.getElementById("forgetPassword").style.display = "flex";
            document.getElementById("email").disabled = false;
            setOtp("");
            setNotification("Account Created!");
            document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
          } else if (result.data === "wrong otp") {
            setNotification("Invalid OTP!");
          } else {
            setNotification("Failed to create account!");
          }
          setMiniLoader(false);
          setTimeout(() => {
            setNotification('');
          }, 4000);
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
    setMiniLoader(true);
    let result = await axios.post(`${process.env.REACT_APP_API}/user/signup`, {
      otp: otp,
      userEmail: email,
      userPass: password,
      forgetPass: "password update",
    }, {
      withCredentials: true,
      mode: 'cors',
    });

    if (result.data === "otp sent") {
      setOtp("");
      setNotification("OTP has sent to your mail");
    } else if (result.data === "pass updated") {
      setForgetPasswordForm(false);
      setSubmitText("Login");
      document.getElementById("verify").style.display = "none";
      document.getElementById("forgetPassword").style.display = "block";
      document.getElementById("email").disabled = false;
      setOtp("");
      setNotification("Password changed!");
      document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    } else if (result.data === "wrong otp") {
      setOtp("");
      setNotification("Invalid OTP!");
    }
    setMiniLoader(false);
    setTimeout(() => {
      setNotification('');
    }, 4000);
    return;
  }

  async function forgetPassword() {
    if (email?.trim() === "" || email === undefined) {
      setNotification("Enter email for password recovery!");
    }
    else {
      setMiniLoader(true);
      const isUserExist = await userExist(); //checking this email exist in DB or not!

      if (isUserExist === 'server error') {
        setMiniLoader(false);
        return;
      }
      if (isUserExist.data) {
        setForgetPasswordForm(true);
        setSubmitText("Submit");
        document.getElementById("verify").style.display = "flex";
        document.getElementById("forgetPassword").style.display = "none";
        document.getElementById("email").disabled = true;
        try {
          await axios.post(`${process.env.REACT_APP_API}/user/signup`, {
            userEmail: email,
          }, {
            withCredentials: true,
            mode: 'cors',
          });
          setNotification("OTP has sent to your mail!");
          setMiniLoader(false);
        } catch (error) {
          setNotification("Error while sending otp");
        }
      } else {
        setNotification("User does not exist!");
        setMiniLoader(false);
      }
      setTimeout(() => {
        setNotification('');
      }, 4000);
    }
  }

  return (
    <>
      <div className="login-container">
        {miniLoader && <MiniLoader />}
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
              <Logo font_size="2rem" style={{ width: "fit-content", margin_top: "-3vh" }} />
            </div>
            <Whitetext
              text="Login/Signup"
              colour="white"
              textsize="2rem"
              textweight="600"
            />
            {notification !== '' && <Notification text={notification} height={"40px"} />}
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
              style={{ width: "100%", cursor: "pointer" }}
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
