import React, { FormEvent, useReducer, useRef } from "react";
import { useState } from "react";
import { toggleLogin } from "../../store/Slice/LoginSlice";
import { BsGoogle } from "react-icons/bs";
import { urls } from "../../constants/constant";
import InputComponent from "./InputComponent";
import axios from "axios";
import { AuthRoutes } from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { userActions } from "../../store/Slice/UserSlice";

interface stateObj {
  isRHNOpen: boolean;
}

type authActions = {
  type: string;
  value?: string;
};

const defaultAuthState = {
  email: "",
  password: "",
  name: "",
};

type AuthStatesType = typeof defaultAuthState;

enum InputTypeEnum {
  EMAIL_SCREEN,
  PASSWORD_SCREEN,
  NAME_SCREEN,
  COMPLETED,
}

const Register: React.FC = () => {
  const [authState, setAuthState] = useState(defaultAuthState);

  const [registerStepState, setRegisterStepState] = useState(
    InputTypeEnum.EMAIL_SCREEN
  );
  
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const currentInputRef = useRef<HTMLInputElement>(null);

  const isRHNOpen = useAppSelector((state: stateObj) => state.isRHNOpen);

  const dispatch = useAppDispatch();

  const headerText = (): string => {
    let header = "Let's get you started!";
    if (isUserRegistered) {
      if (registerStepState === InputTypeEnum.PASSWORD_SCREEN) {
        header = `Hey, ${authState.name}! Welcome Back!`;
      }
    } else {
      if (registerStepState === InputTypeEnum.PASSWORD_SCREEN) {
        header = `Heya, ${authState.name}`;
      } else if (registerStepState === InputTypeEnum.NAME_SCREEN) {
        header = "Let's finish signing up!";
      }
    }

    return header;
  };

  const clearInputs = () => {
    if (currentInputRef.current) {
      currentInputRef.current.value = "";
    }
  };

  const submitHandler = async (password: string): Promise<boolean> => {
    let currentState = authState;
    currentState.password = password;

    try {
      const response = await axios.post(
        isUserRegistered ? AuthRoutes.submitLogin : AuthRoutes.submitRegister,
        currentState,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data.registered) {
        dispatch(userActions.setUser(response.data));
        dispatch(toggleLogin(false));
      } else {
        setError(response.data.error);
      }
    } catch (err: any) {
      console.log(err);

      if (err) {
        if (err.response.status === 401) {
          setError("Invalid username or password");
        } else {
          setError(err.response.data);
        }

        setLoading(false);
      } else {
        setError("We are having some issues contacting the server");
        setLoading(false);
      }

      return false;
    }

    setLoading(false);
    return true;
  };

  const handleContinueButton = async (e: FormEvent) => {
    setLoading(true);

    const inputValue = currentInputRef.current?.value;
    const inputType = currentInputRef.current?.name;

    if (inputValue) {
      switch (inputType) {
        case "email":
          if (!inputValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setError("Please write a valid email!");
            setLoading(false);
            return;
          }

          const response = await axios.post(
            AuthRoutes.checkIfEmailIsRegistered,
            {
              email: inputValue.trim(),
            }
          );

          /** Status is true if user is already registered*/
          const status = response.data.status;

          setIsUserRegistered(status ?? false);

          if (status) {
            setAuthState((state: AuthStatesType): AuthStatesType => {
              return {
                email: inputValue.trim(),
                name: response.data.userName.trim(),
                password: state.email.trim(),
              };
            });
            setRegisterStepState(InputTypeEnum.PASSWORD_SCREEN);
          } else {
            setAuthState((state: AuthStatesType): AuthStatesType => {
              return {
                email: inputValue.trim(),
                name: state.name.trim(),
                password: state.email.trim(),
              };
            });
            setRegisterStepState(InputTypeEnum.NAME_SCREEN);
          }
          clearInputs();
          setError("");
          break;

        case "password":
          if (inputValue.length < 8) {
            setError("Password length must be greater than 8");
            setLoading(false);
            return;
          }

          const isUserAuthCorrect = await submitHandler(inputValue);
          if (isUserAuthCorrect) {
            setRegisterStepState(InputTypeEnum.COMPLETED);
            setError("");
          }

          break;

        case "name":
          if (inputValue.length === 0) {
            setError("Please enter a valid name");
            return;
          }
          setAuthState((state: AuthStatesType): AuthStatesType => {
            return {
              email: state.email.trim(),
              name: inputValue.trim(),
              password: state.password.trim(),
            };
          });
          setRegisterStepState(InputTypeEnum.PASSWORD_SCREEN);
          clearInputs();
          setError("");
          break;
      }
    } else {
      setLoading(false);
      setError("Email field cannot be blank!");
      return;
    }
    setLoading(false);
  };

  return (
    <>
        <div className="h-full w-full">

          {
            <div
              className={`absolute h-full bg-gradient-to-r from-[#131E25] via-[#131E25]/50 to-[#131E25]/5 ${
                loading ? "w-full" : "w-0"
              } transition-all duration-400 top-0 left-0 z-[110] backdrop-blur-md`}
            ></div>
          }
          
          <div className="w-full h-full py-4 px-2 relative overflow-x-hidden overflow-y-scroll text-white space-y-8 scrollbar-hidden">

            <h1 className="flex flex-col space-y-3 text-3xl text-gray-300 whitespace-normal md:whitespace-nowrap w-full p-2 text-center">
              <span className="text-primaryButton text-5xl italic">Kuts</span>

              <span>{headerText()}</span>
            </h1>

            {registerStepState === InputTypeEnum.EMAIL_SCREEN && (
              <>
                <div className="flex items-center justify-center space-x-4">
                  <a href={`${urls.SERVER_URL}` + "/auth/google"}>
                    <button
                      title="Continue with Google"
                      className="bg-primaryButton-0 bg-shadow p-4 rounded-md hover:bg-transparent transition-all duration-200"
                    >
                      <BsGoogle className="text-3xl" />
                    </button>
                  </a>
                </div>

                <div className="flex items-center justify-center w-full space-x-4">
                  <div className="h-[0.5px] w-36 bg-gray-400"></div>
                  <h1 className="text-3xl">Or</h1>
                  <div className="h-[0.5px] w-36 bg-gray-400"></div>
                </div>
              </>
            )}

            <form
              className="flex flex-col items-center space-y-6 relative"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="w-full flex flex-col space-y-2 items-center">
                {registerStepState === InputTypeEnum.EMAIL_SCREEN && (
                  <InputComponent
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    ref={currentInputRef}
                  />
                )}
                {registerStepState === InputTypeEnum.PASSWORD_SCREEN && (
                  <>
                    <InputComponent
                      type="email"
                      value={`${authState.email}`}
                      name="email"
                      disabled={true}
                      classname="cursor-not-allowed bg-gray-700"
                    />
                    <InputComponent
                      placeholder="Enter password"
                      name="password"
                      type="password"
                      ref={currentInputRef}
                    />
                  </>
                )}
                {registerStepState === InputTypeEnum.NAME_SCREEN && (
                  <InputComponent
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                    ref={currentInputRef}
                  />
                )}
                {error.length > 0 && (
                  <p className="text-red-500 p-2">{error}</p>
                )}
              </div>
              <input
                title={'Continue'}
                type={"button"}
                onClick={handleContinueButton}
                value="Continue"
                className="border-[1px] border-primaryButton-0 bg-shadow  hover:bg-primaryButton-0 hover:text-white w-80 h-12 text-xl text-gray-300 rounded-md cursor-pointer tracking-wider"
              />
            </form>
          </div>
        </div>
    </>
  );
};

export default Register;
