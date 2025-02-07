import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as ArrowIcon } from "../assets/arrow_icon.svg";
import { ReactComponent as CopyIcon } from "../assets/s_icon.svg";
import Footer from "./Footer";
import { useSlide } from "../context/SlideContext"; // Import the context
import PhoneInput from "react-country-phone-input";
import "react-country-phone-input/lib/style.css";
import heart from "../assets/heart.png";
import { Link } from "react-router-dom";
const shapes = [
  { id: 1, className: "shape shape-1" },
  { id: 2, className: "shape shape-2" },
  { id: 3, className: "shape shape-3" },
  { id: 4, className: "shape shape-4" },
  { id: 5, className: "shape shape-5" },
  { id: 6, className: "shape shape-6" },
];

const SliderSection = () => {
  const { t } = useTranslation();
  const [exitClass, setExitClass] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const { currentSlide, setCurrentSlide } = useSlide(); // Use the context

  const nextSlide = () => {
    const next = (currentSlide + 1) % 4;
    setCurrentSlide(next); // Update the context
  };

  const onSubmit = (data) => {
    setCurrentSlide(4); // Show thank you message after form submission
  };

  const buttonLabels = [
    t("can_you_gain"),
    t("how_it_works"),
    t("take_advantage"),
    t("send_now"),
  ];

  return (
    <>
      <div className="slider-container">
        <div className="slider-content">
          <div className={`text-section text-section-${currentSlide}`}>
            {currentSlide === 0 && (
              <>
                <small>{t("selective_redesign")}</small>
                <h1>{t("new_methodology")}</h1>
                <span>{t("for_improvement")}</span>
                <p>{t("methodology_description")}</p>
              </>
            )}
            {currentSlide === 1 && (
              <>
                <small>{t("practical_method")}</small>
                <h1>{t("for_business")}</h1>
                <span>{t("to_improve_ui_ux")}</span>
                <p>{t("implementation_description")}</p>
              </>
            )}
            {currentSlide === 2 && (
              <>
                <small>{t("selective_redesign")}</small>
                <h1>
                  {t("support")} <span>{t("key_areas")}</span>
                </h1>
              </>
            )}
            {currentSlide === 3 && (
              <>
                <small>{t("for_sure")}</small>
                <h1>
                  {t("selective")} <br />
                  <span>{t("redesign")}</span>
                </h1>
                <span>{t("in_key_areas")}</span>
              </>
            )}
            {currentSlide === 4 && <p>{t("thank_you_message")}</p>}
          </div>

          <div className={`visual-section slide-${currentSlide} `}>
            <div className="empty_space"></div>

            <div className={`shape-container ${exitClass ? "exit" : ""}`}>
              <AnimatePresence>
                {shapes.map((shape) => (
                  <motion.div
                    key={shape.id}
                    className={shape.className}
                    layout
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    {currentSlide === 2 && <a href="">FREE CALL</a>}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {currentSlide === 3 && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  layout
                  className="call"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <a href="">FREE CALL</a>
                </motion.div>
                <textarea
                  {...register("message")}
                  placeholder={t("project_description_prompt")}
                />
                <h3 className="">{t("contact_details_prompt")}</h3>
                <div className="form-group">
                  <input
                    {...register("name", { required: true })}
                    placeholder={t("name")}
                  />
                  <input
                    {...register("email", { required: true })}
                    placeholder={t("email")}
                  />
                  <Controller
                    name="phone_number"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country={"us"} // Default country
                        placeholder={t("country_code_prefix")}
                        inputProps={{
                          required: true,
                          name: "phone",
                        }}
                        containerClass="phone-input-container"
                        inputClass="phone-input"
                        buttonClass="phone-dropdown-button"
                      />
                    )}
                  />
                </div>
                <div className="concent-button-group">
                  <div className="consent-group">
                    <div className="checkbox-wrapper-32">
                      <input
                        type="checkbox"
                        name="checkbox-32"
                        id="checkbox-32"
                        {...register("consent", { required: true })}
                      />
                      <label for="checkbox-32">
                        {t("consent_statement")}{" "}
                        <Link to="/privacy-policy">{t("privacy_policy")}</Link>
                      </label>
                      <svg
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 10 10 L 90 90"
                          stroke="#d2e7fa"
                          stroke-dasharray="113"
                          stroke-dashoffset="113"
                        ></path>
                        <path
                          d="M 90 10 L 10 90"
                          stroke="#d2e7fa"
                          stroke-dasharray="113"
                          stroke-dashoffset="113"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <button className="form-submit" type="submit">
                    {t("send_now")}
                  </button>
                </div>
                <h3>
                  {t("thank_you")} <br />
                  {t("contact_you")}
                </h3>
                <h4>
                  {t("wonderful_wish")}
                  <img src={heart} alt="" />
                </h4>
              </form>
            )}
            {currentSlide !== 3 && (
              <div className="pagination">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`dot ${currentSlide === index ? "active" : ""}`}
                    onClick={() => setCurrentSlide(index)}
                  ></div>
                ))}
              </div>
            )}
            <div className="empty_space">
              {currentSlide === 2 && (
                <div className="content">
                  <div className="row">
                    <h5>{t("saves_time")}</h5>
                    <h5>{t("builds_trust")}</h5>
                    <h5>{t("provides_results")}</h5>
                  </div>
                  <p>{t("consistency_statement")}</p>
                </div>
              )}
            </div>
            {currentSlide !== 3 ? (
              <div className="button-with-icon" onClick={nextSlide}>
                <div className="button-container">
                  <button>{buttonLabels[currentSlide]} </button>
                </div>
                <ArrowIcon />
              </div>
            ) : (
              <h6 className="copyright">
                {t("copyright")}
                <span className="icon">
                  <CopyIcon />
                </span>
              </h6>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SliderSection;
