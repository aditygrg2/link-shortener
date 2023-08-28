import React, { FormEvent, useReducer, useRef } from "react";
import { useState } from "react";
import { RxArrowRight } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { toggleLogin } from "../../store/Slice/LoginSlice";
import { BsGoogle } from "react-icons/bs";
import { urls } from "../../constants/constant";
import InputComponent from "./InputComponent";
import axios from "axios";
import { AuthRoutes } from "../../constants/routes";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { userActions } from "../../store/Slice/UserSlice";

interface stateObj {
  isLoginOpen: boolean;
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
  const currentInputRef = useRef<HTMLInputElement>(null);

  const isLoginOpen = useSelector((state: stateObj) => state.isLoginOpen);
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

  const submitHandler = async (password: string) => {
    setLoading(true);
    let currentState = authState;
    currentState.password = password;    

    const response = await axios.post(
      isUserRegistered ? AuthRoutes.submitLogin : AuthRoutes.submitRegister,
      currentState, {
        withCredentials: true
      }
    );

    if(response.data.registered){
      dispatch(userActions.setUser(response.data));
    }    
  
    setLoading(false);
    dispatch(toggleLogin());
  };

  const handleContinueButton = async (e: FormEvent) => {
    setLoading(true);

    const inputValue = currentInputRef.current?.value;
    const inputType = currentInputRef.current?.name;

    if (inputValue) {
      switch (inputType) {
        case "email":
          const response = await axios.post(
            AuthRoutes.checkIfEmailIsRegistered,
            {
              email: inputValue,
            }
          );

          /** Status is true if user is already registered*/
          const status = response.data.status;

          setIsUserRegistered(status ?? false);

          if (status) {
            setAuthState((state: AuthStatesType): AuthStatesType => {
              return {
                email: inputValue,
                name: response.data.userName,
                password: state.email,
              };
            });
            setRegisterStepState(InputTypeEnum.PASSWORD_SCREEN);
          } else {
            setAuthState((state: AuthStatesType): AuthStatesType => {
              return {
                email: inputValue,
                name: state.name,
                password: state.email,
              };
            });
            setRegisterStepState(InputTypeEnum.NAME_SCREEN);
          }
          clearInputs();
          break;

        case "password":
          submitHandler(inputValue);
          setRegisterStepState(InputTypeEnum.COMPLETED);
          break;

        case "name":
          setAuthState((state: AuthStatesType): AuthStatesType => {
            return {
              email: state.email,
              name: inputValue,
              password: state.password,
            };
          });
          setRegisterStepState(InputTypeEnum.PASSWORD_SCREEN);
          clearInputs();
          break;
      }
    } else {
      // Display error to allow user to write something.
    }
    setLoading(false);
  };

  return (
    <>
      {isLoginOpen && (
        <div
          onClick={() => dispatch(toggleLogin())}
          className={`h-full hidden lg:block w-full absolute z-[80] backdrop-blur-xl`}
        ></div>
      )}
      {
        <div
          className={`h-full ${
            isLoginOpen ? "lg:w-[40%] w-full opacity-100" : "w-0 opacity-0"
          } right-0 top-0 backdrop-filter backdrop-blur-md absolute overflow-hidden z-[100] transition-all duration-500 ${
            isUserRegistered ? "background-login" : "background-signup"
          }`}
        >
          <div className="absolute h-full w-full bg-gradient-to-b from-black/80 via-black/40 to-black/20">
            {
              <div
                className={`absolute h-full bg-gradient-to-r from-[#131E25] via-[#131E25]/50 to-[#131E25]/5 ${
                  loading ? "w-full" : "w-0"
                } transition-all duration-400 top-0 left-0 z-[110] backdrop-blur-md`}
              ></div>
            }

            <div className="w-full h-full py-4 px-2 relative overflow-x-hidden overflow-y-scroll text-white space-y-8 scrollbar-hidden">
              <div className="h-14 w-full">
                <button
                  onClick={() => {
                    dispatch(toggleLogin());
                  }}
                  title="Go back"
                  className="p-2 aspect-square rounded-full border border-gray-700 h-14 flex items-center justify-center cursor-pointer"
                >
                  <RxArrowRight className="text-primaryButton font-bold text-2xl" />
                </button>
              </div>

              <h1 className="flex flex-col space-y-3 text-3xl text-gray-300 whitespace-normal md:whitespace-nowrap w-full p-2 text-center">
                <span className="text-primaryButton text-5xl italic">
                  LogoName
                </span>

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

              <form className="flex flex-col items-center space-y-6 relative" onSubmit={(e) => {
                e.preventDefault();
              }}>
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
                        classname="cursor-not-allowed bg-slate-800"
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
                </div>
                <div className="flex items-center justify-between w-full lg:w-96 px-3">
                  {isUserRegistered && <button type="reset" className="text-white text-xs ">Forgot Password?</button>}
                </div>

                <input
                  type={'reset'}
                  onClick={handleContinueButton}
                  value="Continue"
                  className="border-[1px] border-primaryButton-0 bg-shadow  hover:bg-primaryButton-0 hover:text-white w-80 h-12 text-xl text-gray-300 rounded-md cursor-pointer tracking-wider"
                />
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Register;
