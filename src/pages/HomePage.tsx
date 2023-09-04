import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import NavBar from "../components/Navbar/NavBar";
import ParticlesContainer from "../components/Extras/ParticlesContainer";
import { BiCheck, BiCopyAlt, BiCopyright, BiLink, BiLoaderAlt, BiPointer } from "react-icons/bi";
import { generate } from "random-words";
import { BsArrowDown, BsCheck, BsQrCode, BsSearch, BsX } from "react-icons/bs";
import axios from "axios";
import { languages, urls } from "../constants/constant";
import { motion } from "framer-motion";
import { fadeIn } from "../constants/variants";
import QRCodeModal from "../components/Modals/QRCodeModal";
import Facet from "../components/Mains/Facet";
import {
  handleCustomURLError,
  isPasswordPatternValid,
} from "../utils/handlers";
import { LinkRoutes } from "../constants/routes";

let loadedTime = new Date().toISOString();
loadedTime = loadedTime.substring(0, loadedTime.lastIndexOf(":"));

const HomePage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [shortenedLink, setShortenedLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [isQRCodeEnabled, setQRCodeEnabled] = useState(false);
  const [visibleMoreOptions, setVisibleMoreOptions] = useState(false);
  const [customURLValue, setCustomURLValue] = useState("");
  const [isURLFound, setIsURLFound] = useState(false);
  const [customURLLoading, setCustomURLLoading] = useState(false);
  const [expiryTime, setExpiryTime] = useState("");
  const [languageSelected, setLanguageSelected] = useState("Auto");
  const [password, setPassword] = useState("");
  const [mainLink, setMainLink] = useState("");
  const [randomLink, setRandomLink] = useState("");
  const [randomLinkLoader, setRandomLinkLoader] = useState(false);

  const handleLinkSubmit = async () => {
    console.log(isLinkInvalidChecks);

    if (isLinkInvalidChecks) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        LinkRoutes.shortenLink,
        {
          path: mainLink.trim(),
          customURL: customURLValue.trim(),
          expiryTime: expiryTime,
          languageSelected: languageSelected,
          password: password.trim(),
        },
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setLoading(false);
        const url = urls.CLIENT_URL + "/" + response.data.newPath;
        setShortenedLink(url);
        setMainLink(url);
      } else {
        // show error
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onExpiryTimeSet = (e: any) => {
    setExpiryTime(e.target?.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedLink);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 5000);
  };

  const handleAnotherLink = () => {
    setShortenedLink("");
    setMainLink("");
  };

  const handleCustomURLChange = (e: any) => {
    setCustomURLValue(e.target.value);
  };

  useEffect(() => {
    if (customURLValue) {
      const interval = setTimeout(() => {
        setCustomURLLoading(true);
        const checkData = async () => {
          const result = await axios.post(LinkRoutes.checkCustomURL, {
            customURL: customURLValue,
          });

          setIsURLFound(result.data.status);
          setCustomURLLoading(false);
        };
        checkData();
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [customURLValue.trim()]);

  const handleLanguageSelected = (e: any) => {
    setLanguageSelected(e.target.value);
  };

  const onMainLinkChange = (e: any) => {
    setMainLink(e.target.value);
  };

  const isLinkInvalidChecks = useMemo((): boolean => {
    return (
      mainLink.length == 0 ||
      customURLLoading ||
      isURLFound ||
      !isPasswordPatternValid(password) ||
      loadedTime === expiryTime
    );
  }, [mainLink, customURLLoading, isURLFound, mainLink, password]);

  const generateMemorisableWords = async () => {
    setRandomLinkLoader(true);

    while (true) {
      const word = generate(2).join("-");

      const result = await axios.post(LinkRoutes.checkCustomURL, {
        customURL: word,
      });

      console.log(result);

      if (!result.data.status) {
        setRandomLink(word);
        break;
      }
    }
    setRandomLinkLoader(false);
  };

  const setMemorisableWord = () => {
    setCustomURLValue(randomLink);
    setRandomLink("");
  };

  return (
    <div
      className={`h-full w-full overflow-x-hidden overflow-y-scroll scrollbar-hidden background relative`}
    >
      <div className="h-full w-full bg-gradient-to-r from-black/80 via-black/60 to-black/0">

        <NavBar />

        <div className="w-full flex flex-col justify-between overflow-hidden relative z-20">
          <ParticlesContainer />

          <div className="pt-16 pl-4 md:pl-8 lg:pl-12 p-2 text-white pb-48 scrollbar-hidden">

            <motion.div
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col space-y-2"
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl text-gray-500">
                urls
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-500">
                when{" "}
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-100">
                the shorter,
              </h1>

              <div className="w-full lg:w-[45%] flex flex-col space-y-2">
                <div
                  className={`flex items-center space-x-2 border border-primaryButton-0 p-2 rounded-md bg-shadow`}
                >
                  {/* searching tab is going to be the same */}
                  <div className="bg-transparent rounded-md px-2 py-2 space-x-2 w-full flex items-center">
                    <button>
                      <div className="flex flex-row items-center space-x-2">
                        <motion.button
                          initial={{
                            rotate: "0",
                          }}
                          animate={{
                            rotate: visibleMoreOptions ? "180deg" : "0",
                          }}
                          transition={{
                            type: "spring",
                            damping: "30",
                            stiffness: "500",
                          }}
                          onClick={() => {
                            setVisibleMoreOptions((prev) => !prev);
                          }}
                          title="More feature"
                          className=" text-gray-300 text-xl p-2 rounded-md"
                        >
                          <BsArrowDown />
                        </motion.button>
                      </div>
                    </button>

                    <input
                      onChange={onMainLinkChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          shortenedLink.length > 0
                            ? handleCopy()
                            : handleLinkSubmit();
                        }
                      }}
                      placeholder="Shorten your link..."
                      type={"text"}
                      autoFocus
                      value={mainLink}
                      className={`bg-transparent outline-none h-8 w-full placeholder:text-white`}
                    />

                    {shortenedLink.length > 0 && (
                      <BsX
                        className="text-4xl text-primaryButton"
                        onClick={handleAnotherLink}
                      ></BsX>
                    )}

                    {isQRCodeEnabled ? (
                      <QRCodeModal
                        link={shortenedLink}
                        toggleModal={setQRCodeEnabled}
                      ></QRCodeModal>
                    ) : (
                      shortenedLink.length > 0 ?
                        <BsQrCode
                          onClick={(e) => {
                            if (shortenedLink) {
                              setQRCodeEnabled(true);
                            } else {
                              // setError
                            }
                          }}
                          title="Generate QR code"
                          className={`cursor-pointer`}
                        /> : <></>
                    )}
                  </div>

                  <button
                    onClick={
                      shortenedLink.length ? handleCopy : handleLinkSubmit
                    }
                    disabled={isLinkInvalidChecks}
                    title="Get Your link"
                    className="border-[1px] border-primaryButton-0 text-white items-center flex justify-center text-xl h-12 aspect-square tracking-wide rounded-md bg-shadow hover:bg-primaryButton-0 transition-all"
                  >
                    {loading ? (
                      <BiLoaderAlt className="animate-spin" />
                    ) : shortenedLink.length ? (
                      linkCopied ? (
                        <BiCheck className="text-green-300 text-2xl" />
                      ) : (
                        <BiCopyAlt />
                      )
                    ) : (
                      <BiLink />
                    )}
                  </button>
                </div>

                {/* more features */}
                {
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: visibleMoreOptions ? "auto" : "0",
                    }}
                    transition={{
                      type: "spring",
                      damping: "20",
                      stiffness: "500",
                    }}
                    className={`w-full border-b border-b-primaryButton-0 backdrop-blur-lg bg-[#121212]/40 rounded-lg overflow-hidden`}
                  >
                    <div className="w-full p-2 grid grid-cols-1 items-center justify-center md:grid-cols-2 gap-2 text-sm">
                      <Facet
                        key={1}
                        errorVariable={isURLFound}
                        type="text"
                        loader={true}
                        loadWhen={customURLLoading}
                        className={`${!customURLLoading && customURLValue.length > 0
                            ? !isURLFound
                              ? `bg-green-500`
                              : "bg-red-500"
                            : `bg-[#222222]`
                          }`}
                        value={customURLValue}
                        onValueChange={handleCustomURLChange}
                        errorFunction={() =>
                          handleCustomURLError(customURLValue, isURLFound)
                        }
                        placeholder="Custom Domain"
                        label={false}
                      ></Facet>

                      <Facet
                        key={2}
                        onValueChange={onExpiryTimeSet}
                        value={expiryTime}
                        others={{
                          min: loadedTime,
                        }}
                        labelTitle="Expiry Time"
                        inputId="date-and-time"
                        inputClassName={
                          "bg-transparent outline-none placeholder:text-xs"
                        }
                        type="datetime-local"
                        className={
                          `text-white justify-between whitespace-nowrap space-x-2 w-full cursor-pointer ` +
                          `${!expiryTime
                            ? `bg-[#222222]`
                            : expiryTime !== loadedTime
                              ? `bg-green-500`
                              : "bg-red-500"
                          }
                          `
                        }
                        label={true}
                        placeholder="Expiry Time"
                      ></Facet>

                      <Facet
                        key={3}
                        onValueChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        label={false}
                        type="password"
                        value={password}
                        className={
                          password.length > 0
                            ? isPasswordPatternValid(password)
                              ? "bg-green-500"
                              : "bg-red-500"
                            : "bg-[#222222]"
                        }
                        placeholder="Enter Password"
                        errorVariable={!isPasswordPatternValid(password)}
                        errorFunction={() =>
                          "Password must be between 6-20 characters."
                        }
                      />

                      <Facet
                        key={4}
                        label={true}
                        placeholder="Click on search"
                        labelTitle="Randomiser"
                        type=""
                        others={{
                          disabled: true,
                        }}
                        value={randomLink}
                        loader={true}
                        loadWhen={randomLinkLoader}
                        className="text-white justify-between whitespace-nowrap space-x-2 w-full cursor-pointer"
                      >
                        <>
                          <BsSearch
                            className="scale-[1.5]"
                            onClick={generateMemorisableWords}
                          >
                            Try
                          </BsSearch>
                          {randomLink.length > 0 && (
                            <BsCheck
                              className="scale-[2.8]"
                              onClick={setMemorisableWord}
                            ></BsCheck>
                          )}
                        </>
                      </Facet>

                      <div
                        className={
                          "rounded-md p-2 text-white flex items-center justify-between whitespace-nowrap space-x-2 w-full px-4 " +
                          `${languageSelected !== "Auto"
                            ? "bg-green-500"
                            : "bg-[#222222]"
                          }`
                        }
                      >
                        <select
                          value={languageSelected}
                          id="translated"
                          title="translated-lang"
                          className="bg-transparent outline-none w-full"
                          onChange={handleLanguageSelected}
                        >
                          {languages.map((lang) => {
                            return <option value={lang}>{lang}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                }
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-500">
                the better
              </h1>
            </motion.div>


          </div>

          
        </div>

        <div className="h-12 px-2 w-full bg-black/70 backdrop-blur-md absolute bottom-0 text-gray-500">

              <div className="flex h-full items-center justify-start space-x-1 whitespace-nowrap">
                <span>Copyright</span> <BiCopyright /> <span>Kuts.In LLC</span> <span className="h-1 aspect-square rounded-full bg-gray-500"></span> <span>Terms and Coditions</span>
              </div>

        </div>

      </div>
    </div>
  );
};

export default HomePage;
