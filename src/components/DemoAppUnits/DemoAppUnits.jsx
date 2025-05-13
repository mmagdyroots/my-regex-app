import React, { useState, useEffect } from 'react';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';

const translations = {
  en: {
    commonTitle:"🌐 Common",
    creatorTitle: "🎛️ Creator",
    previewTitle: "🧪 Preview",
    demo: "🏤 Demo",
    previewLanguageSelection: "Preview Language Selection",
    inputPart: "Input",
    displayPart: "Display",
    selectInputType: "Select Data Type",
    idLabel: "ID",
    text:"Text",
    number:"Number",
    date:"Date",
    email:"Email",
    enterId: "Enter the ID",
    idNotUnique : "The ID Already Exists",
    regexPattern: "Regex Pattern:",
    inputLabel: "Input Label Text:",
    descriptionLabel: "Description",
    enterDescription:"Enter description (shown in preview)",
    aiDescriptionLabel: "AI Description",
    enterAiDescription: "Enter AI description",
    iconLabel: "Icon Before Label:",
    fieldRequired: "Field is Required",
    inputPlaceholder: "Input Placeholder Text:",
    inputPlaceholderHolder: "Input Placeholder",
    constraintHints: "Custom Constraint Hints (one per line):",
    labelHints: "Label Info Hints (one per line):",
    fieldRequiredError: "This field is required.",
    placeholderExample: "Enter placeholder",
    regexError: "❌ Invalid regex pattern syntax.",
    success: "✅ Input is valid!",
    inputErrorPrefix: "",
    enterLabel: "Enter label text",
    enterIcon: "e.g. ✉️",
    enterRegex: "Enter regex pattern",
    customConstraintLabel: 'Custom Constraint Hints (one per line):',
    customConstraintPlaceholder: 'e.g. must be lowercase\nmust include year',
    labelInfoLabel: 'Label Info Hints (one per line):',
    labelInfoPlaceholder: 'e.g. This is my Test Hint\nAnother Hint',
    hint1: '✅ Must contain letters (a–z, A–Z)',
    hint2: '✅ Must include digits (0–9)',
    hint3: (specials) => `✅ May include special characters (${specials})`,
    hint4: (min,max) =>`✅ Repeat previous element between ${min} and ${max} times`,
    hint5: (min) =>`✅ Repeat previous element at least ${min} times`,
    hint6: '✅ Must start from the beginning',
    hint7: '✅ Must match to the end',
    hint8: '✅ Must contain "@" symbol',
    hint9: '✅ Must include dot "."',
    hint10: 'ℹ️ No human-readable constraints could be parsed.',
    hint11: '⚠️ Could not parse regex constraints.',
    hint12: 'Should contain at least one letter (a–z, A–Z).',
    hint13: 'Should include at least one digit (0–9).',
    hint14: 'Should include one of the special characters used.',
    hint15: 'Missing "@" symbol.',
    hint16: 'Missing dot "."',
    hint17: (min) =>`Input must be at least ${min} characters.`,
    hint18: (max) =>`Input must not exceed ${max} characters.`,
    hint19: 'Input does not match the full pattern.',


  },
  ar: {
    commonTitle:"🌐 مشترك",
    creatorTitle: "🎛️ المُنشئ",
    previewTitle: "🧪 المعاينة",
    demo: "🏤 عرض",
    selectInputType: "ادخل نوع الادخال",
    text:"نص",
    number:"رقم",
    date:"تاريخ",
    email:"ايميل",
    idLabel: "الرقم التعريفي",
    enterId: "ادخل الرقم التعريفي",
    idNotUnique : "الرقم التعريفي موجود بالفعل",
    regexPattern: "نمط التعبير النمطي:",
    inputLabel: "نص تسمية الإدخال:",
    iconLabel: "الأيقونة قبل التسمية:",
    descriptionLabel: "الوصف",
    enterDescription:"أدخل الوصف (يظهر في المعاينة)",
    aiDescriptionLabel: "الوصف للذكاء الاصطناعي",
    enterAiDescription: "أدخل وصف الذكاء الاصطناعي",
    fieldRequired: "الحقل مطلوب",
    inputPlaceholder: "نص العنصر النائب للإدخال:",
    inputPlaceholderHolder: "نص العنصر النائب",
    constraintHints: "تلميحات القيود المخصصة (سطر لكل تلميح):",
    labelHints: "تلميحات معلومات التسمية (سطر لكل تلميح):",
    fieldRequiredError: "هذا الحقل مطلوب.",
    placeholderExample: "أدخل النص التوضيحي",
    regexError: "❌ صيغة النمط غير صالحة.",
    success: "✅ الإدخال صحيح!",
    previewLanguageSelection: "اختيار اللغة",
    inputPart: "ادخال",
    displayPart: "عرض",
    inputErrorPrefix: "",
    enterLabel: "أدخل نص التسمية",
    enterIcon: "مثال: ✉️",
    enterRegex: "أدخل نمط regex",
    customConstraintLabel: 'تلميحات القيود المخصصة (سطر لكل تلميح):',
    customConstraintPlaceholder: 'مثال: يجب أن يكون بأحرف صغيرة\nيجب أن يحتوي على السنة',
    labelInfoLabel: 'تلميحات توضيحية لاسم الحقل (سطر لكل تلميح):',
    labelInfoPlaceholder: 'مثال: هذا تلميح توضيحي\nتلميح آخر',
    hint1: '✅ يجب أن يحتوي على أحرف (a–z، A–Z)',
    hint2: '✅ يجب أن يحتوي على أرقام (0–9)',
    hint3: (specials) => `✅ يمكن أن يحتوي على رموز خاصة (${specials})`,
    hint4: (min,max) =>`✅ كرر العنصر السابق من ${min} إلى ${max} مرة`,
    hint5: (min) =>`✅ كرر العنصر السابق على الأقل ${min} مرات`,
    hint6: '✅ يجب أن يبدأ من البداية',
    hint7: '✅ يجب أن يتطابق حتى النهاية',
    hint8: '✅ يجب أن يحتوي على الرمز "@"',
    hint9: '✅ يجب أن يحتوي على النقطة "."',
    hint10: 'ℹ️ لا يمكن تحويل النمط إلى قيود مفهومة.',
    hint11: '⚠️ لا يمكن تحليل قيود التعبير النمطي.',
    hint12: 'يجب أن يحتوي على حرف واحد على الأقل (a–z، A–Z).',
    hint13: 'يجب أن يحتوي على رقم واحد على الأقل (0–9).',
    hint14: 'يجب أن يحتوي على أحد الرموز الخاصة المستخدمة.',
    hint15: 'الرمز "@" مفقود.',
    hint16: 'النقطة "." مفقودة.',
    hint17: (min) =>`يجب أن يكون الإدخال على الأقل ${min} حرفًا.`,
    hint18: (max) =>`يجب ألا يتجاوز الإدخال ${max} حرفًا.`,
    hint19: 'الإدخال لا يتطابق مع النمط الكامل.',
  },
};


const jsonExamples = {
  PersonalEmail: {
    id: 'email_1',
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    icon: '✉️',
    aiDescription: 'this is the ai description for email',
    fieldRequired:true,
    EnableInputMask:false,
    dataType:'text',
    inputMaskPattern:'(+20) 999 999 9999',
    copyGuard:false,
    showCopyButton: true,
    pasteGuard:true,
    showPasteButton: false,
    fieldData: {
      labelText: {
        "en": 'Email Address',
        "ar": 'البريد الإلكتروني'
      },
      placeholder: {
        "en": 'Enter your email',
        "ar": 'أدخل بريدك الإلكتروني'
      },
      constraintHint: {
        "en": 'Must be a valid email address.\nNo spaces allowed.',
        "ar": 'يجب أن يكون بريدًا إلكترونيًا صالحًا.\nلا يُسمح بالفراغات.'
      },
      infoHint: {
        "en": 'Use a real email.',
        "ar": 'استخدم بريدًا حقيقيًا.'
      },
      displayInfoHint: {
        "en": 'Shown on profile page.',
        "ar": 'يظهر في صفحة الملف الشخصي.'
      },
      description: {
        "en": 'Used to contact you.',
        "ar": 'يُستخدم للتواصل معك.'
      }
    },
    crossFieldValidation:'same email_0',
    backendValidation: 'unique',
    specialValidation: 'allow .com',
    showQuickActionButton:false
  },
    PersonalNumber: {
    id: 'number_1',
    regex: '^(?:\\+20|0020)?1[0125][0-9]{8}$',
    icon: '📞',
    aiDescription: 'this is the ai description for phone number',
    fieldRequired:false,
    EnableInputMask:true,
    dataType:'text',
    inputMaskPattern:'+209999999999',
    copyGuard:true,
    showCopyButton: false,
    pasteGuard:false,
    showPasteButton: true,
    fieldData: {
      labelText: {
        en: 'Phone Number',
        ar: 'رقم الهاتف'
      },
      placeholder: {
        en: 'Enter your phone',
        ar: 'أدخل رقم هاتفك'
      },
      constraintHint: {
        en: 'Must be 10-14 digits.',
        ar: 'يجب أن يكون من 10 إلى 14 رقمًا.'
      },
      infoHint: {
        en: 'Include country code.',
        ar: 'قم بتضمين رمز الدولة.'
      },
      displayInfoHint: {
        en: 'Shown in contact info.',
        ar: 'يظهر في معلومات الاتصال.'
      },
      description: {
        en: 'Used to verify your identity.',
        ar: 'يُستخدم للتحقق من هويتك.'
      }
    },
    crossFieldValidation:'same number_0',
    backendValidation: 'unique',
    specialValidation: 'allow +20',
    showQuickActionButton:false
  },
  CompanyEmail: {
    id: 'email_2',
    regex: '^[a-zA-Z0-9._%+-]+@rootssolutions\\.com$',
    icon: '🏢✉️',
    aiDescription: 'Company domain email only',
    fieldRequired: true,
    EnableInputMask: false,
    dataType: 'text',
    inputMaskPattern: '',
    copyGuard: false,
    showCopyButton: false,
    pasteGuard: true,
    showPasteButton: false,
    fieldData: {
      labelText: { en: 'Company Email', ar: 'البريد الإلكتروني للشركة' },
      placeholder: { en: 'example@rootssolutions.com', ar: 'example@rootssolutions.com' },
      constraintHint: {
        en: 'Must be @rootssolutions.com email.',
        ar: 'يجب أن يكون البريد من نطاق rootssolutions.com.'
      },
      infoHint: {
        en: 'Used for internal communication.',
        ar: 'يُستخدم للتواصل الداخلي.'
      },
      displayInfoHint: {
        en: 'Visible only to admin.',
        ar: 'مرئي فقط للمسؤول.'
      },
      description: {
        en: 'Official company email.',
        ar: 'البريد الرسمي للشركة.'
      }
    },
    crossFieldValidation: '',
    backendValidation: 'domain_only',
    specialValidation: 'must end with @rootssolutions.com',
    showQuickActionButton:false
  },
  FullName: {
    id: 'name_1',
    regex: "^[a-zA-Z\\s]{3,50}$",
    icon: '🧑',
    aiDescription: 'Your full name (letters and spaces only)',
    fieldRequired: true,
    EnableInputMask: false,
    dataType: 'text',
    inputMaskPattern: '',
    copyGuard: false,
    showCopyButton: true,
    pasteGuard: false,
    showPasteButton: true,
    fieldData: {
      labelText: { en: 'Full Name', ar: 'الاسم الكامل' },
      placeholder: { en: 'John Doe', ar: 'محمد أحمد' },
      constraintHint: {
        en: 'Only letters and spaces. Min 3 characters.',
        ar: 'حروف ومسافات فقط. الحد الأدنى 3 حروف.'
      },
      infoHint: {
        en: 'No special characters or numbers.',
        ar: 'بدون رموز أو أرقام.'
      },
      displayInfoHint: {
        en: 'Displayed on your profile.',
        ar: 'يظهر في ملفك الشخصي.'
      },
      description: {
        en: 'Used for display and official records.',
        ar: 'يُستخدم للعرض والسجلات الرسمية.'
      }
    },
    crossFieldValidation: '',
    backendValidation: 'unique',
    specialValidation: 'no numbers',
    showQuickActionButton:false
  },
  NationalID: {
    id: 'nid_1',
    regex: '^\\d{14}$',
    icon: '🪪',
    aiDescription: 'Egyptian National ID (14 digits)',
    fieldRequired: true,
    EnableInputMask: false,
    dataType: 'text',
    inputMaskPattern: '',
    copyGuard: true,
    showCopyButton: false,
    pasteGuard: true,
    showPasteButton: false,
    fieldData: {
      labelText: { en: 'National ID', ar: 'الرقم القومي' },
      placeholder: { en: 'Enter 14-digit ID', ar: 'أدخل الرقم القومي' },
      constraintHint: {
        en: 'Must be 14 digits only.',
        ar: 'يجب أن يتكون من 14 رقمًا فقط.'
      },
      infoHint: {
        en: 'Used to verify identity.',
        ar: 'يُستخدم للتحقق من الهوية.'
      },
      displayInfoHint: {
        en: 'Not publicly displayed.',
        ar: 'لا يُعرض علنًا.'
      },
      description: {
        en: 'Required for government services.',
        ar: 'مطلوب للخدمات الحكومية.'
      }
    },
    crossFieldValidation: '',
    backendValidation: 'unique',
    specialValidation: '14 digits only',
    showQuickActionButton:false
  },
  DateOfBirth: {
    id: 'dob_1',
    regex: '^\\d{4}-\\d{2}-\\d{2}$',
    icon: '🎂',
    aiDescription: 'Date of birth in YYYY-MM-DD format',
    fieldRequired: true,
    EnableInputMask: true,
    dataType: 'date',
    inputMaskPattern: '9999-99-99',
    copyGuard: false,
    showCopyButton: false,
    pasteGuard: false,
    showPasteButton: true,
    fieldData: {
      labelText: { en: 'Date of Birth', ar: 'تاريخ الميلاد' },
      placeholder: { en: 'YYYY-MM-DD', ar: 'سنة-شهر-يوم' },
      constraintHint: {
        en: 'Format must be YYYY-MM-DD.',
        ar: 'يجب أن يكون التنسيق سنة-شهر-يوم.'
      },
      infoHint: {
        en: 'Used to calculate age.',
        ar: 'يُستخدم لحساب العمر.'
      },
      displayInfoHint: {
        en: 'Shown in profile.',
        ar: 'يظهر في الملف الشخصي.'
      },
      description: {
        en: 'Used for age-based services.',
        ar: 'يُستخدم لخدمات تعتمد على العمر.'
      }
    },
    crossFieldValidation: '',
    backendValidation: 'valid_date',
    specialValidation: 'past date only',
    showQuickActionButton:false
  },
  Password: {
    id: 'password_1',
    regex: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$',
    icon: '🔒',
    aiDescription: 'Secure password with uppercase and digit',
    fieldRequired: true,
    EnableInputMask: false,
    dataType: 'password',
    inputMaskPattern: '',
    copyGuard: true,
    showCopyButton: false,
    pasteGuard: true,
    showPasteButton: false,
    fieldData: {
      labelText: { en: 'Password', ar: 'كلمة المرور' },
      placeholder: { en: 'Enter strong password', ar: 'أدخل كلمة مرور قوية' },
      constraintHint: {
        en: 'Min 8 chars, 1 uppercase, 1 digit.',
        ar: '8 أحرف على الأقل، حرف كبير ورقم.'
      },
      infoHint: {
        en: 'Used to log in.',
        ar: 'تُستخدم لتسجيل الدخول.'
      },
      displayInfoHint: {
        en: 'Hidden and encrypted.',
        ar: 'مخفية ومشفرة.'
      },
      description: {
        en: 'Protects your account.',
        ar: 'تحمي حسابك.'
      }
    },
    crossFieldValidation: 'not same as email_1',
    backendValidation: 'hash_store',
    specialValidation: 'must include capital letter and number',
    showQuickActionButton:false
  },
  WebsiteURL: {
    id: 'url_1',
    regex: '^https?://[\\w.-]+(?:\\.[\\w.-]+)+[/#?]?.*$',
    icon: '🌐',
    aiDescription: 'Your personal or business website',
    fieldRequired: false,
    EnableInputMask: false,
    dataType: 'url',
    inputMaskPattern: '',
    copyGuard: false,
    showCopyButton: true,
    pasteGuard: false,
    showPasteButton: true,
    fieldData: {
      labelText: { en: 'Website URL', ar: 'رابط الموقع الإلكتروني' },
      placeholder: { en: 'https://example.com', ar: 'https://example.com' },
      constraintHint: {
        en: 'Start with http:// or https://',
        ar: 'ابدأ بـ http:// أو https://'
      },
      infoHint: {
        en: 'Used for reference or contact.',
        ar: 'يُستخدم كمرجع أو للتواصل.'
      },
      displayInfoHint: {
        en: 'Visible on profile.',
        ar: 'مرئي في الملف الشخصي.'
      },
      description: {
        en: 'Optional for linking external sites.',
        ar: 'اختياري لربط المواقع الخارجية.'
      }
    },
    crossFieldValidation: '',
    backendValidation: 'valid_url',
    specialValidation: 'must start with http(s)',
    showQuickActionButton:false
  },
  PostalCode: {
    id: 'zip_1',
    regex: '^\\d{5}$',
    icon: '🏤',
    aiDescription: '5-digit ZIP/postal code',
    fieldRequired: false,
    EnableInputMask: true,
    dataType: 'text',
    inputMaskPattern: '99999',
    copyGuard: false,
    showCopyButton: false,
    pasteGuard: false,
    showPasteButton: true,
    fieldData: {
      labelText: { en: 'Postal Code', ar: 'الرمز البريدي' },
      placeholder: { en: '12345', ar: '١٢٣٤٥' },
      constraintHint: {
        en: 'Must be 5 digits.',
        ar: 'يجب أن يكون 5 أرقام.'
      },
      infoHint: {
        en: 'Used for delivery address.',
        ar: 'يُستخدم لعنوان التوصيل.'
      },
      displayInfoHint: {
        en: 'Not publicly shown.',
        ar: 'لا يظهر للآخرين.'
      },
      description: {
        en: 'Helps locate your region.',
        ar: 'يساعد في تحديد منطقتك.'
      }
    },
    crossFieldValidation: '',
    backendValidation: '',
    specialValidation: '5 digits only',
    showQuickActionButton:false
  },
  Salary: {
    id: 'salary_1',
    regex: '^\\d{3,7}$',
    icon: '💰',
    aiDescription: 'Expected monthly salary',
    fieldRequired: false,
    EnableInputMask: false,
    dataType: 'number',
    inputMaskPattern: '',
    copyGuard: true,
    showCopyButton: false,
    pasteGuard: true,
    showPasteButton: false,
    fieldData: {
      labelText: { en: 'Expected Salary', ar: 'الراتب المتوقع' },
      placeholder: { en: '5000', ar: '٥٠٠٠' },
      constraintHint: {
        en: 'Numbers only (EGP).',
        ar: 'أرقام فقط (بالجنيه).'
      },
      infoHint: {
        en: 'Used for job offers.',
        ar: 'يُستخدم لعروض العمل.'
      },
      displayInfoHint: {
        en: 'Only visible to HR.',
        ar: 'مرئي فقط للموارد البشرية.'
      },
      description: {
        en: 'Informational only.',
        ar: 'للمعلومة فقط.'
      }
    },
    crossFieldValidation: '',
    backendValidation: 'range_check',
    specialValidation: 'min 1000',
    showQuickActionButton:false
  },
  LinkedInProfile: {
    id: 'linkedin_1',
    regex: '^https:\\/\\/(www\\.)?linkedin\\.com\\/in\\/[a-zA-Z0-9_-]+$',
    icon: '🔗',
    aiDescription: 'LinkedIn profile URL',
    fieldRequired: false,
    EnableInputMask: false,
    dataType: 'url',
    inputMaskPattern: '',
    copyGuard: false,
    showCopyButton: true,
    pasteGuard: false,
    showPasteButton: true,
    fieldData: {
      labelText: { en: 'LinkedIn Profile', ar: 'حساب لينكد إن' },
      placeholder: { en: 'https://linkedin.com/in/username', ar: 'https://linkedin.com/in/username' },
      constraintHint: {
        en: 'Must be a valid LinkedIn URL.',
        ar: 'يجب أن يكون رابط لينكد إن صحيحًا.'
      },
      infoHint: {
        en: 'Used to view CV.',
        ar: 'يُستخدم لعرض السيرة الذاتية.'
      },
      displayInfoHint: {
        en: 'Shown on public profile.',
        ar: 'يظهر في الملف العام.'
      },
      description: {
        en: 'Optional for professional info.',
        ar: 'اختياري للمعلومات المهنية.'
      }
    },
    crossFieldValidation: '',
    backendValidation: '',
    specialValidation: 'must include /in/',
    showQuickActionButton:false
  }
};

const DemoAppUnits = () => {
  const [language, setLanguage] = useState('en');
  let t = translations[language];
  const [regexInput, setRegexInput] = useState('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [regexObj, setRegexObj] = useState(new RegExp(regexInput));

  const [myIcon, setMyIcon] = useState('✉️');
  const [isRequired, setIsRequired] = useState(false);

  const [isInputMaskEnabled, setIsInputMaskEnabled] = useState(false);
  const [inputMaskPattern, setInputMaskPattern] = useState('');

  const [pasteGuard, setPasteGuard] = useState(true);
  const [copyGuard, setCopyGuard] = useState(true);
  const [showPasteButton, setShowPasteButton] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [showQuickActionButtons, setShowQuickActionButtons] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [existingIds, setExistingIds] = useState(['abc123', 'xyz456']); // Example existing IDs
  const [isIdUnique, setIsIdUnique] = useState(true);
  const [aiDescription, setAiDescription] = useState('');

  const [userLanguages, setUserLanguages] = useState(['en', 'ar']); // default
const [newLang, setNewLang] = useState('');
const [selectedPreviewLang, setSelectedPreviewLang] = useState('en');
const [inputDataType, setInputDataType] = useState('text'); // Default type is 'text'

const [crossFieldValidation, setCrossFieldValidation] = useState(''); // Default type is 'text'
const [backendValidation, setBackendValidation] = useState(''); // Default type is 'text'
const [specialValidation, setSpecialValidation] = useState(''); // Default type is 'text'



const [fieldData, setFieldData] = useState({
  labelText: {},
  placeholder: {},
  constraintHint: {},
  infoHint: {},
  displayInfoHint:{},
  description:{}
});
const [placeholderText, setPlaceholderText] = useState(JSON.stringify(fieldData['placeholder'], null, 2));
const [infoHintText, setInfoHintText] = useState(JSON.stringify(fieldData['infoHint'], null, 2));
const [constraintHintText, setConstraintHintText] = useState(JSON.stringify(fieldData['constraintHint'], null, 2));
const [descriptionText, setDescriptionText] = useState(JSON.stringify(fieldData['description'], null, 2));
const [displayInfoHintText, setDisplayInfoHintText] = useState(JSON.stringify(fieldData['displayInfoHint'], null, 2));
const [labelTextText, setLabelTextText] = useState(JSON.stringify(fieldData['labelText'], null, 2));




  const [hyperLinkEnabled, setHyperLinkEnabled] = useState(false);
  const [hyperLinkValue, setHyperLinkValue] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  const [formatType, setFormatType] = useState('none');
  const [customPattern, setCustomPattern] = useState('');
  const [customReplacement, setCustomReplacement] = useState('');

const [isMeasurementUnitEnabled , setIsMeasurementUnitEnabled ] = useState(false);
const [selectedMeasurementUnit, setSelectedMeasurementUnit] = useState('');
const [selectedDisplayUnit, setSelectedDisplayUnit] = useState('');
const [convertedValue, setConvertedValue] = useState('');


  const actions = [
    { type: 'email', label: language === 'ar' ? 'إرسال بريد' : 'Email' },
    { type: 'call', label: language === 'ar' ? 'اتصال' : 'Call' },
    { type: 'message', label: language === 'ar' ? 'رسالة نصية' : 'Message (SMS)' },
    { type: 'url', label: language === 'ar' ? 'فتح رابط' : 'Open URL' },
    { type: 'location', label: language === 'ar' ? 'موقع على الخريطة' : 'Open Location' },
    { type: 'calendar', label: language === 'ar' ? 'إضافة للتقويم' : 'Add to Calendar' },
    { type: 'navigate', label: language === 'ar' ? 'ابدأ التنقل' : 'Navigate' },
    { type: 'whatsapp', label: language === 'ar' ? 'رسالة واتساب' : 'WhatsApp Message' },
    { type: 'instagram', label: language === 'ar' ? 'افتح انستجرام' : 'Open Instagram' },
    { type: 'facebook', label: language === 'ar' ? 'افتح فيسبوك' : 'Open Facebook' }
  ];
const unitCategories = {
  Length: ['Meter', 'Kilometer', 'Centimeter', 'Inch', 'Foot', 'Mile'],
  Weight: ['Gram', 'Kilogram', 'Pound', 'Ounce', 'Ton'],
  Temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  Volume: ['Liter', 'Milliliter', 'Gallon', 'Cubic meter'],
  Time: ['Second', 'Minute', 'Hour', 'Day'],
};
const handleAction = () => {
    let url = '';
    switch (selectedAction) {
      case 'email':
        url = `mailto:${inputValue}`;
        break;
      case 'call':
        url = `tel:${inputValue}`;
        break;
      case 'message':
        url = `sms:${inputValue}`;
        break;
      case 'url':
        url = inputValue.startsWith('http') ? inputValue : `https://${inputValue}`;
        break;
      case 'location':
        url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inputValue)}`;
        break;
      case 'calendar':
        url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(inputValue)}`;
        break;
      case 'navigate':
        url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(inputValue)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/${inputValue.replace(/[^0-9]/g, '')}`;
        break;
      case 'instagram':
        url = `https://www.instagram.com/${inputValue.replace('@', '')}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/${inputValue}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };
    const applyCustomFormat = (value) => {
    try {
      const regex = new RegExp(customPattern, 'g');
      return value.replace(regex, customReplacement);
    } catch (e) {
      return '[Invalid regex pattern]';
    }
  };
  const formatValue = (value) => {
    switch (formatType) {
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
      case 'capitalize':
        return value.charAt(0).toUpperCase() + value.slice(1);
      case 'custom':
        return applyCustomFormat(value);
      default:
        return value;
    }
  };

function convertValue(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;

  const tempMap = {
    Celsius: {
      Fahrenheit: (c) => (c * 9) / 5 + 32,
      Kelvin: (c) => c + 273.15,
    },
    Fahrenheit: {
      Celsius: (f) => ((f - 32) * 5) / 9,
      Kelvin: (f) => ((f - 32) * 5) / 9 + 273.15,
    },
    Kelvin: {
      Celsius: (k) => k - 273.15,
      Fahrenheit: (k) => ((k - 273.15) * 9) / 5 + 32,
    },
    // Add other unit types here as needed
  };

  if (tempMap[fromUnit] && tempMap[fromUnit][toUnit]) {
    return tempMap[fromUnit][toUnit](value).toFixed(2);
  }

  return 'Conversion not supported';
}

const handleIdChange = (e) => {
  const value = e.target.value;
  setIdInput(value);
  setIsIdUnique(!existingIds.includes(value.trim()));
};
  const getCustomConstraints = () => {
    const list = [];

    if (isRequired) list.push('⚠️ '+ (translations[selectedPreviewLang]?.fieldRequiredError || translations['en'].fieldRequiredError));
    if (fieldData.constraintHint[selectedPreviewLang]?.trim()) {
      let temp = fieldData.constraintHint[selectedPreviewLang].trim()
      if(temp){

      
      fieldData.constraintHint[selectedPreviewLang]
        .split('\n')
        .filter((line) => line.trim() !== '')
        .forEach((line) => list.push(line.trim()));
      }
    }
    return list;
  };
  const getLabelHints = () => {
    let temp = fieldData.infoHint[selectedPreviewLang]
    if(temp){
      return fieldData.infoHint[selectedPreviewLang]
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `- ${line}`);
    }

  };

  const getDisplayHints = () => {
    let temp = fieldData.displayInfoHint[selectedPreviewLang]
    if(temp){
      return fieldData.displayInfoHint[selectedPreviewLang]
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `- ${line}`);
    }

  };

  useEffect(() => {
    try {
      const r = new RegExp(regexInput);
      setRegexObj(r);
      validateInput(inputValue, r);
    } catch (err) {
      setIsValid(false);
      setErrorMessage(t.invalidRegex);
    }
  }, [regexInput]);

  const parseConstraints = (pattern) => {
    const readable = [];
  
    try {
      const charClassMatches = [...pattern.matchAll(/\[([^\]]+)\]/g)];
      charClassMatches.forEach((match) => {
        const chars = match[1];
        if (/a-z/i.test(chars)) readable.push(translations[selectedPreviewLang]?.hint1 || translations['en'].hint1);
        if (/0-9/.test(chars)) readable.push(translations[selectedPreviewLang]?.hint2|| translations['en'].hint2);
        if (/[!@#$%^&*._%+-]/.test(chars)) {
          let specials = chars.replace(/[a-z0-9]/gi, '').split('').join(' ');
          readable.push(translations[selectedPreviewLang]?.hint3(specials)|| translations['en'].hint3(specials));
        }
      });
  
      const quantifierMatches = [...pattern.matchAll(/\{(\d+),?(\d+)?\}/g)];
      quantifierMatches.forEach((match) => {
        let [, min, max] = match;
        if (min && max) readable.push(translations[selectedPreviewLang]?.hint4(min,max) || translations['en'].hint4(min,max));
        else if (min) readable.push(translations[selectedPreviewLang]?.hint5(min) || translations['en'].hint5(min));
      });
  
      if (pattern.includes('^')) readable.push( translations[selectedPreviewLang]?.hint6 || translations['en'].hint6);
      if (pattern.includes('$')) readable.push(translations[selectedPreviewLang]?.hint7 || translations['en'].hint7);
      if (pattern.includes('@')) readable.push(translations[selectedPreviewLang]?.hint8 || translations['en'].hint8);
      if (pattern.includes('\\.')) readable.push(translations[selectedPreviewLang]?.hint9 || translations['en'].hint9);
  
      if (readable.length === 0)
        readable.push(translations[selectedPreviewLang]?.hint10 || translations['en'].hint10);
    } catch {
      readable.push(translations[selectedPreviewLang]?.hint11 || translations['en'].hint11);
    }
  
    return readable;
  };

  const generateErrorHints = (value, regex) => {
    let hints = [];

    const patternStr = regex.toString();
  
    if (/\[.*a-z.*\]/i.test(patternStr) && !/[a-zA-Z]/.test(value))
      hints.push(translations[selectedPreviewLang]?.hint12 || translations['en'].hint12);
  
    if (/\[.*0-9.*\]/.test(patternStr) && !/[0-9]/.test(value))
      hints.push(translations[selectedPreviewLang]?.hint13 || translations['en'].hint13);
  
    if (/\[.*[!@#$%^&*._%+-]+.*\]/.test(patternStr) && !/[!@#$%^&*._%+-]/.test(value))
      hints.push(translations[selectedPreviewLang]?.hint14 || translations['en'].hint14);
  
    if (patternStr.includes('@') && !/@/.test(value))
      hints.push(translations[selectedPreviewLang]?.hint15 || translations['en'].hint15);
  
    if (patternStr.includes('\\.') && !/\./.test(value))
      hints.push(translations[selectedPreviewLang]?.hint16 || translations['en'].hint16);
  
    const quantMatch = patternStr.match(/\{(\d+),?(\d+)?\}/);
    if (quantMatch) {
      const [, min, max] = quantMatch;
      if (min && value.length < parseInt(min))
        hints.push(translations[selectedPreviewLang]?.hint17(min) || translations['en'].hint17(min));
      if (max && value.length > parseInt(max))
        hints.push(translations[selectedPreviewLang]?.hint18(max) || translations['en'].hint18(max));
    }
  
    if (!regex.test(value))
      hints.push(translations[selectedPreviewLang]?.hint19 || translations['en'].hint19);
  
    return hints.length ? hints.join('\n') : '';
  };
  const handleJsonInput = (field, value) => {
    if(field === 'placeholder') setPlaceholderText(value);
      else if(field === 'infoHint') setInfoHintText(value);
      else if(field === 'constraintHint') setConstraintHintText(value);
      else if(field === 'description') setDescriptionText(value);
      else if(field === 'displayInfoHint') setDisplayInfoHintText(value);
      else if(field === 'labelText') setLabelTextText(value);  
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed !== null) {
        setFieldData(prev => ({ ...prev, [field]: parsed }));
      }
    } catch (err) {
      console.error('Invalid JSON:', err.message);
    }
  };

  const getAllLanguages = () => {
    const all = new Set([
      ...Object.keys(fieldData.labelText),
      ...Object.keys(fieldData.placeholder),
      ...Object.keys(fieldData.constraintHint),
      ...Object.keys(fieldData.infoHint),
      ...Object.keys(fieldData.displayInfoHint),
      ...Object.keys(fieldData.description)
    ]);
    return Array.from(all);
  };

  const languages = getAllLanguages();
// const applyInputMask = (value, mask) => {
//   if (!mask) return value;
//   let result = '';
//   let valIndex = 0;
//   let escapeNext = false;

//   for (let i = 0; i < mask.length && valIndex < value.length; i++) {
//     let maskChar = mask[i];

//     if (escapeNext) {
//       // Previous character was '\', treat this one as literal
//       if (value[valIndex] === maskChar) {
//         result += maskChar;
//         valIndex++;
//       } else {
//         break;
//       }
//       escapeNext = false;
//       continue;
//     }

//     if (maskChar === '\\') {
//       escapeNext = true;
//       continue;
//     }

//     const inputChar = value[valIndex];

//     if (maskChar === 'A') {
//       if (/[A-Za-z]/.test(inputChar)) {
//         result += inputChar;
//         valIndex++;
//       } else {
//         break;
//       }
//     } else if (maskChar === '9') {
//       if (/\d/.test(inputChar)) {
//         result += inputChar;
//         valIndex++;
//       } else {
//         break;
//       }
//     } else if (maskChar === '*') {
//       result += inputChar;
//       valIndex++;
//     } else {
//       result += maskChar;
//       if (inputChar === maskChar) valIndex++;
//     }
//   }

//   return result;
// };
const applyInputMask = (value, mask) => {
  if (!mask) return value;

  let result = '';
  let valIndex = 0;
  let escapeNext = false;

  for (let i = 0; i < mask.length; i++) {
    let maskChar = mask[i];

    if (escapeNext) {
      // Always insert the literal, ignore input char
      result += maskChar;
      // Only advance input index if it matches the literal
      if (value[valIndex] === maskChar) {
        valIndex++;
      }
      escapeNext = false;
      continue;
    }

    if (maskChar === '\\') {
      escapeNext = true;
      continue;
    }

    const inputChar = value[valIndex];
    if (valIndex >= value.length) break;

    if (maskChar === 'A') {
      if (/[A-Za-z]/.test(inputChar)) {
        result += inputChar;
        valIndex++;
      } else {
        break;
      }
    } else if (maskChar === '9') {
      if (/\d/.test(inputChar)) {
        result += inputChar;
        valIndex++;
      } else {
        break;
      }
    } else if (maskChar === '*') {
      result += inputChar;
      valIndex++;
    } else {
      // Literal case
      result += maskChar;
      if (inputChar === maskChar) {
        valIndex++;
      }
    }
  }

  return result;
};

  const validateInput = (val, pattern = regexObj) => {
    if (!val.trim()) {
      if (isRequired) {
        setIsValid(false);
        setErrorMessage(t.requiredField);
      } else {
        setIsValid(null);
        setErrorMessage('');
      }
      return;
    }

    if (pattern.test(val)) {
      setIsValid(true);
      setErrorMessage('');
    } else {
      setIsValid(false);
      setErrorMessage(generateErrorHints(val, pattern));
    }
  };

  return (
<div
  style={{
    ...styles.container,
    overflowX: 'auto',     // enable horizontal scrolling
    direction: language === 'ar' ? 'rtl' : 'ltr', // respect text direction
    width: '100vw',         // make sure it spans viewport width
    boxSizing: 'border-box'
  }}
><button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} style={{ float: 'right' }}>
  🌐 {language === 'en' ? 'عربي' : 'English'}
      </button>
      <br />


<label>Choose an Example</label>
<select
  style={styles.input}
  onChange={(e) => {
    const selected = jsonExamples[e.target.value];
    if (selected) {
      setIdInput(selected.id);
      setRegexInput(selected.regex);
      setFieldData(selected.fieldData);
      setPlaceholderText(JSON.stringify(selected.fieldData['placeholder'], null, 2));
      setInfoHintText(JSON.stringify(selected.fieldData['infoHint'], null, 2));
      setConstraintHintText(JSON.stringify(selected.fieldData['constraintHint'], null, 2));
      setDescriptionText(JSON.stringify(selected.fieldData['description'], null, 2));
      setDisplayInfoHintText(JSON.stringify(selected.fieldData['displayInfoHint'], null, 2));
      setLabelTextText(JSON.stringify(selected.fieldData['labelText'], null, 2));  
      setMyIcon(selected.icon);
      setAiDescription(selected.aiDescription);
      setIsRequired(selected.fieldRequired);
      setIsInputMaskEnabled(selected.EnableInputMask);
      setInputMaskPattern(selected.inputMaskPattern);
      setInputDataType(selected.dataType);
      setCopyGuard(selected.copyGuard);
      setShowCopyButton(selected.showCopyButton);
      setPasteGuard(selected.pasteGuard);
      setShowPasteButton(selected.showPasteButton);
      setCrossFieldValidation(selected.crossFieldValidation);
      setBackendValidation(selected.backendValidation);
      setSpecialValidation(selected.specialValidation);
      setShowQuickActionButtons(selected.showQuickActionButton);
    }
  }}
>
  <option value="">-- Select Example --</option>
  {Object.keys(jsonExamples).map((key) => (
    <option key={key} value={key}>
      {key}
    </option>
  ))}
</select>
<br />

      <h2>{t.commonTitle}</h2>
      <div>
        <label>{t.idLabel || 'ID'}</label>
        <input
          type="text"
          value={idInput}
          onChange={handleIdChange}
          style={{
            ...styles.input,
            borderColor: isIdUnique ? '#ccc' : 'red',
          }}
          placeholder={t.enterId || 'Enter unique ID'}
        />
        {!isIdUnique && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {t.idNotUnique || 'This ID is already in use.'}
          </span>
        )}
      </div>

<h3>Add or Remove Languages</h3>
<input
  type="text"
  placeholder="e.g. fr, de"
  value={newLang}
  onChange={(e) => setNewLang(e.target.value)}
  style={{
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    width: '150px'
  }}
/>
<button
style={{
  margin: '0px 5px',
  padding: '8px 14px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px'
}}
onClick={() => {
  const trimmed = newLang.trim();
  if (trimmed && !userLanguages.includes(trimmed)) {
    setUserLanguages([...userLanguages, trimmed]);
    setNewLang('');
  }
}}>Add Language</button>

<button
style={{
  padding: '8px 14px',
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px'
}}
onClick={() => {
  if (userLanguages.includes(newLang)) {
    setUserLanguages(userLanguages.filter(lang => lang !== newLang));
    setNewLang('');
  }
}}>Remove Language</button>
<br />
<br />

  <label>Label Text JSON</label>
  <textarea   value={labelTextText}  tabIndex={2}
  rows={4}
  style={styles.textarea} onChange={(e) => handleJsonInput('labelText', e.target.value)} />

      <label>{t.iconLabel}</label>
      <input
        type="text"
        value={myIcon}
        onChange={(e) => setMyIcon(e.target.value)}
        style={styles.input}
        placeholder={t.iconExample}
      />

<div style={{ marginBottom: '10px' }}>
    <label htmlFor="inputDataType">{t.selectInputType}</label>
    <select
      id="inputDataType"
      value={inputDataType}
      onChange={(e) => setInputDataType(e.target.value)}
      style={styles.input}
    >
      <option value="text">{t.text}</option>
      <option value="number">{t.number}</option>
      <option value="date">{t.date}</option>
      <option value="email">{t.email}</option>
    </select>
  </div>

<label style={{ marginTop: '10px', display: 'block' }}>
    {(t.descriptionLabel || 'Description') + ' JSON'}
  </label>
  <textarea   value={descriptionText}  tabIndex={2}
  rows={4}
  placeholder={t.enterDescription || 'Enter description (shown in preview)'}
  style={styles.textarea} onChange={(e) => handleJsonInput('description', e.target.value)} />

  {/* AI Description Field */}
  <label style={{ marginTop: '10px', display: 'block' }}>
    {t.aiDescriptionLabel || 'AI Description'}
  </label>
  <input
    type="text"
    value={aiDescription}
    onChange={(e) => setAiDescription(e.target.value)}
    style={styles.input}
    placeholder={t.enterAiDescription || 'Enter AI description'}
  />


      <h2>{t.creatorTitle}</h2>

      <label>{t.regexPattern}</label>
      <input
        type="text"
        value={regexInput}
        onChange={(e) => setRegexInput(e.target.value)}
        style={styles.input}
        placeholder={t.enterRegex}
      />






      <label>
      <input
        type="checkbox"
        checked={isRequired}
        onChange={(e) => setIsRequired(e.target.checked)}
        style={{ marginRight: 8 }}
      />
      {t.fieldRequired}
    </label>
      <br></br>
      <label>
  <input
    type="checkbox"
    checked={isInputMaskEnabled}
    onChange={(e) => setIsInputMaskEnabled(e.target.checked)}
    style={{ marginRight: 8 }}
  />
  Enable Input Mask
</label>

<br />
{isInputMaskEnabled && (
  <>
    <label>Input Mask Pattern</label>
    <input
      type="text"
      value={inputMaskPattern}
      onChange={(e) => setInputMaskPattern(e.target.value)}
      style={styles.input}
      placeholder="e.g. AAA-9999-***"
    />
  </>
)}


  <div>
  <label>
    <input
      type="checkbox"
      checked={pasteGuard}
      onChange={(e) => setPasteGuard(e.target.checked)}
      style={{ marginRight: 8 }}
    />
    {language === 'ar' ? 'منع اللصق' : 'Paste Guard'}
  </label>
  <label>
    <input
      type="checkbox"
      checked={showPasteButton}
      onChange={(e) => setShowPasteButton(e.target.checked)}
      style={{ marginRight: 8 }}
    />
    {language === 'ar' ? 'ظهور ضغط اللصق' : 'Show Paste Button'}
  </label>
  </div>

<br />

<label>Placeholder JSON</label>
  <textarea value={placeholderText}     tabIndex={2}
  rows={4}
  style={styles.textarea} onChange={(e) => handleJsonInput('placeholder', e.target.value)} />

<label>Input Info Hint JSON</label>
  <textarea value={infoHintText}     tabIndex={2}
  rows={4}
  style={styles.textarea} onChange={(e) => handleJsonInput('infoHint', e.target.value)} />

<label>Constraint Hint JSON</label>
  <textarea  value={constraintHintText}   tabIndex={2}
  rows={4}
  style={styles.textarea} onChange={(e) => handleJsonInput('constraintHint', e.target.value)} />


<label>Cross Field Validation</label>
  <textarea
        value={crossFieldValidation}
      onChange={(e) => setCrossFieldValidation(e.target.value)}
  rows={1}
  style={styles.textarea} />

<label>Back-End Based Validation</label>
  <textarea
          value={backendValidation}
      onChange={(e) => setBackendValidation(e.target.value)}
  rows={1}
  style={styles.textarea} />

<label>Special Validation</label>
  <textarea
            value={specialValidation}
      onChange={(e) => setSpecialValidation(e.target.value)}
  rows={1}
  style={styles.textarea} />


{/* Measuring Units Checkbox and Dropdown */}
<div style={{ marginTop: '10px' }}>
  <label>
    <input
      type="checkbox"
      checked={isMeasurementUnitEnabled}
       onChange={(e) => {
        setIsMeasurementUnitEnabled(e.target.checked);
      }}
      style={{ marginRight: 8 }}
    />
    {language === 'ar' ? 'الوحدات' : 'Measuring Units'}
  </label>

  {isMeasurementUnitEnabled && (
    <select
      value={selectedMeasurementUnit}
      onChange={(e) => setSelectedMeasurementUnit(e.target.value)}
      style={{ ...styles.input, marginTop: '10px' }}
    >
      <option value="">{language === 'ar' ? '- اختر وحدة -' : '- Select Unit -'}</option>
      {Object.entries(unitCategories).map(([category, units]) => (
        <optgroup key={category} label={category}>
          {units.map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </optgroup>
      ))}
    </select>
  )}
</div>







    <h2>{t.previewTitle}</h2>


  <div>
  <label>
    <input
      type="checkbox"
      checked={copyGuard}
      onChange={(e) => setCopyGuard(e.target.checked)}
      style={{ marginRight: 8 }}
    />
    {language === 'ar' ? 'منع النسخ' : 'Copy Guard'}
  </label>
  <label>
    <input
      type="checkbox"
      checked={showCopyButton}
      onChange={(e) => setShowCopyButton(e.target.checked)}
      style={{ marginRight: 8 }}
    />
    {language === 'ar' ? 'ظهور ضغط النسخ' : 'Show Copy Button'}
  </label>
  </div>
  <br />

  <div>
    <label>
      <input
        type="checkbox"
        checked={showQuickActionButtons}
        onChange={(e) => setShowQuickActionButtons(e.target.checked)}
        style={{ marginRight: 8 }}
      />
      {language === 'ar' ? 'ظهور الضغط السريع' : 'Show Quick Action Buttons'}
    </label>

{showQuickActionButtons &&
      <select
        value={selectedAction}
        onChange={(e) => setSelectedAction(e.target.value)}
          style={styles.input}
      >
        <option value="">{language === 'ar' ? 'اختر الإجراء' : 'Select Action'}</option>
        {actions.map(action => (
          <option key={action.type} value={action.type}>
            {action.label}
          </option>
        ))}
      </select>}
  </div>
  <br />
        {/* Checkbox to enable hyperlink */}
      <label>
        <input
          type="checkbox"
          checked={hyperLinkEnabled}
          onChange={(e) => setHyperLinkEnabled(e.target.checked)}
        /> Enable Hyperlink
      </label>
      <br />
      {/* Input to enter the hyperlink */}
      {hyperLinkEnabled && (
        <input
          type="text"
          placeholder="Enter hyperlink URL"
          value={hyperLinkValue}
          onChange={(e) => setHyperLinkValue(e.target.value)}
          style={styles.input}
        />
      )}
      <br />
      {/* Format Selector */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="formatSelector">Display Format:</label>
        <select
          id="formatSelector"
          value={formatType}
          onChange={(e) => setFormatType(e.target.value)}
          style={{ marginLeft: '10px', padding: '4px' }}
        >
          <option value="none">None</option>
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="capitalize">Capitalize</option>
          <option value="custom">Custom (Regex Replace)</option>
        </select>
      </div>

            {/* Custom Format Inputs */}
      {formatType === 'custom' && (
        <div style={{ marginBottom: '10px' }}>
          <div style={{ marginBottom: '5px' }}>
            <label>Regex Pattern:</label>
            <input
              type="text"
              value={customPattern}
              onChange={(e) => setCustomPattern(e.target.value)}
              placeholder="e.g., \\d+"
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </div>
          <div>
            <label>Replacement:</label>
            <input
              type="text"
              value={customReplacement}
              onChange={(e) => setCustomReplacement(e.target.value)}
              placeholder="e.g., #"
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </div>
        </div>
      )}
  
<label>Display Info Hint JSON</label>
  <textarea  value={displayInfoHintText}   tabIndex={2}
  rows={4}
  style={styles.textarea} onChange={(e) => handleJsonInput('displayInfoHint', e.target.value)} />



<div style={styles.dividerContainer}>
  <div style={styles.dividerLine}></div>
  <span style={styles.dividerText}>✦</span>
  <div style={styles.dividerLine}></div>
</div>
    <h2>{t.demo}</h2>
    <h3>{t.previewLanguageSelection}</h3>
    <select
      style={{
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '14px',
        backgroundColor: '#fff',
        color: '#333',
        cursor: 'pointer',
        minWidth: '100px'
      }}
    value={selectedPreviewLang} onChange={(e) => setSelectedPreviewLang(e.target.value)}>
      {userLanguages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>


      {fieldData.description?.[selectedPreviewLang] && (
    <div style={{ fontSize: '12px', color: '#666', marginTop: '30px' }}>
      {'-> ' + fieldData.description[selectedPreviewLang]}
    </div>
  )}
      <div style={styles.constraintHeader}>
        <div>
        <span style={{ fontSize: '1.2em', marginRight: 6 }}>{myIcon}</span>
      <label style={{ marginRight: 8 }}>{fieldData.labelText[selectedPreviewLang] || '-'}</label>

        <label style={{ marginRight: 8 }}>
          {isRequired ? '*' : ''}:
        </label>
        </div>
        <div  style={{marginInlineStart:'35px'}}>
        <InfoTooltip tooltipText={getLabelHints()?.join('\n')} />
        </div>

      </div>


      <div style={{ position: 'relative', width: '100%' }}>
      <label>{t.inputPart}</label>
        

        <div style={{ position: 'relative', width: '100%' }}>

      <input
      tabIndex={1}
      type={inputDataType || 'text'}  // Dynamically setting the input type
      placeholder={fieldData.placeholder[selectedPreviewLang] || ''}
    value={inputValue}
    onChange={(e) => {
      const val = e.target.value;
      const masked = isInputMaskEnabled ? applyInputMask(val, inputMaskPattern) : val;
      setInputValue(masked);
      validateInput(masked);
          if (masked && selectedMeasurementUnit && selectedDisplayUnit) {
      setConvertedValue(
        convertValue(
          parseFloat(masked),
          selectedMeasurementUnit,
          selectedDisplayUnit
        )
      );
    }
    }}
    onPaste={pasteGuard ? (e) => e.preventDefault() : undefined}
    // onCopy={copyGuard ? (e) => e.preventDefault() : undefined}
    style={{
      ...styles.input,
      width: '100%',
      paddingRight: language === 'ar' ? '30px' : '60px',
      paddingLeft: language === 'ar' ? '60px' : '30px',
      boxSizing: 'border-box',
      borderColor: isValid === true ? 'green' : isValid === false ? 'red' : '#ccc',
    }}
  />
<InfoTooltip
  tooltipText={[...getCustomConstraints(), ...parseConstraints(regexInput)].join('\n')}
/>
  {isMeasurementUnitEnabled && selectedMeasurementUnit && (
    <span style={{
      position: 'absolute',
      right: '70px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: '#888',
    }}>
      ({selectedMeasurementUnit})
    </span>
  )}
</div>

  
  {(!pasteGuard && showPasteButton ) && (
    <button
      onClick={async () => {
        const clip = await navigator.clipboard.readText();
        const masked = isInputMaskEnabled ? applyInputMask(clip, inputMaskPattern) : clip;
        setInputValue(masked);
        validateInput(masked);
      }}
      style={{
        marginLeft: 8,
        marginTop: -15,
        position: 'absolute',
        [language === 'ar' ? 'left' : 'right']: 10,
        padding: '4px 8px',
        cursor: 'pointer'
      }}
    >
      {language === 'ar' ? 'لصق' : 'Paste'}
    </button>
  )}


      </div>

      {errorMessage && (
        <div style={styles.errorBox}>
          {errorMessage.split('\n').map((line, idx) => (
            <div key={idx}>{fieldData.labelText[selectedPreviewLang] || '-'} {line}</div>
          ))}
        </div>
      )}


      <div style={styles.constraintHeader}>
        <div>
        <span style={{ fontSize: '1.2em', marginRight: 6 }}>{myIcon}</span>
      <label style={{ marginRight: 8 }}>{fieldData.labelText[selectedPreviewLang] || '-'}</label>
        </div>
        <div  style={{marginInlineStart:'35px'}}>
        <InfoTooltip tooltipText={getLabelHints()?.join('\n')} />
        </div>

      </div>
      <div style={{ position: 'relative', width: '100%' }}>
      <label>{t.displayPart}</label>



      {/* Output Unit Dropdown */}
      {selectedMeasurementUnit && (
        <select
          value={selectedDisplayUnit}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedDisplayUnit(val);
            if (inputValue && val) {
              setConvertedValue(
                convertValue(
                  parseFloat(inputValue),
                  selectedMeasurementUnit,
                  val
                )
              );
            }
          }}
          style={{ ...styles.input, marginTop: '10px' }}
        >
          <option value="">{language === 'ar' ? '- اختر وحدة العرض -' : '- Select Display Unit -'}</option>
          {Object.entries(unitCategories).map(([category, units]) =>
            units.includes(selectedMeasurementUnit)
              ? units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))
              : null
          )}
        </select>
      )}

<div style={{ position: 'relative', width: '100%' }}>

{hyperLinkEnabled ? (
        <a
          href={hyperLinkValue}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.input,
            display: 'inline-block',
            textDecoration: 'none',
            color: 'blue',
            width: '100%',
            padding: '8px',
            borderColor: isValid === true ? 'green' : isValid === false ? 'red' : '#ccc',
            boxSizing: 'border-box',
            cursor: 'pointer'
          }}
        >
          {formatValue(convertedValue)}
        </a>
      ) : (
        <input
          tabIndex={1}
          placeholder={fieldData.placeholder[selectedPreviewLang] || ''}
          value={formatValue(convertedValue)}
          readOnly={true}
          onCopy={copyGuard ? (e) => e.preventDefault() : undefined}
          style={{
            ...styles.input,
            padding: '8px',
            width: '100%',
            paddingRight: language === 'ar' ? '30px' : '60px',
            paddingLeft: language === 'ar' ? '60px' : '30px',
            boxSizing: 'border-box',
            borderColor: isValid === true ? 'green' : isValid === false ? 'red' : '#ccc',
          }}
        />
      )}
<InfoTooltip tooltipText={getDisplayHints()?.join('\n')} />

{(!copyGuard && showCopyButton ) && (
      <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(inputValue);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }}
      style={{
        marginLeft: 8,
        marginTop: -15,
        position: 'absolute',
        [language === 'ar' ? 'left' : 'right']: 10,
        padding: '4px 8px',
        cursor: 'pointer'
      }}
    >
      {language === 'ar' ? 'نسخ' : 'Copy'}
    </button>
  )}

      {isValid && showQuickActionButtons && selectedAction && (
        <button
          onClick={handleAction}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            [language === 'ar' ? 'left' : 'right']: 120,
            padding: '4px 12px',
            cursor: 'pointer'
          }}
        >
          {actions.find(a => a.type === selectedAction)?.label}
        </button>
      )}

  {isMeasurementUnitEnabled && selectedDisplayUnit && (
    <span style={{
      position: 'absolute',
      right: '70px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: '#888',
    }}>
      {(isMeasurementUnitEnabled && selectedDisplayUnit ? '  (' + selectedDisplayUnit +')':'')}
    </span>
  )}
</div>

      </div>




      {isValid && <div style={styles.successBox}>{t.success}</div>}


    </div>
  );
};

const styles = {
  // container: {
  //   padding: 20,
  //   minHeight: '100vh',
  //   overflowX: 'auto',
  //   boxSizing: 'border-box',
  // },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0',
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#ddd',
    margin: '0 10px',
  },
  dividerText: {
    fontSize: '18px',
    color: '#888',
    fontWeight: 'bold',
    padding: '0 10px',
  },
  container: {
    maxWidth: 700,
    margin: '40px auto',
    padding: 20,
    fontFamily: 'Arial',
    border: '1px solid #ddd',
    borderRadius: 10,
    boxShadow: '0 0 10px #eee',
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    borderRadius: 5,
    border: '2px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    borderRadius: 5,
    border: '2px solid #ccc',
    resize: 'vertical',
  },
  constraintHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  infoIcon: {
    cursor: 'pointer',
    fontSize: '1.1em',
    color: '#007BFF',
    borderRadius: '50%',
    padding: '2px 6px',
    backgroundColor: '#e6f0ff',
    border: '1px solid #b3d1ff',
  },
  errorBox: {
    backgroundColor: '#ffe6e6',
    color: '#c00',
    padding: 10,
    borderRadius: 5,
    whiteSpace: 'pre-wrap',
    marginTop: 10,
  },
  successBox: {
    backgroundColor: '#e0ffe0',
    color: '#008000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
};

export default DemoAppUnits;
