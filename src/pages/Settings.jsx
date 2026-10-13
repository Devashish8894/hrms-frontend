import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "https://hrms-backend-5xo8.onrender.com";

export default function Settings({ currentUser, employeeProfile, onProfileUpdate }) {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [personalInfoLoading, setPersonalInfoLoading] = useState(true);
    const [personalInfoError, setPersonalInfoError] = useState("");
    const [isPersonalEditOpen, setIsPersonalEditOpen] = useState(false);
    const [personalEditFeedback, setPersonalEditFeedback] = useState("");
    const [personalEditSubmitting, setPersonalEditSubmitting] = useState(false);
    const [personalEditForm, setPersonalEditForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        preferredName: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        bloodGroup: "",
    });
    const [contactInfo, setContactInfo] = useState(null);
    const [contactInfoLoading, setContactInfoLoading] = useState(true);
    const [contactInfoError, setContactInfoError] = useState("");
    const [isContactEditOpen, setIsContactEditOpen] = useState(false);
    const [contactEditFeedback, setContactEditFeedback] = useState("");
    const [contactEditSubmitting, setContactEditSubmitting] = useState(false);
    const [contactEditForm, setContactEditForm] = useState({
        workEmail: "",
        personalEmail: "",
        mobile: "",
        alternatePhone: "",
        currentAddress: "",
        currentCity: "",
        currentState: "",
        currentPostalCode: "",
        currentCountry: "",
        sameAsCurrentAddress: false,
        permanentAddress: "",
        permanentCity: "",
        permanentState: "",
        permanentPostalCode: "",
        permanentCountry: "",
    });
    const [employmentInfo, setEmploymentInfo] = useState(null);
    const [employmentInfoLoading, setEmploymentInfoLoading] = useState(true);
    const [employmentInfoError, setEmploymentInfoError] = useState("");
    const [bankInfo, setBankInfo] = useState(null);
    const [bankInfoLoading, setBankInfoLoading] = useState(true);
    const [bankInfoError, setBankInfoError] = useState("");
    const [fullAccountNumber, setFullAccountNumber] = useState("");
    const [accountRevealLoading, setAccountRevealLoading] = useState(false);
    const [accountRevealError, setAccountRevealError] = useState("");
    const [accountRevealModalOpen, setAccountRevealModalOpen] = useState(false);
    const [accountRevealPassword, setAccountRevealPassword] = useState("");
    const [isBankEditOpen, setIsBankEditOpen] = useState(false);
    const [bankEditSubmitting, setBankEditSubmitting] = useState(false);
    const [bankEditFeedback, setBankEditFeedback] = useState("");
    const [bankEditForm, setBankEditForm] = useState({
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        confirmAccountNumber: "",
        ifscCode: "",
        branchName: "",
        accountType: "Savings",
        reason: "",
    });
    const [accountLastFourVisible, setAccountLastFourVisible] = useState(false);
    const [identityInfo, setIdentityInfo] = useState(null);
    const [identityInfoLoading, setIdentityInfoLoading] = useState(true);
    const [identityInfoError, setIdentityInfoError] = useState("");
    const [isIdentityEditOpen, setIsIdentityEditOpen] = useState(false);
    const [identityEditSubmitting, setIdentityEditSubmitting] = useState(false);
    const [identityEditFeedback, setIdentityEditFeedback] = useState("");
    const [identityEditTouched, setIdentityEditTouched] = useState({});
    const [identityEditForm, setIdentityEditForm] = useState({
        aadhaarNumber: "",
        panNumber: "",
        passportNumber: "",
        drivingLicenseNumber: "",
        reason: "",
    });
    const [emergencyContact, setEmergencyContact] = useState(null);
    const [emergencyContactLoading, setEmergencyContactLoading] = useState(true);
    const [emergencyContactError, setEmergencyContactError] = useState("");
    const [isEmergencyEditOpen, setIsEmergencyEditOpen] = useState(false);
    const [emergencyEditFeedback, setEmergencyEditFeedback] = useState("");
    const [emergencyEditSubmitting, setEmergencyEditSubmitting] = useState(false);
    const [emergencyEditForm, setEmergencyEditForm] = useState({
        contactName: "",
        relationship: "",
        phoneNumber: "",
        address: "",
        secondContactName: "",
        secondRelationship: "",
        secondPhoneNumber: "",
        secondAddress: "",
    });

    useEffect(() => {
        if (!currentUser?.id) {
            setPersonalInfoLoading(false);
            setPersonalInfoError("Unable to identify the current employee.");
            return;
        }

        const loadPersonalInfo = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/api/employee/personal-info/${currentUser.id}`
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Unable to load personal information.");
                }
                setPersonalInfo(data);
            } catch (error) {
                setPersonalInfoError(error.message || "Unable to load personal information.");
            } finally {
                setPersonalInfoLoading(false);
            }
        };

        loadPersonalInfo();
    }, [currentUser?.id]);

    useEffect(() => {
        if (!currentUser?.id) {
            setContactInfoLoading(false);
            setContactInfoError("Unable to identify the current employee.");
            return;
        }

        const loadContactInfo = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/api/employee/contact-info/${currentUser.id}`
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Unable to load contact information.");
                }
                setContactInfo(data);
            } catch (error) {
                setContactInfoError(error.message || "Unable to load contact information.");
            } finally {
                setContactInfoLoading(false);
            }
        };

        loadContactInfo();
    }, [currentUser?.id]);

    useEffect(() => {
        if (!currentUser?.id) {
            setEmploymentInfoLoading(false);
            setEmploymentInfoError("Unable to identify the current employee.");
            return;
        }

        const loadEmploymentInfo = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/api/employee/employment-info/${currentUser.id}`
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Unable to load employment information.");
                }
                setEmploymentInfo(data);
            } catch (error) {
                setEmploymentInfoError(error.message || "Unable to load employment information.");
            } finally {
                setEmploymentInfoLoading(false);
            }
        };

        loadEmploymentInfo();
    }, [currentUser?.id]);

    useEffect(() => {
        if (!currentUser?.id) {
            setBankInfoLoading(false);
            setBankInfoError("Unable to identify the current employee.");
            return;
        }

        const loadBankInfo = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/api/employee/bank-info/${currentUser.id}`
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Unable to load bank information.");
                }
                setBankInfo(data);
            } catch (error) {
                setBankInfoError(error.message || "Unable to load bank information.");
            } finally {
                setBankInfoLoading(false);
            }
        };

        loadBankInfo();
    }, [currentUser?.id]);

    useEffect(() => {
        if (!currentUser?.id) {
            setIdentityInfoLoading(false);
            setIdentityInfoError("Unable to identify the current employee.");
            return;
        }

        const loadIdentityInfo = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/api/employee/identity-info/${currentUser.id}`
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Unable to load identity information.");
                }
                setIdentityInfo(data);
            } catch (error) {
                setIdentityInfoError(error.message || "Unable to load identity information.");
            } finally {
                setIdentityInfoLoading(false);
            }
        };

        loadIdentityInfo();
    }, [currentUser?.id]);

    useEffect(() => {
        if (!currentUser?.id) {
            setEmergencyContactLoading(false);
            setEmergencyContactError("Unable to identify the current employee.");
            return;
        }

        const loadEmergencyContact = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/api/employee/emergency-contact/${currentUser.id}`
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Unable to load emergency contact.");
                }
                setEmergencyContact(Array.isArray(data) ? data : [data]);
            } catch (error) {
                setEmergencyContactError(error.message || "Unable to load emergency contact.");
            } finally {
                setEmergencyContactLoading(false);
            }
        };

        loadEmergencyContact();
    }, [currentUser?.id]);

    const displayValue = (value) => value || "ΓÇö";
    const formatAddress = (...parts) => parts.filter(Boolean).join(", ") || "ΓÇö";
    const emergencyContacts = Array.isArray(emergencyContact)
        ? emergencyContact
        : emergencyContact ? [emergencyContact] : [];
    const primaryEmergencyContact = emergencyContacts[0] || null;
    const secondaryEmergencyContact = emergencyContacts[1] || null;
    const openEmergencyEdit = () => {
        setEmergencyEditForm({
            contactName: primaryEmergencyContact?.contact_name || "",
            relationship: primaryEmergencyContact?.relationship || "",
            phoneNumber: primaryEmergencyContact?.phone_number || "",
            address: primaryEmergencyContact?.address || "",
            secondContactName: secondaryEmergencyContact?.contact_name || "",
            secondRelationship: secondaryEmergencyContact?.relationship || "",
            secondPhoneNumber: secondaryEmergencyContact?.phone_number || "",
            secondAddress: secondaryEmergencyContact?.address || "",
        });
        setEmergencyEditFeedback("");
        setIsEmergencyEditOpen(true);
    };
    const updateEmergencyEditField = (event) => {
        const { name, value } = event.target;
        setEmergencyEditForm((current) => ({ ...current, [name]: value }));
    };
    const handleEmergencyEditSubmit = async (event) => {
        event.preventDefault();
        if (!currentUser?.id) {
            setEmergencyEditFeedback("Unable to identify the current employee.");
            return;
        }

        setEmergencyEditSubmitting(true);
        setEmergencyEditFeedback("");
        try {
            const response = await fetch(
                `${API_BASE}/api/employee/emergency-contact/${currentUser.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contactName: emergencyEditForm.contactName,
                        relationship: emergencyEditForm.relationship,
                        phoneNumber: emergencyEditForm.phoneNumber,
                        address: emergencyEditForm.address,
                        secondContactName: emergencyEditForm.secondContactName,
                        secondRelationship: emergencyEditForm.secondRelationship,
                        secondPhoneNumber: emergencyEditForm.secondPhoneNumber,
                        secondAddress: emergencyEditForm.secondAddress,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Unable to update emergency contact.");
            }

            setEmergencyContact(Array.isArray(data) ? data : [data]);
            setIsEmergencyEditOpen(false);
        } catch (error) {
            setEmergencyEditFeedback(error.message || "Unable to update emergency contact.");
        } finally {
            setEmergencyEditSubmitting(false);
        }
    };
    const formatDate = (value) => {
        const parts = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!parts) return "ΓÇö";

        const month = new Intl.DateTimeFormat("en-IN", { month: "long" }).format(
            new Date(Date.UTC(2000, Number(parts[2]) - 1, 1))
        );
        return `${Number(parts[3])} ${month} ${parts[1]}`;
    };
    const openPersonalEdit = () => {
        if (!personalInfo) return;

        const savedPref = currentUser?.id ? localStorage.getItem(`hrms_preferred_name_${currentUser.id}`) : "";
        setPersonalEditForm({
            firstName: personalInfo.first_name || "",
            middleName: personalInfo.middle_name || "",
            lastName: personalInfo.last_name || "",
            preferredName: personalInfo.preferred_name || savedPref || personalInfo.first_name || "",
            dateOfBirth: String(personalInfo.date_of_birth || "").slice(0, 10),
            gender: personalInfo.gender
                ? `${personalInfo.gender.charAt(0).toUpperCase()}${personalInfo.gender.slice(1)}`
                : "",
            maritalStatus: personalInfo.marital_status || "",
            nationality: personalInfo.nationality || "",
            bloodGroup: personalInfo.blood_group || "",
        });
        setPersonalEditFeedback("");
        setIsPersonalEditOpen(true);
    };
    const updatePersonalEditField = (event) => {
        const { name, value } = event.target;
        setPersonalEditForm((current) => ({ ...current, [name]: value }));
    };
    const submitPersonalEditRequest = async (event) => {
        event.preventDefault();
        if (!currentUser?.id) {
            setPersonalEditFeedback("Unable to identify the current employee.");
            return;
        }

        setPersonalEditSubmitting(true);
        setPersonalEditFeedback("");
        try {
            if (personalEditForm.preferredName) {
                localStorage.setItem(`hrms_preferred_name_${currentUser.id}`, personalEditForm.preferredName.trim());
            } else {
                localStorage.removeItem(`hrms_preferred_name_${currentUser.id}`);
            }
            const response = await fetch(
                `${API_BASE}/api/employee/personal-info/${currentUser.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName: personalEditForm.firstName,
                        middleName: personalEditForm.middleName,
                        lastName: personalEditForm.lastName,
                        preferredName: personalEditForm.preferredName || personalEditForm.firstName,
                        dateOfBirth: personalEditForm.dateOfBirth,
                        gender: personalEditForm.gender,
                        maritalStatus: personalEditForm.maritalStatus,
                        nationality: personalEditForm.nationality,
                        bloodGroup: personalEditForm.bloodGroup,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Unable to update personal information.");
            }

            setPersonalInfo({
                ...data,
                preferred_name: data.preferred_name || personalEditForm.preferredName || data.first_name,
            });
            if (onProfileUpdate) {
                onProfileUpdate();
            }
            setIsPersonalEditOpen(false);
        } catch (error) {
            setPersonalEditFeedback(error.message || "Unable to update personal information.");
        } finally {
            setPersonalEditSubmitting(false);
        }
    };
    const openContactEdit = () => {
        if (!contactInfo) return;

        const currentAddressValues = {
            permanentAddress: contactInfo.current_address_line || "",
            permanentCity: contactInfo.current_city || "",
            permanentState: contactInfo.current_state || "",
            permanentPostalCode: contactInfo.current_postal_code || "",
            permanentCountry: contactInfo.current_country || "",
        };
        const addressIsSame = [
            [contactInfo.current_address_line, contactInfo.permanent_address_line],
            [contactInfo.current_city, contactInfo.permanent_city],
            [contactInfo.current_state, contactInfo.permanent_state],
            [contactInfo.current_postal_code, contactInfo.permanent_postal_code],
            [contactInfo.current_country, contactInfo.permanent_country],
        ].every(([current, permanent]) => (current || "") === (permanent || ""));

        setContactEditForm({
            workEmail: contactInfo.work_email || "",
            personalEmail: contactInfo.personal_email || "",
            mobile: contactInfo.phone_number || "",
            alternatePhone: contactInfo.alternate_phone || "",
            currentAddress: contactInfo.current_address_line || "",
            currentCity: contactInfo.current_city || "",
            currentState: contactInfo.current_state || "",
            currentPostalCode: contactInfo.current_postal_code || "",
            currentCountry: contactInfo.current_country || "",
            sameAsCurrentAddress: addressIsSame,
            ...((addressIsSame && contactInfo.current_address_line) ? currentAddressValues : {
                permanentAddress: contactInfo.permanent_address_line || "",
                permanentCity: contactInfo.permanent_city || "",
                permanentState: contactInfo.permanent_state || "",
                permanentPostalCode: contactInfo.permanent_postal_code || "",
                permanentCountry: contactInfo.permanent_country || "",
            }),
        });
        setContactEditFeedback("");
        setIsContactEditOpen(true);
    };
    const updateContactEditField = (event) => {
        const { name, value, checked, type } = event.target;
        setContactEditForm((current) => {
            if (name === "sameAsCurrentAddress") {
                return {
                    ...current,
                    sameAsCurrentAddress: checked,
                    ...(checked ? {
                        permanentAddress: current.currentAddress,
                        permanentCity: current.currentCity,
                        permanentState: current.currentState,
                        permanentPostalCode: current.currentPostalCode,
                        permanentCountry: current.currentCountry,
                    } : {}),
                };
            }

            const next = { ...current, [name]: type === "checkbox" ? checked : value };
            if (current.sameAsCurrentAddress && name.startsWith("current")) {
                const permanentField = name.replace("current", "permanent");
                next[permanentField] = value;
            }
            return next;
        });
    };
    const submitContactEdit = async (event) => {
        event.preventDefault();
        if (!currentUser?.id) {
            setContactEditFeedback("Unable to identify the current employee.");
            return;
        }

        setContactEditSubmitting(true);
        setContactEditFeedback("");
        try {
            const response = await fetch(
                `${API_BASE}/api/employee/contact-info/${currentUser.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        workEmail: contactEditForm.workEmail,
                        personalEmail: contactEditForm.personalEmail,
                        mobile: contactEditForm.mobile,
                        alternatePhone: contactEditForm.alternatePhone,
                        currentAddress: contactEditForm.currentAddress,
                        currentCity: contactEditForm.currentCity,
                        currentState: contactEditForm.currentState,
                        currentPostalCode: contactEditForm.currentPostalCode,
                        currentCountry: contactEditForm.currentCountry,
                        permanentAddress: contactEditForm.permanentAddress,
                        permanentCity: contactEditForm.permanentCity,
                        permanentState: contactEditForm.permanentState,
                        permanentPostalCode: contactEditForm.permanentPostalCode,
                        permanentCountry: contactEditForm.permanentCountry,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Unable to update contact information.");
            }

            setContactInfo(data);
            setIsContactEditOpen(false);
        } catch (error) {
            setContactEditFeedback(error.message || "Unable to update contact information.");
        } finally {
            setContactEditSubmitting(false);
        }
    };
    const openBankEdit = () => {
        if (!bankInfo) return;

        setBankEditForm({
            bankName: bankInfo.bank_name || "",
            accountHolderName: bankInfo.account_holder_name || "",
            accountNumber: fullAccountNumber,
            confirmAccountNumber: fullAccountNumber,
            ifscCode: bankInfo.ifsc_code || "",
            branchName: bankInfo.branch_name || "",
            accountType: bankInfo.account_type || "Savings",
            reason: bankInfo.change_reason || "",
        });
        setBankEditFeedback("");
        setIsBankEditOpen(true);
    };
    const closeBankEdit = () => {
        setIsBankEditOpen(false);
        setFullAccountNumber("");
        setBankEditForm((current) => ({
            ...current,
            accountNumber: "",
            confirmAccountNumber: "",
        }));
    };
    const updateBankEditField = (event) => {
        const { name, value } = event.target;
        setBankEditForm((current) => ({ ...current, [name]: value }));
    };
    const submitBankEdit = async (event) => {
        event.preventDefault();
        if (!currentUser?.id) {
            setBankEditFeedback("Unable to identify the current employee.");
            return;
        }
        if (bankEditForm.accountNumber !== bankEditForm.confirmAccountNumber) {
            setBankEditFeedback("Account numbers do not match.");
            return;
        }

        setBankEditSubmitting(true);
        setBankEditFeedback("");
        try {
            const response = await fetch(
                `${API_BASE}/api/employee/bank-info/${currentUser.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        bankName: bankEditForm.bankName,
                        accountHolderName: bankEditForm.accountHolderName,
                        accountNumber: bankEditForm.accountNumber,
                        confirmAccountNumber: bankEditForm.confirmAccountNumber,
                        ifscCode: bankEditForm.ifscCode,
                        branchName: bankEditForm.branchName,
                        accountType: bankEditForm.accountType,
                        reason: bankEditForm.reason,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Unable to update bank information.");
            }

            setBankInfo(data);
            setAccountLastFourVisible(false);
            setFullAccountNumber("");
            setIsBankEditOpen(false);
        } catch (error) {
            setBankEditFeedback(error.message || "Unable to update bank information.");
        } finally {
            setBankEditSubmitting(false);
        }
    };
    const openIdentityEdit = () => {
        setIdentityEditForm({
            aadhaarNumber: identityInfo?.aadhaar_last_four ? `XXXX XXXX ${identityInfo.aadhaar_last_four}` : "",
            panNumber: identityInfo?.pan_number_masked || "",
            passportNumber: identityInfo?.passport_number_masked || "",
            drivingLicenseNumber: identityInfo?.driving_license_masked || "",
            reason: identityInfo?.change_reason || "",
        });
        setIdentityEditTouched({});
        setIdentityEditFeedback("");
        setIsIdentityEditOpen(true);
    };
    const updateIdentityEditField = (event) => {
        const { name, value } = event.target;
        setIdentityEditForm((current) => ({ ...current, [name]: value }));
        setIdentityEditTouched((current) => ({ ...current, [name]: true }));
    };
    const focusIdentityNumberField = (event) => {
        const { name } = event.target;
        if (!identityEditTouched[name]) {
            setIdentityEditForm((current) => ({ ...current, [name]: "" }));
            setIdentityEditTouched((current) => ({ ...current, [name]: true }));
        }
    };
    const submitIdentityEdit = async (event) => {
        event.preventDefault();
        if (!currentUser?.id) {
            setIdentityEditFeedback("Unable to identify the current employee.");
            return;
        }

        setIdentityEditSubmitting(true);
        setIdentityEditFeedback("");
        try {
            const response = await fetch(
                `${API_BASE}/api/employee/identity-info/${currentUser.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        aadhaarNumber: identityEditTouched.aadhaarNumber ? identityEditForm.aadhaarNumber.replace(/\D/g, "") : "",
                        panNumber: identityEditTouched.panNumber ? identityEditForm.panNumber : "",
                        passportNumber: identityEditTouched.passportNumber ? identityEditForm.passportNumber : "",
                        drivingLicenseNumber: identityEditTouched.drivingLicenseNumber ? identityEditForm.drivingLicenseNumber : "",
                        reason: identityEditForm.reason,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Unable to update identity information.");
            }
            setIdentityInfo(data);
            setIsIdentityEditOpen(false);
        } catch (error) {
            setIdentityEditFeedback(error.message || "Unable to update identity information.");
        } finally {
            setIdentityEditSubmitting(false);
        }
    };
    const toggleAccountNumber = () => {
        if (accountLastFourVisible) {
            setAccountLastFourVisible(false);
            setFullAccountNumber("");
            setAccountRevealError("");
            return;
        }
        if (!currentUser?.id) {
            setAccountRevealError("Unable to identify the current employee.");
            return;
        }

        setAccountRevealPassword("");
        setAccountRevealError("");
        setAccountRevealModalOpen(true);
    };
    const closeAccountRevealModal = () => {
        setAccountRevealModalOpen(false);
        setAccountRevealPassword("");
        setAccountRevealError("");
    };
    const submitAccountReveal = async (event) => {
        event.preventDefault();
        setAccountRevealLoading(true);
        setAccountRevealError("");
        try {
            const response = await fetch(
                `${API_BASE}/api/employee/bank-info/${currentUser.id}/account-number/reveal`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password: accountRevealPassword }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Unable to reveal account number.");
            }
            setFullAccountNumber(data.account_number || "");
            setAccountLastFourVisible(true);
            setAccountRevealModalOpen(false);
        } catch (error) {
            setAccountRevealError(error.message || "Unable to reveal account number.");
        } finally {
            setAccountRevealLoading(false);
            setAccountRevealPassword("");
        }
    };
    const dateOfBirth = formatDate(personalInfo?.date_of_birth);

  return (
    <>
<div className="px-0 px-md-5 employee-dashboard">
                

<div className="employee-settings-page">

    
    <div className="es-page-header">
        <div>
            <h2>My Settings</h2>
            <p>Manage your personal information, bank details, and account preferences.</p>
        </div>
        <button className="btn es-btn-light">
            <i className="bi bi-shield-check"></i> Privacy & Security
        </button>
    </div>

    
    <div className="es-profile-banner">
        <div className="es-profile-avatar">
            <span>
                {(personalInfo?.preferred_name
                    ? personalInfo.preferred_name.slice(0, 2)
                    : personalInfo?.first_name
                        ? `${personalInfo.first_name[0]}${personalInfo.last_name ? personalInfo.last_name[0] : (personalInfo.first_name[1] || "")}`
                        : employeeProfile?.preferred_name
                            ? employeeProfile.preferred_name.slice(0, 2)
                            : employeeProfile?.first_name
                                ? `${employeeProfile.first_name[0]}${employeeProfile.last_name ? employeeProfile.last_name[0] : (employeeProfile.first_name[1] || "")}`
                                : currentUser?.email ? currentUser.email.slice(0, 2) : "EM"
                ).toUpperCase()}
            </span>
            <button type="button" title="Change profile photo">
                <i className="bi bi-camera-fill"></i>
            </button>
        </div>
        <div className="es-profile-info">
            <span className="es-profile-label">EMPLOYEE PROFILE</span>
            <h3>
                {personalInfo?.preferred_name ||
                    [personalInfo?.first_name, personalInfo?.middle_name, personalInfo?.last_name].filter(Boolean).join(" ") ||
                    employeeProfile?.preferred_name ||
                    [employeeProfile?.first_name, employeeProfile?.last_name].filter(Boolean).join(" ") ||
                    currentUser?.email?.split("@")[0] ||
                    "Employee"}
            </h3>
            <p>
                {employmentInfo?.designation || employeeProfile?.designation || "Employee"} ·{" "}
                {employmentInfo?.department || employeeProfile?.department || "Engineering"} /{" "}
                {employmentInfo?.team || employeeProfile?.team || "Backend"}
            </p>
            <div className="es-profile-tags">
                <span><i className="bi bi-person-badge"></i> {employmentInfo?.employee_code || employeeProfile?.employee_code || "—"}</span>
                <span><i className="bi bi-geo-alt"></i> {contactInfo?.current_city || employeeProfile?.city || "—"}</span>
                <span className="es-active-tag"><i className="bi bi-check-circle-fill"></i> Active</span>
            </div>
        </div>
        <div className="es-profile-completion">
            <div className="es-completion-top">
                <span>Profile Completion</span>
                <strong>{employeeProfile?.profile_completion_percentage || 0}%</strong>
            </div>
            <div className="progress es-progress">
                <div className="progress-bar" style={{width: `${employeeProfile?.profile_completion_percentage || 0}%`}}></div>
            </div>
            <small>Complete your remaining profile details.</small>
        </div>
    </div>

    
    <div className="es-layout">

        
        <aside className="es-navigation">
            <div className="es-nav-heading">SETTINGS MENU</div>

            <a href="#esPersonal" className="es-nav-link active">
                <i className="bi bi-person"></i><span>Personal Information</span>
            </a>
            <a href="#esContact" className="es-nav-link">
                <i className="bi bi-telephone"></i><span>Contact Information</span>
            </a>
            <a href="#esEmployment" className="es-nav-link">
                <i className="bi bi-briefcase"></i><span>Employment Details</span>
            </a>
            <a href="#esBank" className="es-nav-link">
                <i className="bi bi-bank"></i><span>Bank Details</span>
                <span className="es-nav-badge">Sensitive</span>
            </a>
            <a href="#esIdentity" className="es-nav-link">
                <i className="bi bi-fingerprint"></i><span>Identity Information</span>
            </a>
            <a href="#esEmergency" className="es-nav-link">
                <i className="bi bi-person-hearts"></i><span>Emergency Contact</span>
            </a>
            <a href="#esAccount" className="es-nav-link">
                <i className="bi bi-shield-lock"></i><span>Account & Security</span>
            </a>
            <a href="#esPreferences" className="es-nav-link">
                <i className="bi bi-sliders"></i><span>Preferences</span>
            </a>
            <a href="#esShortcuts" className="es-nav-link">
                <i className="bi bi-command"></i><span>Shortcut Selection</span>
            </a>

            <div className="es-nav-help">
                <div className="es-help-icon"><i className="bi bi-headset"></i></div>
                <strong>Need help?</strong>
                <p>Contact HR if you need help updating your employee information.</p>
                <button type="button">
                    Contact HR <i className="bi bi-arrow-up-right"></i>
                </button>
            </div>
        </aside>

        
        <main className="es-main-content">

            
            <section className="es-section-card" id="esPersonal">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-purple"><i className="bi bi-person-vcard"></i></div>
                        <div>
                            <h4>Personal Information</h4>
                            <p>Your basic identity and personal details</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn" type="button" onClick={openPersonalEdit} disabled={!personalInfo}>
                        <i className="bi bi-pencil"></i> Edit
                    </button>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item"><span>First Name</span><strong>{displayValue(personalInfo?.first_name)}</strong></div>
                    <div className="es-info-item"><span>Middle Name</span><strong>{displayValue(personalInfo?.middle_name)}</strong></div>
                    <div className="es-info-item"><span>Last Name</span><strong>{displayValue(personalInfo?.last_name)}</strong></div>
                    <div className="es-info-item"><span>Preferred Name</span><strong>{displayValue(personalInfo?.preferred_name || (currentUser?.id && localStorage.getItem(`hrms_preferred_name_${currentUser.id}`)) || personalInfo?.first_name)}</strong></div>
                    <div className="es-info-item"><span>Date of Birth</span><strong>{dateOfBirth}</strong></div>
                    <div className="es-info-item"><span>Gender</span><strong>{displayValue(personalInfo?.gender)}</strong></div>
                    <div className="es-info-item"><span>Marital Status</span><strong>{displayValue(personalInfo?.marital_status)}</strong></div>
                    <div className="es-info-item"><span>Nationality</span><strong>{displayValue(personalInfo?.nationality)}</strong></div>
                    <div className="es-info-item"><span>Blood Group</span><strong>{displayValue(personalInfo?.blood_group)}</strong></div>
                </div>
                {personalInfoLoading && <p role="status">Loading personal information...</p>}
                {personalInfoError && <p role="alert">{personalInfoError}</p>}
            </section>

            
            <section className="es-section-card" id="esContact">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-blue"><i className="bi bi-telephone"></i></div>
                        <div>
                            <h4>Contact Information</h4>
                            <p>Your personal contact details and addresses</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn" type="button" onClick={openContactEdit} disabled={!contactInfo}>
                        <i className="bi bi-pencil"></i> Edit
                    </button>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item"><span>Personal Email</span><strong>{displayValue(contactInfo?.personal_email)}</strong></div>
                    <div className="es-info-item"><span>Work Email</span><strong>{displayValue(contactInfo?.work_email)}</strong></div>
                    <div className="es-info-item"><span>Mobile Number</span><strong>{displayValue(contactInfo?.phone_number)}</strong></div>
                    <div className="es-info-item"><span>Alternate Phone</span><strong>{displayValue(contactInfo?.alternate_phone)}</strong></div>
                </div>
                {contactInfoLoading && <p role="status">Loading contact information...</p>}
                {contactInfoError && <p role="alert">{contactInfoError}</p>}

                <div className="es-address-grid">
                    <div className="es-address-box">
                        <div className="es-address-heading"><i className="bi bi-house"></i> Current Address</div>
                        <p>{displayValue(contactInfo?.current_address_line)}</p>
                        <span>{formatAddress(contactInfo?.current_city, contactInfo?.current_state, contactInfo?.current_postal_code, contactInfo?.current_country)}</span>
                    </div>
                    <div className="es-address-box">
                        <div className="es-address-heading"><i className="bi bi-house-door"></i> Permanent Address</div>
                        <p>{displayValue(contactInfo?.permanent_address_line)}</p>
                        <span>{formatAddress(contactInfo?.permanent_city, contactInfo?.permanent_state, contactInfo?.permanent_postal_code, contactInfo?.permanent_country)}</span>
                    </div>
                </div>
            </section>

            
            <section className="es-section-card" id="esEmployment">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-orange"><i className="bi bi-briefcase"></i></div>
                        <div>
                            <h4>Employment Details</h4>
                            <p>Your official job and organizational information</p>
                        </div>
                    </div>
                    <span className="es-readonly-badge"><i className="bi bi-lock"></i> HR Managed</span>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item"><span>Employee ID</span><strong>{displayValue(employmentInfo?.employee_code)}</strong></div>
                    <div className="es-info-item"><span>Employment Type</span><strong>{displayValue(employmentInfo?.employment_type)}</strong></div>
                    <div className="es-info-item"><span>Department</span><strong>{displayValue(employmentInfo?.department)}</strong></div>
                    <div className="es-info-item"><span>Team</span><strong>ΓÇö</strong></div>
                    <div className="es-info-item"><span>Designation</span><strong>{displayValue(employmentInfo?.designation)}</strong></div>
                    <div className="es-info-item"><span>Reporting Manager</span><strong>{displayValue(employmentInfo?.reporting_manager)}</strong></div>
                    <div className="es-info-item"><span>Joining Date</span><strong>{formatDate(employmentInfo?.joining_date)}</strong></div>
                    <div className="es-info-item"><span>Work Mode</span><strong>{displayValue(employmentInfo?.work_mode)}</strong></div>
                    <div className="es-info-item"><span>Office Location</span><strong>{displayValue(employmentInfo?.office_location)}</strong></div>
                    <div className="es-info-item"><span>Employment Status</span><strong><span className="es-status-active">{displayValue(employmentInfo?.employment_status)}</span></strong></div>
                </div>
                {employmentInfoLoading && <p role="status">Loading employment information...</p>}
                {employmentInfoError && <p role="alert">{employmentInfoError}</p>}
            </section>

            
            <section className="es-section-card es-bank-section" id="esBank">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-green"><i className="bi bi-bank"></i></div>
                        <div>
                            <h4>Bank Details</h4>
                            <p>Your salary account and payment information</p>
                        </div>
                    </div>
                    <button className="btn es-bank-edit-trigger" type="button" onClick={openBankEdit} disabled={!bankInfo}>
                        <i className="bi bi-pencil"></i> Request Update
                    </button>
                </div>

                <div className="es-bank-security">
                    <div className="es-bank-security-icon"><i className="bi bi-shield-lock-fill"></i></div>
                    <div>
                        <strong>Your bank information is protected</strong>
                        <p>Account numbers are masked. Changes may require HR verification before payroll updates.</p>
                    </div>
                    <span className={`es-verified-badge${bankInfo?.verification_status?.toLowerCase() === "pending" ? " es-pending-badge" : ""}`}>
                        <i className="bi bi-patch-check-fill"></i> {displayValue(bankInfo?.verification_status)}
                    </span>
                </div>

                <div className="es-bank-card">
                    <div className="es-bank-card-top">
                        <div className="es-bank-logo"><i className="bi bi-bank2"></i></div>
                        <span className="es-bank-account-type">{displayValue(bankInfo?.account_type).toUpperCase()}</span>
                    </div>
                    <h3>{displayValue(bankInfo?.bank_name)}</h3>
                    <p>Account Holder</p>
                    <strong className="es-account-holder">{displayValue(bankInfo?.account_holder_name)}</strong>
                    <div className="es-account-number-row">
                        <div>
                            <span>Account Number</span>
                            <strong id="esAccountNumber">
                                {bankInfo?.account_last_four
                                    ? accountLastFourVisible
                                        ? fullAccountNumber || "ΓÇö"
                                        : `ΓÇóΓÇóΓÇóΓÇó ΓÇóΓÇóΓÇóΓÇó ${bankInfo.account_last_four}`
                                    : "ΓÇö"}
                            </strong>
                        </div>
                        <button
                            className="es-reveal-btn"
                            id="esRevealAccount"
                            type="button"
                            disabled={!bankInfo?.account_last_four || accountRevealLoading}
                            onClick={toggleAccountNumber}
                        >
                            <i className={`bi ${accountRevealLoading ? "bi-arrow-repeat" : accountLastFourVisible ? "bi-eye-slash" : "bi-eye"}`}></i>
                            {accountRevealLoading ? "Loading..." : accountLastFourVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                    {accountRevealError && <p className="text-danger mb-0" role="alert">{accountRevealError}</p>}
                    <div className="es-bank-card-footer">
                        <div><span>IFSC Code</span><strong>{displayValue(bankInfo?.ifsc_code)}</strong></div>
                        <div><span>Branch</span><strong>{displayValue(bankInfo?.branch_name)}</strong></div>
                    </div>
                </div>
                {bankInfoLoading && <p role="status">Loading bank information...</p>}
                {bankInfoError && <p role="alert">{bankInfoError}</p>}

                <div className="es-info-grid es-bank-extra">
                    <div className="es-info-item"><span>Account Type</span><strong>{displayValue(bankInfo?.account_type)}</strong></div>
                    <div className="es-info-item">
                        <span>Bank Verification</span>
                        <strong>
                            {bankInfo?.verification_status?.toLowerCase() === "verified"
                                ? <span className="es-status-active">{bankInfo.verification_status}</span>
                                : bankInfo?.verification_status?.toLowerCase() === "pending"
                                    ? <span className="es-status-pending">{bankInfo.verification_status}</span>
                                    : displayValue(bankInfo?.verification_status)}
                        </strong>
                    </div>
                    <div className="es-info-item"><span>Last Verified</span><strong>ΓÇö</strong></div>
                    <div className="es-info-item"><span>Payment Method</span><strong>ΓÇö</strong></div>
                </div>
            </section>

            
            <section className="es-section-card" id="esIdentity">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-pink"><i className="bi bi-fingerprint"></i></div>
                        <div>
                            <h4>Identity Information</h4>
                            <p>Government-issued identity details</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn" type="button" onClick={openIdentityEdit}>
                        <i className="bi bi-pencil"></i> Request Update
                    </button>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item">
                        <span>Aadhaar Number</span>
                        <strong>{identityInfo?.aadhaar_last_four ? `XXXX XXXX ${identityInfo.aadhaar_last_four}` : "ΓÇö"}</strong>
                    </div>
                    <div className="es-info-item">
                        <span>PAN Number</span>
                        <strong>{displayValue(identityInfo?.pan_number_masked)}</strong>
                    </div>
                    <div className="es-info-item">
                        <span>Passport Number</span>
                        <strong>{displayValue(identityInfo?.passport_number_masked)}</strong>
                    </div>
                    <div className="es-info-item">
                        <span>Driving License</span>
                        <strong>{displayValue(identityInfo?.driving_license_masked)}</strong>
                    </div>
                    <div className="es-info-item">
                        <span>UAN Number</span>
                        <strong>{identityInfo?.uan_last_four ? `ΓÇóΓÇóΓÇóΓÇó ΓÇóΓÇóΓÇóΓÇó ${identityInfo.uan_last_four}` : "ΓÇö"}</strong>
                    </div>
                </div>
                {identityInfoLoading && <p role="status">Loading identity information...</p>}
                {identityInfoError && <p role="alert">{identityInfoError}</p>}
                <div className="es-security-note">
                    <i className="bi bi-shield-lock"></i>
                    Identity numbers are masked for privacy. Contact HR for verified document updates.
                </div>
            </section>

            
            <section className="es-section-card" id="esEmergency">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-red"><i className="bi bi-person-hearts"></i></div>
                        <div>
                            <h4>Emergency Contact</h4>
                            <p>Person to contact in case of an emergency</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn" type="button" onClick={openEmergencyEdit}>
                        <i className="bi bi-pencil"></i> Edit
                    </button>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item"><span>Contact Name</span><strong>{displayValue(primaryEmergencyContact?.contact_name)}</strong></div>
                    <div className="es-info-item"><span>Relationship</span><strong>{displayValue(primaryEmergencyContact?.relationship)}</strong></div>
                    <div className="es-info-item"><span>Phone Number</span><strong>{displayValue(primaryEmergencyContact?.phone_number)}</strong></div>
                    <div className="es-info-item"><span>Alternate Phone</span><strong>{displayValue(primaryEmergencyContact?.alternate_phone)}</strong></div>
                    <div className="es-info-item"><span>Email</span><strong>ΓÇö</strong></div>
                    <div className="es-info-item"><span>Address</span><strong>{displayValue(primaryEmergencyContact?.address)}</strong></div>
                </div>
                {emergencyContactLoading && <p role="status">Loading emergency contact...</p>}
                {emergencyContactError && <p role="alert">{emergencyContactError}</p>}
            </section>

            
            <section className="es-section-card" id="esAccount">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-purple"><i className="bi bi-shield-lock"></i></div>
                        <div>
                            <h4>Account & Security</h4>
                            <p>Manage your login and account security</p>
                        </div>
                    </div>
                </div>

                <div className="es-security-list">
                    <div className="es-security-row">
                        <div className="es-security-row-icon"><i className="bi bi-envelope-check"></i></div>
                        <div className="es-security-row-content">
                            <strong>Corporate Email</strong>
                            <span>Anil.kumar@ramel.com</span>
                        </div>
                        <span className="es-verified-badge">Verified</span>
                    </div>

                    <div className="es-security-row">
                        <div className="es-security-row-icon"><i className="bi bi-key"></i></div>
                        <div className="es-security-row-content">
                            <strong>Password</strong>
                            <span>Last changed 30 days ago</span>
                        </div>
                        <button className="btn es-edit-btn">Change</button>
                    </div>

                    <div className="es-security-row">
                        <div className="es-security-row-icon"><i className="bi bi-phone"></i></div>
                        <div className="es-security-row-content">
                            <strong>Multi-Factor Authentication</strong>
                            <span>Extra protection for your account</span>
                        </div>
                        <span className="es-status-active">Enabled</span>
                    </div>

                    <div className="es-security-row">
                        <div className="es-security-row-icon"><i className="bi bi-laptop"></i></div>
                        <div className="es-security-row-content">
                            <strong>Active Sessions</strong>
                            <span>Current browser ┬╖ Windows ┬╖ Chennai</span>
                        </div>
                        <button className="btn es-edit-btn">Manage</button>
                    </div>
                </div>
            </section>

            
            <section className="es-section-card" id="esPreferences">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-blue"><i className="bi bi-sliders"></i></div>
                        <div>
                            <h4>Preferences</h4>
                            <p>Personalize your employee workspace</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-check2"></i> Save Preferences
                    </button>
                </div>

                <div className="es-preference-grid">
                    <div className="es-preference-field">
                        <label htmlFor="esLanguage">Language</label>
                        <select className="form-select" id="esLanguage">
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Telugu</option>
                            <option>Tamil</option>
                        </select>
                    </div>
                    <div className="es-preference-field">
                        <label htmlFor="esDateFormat">Date Format</label>
                        <select className="form-select" id="esDateFormat">
                            <option value="DD MMM YYYY">DD MMM YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                    </div>
                    <div className="es-preference-field">
                        <label htmlFor="esTheme">Appearance</label>
                        <select className="form-select" id="esTheme">
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>
                </div>

                <div className="es-preference-toggles">
                    <div className="es-preference-toggle">
                        <div>
                            <strong>Email Notifications</strong>
                            <p>Receive important updates by email.</p>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="esEmailNotifications" checked />
                        </div>
                    </div>
                    <div className="es-preference-toggle">
                        <div>
                            <strong>Push Notifications</strong>
                            <p>Receive updates in your employee workspace.</p>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="esPushNotifications" checked />
                        </div>
                    </div>
                    <div className="es-preference-toggle">
                        <div>
                            <strong>Birthday & Work Anniversary Reminders</strong>
                            <p>Get notified about your teammates' special days.</p>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="esCelebrationNotifications" checked />
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="es-section-card" id="esShortcuts">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-blue"><i className="bi bi-command"></i></div>
                        <div>
                            <h4>Shortcuts Selection</h4>
                            <p>Personalize your employee dashboard shortcuts</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-check2"></i> Save Preferences
                    </button>
                </div>

                <div className="row g-3">

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-purple">
                                    <i className="bi bi-calendar-plus"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>Apply Leave</strong>
                            <small>Request time off</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-blue">
                                    <i className="bi bi-calendar-check"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>Attendance</strong>
                            <small>View attendance</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-orange">
                                    <i className="bi bi-send"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>New Request</strong>
                            <small>Contact HR / Admin</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-green">
                                    <i className="bi bi-folder2-open"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>Documents</strong>
                            <small>My documents</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-pink">
                                    <i className="bi bi-laptop"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>My Assets</strong>
                            <small>Assigned equipment</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-dark">
                                    <i className="bi bi-person"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>My Profile</strong>
                            <small>View profile</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-purple">
                                    <i className="bi bi-calendar-plus"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>Apply Leave</strong>
                            <small>Request time off</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-blue">
                                    <i className="bi bi-calendar-check"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>Attendance</strong>
                            <small>View attendance</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-orange">
                                    <i className="bi bi-send"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>New Request</strong>
                            <small>Contact HR / Admin</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-green">
                                    <i className="bi bi-folder2-open"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>Documents</strong>
                            <small>My documents</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-pink">
                                    <i className="bi bi-laptop"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>My Assets</strong>
                            <small>Assigned equipment</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-dark">
                                    <i className="bi bi-person"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>My Profile</strong>
                            <small>View profile</small>
                        </button>
                    </div>

                </div>

                <div className="mt-4">
                    <i className="bi bi-info-circle"></i>
                    <strong>Note:</strong> Select up to 6 shortcuts as favourites for quick access.
                </div>
            </section>

            
            <div className="es-bottom-note">
                <i className="bi bi-info-circle"></i>
                Some information is managed by HR. For corrections to official employment or payroll records, submit a request to HR.
            </div>
        </main>
    </div>
</div>


{isPersonalEditOpen && <div className="modal-backdrop fade show" onClick={() => setIsPersonalEditOpen(false)}></div>}
{isContactEditOpen && <div className="modal-backdrop fade show" onClick={() => setIsContactEditOpen(false)}></div>}
{isBankEditOpen && <div className="modal-backdrop fade show" onClick={closeBankEdit}></div>}
{isIdentityEditOpen && <div className="modal-backdrop fade show" onClick={() => setIsIdentityEditOpen(false)}></div>}
{isEmergencyEditOpen && <div className="modal-backdrop fade show" onClick={() => setIsEmergencyEditOpen(false)}></div>}
{accountRevealModalOpen && <div className="modal-backdrop fade show" onClick={closeAccountRevealModal}></div>}
<div
    className={`modal fade${isPersonalEditOpen ? " show d-block" : ""}`}
    id="esEditModal"
    tabIndex="-1"
    aria-hidden={!isPersonalEditOpen}
    aria-modal={isPersonalEditOpen || undefined}
    role={isPersonalEditOpen ? "dialog" : undefined}
    onClick={(event) => {
        if (event.target === event.currentTarget) setIsPersonalEditOpen(false);
    }}
>
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <form id="esEditForm" className="modal-content es-modal-content" onSubmit={submitPersonalEditRequest}>
            <div className="modal-header">
                <div>
                    <h5 className="modal-title" id="esEditTitle">Update Personal Information</h5>
                    <p className="es-modal-subtitle" id="esEditSubtitle">Update your personal information.</p>
                </div>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsPersonalEditOpen(false)}></button>
            </div>
            <div className="modal-body">
                <div className="row g-3" id="esEditFields">
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditFirstName">First Name</label>
                        <input id="personalEditFirstName" className="form-control" name="firstName" value={personalEditForm.firstName} onChange={updatePersonalEditField} required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditMiddleName">Middle Name</label>
                        <input id="personalEditMiddleName" className="form-control" name="middleName" value={personalEditForm.middleName} onChange={updatePersonalEditField} placeholder="Enter middle name" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditLastName">Last Name</label>
                        <input id="personalEditLastName" className="form-control" name="lastName" value={personalEditForm.lastName} onChange={updatePersonalEditField} required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditPreferredName">Preferred Name</label>
                        <input id="personalEditPreferredName" className="form-control" name="preferredName" value={personalEditForm.preferredName} onChange={updatePersonalEditField} placeholder="Enter preferred name" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditDateOfBirth">Date of Birth</label>
                        <input id="personalEditDateOfBirth" type="date" className="form-control" name="dateOfBirth" value={personalEditForm.dateOfBirth} onChange={updatePersonalEditField} />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditGender">Gender</label>
                        <select id="personalEditGender" className="form-select" name="gender" value={personalEditForm.gender} onChange={updatePersonalEditField}>
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditMaritalStatus">Marital Status</label>
                        <select id="personalEditMaritalStatus" className="form-select" name="maritalStatus" value={personalEditForm.maritalStatus} onChange={updatePersonalEditField}>
                            <option value="">Select marital status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditNationality">Nationality</label>
                        <input id="personalEditNationality" className="form-control" name="nationality" value={personalEditForm.nationality} onChange={updatePersonalEditField} />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="personalEditBloodGroup">Blood Group</label>
                        <select id="personalEditBloodGroup" className="form-select" name="bloodGroup" value={personalEditForm.bloodGroup} onChange={updatePersonalEditField}>
                            <option value="">Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>
                <div className="es-security-note mt-3">
                    <i className="bi bi-shield-lock"></i>
                    Changes to sensitive information may require HR verification. Do not enter passwords or account credentials.
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn es-btn-light" onClick={() => setIsPersonalEditOpen(false)}>Cancel</button>
                <button type="submit" className="btn es-btn-primary" disabled={personalEditSubmitting}>
                    <i className={`bi ${personalEditSubmitting ? "bi-arrow-repeat" : "bi-check-lg"}`}></i>
                    {personalEditSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </div>
            {personalEditFeedback && <p className="px-4 pb-3 mb-0 text-muted" role="status">{personalEditFeedback}</p>}
        </form>
    </div>
</div>

<div
    className={`modal fade${accountRevealModalOpen ? " show d-block" : ""}`}
    id="esAccountRevealModal"
    tabIndex="-1"
    aria-hidden={!accountRevealModalOpen}
    aria-modal={accountRevealModalOpen || undefined}
    role={accountRevealModalOpen ? "dialog" : undefined}
    onClick={(event) => {
        if (event.target === event.currentTarget) closeAccountRevealModal();
    }}
>
    <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content es-modal-content" onSubmit={submitAccountReveal}>
            <div className="modal-header">
                <div>
                    <h5 className="modal-title">Verify Your Password</h5>
                    <p className="es-modal-subtitle">Confirm your identity to reveal your account number.</p>
                </div>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeAccountRevealModal}></button>
            </div>
            <div className="modal-body">
                <div className="es-edit-field">
                    <label htmlFor="accountRevealPassword">Password</label>
                    <input
                        id="accountRevealPassword"
                        type="password"
                        autoComplete="current-password"
                        className="form-control"
                        value={accountRevealPassword}
                        onChange={(event) => setAccountRevealPassword(event.target.value)}
                        required
                    />
                </div>
                {accountRevealError && <p className="text-danger mt-3 mb-0" role="alert">{accountRevealError}</p>}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn es-btn-light" onClick={closeAccountRevealModal}>Cancel</button>
                <button type="submit" className="btn es-btn-primary" disabled={accountRevealLoading}>
                    {accountRevealLoading ? "Verifying..." : "Reveal Account Number"}
                </button>
            </div>
        </form>
    </div>
</div>

<div
    className={`modal fade${isBankEditOpen ? " show d-block" : ""}`}
    id="esBankEditModal"
    tabIndex="-1"
    aria-hidden={!isBankEditOpen}
    aria-modal={isBankEditOpen || undefined}
    role={isBankEditOpen ? "dialog" : undefined}
    onClick={(event) => {
        if (event.target === event.currentTarget) setIsBankEditOpen(false);
    }}
>
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <form className="modal-content es-modal-content" onSubmit={submitBankEdit}>
            <div className="modal-header">
                <div>
                    <h5 className="modal-title">Request Bank Details Update</h5>
                    <p className="es-modal-subtitle">Submit your new bank details for HR and payroll verification.</p>
                </div>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeBankEdit}></button>
            </div>
            <div className="modal-body">
                <div className="row g-3">
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="bankEditName">Bank Name</label>
                        <input id="bankEditName" className="form-control" name="bankName" value={bankEditForm.bankName} onChange={updateBankEditField} maxLength="150" required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="bankEditHolder">Account Holder Name</label>
                        <input id="bankEditHolder" className="form-control" name="accountHolderName" value={bankEditForm.accountHolderName} onChange={updateBankEditField} maxLength="150" required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="bankEditAccount">Account Number</label>
                        <input id="bankEditAccount" type="text" inputMode="numeric" autoComplete="off" className="form-control" name="accountNumber" value={bankEditForm.accountNumber} onChange={updateBankEditField} maxLength="50" placeholder="Enter account number" required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="bankEditConfirmAccount">Confirm Account Number</label>
                        <input id="bankEditConfirmAccount" type="text" inputMode="numeric" autoComplete="off" className="form-control" name="confirmAccountNumber" value={bankEditForm.confirmAccountNumber} onChange={updateBankEditField} maxLength="50" placeholder="Enter confirm account number" required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="bankEditIfsc">IFSC Code</label>
                        <input id="bankEditIfsc" className="form-control" name="ifscCode" value={bankEditForm.ifscCode} onChange={updateBankEditField} maxLength="20" placeholder="Enter IFSC code" required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="bankEditBranch">Branch Name</label>
                        <input id="bankEditBranch" className="form-control" name="branchName" value={bankEditForm.branchName} onChange={updateBankEditField} maxLength="100" placeholder="Enter branch name" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="bankEditType">Account Type</label>
                        <select id="bankEditType" className="form-select" name="accountType" value={bankEditForm.accountType} onChange={updateBankEditField} required>
                            <option value="Salary / Savings">Salary / Savings</option>
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="bankEditReason">Reason for Change</label>
                        <textarea id="bankEditReason" className="form-control" name="reason" value={bankEditForm.reason} onChange={updateBankEditField} rows="3" maxLength="2000" placeholder="Enter reason for change" required></textarea>
                    </div>
                </div>
                <div className="es-security-note mt-3">
                    <i className="bi bi-shield-lock"></i>
                    Changes will require HR verification before the bank details are marked verified.
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn es-btn-light" onClick={closeBankEdit}>Cancel</button>
                <button type="submit" className="btn es-btn-primary" disabled={bankEditSubmitting}>
                    <i className={`bi ${bankEditSubmitting ? "bi-arrow-repeat" : "bi-send"}`}></i>
                    {bankEditSubmitting ? "Submitting..." : "Submit Update Request"}
                </button>
            </div>
            {bankEditFeedback && <p className="px-4 pb-3 mb-0 text-danger" role="alert">{bankEditFeedback}</p>}
        </form>
    </div>
</div>

<div
    className={`modal fade${isContactEditOpen ? " show d-block" : ""}`}
    id="esContactEditModal"
    tabIndex="-1"
    aria-hidden={!isContactEditOpen}
    aria-modal={isContactEditOpen || undefined}
    role={isContactEditOpen ? "dialog" : undefined}
    onClick={(event) => {
        if (event.target === event.currentTarget) setIsContactEditOpen(false);
    }}
>
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <form className="modal-content es-modal-content" onSubmit={submitContactEdit}>
            <div className="modal-header">
                <div>
                    <h5 className="modal-title">Update Contact Information</h5>
                    <p className="es-modal-subtitle">Keep your contact details and addresses up to date.</p>
                </div>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsContactEditOpen(false)}></button>
            </div>
            <div className="modal-body">
                <div className="row g-3">
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditWorkEmail">Work Email</label>
                        <input id="contactEditWorkEmail" type="email" className="form-control" name="workEmail" value={contactEditForm.workEmail} onChange={updateContactEditField} required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditPersonalEmail">Personal Email</label>
                        <input id="contactEditPersonalEmail" type="email" className="form-control" name="personalEmail" value={contactEditForm.personalEmail} onChange={updateContactEditField} placeholder="Enter personal email" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditMobile">Mobile Number</label>
                        <input id="contactEditMobile" type="tel" className="form-control" name="mobile" value={contactEditForm.mobile} onChange={updateContactEditField} placeholder="Enter mobile number" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditAlternatePhone">Alternate Phone</label>
                        <input id="contactEditAlternatePhone" type="tel" className="form-control" name="alternatePhone" value={contactEditForm.alternatePhone} onChange={updateContactEditField} placeholder="Enter alternate phone" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditCurrentAddress">Current Address</label>
                        <input id="contactEditCurrentAddress" className="form-control" name="currentAddress" value={contactEditForm.currentAddress} onChange={updateContactEditField} placeholder="Enter current address" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditCurrentCity">Current City</label>
                        <input id="contactEditCurrentCity" className="form-control" name="currentCity" value={contactEditForm.currentCity} onChange={updateContactEditField} placeholder="Enter current city" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditCurrentState">Current State</label>
                        <input id="contactEditCurrentState" className="form-control" name="currentState" value={contactEditForm.currentState} onChange={updateContactEditField} placeholder="Enter current state" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditCurrentPostalCode">Current Postal Code</label>
                        <input id="contactEditCurrentPostalCode" className="form-control" name="currentPostalCode" value={contactEditForm.currentPostalCode} onChange={updateContactEditField} placeholder="Enter current postal code" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditCurrentCountry">Current Country</label>
                        <input id="contactEditCurrentCountry" className="form-control" name="currentCountry" value={contactEditForm.currentCountry} onChange={updateContactEditField} placeholder="Enter current country" />
                    </div>
                    <div className="col-12 es-edit-field es-edit-checkbox-field">
                        <div className="form-check">
                            <input id="contactEditSameAddress" type="checkbox" className="form-check-input" name="sameAsCurrentAddress" checked={contactEditForm.sameAsCurrentAddress} onChange={updateContactEditField} />
                            <label className="form-check-label" htmlFor="contactEditSameAddress">Permanent address is same as current address</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditPermanentAddress">Permanent Address</label>
                        <input id="contactEditPermanentAddress" className="form-control" name="permanentAddress" value={contactEditForm.permanentAddress} onChange={updateContactEditField} disabled={contactEditForm.sameAsCurrentAddress} placeholder="Enter permanent address" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditPermanentCity">Permanent City</label>
                        <input id="contactEditPermanentCity" className="form-control" name="permanentCity" value={contactEditForm.permanentCity} onChange={updateContactEditField} disabled={contactEditForm.sameAsCurrentAddress} placeholder="Enter permanent city" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditPermanentState">Permanent State</label>
                        <input id="contactEditPermanentState" className="form-control" name="permanentState" value={contactEditForm.permanentState} onChange={updateContactEditField} disabled={contactEditForm.sameAsCurrentAddress} placeholder="Enter permanent state" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditPermanentPostalCode">Permanent Postal Code</label>
                        <input id="contactEditPermanentPostalCode" className="form-control" name="permanentPostalCode" value={contactEditForm.permanentPostalCode} onChange={updateContactEditField} disabled={contactEditForm.sameAsCurrentAddress} placeholder="Enter permanent postal code" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="contactEditPermanentCountry">Permanent Country</label>
                        <input id="contactEditPermanentCountry" className="form-control" name="permanentCountry" value={contactEditForm.permanentCountry} onChange={updateContactEditField} disabled={contactEditForm.sameAsCurrentAddress} placeholder="Enter permanent country" />
                    </div>
                </div>
                <div className="es-security-note mt-3">
                    <i className="bi bi-shield-lock"></i>
                    Contact updates are saved to your employee profile.
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn es-btn-light" onClick={() => setIsContactEditOpen(false)}>Cancel</button>
                <button type="submit" className="btn es-btn-primary" disabled={contactEditSubmitting}>
                    <i className={`bi ${contactEditSubmitting ? "bi-arrow-repeat" : "bi-check-lg"}`}></i>
                    {contactEditSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </div>
            {contactEditFeedback && <p className="px-4 pb-3 mb-0 text-danger" role="alert">{contactEditFeedback}</p>}
        </form>
    </div>
</div>


<div
    className={`modal fade${isIdentityEditOpen ? " show d-block" : ""}`}
    id="esIdentityEditModal"
    tabIndex="-1"
    aria-hidden={!isIdentityEditOpen}
    aria-modal={isIdentityEditOpen || undefined}
    role={isIdentityEditOpen ? "dialog" : undefined}
    onClick={(event) => {
        if (event.target === event.currentTarget) setIsIdentityEditOpen(false);
    }}
>
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <form className="modal-content es-modal-content" onSubmit={submitIdentityEdit}>
            <div className="modal-header">
                <div>
                    <h5 className="modal-title">Request Identity Information Update</h5>
                    <p className="es-modal-subtitle">Submit identity corrections for HR verification.</p>
                </div>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsIdentityEditOpen(false)}></button>
            </div>
            <div className="modal-body">
                <div className="row g-3">
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="identityEditAadhaar">Aadhaar Number</label>
                        <input id="identityEditAadhaar" className="form-control" name="aadhaarNumber" value={identityEditForm.aadhaarNumber} onFocus={focusIdentityNumberField} onChange={updateIdentityEditField} inputMode="numeric" maxLength="20" placeholder="Enter aadhaar number" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="identityEditPan">PAN Number</label>
                        <input id="identityEditPan" className="form-control" name="panNumber" value={identityEditForm.panNumber} onFocus={focusIdentityNumberField} onChange={updateIdentityEditField} maxLength="20" placeholder="Enter PAN number" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="identityEditPassport">Passport Number</label>
                        <input id="identityEditPassport" className="form-control" name="passportNumber" value={identityEditForm.passportNumber} onFocus={focusIdentityNumberField} onChange={updateIdentityEditField} maxLength="30" placeholder="Enter passport number" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="identityEditDrivingLicense">Driving License Number</label>
                        <input id="identityEditDrivingLicense" className="form-control" name="drivingLicenseNumber" value={identityEditForm.drivingLicenseNumber} onFocus={focusIdentityNumberField} onChange={updateIdentityEditField} maxLength="30" placeholder="Enter driving license number" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="identityEditReason">Reason for Change</label>
                        <textarea id="identityEditReason" className="form-control" name="reason" value={identityEditForm.reason} onChange={updateIdentityEditField} rows="3" maxLength="2000" placeholder="Enter reason for change" required></textarea>
                    </div>
                </div>
                <div className="es-security-note mt-3">
                    <i className="bi bi-shield-lock"></i>
                    <span>Existing identity numbers are masked. Focus a number field to replace it. Changes require HR verification.</span>
                </div>
                {identityEditFeedback && <p className="text-danger mt-3 mb-0" role="alert">{identityEditFeedback}</p>}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn es-btn-light" onClick={() => setIsIdentityEditOpen(false)}>Cancel</button>
                <button type="submit" className="btn es-btn-primary" disabled={identityEditSubmitting}>
                    <i className={`bi ${identityEditSubmitting ? "bi-arrow-repeat" : "bi-send"}`}></i>
                    {identityEditSubmitting ? "Submitting..." : "Submit Update Request"}
                </button>
            </div>
        </form>
    </div>
</div>

<div
    className={`modal fade${isEmergencyEditOpen ? " show d-block" : ""}`}
    id="esEmergencyEditModal"
    tabIndex="-1"
    aria-hidden={!isEmergencyEditOpen}
    aria-modal={isEmergencyEditOpen || undefined}
    role={isEmergencyEditOpen ? "dialog" : undefined}
    onClick={(event) => {
        if (event.target === event.currentTarget) setIsEmergencyEditOpen(false);
    }}
>
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <form className="modal-content es-modal-content" onSubmit={handleEmergencyEditSubmit}>
            <div className="modal-header">
                <div>
                    <h5 className="modal-title">Update Emergency Contact</h5>
                    <p className="es-modal-subtitle">Keep your emergency contact information current.</p>
                </div>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsEmergencyEditOpen(false)}></button>
            </div>
            <div className="modal-body">
                <div className="row g-3">
                    <div className="col-12 es-edit-section-heading">
                        <h6>Primary Emergency Contact (Mandatory)</h6>
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="emergencyEditName">Contact Name</label>
                        <input id="emergencyEditName" className="form-control" name="contactName" value={emergencyEditForm.contactName} onChange={updateEmergencyEditField} maxLength="150" placeholder="Enter contact name" required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="emergencyEditRelationship">Relationship</label>
                        <select id="emergencyEditRelationship" className="form-select" name="relationship" value={emergencyEditForm.relationship} onChange={updateEmergencyEditField} required>
                            <option value="">Select relationship</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="emergencyEditPhone">Phone Number</label>
                        <input id="emergencyEditPhone" type="tel" className="form-control" name="phoneNumber" value={emergencyEditForm.phoneNumber} onChange={updateEmergencyEditField} maxLength="25" placeholder="Enter phone number" required />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="emergencyEditAddress">Address</label>
                        <input id="emergencyEditAddress" className="form-control" name="address" value={emergencyEditForm.address} onChange={updateEmergencyEditField} placeholder="Enter address" />
                    </div>
                    <div className="col-12 es-edit-section-heading">
                        <h6>Second Emergency Contact (Optional)</h6>
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="emergencyEditSecondName">Contact Name</label>
                        <input id="emergencyEditSecondName" className="form-control" name="secondContactName" value={emergencyEditForm.secondContactName} onChange={updateEmergencyEditField} maxLength="150" placeholder="Enter contact name" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="emergencyEditSecondRelationship">Relationship</label>
                        <select id="emergencyEditSecondRelationship" className="form-select" name="secondRelationship" value={emergencyEditForm.secondRelationship} onChange={updateEmergencyEditField}>
                            <option value="">Select relationship</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="emergencyEditSecondPhone">Phone Number</label>
                        <input id="emergencyEditSecondPhone" type="tel" className="form-control" name="secondPhoneNumber" value={emergencyEditForm.secondPhoneNumber} onChange={updateEmergencyEditField} maxLength="25" placeholder="Enter phone number" />
                    </div>
                    <div className="col-12 col-md-6 es-edit-field">
                        <label htmlFor="emergencyEditSecondAddress">Address</label>
                        <textarea id="emergencyEditSecondAddress" className="form-control" name="secondAddress" value={emergencyEditForm.secondAddress} onChange={updateEmergencyEditField} rows="3" placeholder="Enter address"></textarea>
                    </div>
                </div>
                <div className="es-security-note mt-3">
                    <i className="bi bi-shield-lock"></i>
                    <span>Emergency contact updates are managed by HR.</span>
                </div>
                {emergencyEditFeedback && <p className="text-danger mt-3 mb-0" role="alert">{emergencyEditFeedback}</p>}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn es-btn-light" onClick={() => setIsEmergencyEditOpen(false)}>Cancel</button>
                <button type="submit" className="btn es-btn-primary" disabled={emergencyEditSubmitting}>
                    {emergencyEditSubmitting ? "Saving..." : "Submit Update Request"}
                </button>
            </div>
        </form>
    </div>
</div>

<div className="es-toast" id="esToast">
    <div className="es-toast-icon"><i className="bi bi-check-lg"></i></div>
    <div>
        <strong id="esToastTitle">Success</strong>
        <p id="esToastMessage">Action completed.</p>
    </div>
    <button><i className="bi bi-x-lg"></i></button>
</div>

            </div>
    </>
  );
}
