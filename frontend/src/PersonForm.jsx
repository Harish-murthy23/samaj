import React, { useState, useEffect } from "react";

const PersonForm = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [activeSection, setActiveSection] = useState("personal");
  const [familyMembers, setFamilyMembers] = useState([{ id: 1 }]);
  const [memberCount, setMemberCount] = useState(1);
  const [submittedData, setSubmittedData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    maritalStatus: "unmarried",
    qualification: "",
    aadhaar: "",
    contact: "",
    village: "",
    email: "",
    occupation: "",
    address: "",
  });

  const [familyData, setFamilyData] = useState(
    Array.from({ length: 1 }, (_, i) => ({
      id: i + 1,
      name: "",
      relationship: "",
      age: "",
      gender: "male",
      maritalStatus: "unmarried",
      qualification: "",
      aadhaar: "",
      contact: "",
    }))
  );

  // Translations
  const translations = {
    en: {
      Application_No :'Application_No',
      title: "Jai Agnikula kshatriya telugu samaja",
      add: "Raipur, Chhattisgarh (R.No. - 5837/2005)",
      personalInfo: "Head Of Family",
      familyInfo: "Family Information",
      name: "Name",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      maritalStatus: "Marital Status",
      unmarried: "Unmarried",
      married: "Married",
      divorced: "Divorced",
      widowed: "Widowed",
      qualification: "Qualification",
      aadhaar: "Aadhaar Number",
      contact: "Contact Number",
      address: "Address",
      village: "Village",
      email: "Email",
      occupation: "Occupation",
      relationship: "Relation with Head",
      addMember: "Add Family Member",
      removeMember: "Remove",
      submit: "Submit",
      exportPDF: "Export PDF",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      switchToHindi: "Switch to Hindi",
      switchToEnglish: "Switch to English",
      next: "Next",
      previous: "Previous",
      required: "This field is required",
      step1: "Step ",
      step2: "Step 2",
      submitted: "Submitted Registrations",
      records: "records",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      familyMember: "Family Member",
      selectVillage: "Select Village",
      selectQualification: "Select Qualification",
      selectRelationship: "Select Relationship",
      placeholderAadhaar: "12 digit number",
      placeholderContact: "10 digit number",
      submitting: "Submitting...",
      submitSuccess: "Registration submitted successfully!",
      submitError: "Error submitting registration. Please try again.",
      validationError: "Please fill all required fields",
      invalidAadhaar: "Aadhaar must be 12 digits",
      invalidContact: "Contact must be 10 digits",
    },
    hi: {
      title: "जय अग्निकुला क्षत्रिय तेलुगु समाज",
      add: "रायपुर, छत्तीसगढ़ (पं.सं - 5837/2005)",
      personalInfo: "मुखिया की जानकारी",
      familyInfo: "पारिवारिक जानकारी",
      Application_No:'आवेदन क्र.',
      name: "नाम",
      age: "आयु",
      gender: "लिंग",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      maritalStatus: "वैवाहिक स्थिति",
      unmarried: "अविवाहित",
      married: "विवाहित",
      divorced: "तलाकशुदा",
      widowed: "विधवा/विधुर",
      qualification: "योग्यता",
      aadhaar: "आधार संख्या",
      contact: "संपर्क नंबर",
      address: "पता",
      village: "गांव",
      email: "ईमेल",
      occupation: "व्यवसाय",
      relationship: "मुखिया से सम्बन्ध ",
      addMember: "परिवारिक सदस्य जोड़ें",
      removeMember: "हटाएं",
      submit: "जमा करें",
      exportPDF: "PDF निर्यात करें",
      darkMode: "डार्क मोड",
      lightMode: "लाइट मोड",
      switchToHindi: "हिंदी में बदलें",
      switchToEnglish: "अंग्रेजी में बदलें",
      next: "अगला",
      previous: "पिछला",
      required: "यह फ़ील्ड आवश्यक है",
      step1: "चरण ",
      step2: "चरण 2",
      submitted: "जमा पंजीकरण",
      records: "रिकॉर्ड",
      view: "देखें",
      edit: "संपादित करें",
      delete: "हटाएं",
      familyMember: "परिवार सदस्य",
      selectVillage: "गांव चुनें",
      selectQualification: "योग्यता चुनें",
      selectRelationship: "रिश्ता चुनें",
      placeholderAadhaar: "12 अंकों का नंबर",
      placeholderContact: "10 अंकों का नंबर",
      submitting: "जमा कर रहे हैं...",
      submitSuccess: "पंजीकरण सफलतापूर्वक जमा किया गया!",
      submitError: "पंजीकरण जमा करने में त्रुटि। कृपया पुनः प्रयास करें।",
      validationError: "कृपया सभी आवश्यक फ़ील्ड भरें",
      invalidAadhaar: "आधार 12 अंकों का होना चाहिए",
      invalidContact: "संपर्क 10 अंकों का होना चाहिए",
    },
  };

  const t = translations[language];

  // Villages and qualifications
  const villages = ["Village A", "Village B", "Village C", "Other"];

  const qualifications = [
    "Illiterate",
    "Primary School",
    "High School",
    "Diploma",
    "Bachelor Degree",
    "Master Degree",
    "PhD",
  ];

  const relationships = [
    "Spouse",
    "Child",
    "Parent",
    "Sibling",
    "Other",
    "Wife",
    "Son",
    "Daughter",
    "Father",
    "Mother",
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Switch language
  const switchLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  // Handle input change for personal info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input change for family members
  const handleFamilyChange = (id, e) => {
    const { name, value } = e.target;
    setFamilyData(
      familyData.map((member) =>
        member.id === id ? { ...member, [name]: value } : member
      )
    );
  };

  // Add a new family member
  const addFamilyMember = () => {
    const newId =
      familyData.length > 0 ? Math.max(...familyData.map((m) => m.id)) + 1 : 1;
    setFamilyData([
      ...familyData,
      {
        id: newId,
        name: "",
        relationship: "",
        age: "",
        gender: "male",
        maritalStatus: "unmarried",
        qualification: "",
        aadhaar: "",
        contact: "",
      },
    ]);
    setMemberCount(memberCount + 1);
  };

  // Remove a family member
  const removeFamilyMember = (id) => {
    if (familyData.length > 1) {
      setFamilyData(familyData.filter((member) => member.id !== id));
      setMemberCount(memberCount - 1);
    }
  };

  // Navigate between sections
  const nextSection = () => {
    setActiveSection("family");
  };

  const prevSection = () => {
    setActiveSection("personal");
  };

  // Validation functions
  const validateAadhaar = (aadhaar) => {
    return /^\d{12}$/.test(aadhaar);
  };

  const validateContact = (contact) => {
    return /^\d{10}$/.test(contact);
  };

  const validateForm = () => {
    // Check required fields for head
    if (!formData.name || !formData.age || !formData.contact) {
      alert(t.validationError);
      return false;
    }

    // Validate head's contact and aadhaar
    if (!validateContact(formData.contact)) {
      alert(t.invalidContact);
      return false;
    }

    if (formData.aadhaar && !validateAadhaar(formData.aadhaar)) {
      alert(t.invalidAadhaar);
      return false;
    }

    // Validate family members
    for (let member of familyData) {
      if (member.name) {
        // Only validate if member has a name (indicating it's filled)
        if (member.contact && !validateContact(member.contact)) {
          alert(`${t.invalidContact} - ${member.name}`);
          return false;
        }
        if (member.aadhaar && !validateAadhaar(member.aadhaar)) {
          alert(`${t.invalidAadhaar} - ${member.name}`);
          return false;
        }
      }
    }

    return true;
  };

  // Submit form
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    // Prepare data in the format expected by your API
    const submitData = {
      head: {
        name: formData.name,
        aadhaar: formData.aadhaar,
        age: parseInt(formData.age),
        gender: formData.gender,
        contact: formData.contact,
        address: formData.address,
        email: formData.email || undefined,
        occupation: formData.occupation || undefined,
        village: formData.village || undefined,
        qualification: formData.qualification || undefined,
        maritalStatus: formData.maritalStatus || undefined,
      },
      members: familyData
        .filter((member) => member.name.trim()) // Only include members with names
        .map((member) => ({
          name: member.name,
          aadhaar: member.aadhaar || undefined,
          age: member.age ? parseInt(member.age) : undefined,
          gender: member.gender,
          relationship: member.relationship,
          contact: member.contact || undefined,
          qualification: member.qualification || undefined,
          maritalStatus: member.maritalStatus || undefined,
        })),
    };

    console.log("Submitting data:", submitData);

    const response = await fetch("http://172.20.10.5:5000/api/families", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Submit success:", result);
      alert(t.submitSuccess);

      try {
  const pdfResponse = await fetch(`http://172.20.10.5:5000/api/families/download-pdf/${result.applicationNumber}`);
  
  if (pdfResponse.ok) {
    const pdfBlob = await pdfResponse.blob();

    // Create download link
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Family_Registration_${result.applicationNumber}.pdf`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert("PDF downloaded successfully");
    console.log("PDF downloaded successfully");
  } else {
    console.error("PDF download failed:", pdfResponse.status);
    alert("Registration successful, but PDF download failed");
  }
} catch (pdfError) {
  console.error("PDF download error:", pdfError);
  alert("Registration successful, but PDF download failed");
}


      // Reset form
      setFormData({
        name: "",
        age: "",
        gender: "male",
        maritalStatus: "unmarried",
        qualification: "",
        aadhaar: "",
        contact: "",
        village: "",
        email: "",
        occupation: "",
        address: "",
      });

      setFamilyData([
        {
          id: 1,
          name: "",
          relationship: "",
          age: "",
          gender: "male",
          maritalStatus: "unmarried",
          qualification: "",
          aadhaar: "",
          contact: "",
        },
      ]);

      setActiveSection("personal");

      // Refresh the submitted data
      fetchFamilies();

    } else {
      const errorData = await response.json();
      console.error("Submit error:", errorData);
      alert(`${t.submitError}: ${errorData.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Network error:", error);
    alert(t.submitError);
  } finally {
    setIsSubmitting(false);
  }
};

  // Export PDF
  const exportPDF = () => {
    alert(
      `${t.exportPDF} - ${
        language === "en" ? "PDF export initiated" : "PDF निर्यात शुरू किया गया"
      }`
    );
  };

  // Fetch families function
  const fetchFamilies = async () => {
    try {
      const response = await fetch("http://172.20.10.5:5000/api/families", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched families:", data);
        setSubmittedData(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchFamilies();
  }, []);

  // Set dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.style.backgroundColor = "#1a202c";
    } else {
      document.body.classList.remove("dark");
      document.body.style.backgroundColor = "#cbd5e0";
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen py-4 px-2 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="w-full flex flex-col items-center mb-6 px-0">
          {/* Top Row: Logos + Title */}

          <div
            className="w-full flex items-center justify-between  gap-1 px-1 py-1 shadow-md rounded-b-lg"
            style={{ backgroundColor: "yellow", color: "#36454F" }}
          >
            {/* Left Logo */}
            <img
              src={"src/assets/telugu.png"}
              alt="Left Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-transform duration-300 hover:scale-105"
            />

            {/* Center Text */}
            <div className="flex-1 text-center min-w-[200px]">
              <h1
                className="sm:text-4x2 md:text-3x3 font-bold"
                style={{ color: "HighlightText" }}
              >
                {t.title}
              </h1>
              <p
                className="text-xs sm:text-sm md:text-base font-medium tracking-wide mt-1"
                style={{ color: "#6C7A89" }}
              >
                {t.add}
              </p>
            </div>

            {/* Right Logo */}
            <img
              src={"src/assets/telugu.png"}
              alt="Right Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Description */}
          <div className="mt-4 text-center">
            <p
              className={`text-sm sm:text-base mt-1 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {language === "en"
                ? "Register members and their families efficiently"
                : "सदस्यों और उनके परिवारों को पंजीकृत करें"}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-lg flex items-left gap- rounded-lg bg-blue-600 hover:bg-blue-700 text-sm sm:text-base ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
              <span>{darkMode ? t.L : t.D}</span>
            </button>

            <button
              onClick={switchLanguage}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm sm:text-base ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <i className="fas fa-language"></i>
              <span>{language === "en" ? t.H : t.E}</span>
            </button>

            <button
              onClick={exportPDF}
              className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-colors text-sm sm:text-base"
            >
              <i className="fas fa-file-pdf"></i>
              <span>{t.p}</span>
            </button>
          </div>
        </div>
        {/* Progress and Tabs */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t.step1}{" "}
              <span className="font-bold">
                {activeSection === "personal" ? "1" : "2"}
              </span>{" "}
              {language === "en" ? "of" : "का"}{" "}
              <span className="font-bold">2</span>
            </div>
            <div
              className={`w-1/2 rounded-full h-2.5 ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: activeSection === "personal" ? "50%" : "100%" }}
              ></div>
            </div>
          </div>

          <div
            className={`relative flex border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            } mb-6`}
          >
            <button
              onClick={() => setActiveSection("personal")}
              className={`relative py-3 px-6 ${
                activeSection === "personal"
                  ? darkMode
                    ? "text-blue-400"
                    : "text-blue-600"
                  : darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {t.personalInfo}
            </button>
            <button
              onClick={() => setActiveSection("family")}
              className={`relative py-3 px-6 ${
                activeSection === "family"
                  ? darkMode
                    ? "text-blue-400"
                    : "text-blue-600"
                  : darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {t.familyInfo}
            </button>
            <div
              className={`absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                activeSection === "personal" ? "left-0 w-48" : "left-48 w-52"
              }`}
            ></div>
          </div>
        </div>

        {/* Main Form Card */}
        <div
          className={`rounded-xl p-6 mb-8 transition-colors duration-300 ${
            darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"
          }`}
        >
          {/* Personal Information Section */}
          {activeSection === "personal" && (
            <div>
              <h2
                className={`text-xl font-semibold mb-6 pb-2 border-b ${
                  darkMode
                    ? "border-gray-700 text-white"
                    : "border-gray-200 text-gray-800"
                }`}
              >
                {t.personalInfo}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Name */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={
                      language === "en"
                        ? "Enter full name"
                        : "पूरा नाम दर्ज करें"
                    }
                  />
                </div>

                {/* Age */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.age} *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={
                      language === "en" ? "Enter age" : "आयु दर्ज करें"
                    }
                  />
                </div>

                {/* Gender */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.gender}
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600"
                      />
                      <span
                        className={`ml-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.male}
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600"
                      />
                      <span
                        className={`ml-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.female}
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === "other"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600"
                      />
                      <span
                        className={`ml-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {t.other}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Marital Status */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.maritalStatus}*
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="unmarried">{t.unmarried}</option>
                    <option value="married">{t.married}</option>
                    <option value="divorced">{t.divorced}</option>
                    <option value="widowed">{t.widowed}</option>
                  </select>
                </div>

                {/* Qualification */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.qualification}
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">{t.selectQualification}</option>
                    {qualifications.map((qual) => (
                      <option key={qual} value={qual}>
                        {qual}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Aadhaar Number */}
                <div className="mb-4">
                  <label
                    htmlFor="aadhaar"
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.aadhaar}*
                  </label>
                  <input
                    type="tel"
                    id="aadhaar"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleInputChange}
                    maxLength={12}
                    pattern="\d{12}"
                    inputMode="numeric"
                    autoComplete="off"
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder={
                      t.placeholderAadhaar || "Enter 12-digit Aadhaar number"
                    }
                  />
                  {formData.aadhaar.length > 0 && formData.aadhaar.length !== 12 && (
    <p className="text-red-500 text-sm mt-1">Aadhaar number must be exactly 12 digits</p>
  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.contact} *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    maxLength={10}
                    value={formData.contact}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={t.placeholderContact}
                  />
                  {formData.contact.length > 0 && formData.contact.length !== 10 && (
    <p className="text-red-500 text-sm mt-1">Contact number must be exactly 10 digits</p>
  )}
                </div>

                {/* Village */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.village}*
                  </label>
                  <select
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">{t.selectVillage}</option>
                    {villages.map((village) => (
                      <option key={village} value={village}>
                        {village}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={
                      language === "en" ? "Enter email" : "ईमेल दर्ज करें"
                    }
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.occupation}
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={
                      language === "en"
                        ? "Enter occupation"
                        : "व्यवसाय दर्ज करें"
                    }
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-3">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.address}*
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={
                      language === "en"
                        ? "Enter full address"
                        : "पूरा पता दर्ज करें"
                    }
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={nextSection}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>{t.next}</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Family Information Section */}
          {activeSection === "family" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-xl font-semibold pb-2 border-b ${
                    darkMode
                      ? "border-gray-700 text-white"
                      : "border-gray-200 text-gray-800"
                  }`}
                >
                  {t.familyInfo}
                </h2>
                <button
                  onClick={addFamilyMember}
                  className="px-1 py-1  bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg  transition-colors"
                >
                  <i class="fa-solid fa-users"></i>
                  <span>{t.addMember}</span>
                </button>
              </div>

              <div className="space-y-4">
                {familyData.map((member, index) => (
                  <div
                    key={member.id}
                    className={`p-4 rounded-lg transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-750 border-gray-700"
                        : "bg-gray-50 border-gray-200"
                    } border`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3
                        className={`text-lg font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {t.familyMember} {index + 1}
                      </h3>
                      {familyData.length > 1 && (
                        <button
                          onClick={() => removeFamilyMember(member.id)}
                          className={`px-3 py-1 ${
                            darkMode
                              ? "text-red-400 hover:text-red-300"
                              : "text-red-600 hover:text-red-800"
                          } gap-1 transition-colors`}
                        >
                          <span>{t.delete}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {t.name}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={member.name}
                          onChange={(e) => handleFamilyChange(member.id, e)}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                          placeholder={
                            language === "en" ? "Enter name" : "नाम दर्ज करें"
                          }
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {t.relationship}
                        </label>
                        <select
                          name="relationship"
                          value={member.relationship}
                          onChange={(e) => handleFamilyChange(member.id, e)}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="">{t.selectRelationship}</option>
                          {relationships.map((rel) => (
                            <option key={rel} value={rel}>
                              {rel}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {t.age}
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={member.age}
                          onChange={(e) => handleFamilyChange(member.id, e)}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                          placeholder={
                            language === "en" ? "Enter age" : "आयु दर्ज करें"
                          }
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {t.gender}
                        </label>
                        <select
                          name="gender"
                          value={member.gender}
                          onChange={(e) => handleFamilyChange(member.id, e)}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="male">{t.male}</option>
                          <option value="female">{t.female}</option>
                          <option value="other">{t.other}</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {t.maritalStatus}
                        </label>
                        <select
                          name="maritalStatus"
                          value={member.maritalStatus}
                          onChange={(e) => handleFamilyChange(member.id, e)}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="unmarried">{t.unmarried}</option>
                          <option value="married">{t.married}</option>
                          <option value="divorced">{t.divorced}</option>
                          <option value="widowed">{t.widowed}</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {t.qualification}
                        </label>
                        <select
                          name="qualification"
                          value={member.qualification}
                          onChange={(e) => handleFamilyChange(member.id, e)}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="">{t.selectQualification}</option>
                          {qualifications.map((qual) => (
                            <option key={qual} value={qual}>
                              {qual}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {t.aadhaar}
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          name="aadhaar"
                          maxLength={12}
                          pattern="\d{12}"
                          value={member.aadhaar}
                          onChange={(e) => handleFamilyChange(member.id, e)}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                          placeholder={t.placeholderAadhaar}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevSection}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i>
                  <span>{t.previous}</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-check"></i>
                  <span>{t.submit}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submitted Data Section */}
        <div
          className={`rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {t.submitted}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode
                  ? "bg-blue-900 text-blue-200"
                  : "bg-blue-100 text-blue-800"
              }`}
            ></span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead
                className={`text-xs uppercase ${
                  darkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                <tr>
                  <th scope="col" className="px-4 py-3">
                    {t.name}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t.age}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t.contact}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t.village}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t.Application_No}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {language === "en" ? "Actions" : "कार्रवाई"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((entry) => (
                  <tr
                    key={entry._id}
                    className={`border-b ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-750"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <td
                      className={`px-4 py-3 font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {entry.name}
                    </td>
                    <td className="px-4 py-3">{entry.age}</td>
                    <td className="px-4 py-3">{entry.contact}</td>
                    <td className="px-4 py-3">{entry.village}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-1 text-xs rounded-full ${
                          darkMode
                            ? "bg-blue-900 text-blue-200"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {entry.applicationNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        className={`p-1 rounded ${
                          darkMode
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-800"
                        }`}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className={`p-1 rounded ${
                          darkMode
                            ? "text-green-400 hover:text-green-300"
                            : "text-green-600 hover:text-green-800"
                        }`}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className={`p-1 rounded ${
                          darkMode
                            ? "text-red-400 hover:text-red-300"
                            : "text-red-600 hover:text-red-800"
                        }`}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

export default PersonForm;
