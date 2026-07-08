"use client";

import { useActionState, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Lock, Mail, ShieldAlert, Upload } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import TimezoneSelect from "react-timezone-select";
import ISO6391 from "iso-639-1";
import { loginWithCredentials, signUpWithCredentials } from "@/server/actions/auth";
import { FlipCard } from "./flip-card";

import "react-phone-number-input/style.css";

type Props = { callbackUrl: string };

const initial = { status: "idle" as const };

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Fetch all available ISO languages and sort them by name
const allLanguages = ISO6391.getAllCodes()
  .map((code) => ({
    code,
    name: ISO6391.getName(code),
    nativeName: ISO6391.getNativeName(code),
  }))
  .filter((lang) => lang.name !== "")
  .sort((a, b) => a.name.localeCompare(b.name));

export function LoginForm({ callbackUrl }: Props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1); // 1: Account, 2: Profile
  
  // Separate states for forms
  const [loginState, loginAction, loginPending] = useActionState(loginWithCredentials, initial);
  const [signupState, signupAction, signupPending] = useActionState(signUpWithCredentials, initial);

  // Field states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [timezone, setTimezone] = useState<any>({ value: "Asia/Kolkata", label: "(GMT+5:30) Mumbai, Kolkata" });
  const [language, setLanguage] = useState("en");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Custom Date Picker States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dobDay, setDobDay] = useState<number | null>(null);
  const [dobMonth, setDobMonth] = useState<number | null>(null);
  const [dobYear, setDobYear] = useState<number | null>(null);
  const [activeDobTab, setActiveDobTab] = useState<"year" | "month" | "day">("year");
  const [yearRangeStart, setYearRangeStart] = useState(1990);

  const [clientError, setClientError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const pending = loginPending || signupPending;
  const state = isSignUp ? signupState : loginState;

  // Handle successful signup
  useEffect(() => {
    if (isSignUp && signupState.status === "success") {
      setSuccessMsg("successfully signed up");
      setIsSignUp(false);
      setStep(1);
      // Keep email, but reset password inputs
      setPassword("");
      setConfirmPassword("");
    }
  }, [signupState.status, isSignUp]);

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setStep(1);
    setClientError("");
    setSuccessMsg("");
  };

  const validateStep1 = () => {
    setClientError("");
    if (!firstName.trim()) return "First name is required.";
    if (!email.trim() || !email.includes("@")) return "A valid email address is required.";
    
    const missing: string[] = [];
    if (password.length < 8) {
      missing.push("less than 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      missing.push("no capital letter");
    }
    if (!/[0-9]/.test(password)) {
      missing.push("no number");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      missing.push("no special character");
    }
    
    if (missing.length > 0) {
      return `invalid password: ${missing.join(", ")}`;
    }
    
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleNextStep = () => {
    const error = validateStep1();
    if (error) {
      setClientError(error);
    } else {
      setStep(2);
      setClientError("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <style jsx global>{`
        /* Overrides to make react-phone-number-input match design system */
        .PhoneInput {
          background: transparent !important;
          border: 1px solid var(--line) !important;
          border-radius: 12px !important;
          padding: 10px 14px !important;
          transition: all 0.3s !important;
          width: 100% !important;
        }
        .PhoneInput:focus-within {
          border-color: var(--cargo) !important;
          background: var(--cargo-tint-4) !important;
        }
        .PhoneInputInput {
          background: transparent !important;
          border: none !important;
          color: var(--bone) !important;
          outline: none !important;
          font-size: 15px !important;
          font-family: inherit !important;
        }
        .PhoneInputCountrySelect {
          background: var(--ink-2) !important;
          color: var(--bone) !important;
          border: none !important;
          font-size: 14px !important;
          outline: none !important;
        }
      `}</style>

      <FlipCard
        isFlipped={isSignUp}
        front={
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="f-display text-3xl leading-tight">
                Sign in to cockpit.
              </h1>
            </div>

            {successMsg && (
              <div
                className="flex items-center gap-3 rounded-xl p-4 text-sm"
                style={{
                  background: "var(--sage-tint-6)",
                  border: "1px solid var(--sage-border-40)",
                  color: "var(--sage)",
                }}
              >
                <CheckCircle2 size={18} className="flex-shrink-0" />
                <div>{successMsg}</div>
              </div>
            )}

            {state.status === "error" && !isSignUp && (
              <div
                className="flex items-center gap-3 rounded-xl p-4 text-sm"
                style={{
                  background: "var(--rust-tint-10)",
                  border: "1px solid var(--rust-border-40)",
                  color: "var(--rust)",
                }}
              >
                <ShieldAlert size={18} className="flex-shrink-0" />
                <div>{state.message}</div>
              </div>
            )}

            <form action={loginAction} className="space-y-5">
              <input type="hidden" name="callbackUrl" value={callbackUrl} />

              <div>
                <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                  Work Email <span style={{ color: "var(--cargo)" }}>*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--ash)" }}>
                    <Mail size={16} />
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@flyhigh.in"
                    className="input w-full"
                    style={{ paddingLeft: "44px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={pending}
                  />
                </div>
              </div>

              <div>
                <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                  Password <span style={{ color: "var(--cargo)" }}>*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--ash)" }}>
                    <Lock size={16} />
                  </span>
                  <input
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="input w-full"
                    style={{ paddingLeft: "44px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={pending}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={pending}
                className="btn-primary w-full justify-center text-sm font-medium h-11 transition-all hover:scale-[1.01] cursor-pointer"
              >
                {pending ? "Signing in..." : "Sign In to Cockpit"}{" "}
                {!pending && <ArrowRight size={14} className="ml-1" />}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleToggleMode}
                className="text-xs hover:underline cursor-pointer focus:outline-none"
                style={{ color: "var(--brass)" }}
              >
                Don&apos;t have an account? Sign up
              </button>
            </div>
          </div>
        }
        back={
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="f-display text-3xl leading-tight">
                {step === 1 ? "Create account." : "Complete profile."}
              </h1>
              <span className="caption text-xs" style={{ color: "var(--brass)" }}>
                STEP {step} OF 2
              </span>
            </div>

            {(state.status === "error" || clientError) && isSignUp && (
              <div
                className="flex items-center gap-3 rounded-xl p-4 text-sm"
                style={{
                  background: "var(--rust-tint-10)",
                  border: "1px solid var(--rust-border-40)",
                  color: "var(--rust)",
                }}
              >
                <ShieldAlert size={18} className="flex-shrink-0" />
                <div>{clientError || (state.status === "error" && state.message)}</div>
              </div>
            )}

            <form action={signupAction} className="space-y-5">
              {/* STEP 1: Account setup */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                        First Name <span style={{ color: "var(--cargo)" }}>*</span>
                      </label>
                      <input
                        name="firstName"
                        type="text"
                        required
                        placeholder="John"
                        className="input w-full"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                        Last Name
                      </label>
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        className="input w-full"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                      Work Email <span style={{ color: "var(--cargo)" }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--ash)" }}>
                        <Mail size={16} />
                      </span>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="name@flyhigh.in"
                        className="input w-full"
                        style={{ paddingLeft: "44px" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                        Password <span style={{ color: "var(--cargo)" }}>*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--ash)" }}>
                          <Lock size={16} />
                        </span>
                        <input
                          name="password"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="input w-full"
                          style={{ paddingLeft: "44px" }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                        Confirm <span style={{ color: "var(--cargo)" }}>*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--ash)" }}>
                          <Lock size={16} />
                        </span>
                        <input
                          name="confirmPassword"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="input w-full"
                          style={{ paddingLeft: "44px" }}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] space-y-1.5 p-3 rounded-lg border" style={{ borderColor: "var(--line)", background: "var(--surface-tint-2)" }}>
                    <div className="font-semibold" style={{ color: "var(--brass)" }}>STRONG PASSWORD REQUIREMENTS:</div>
                    <ul className="list-disc pl-4 space-y-0.5" style={{ color: "var(--ash)" }}>
                      <li style={{ color: password.length >= 8 ? "var(--sage)" : "inherit" }}>At least 8 characters long</li>
                      <li style={{ color: /[A-Z]/.test(password) ? "var(--sage)" : "inherit" }}>Contain at least one capital letter</li>
                      <li style={{ color: /[0-9]/.test(password) ? "var(--sage)" : "inherit" }}>Contain at least one number</li>
                      <li style={{ color: /[^a-zA-Z0-9]/.test(password) ? "var(--sage)" : "inherit" }}>Contain at least one special character</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary w-full justify-center text-sm font-medium h-11 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    Continue Setup <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              )}

              {/* STEP 2: Profile settings */}
              {step === 2 && (
                <div className="space-y-5">
                  <input type="hidden" name="firstName" value={firstName} />
                  <input type="hidden" name="lastName" value={lastName} />
                  <input type="hidden" name="email" value={email} />
                  <input type="hidden" name="password" value={password} />
                  <input type="hidden" name="confirmPassword" value={confirmPassword} />
                  <input type="hidden" name="profilePicture" value={profilePicture} />
                  <input type="hidden" name="phone" value={phone || ""} />
                  <input type="hidden" name="timezone" value={typeof timezone === "object" ? timezone.value : timezone} />

                  <div className="space-y-4">
                    {/* Profile picture upload */}
                    <div>
                      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                        Profile Picture
                      </label>
                      <div className="flex items-center gap-4">
                        {profilePicture ? (
                          <div className="h-16 w-16 rounded-full overflow-hidden border" style={{ borderColor: "var(--line)" }}>
                            <img src={profilePicture} alt="Avatar Preview" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: "var(--cargo)", color: "var(--ink)" }}>
                            {(firstName || "U").slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        <div className="flex flex-col gap-1.5">
                          <label className="caption text-[10px] h-9 px-4 flex items-center gap-1.5 rounded-xl border border-dashed hover:bg-[var(--surface-tint-6)] cursor-pointer" style={{ borderColor: "var(--line)", color: "var(--ash)" }}>
                            <Upload size={12} /> Upload Photo
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                          </label>
                          {profilePicture && (
                            <button
                              type="button"
                              onClick={() => setProfilePicture("")}
                              className="caption text-left text-[9px] hover:underline cursor-pointer pl-1"
                              style={{ color: "var(--rust)" }}
                            >
                              Remove Photo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                        Phone Number
                      </label>
                      <PhoneInput
                        international
                        withCountryCallingCode
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setPhone}
                        defaultCountry="IN"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                          Date of Birth
                        </label>
                        <input type="hidden" name="dob" value={dob} />
                        <div className="relative">
                          <input
                            type="text"
                            readOnly
                            placeholder="Select Date"
                            value={dobDay && dobMonth !== null && dobYear ? `${dobDay} ${MONTHS_SHORT[dobMonth]} ${dobYear}` : ""}
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            className="input w-full cursor-pointer select-none text-left"
                          />
                          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none" style={{ color: "var(--ash)" }}>
                            <Calendar size={16} />
                          </span>
                        </div>

                        {showDatePicker && (
                          <div
                            className="absolute bottom-full mb-2 p-4 rounded-xl border z-50 w-[260px] left-0"
                            style={{
                              background: "var(--ink-2)",
                              borderColor: "var(--line)",
                              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.4)",
                            }}
                          >
                            <div className="flex border-b mb-3" style={{ borderColor: "var(--line)" }}>
                              {(["year", "month", "day"] as const).map((tab) => (
                                <button
                                  key={tab}
                                  type="button"
                                  onClick={() => setActiveDobTab(tab)}
                                  className="flex-1 pb-1.5 text-center text-xs font-semibold capitalize cursor-pointer focus:outline-none"
                                  style={{
                                    color: activeDobTab === tab ? "var(--cargo)" : "var(--ash)",
                                    borderBottom: activeDobTab === tab ? "2px solid var(--cargo)" : "2px solid transparent",
                                  }}
                                >
                                  {tab}
                                </button>
                              ))}
                            </div>

                            {activeDobTab === "year" && (
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <button
                                    type="button"
                                    onClick={() => setYearRangeStart(yearRangeStart - 16)}
                                    className="p-1 hover:bg-[var(--surface-tint-6)] rounded cursor-pointer text-xs"
                                    style={{ color: "var(--bone)" }}
                                  >
                                    &larr;
                                  </button>
                                  <span className="text-xs font-semibold" style={{ color: "var(--brass)" }}>{yearRangeStart} - {yearRangeStart + 15}</span>
                                  <button
                                    type="button"
                                    onClick={() => setYearRangeStart(yearRangeStart + 16)}
                                    disabled={yearRangeStart + 16 > new Date().getFullYear()}
                                    className="p-1 hover:bg-[var(--surface-tint-6)] rounded cursor-pointer text-xs disabled:opacity-30"
                                    style={{ color: "var(--bone)" }}
                                  >
                                    &rarr;
                                  </button>
                                </div>
                                <div className="grid grid-cols-4 gap-1.5 max-h-[160px] overflow-y-auto modal-scroll pr-1">
                                  {Array.from({ length: 16 }, (_, i) => yearRangeStart + i)
                                    .filter((y) => y <= new Date().getFullYear())
                                    .map((y) => (
                                      <button
                                        key={y}
                                        type="button"
                                        onClick={() => {
                                          setDobYear(y);
                                          setActiveDobTab("month");
                                        }}
                                        className="py-1.5 text-[11px] text-center rounded transition-all hover:bg-[var(--cargo-tint-10)] cursor-pointer"
                                        style={{
                                          background: dobYear === y ? "var(--cargo)" : "var(--ink-3)",
                                          color: dobYear === y ? "var(--ink)" : "var(--bone)",
                                        }}
                                      >
                                        {y}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            )}

                            {activeDobTab === "month" && (
                              <div className="grid grid-cols-3 gap-1.5">
                                {MONTHS_SHORT.map((m, index) => (
                                  <button
                                    key={m}
                                    type="button"
                                    onClick={() => {
                                      setDobMonth(index);
                                      setActiveDobTab("day");
                                    }}
                                    className="py-2 text-[11px] text-center rounded transition-all hover:bg-[var(--cargo-tint-10)] cursor-pointer"
                                    style={{
                                      background: dobMonth === index ? "var(--cargo)" : "var(--ink-3)",
                                      color: dobMonth === index ? "var(--ink)" : "var(--bone)",
                                    }}
                                  >
                                    {m}
                                  </button>
                                ))}
                              </div>
                            )}

                            {activeDobTab === "day" && (
                              <div>
                                <div className="text-[10px] mb-2 text-center" style={{ color: "var(--ash)" }}>
                                  {dobMonth !== null ? MONTHS_SHORT[dobMonth] : ""} {dobYear || ""}
                                </div>
                                
                                {/* Weekdays Header Row */}
                                <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                    <span key={day} className="text-[9px] font-bold" style={{ color: "var(--brass)" }}>
                                      {day}
                                    </span>
                                  ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                  {/* Empty padding slots to align columns */}
                                  {Array.from({ length: new Date(dobYear || 2000, dobMonth || 0, 1).getDay() }).map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square" />
                                  ))}

                                  {/* Day numbers */}
                                  {Array.from(
                                    { length: new Date(dobYear || 2000, (dobMonth ?? 0) + 1, 0).getDate() },
                                    (_, i) => i + 1
                                  ).map((d) => (
                                    <button
                                      key={d}
                                      type="button"
                                      onClick={() => {
                                        setDobDay(d);
                                        setShowDatePicker(false);
                                        const formatted = `${dobYear}-${String((dobMonth ?? 0) + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                                        setDob(formatted);
                                      }}
                                      className="aspect-square flex items-center justify-center text-[10px] rounded transition-all hover:bg-[var(--cargo-tint-10)] cursor-pointer"
                                      style={{
                                        background: dobDay === d ? "var(--cargo)" : "var(--ink-3)",
                                        color: dobDay === d ? "var(--ink)" : "var(--bone)",
                                      }}
                                    >
                                      {d}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                          Gender
                        </label>
                        <select
                          name="gender"
                          className="input w-full"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                          Language
                        </label>
                        <select
                          name="language"
                          className="input w-full"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          {allLanguages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                          <option value="others">Others</option>
                        </select>
                      </div>
                      <div>
                        <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                          City
                        </label>
                        <input
                          name="city"
                          type="text"
                          placeholder="Mumbai"
                          className="input w-full"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                          Country
                        </label>
                        <input
                          name="country"
                          type="text"
                          placeholder="India"
                          className="input w-full"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="caption mb-2 block" style={{ color: "var(--ash)" }}>
                          Time Zone
                        </label>
                        <TimezoneSelect
                          value={timezone}
                          onChange={setTimezone}
                          styles={{
                            control: (provided: any, state: any) => ({
                              ...provided,
                              background: "transparent",
                              border: state.isFocused ? "1px solid var(--cargo)" : "1px solid var(--line)",
                              borderRadius: "12px",
                              minHeight: "48px",
                              color: "var(--bone)",
                              boxShadow: "none",
                              fontSize: "14px",
                              outline: "none",
                              "&:hover": {
                                borderColor: state.isFocused ? "var(--cargo)" : "var(--line)"
                              }
                            }),
                            menu: (provided: any) => ({
                              ...provided,
                              background: "var(--ink-2)",
                              border: "1px solid var(--line)",
                              borderRadius: "12px",
                              color: "var(--bone)",
                              zIndex: 50,
                              fontSize: "13px"
                            }),
                            singleValue: (provided: any) => ({
                              ...provided,
                              color: "var(--bone)",
                            }),
                            input: (provided: any) => ({
                              ...provided,
                              color: "var(--bone)",
                            }),
                            option: (provided: any, state: any) => ({
                              ...provided,
                              background: state.isFocused ? "var(--ink-3)" : "transparent",
                              color: "var(--bone)",
                              cursor: "pointer"
                            })
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-2">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        required
                        className="mt-1 h-3.5 w-3.5 accent-[var(--cargo)]"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                      />
                      <label htmlFor="acceptTerms" className="text-xs select-none" style={{ color: "var(--ash)" }}>
                        I accept the <a href="/legal/terms" className="underline hover:text-[var(--cargo)]">Terms of Service</a> and <a href="/legal/privacy" className="underline hover:text-[var(--cargo)]">Privacy Policy</a>. <span style={{ color: "var(--cargo)" }}>*</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center rounded-xl border h-11 px-4 text-sm font-medium hover:bg-[var(--surface-tint-6)] cursor-pointer"
                      style={{ borderColor: "var(--line)", color: "var(--ash)" }}
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="submit"
                      disabled={pending}
                      className="btn-primary flex-1 justify-center text-sm font-medium h-11 transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      {pending ? "Creating Account..." : "Create Account"} <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleToggleMode}
                className="text-xs hover:underline cursor-pointer focus:outline-none"
                style={{ color: "var(--brass)" }}
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
