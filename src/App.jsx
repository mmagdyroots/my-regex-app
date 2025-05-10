import React, { useState, useEffect } from 'react';
import InfoTooltip from './components/InfoTooltip/InfoTooltip.jsx';

const translations = {
  en: {
    creatorTitle: "🎛️ Creator",
    previewTitle: "🧪 Preview",
    regexPattern: "Regex Pattern:",
    inputLabel: "Input Label Text:",
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
    creatorTitle: "🎛️ المُنشئ",
    previewTitle: "🧪 المعاينة",
    regexPattern: "نمط التعبير النمطي:",
    inputLabel: "نص تسمية الإدخال:",
    iconLabel: "الأيقونة قبل التسمية:",
    fieldRequired: "الحقل مطلوب",
    inputPlaceholder: "نص العنصر النائب للإدخال:",
    inputPlaceholderHolder: "نص العنصر النائب",
    constraintHints: "تلميحات القيود المخصصة (سطر لكل تلميح):",
    labelHints: "تلميحات معلومات التسمية (سطر لكل تلميح):",
    fieldRequiredError: "هذا الحقل مطلوب.",
    placeholderExample: "أدخل النص التوضيحي",
    regexError: "❌ صيغة النمط غير صالحة.",
    success: "✅ الإدخال صحيح!",
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


const App = () => {
  const [language, setLanguage] = useState('en');
  let t = translations[language];
  const [regexInput, setRegexInput] = useState('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [regexObj, setRegexObj] = useState(new RegExp(regexInput));

  const [myIcon, setMyIcon] = useState('✉️');
  const [myLabel, setMyLabel] = useState('My Test Email');
  const [myPlaceholder, setMyPlaceholder] = useState('m.magdy@roots.solutions');
  const [customConstraintsText, setCustomConstraintsText] = useState('');
  const [labelHintsText, setLabelHintsText] = useState('');
  const [isRequired, setIsRequired] = useState(false);

  const [isInputMaskEnabled, setIsInputMaskEnabled] = useState(false);
  const [inputMaskPattern, setInputMaskPattern] = useState('');

  const [pasteGuard, setPasteGuard] = useState(true);
  const [showPasteButton, setShowPasteButton] = useState(false);



  const [userLanguages, setUserLanguages] = useState(['en', 'ar']); // default
const [newLang, setNewLang] = useState('');
const [selectedPreviewLang, setSelectedPreviewLang] = useState('en');

const [fieldData, setFieldData] = useState({
  labelText: {},
  placeholder: {},
  constraintHint: {},
  infoHint: {}
});


  // const getCustomConstraints = () => {
  //   return customConstraintsText
  //     .split('\n')
  //     .map(line => line.trim())
  //     .filter(line => line.length > 0)
  //     .map(line => `⚠️ ${line}`);
  // };
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
    ]);
    return Array.from(all);
  };

  const languages = getAllLanguages();

  const applyInputMask = (value, mask) => {
  if (!mask) return value;
  let result = '';
  let valIndex = 0;

  for (let i = 0; i < mask.length && valIndex < value.length; i++) {
    const maskChar = mask[i];
    const inputChar = value[valIndex];

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
      // Accept any character
      result += inputChar;
      valIndex++;
    } else {
      result += maskChar;
      if (inputChar === maskChar) valIndex++;
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
      <h2>{t.creatorTitle}</h2>
      <label>{t.regexPattern}</label>
      <input
        type="text"
        value={regexInput}
        onChange={(e) => setRegexInput(e.target.value)}
        style={styles.input}
        placeholder={t.enterRegex}
      />
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
  <textarea     tabIndex={2}
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
      placeholder="e.g. AAA-9999"
    />
  </>
)}
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

<br />

<label>Placeholder JSON</label>
  <textarea     tabIndex={2}
  rows={4}
  style={styles.textarea} onChange={(e) => handleJsonInput('placeholder', e.target.value)} />

<label>Constraint Hint JSON</label>
  <textarea     tabIndex={2}
  rows={4}
  style={styles.textarea} onChange={(e) => handleJsonInput('constraintHint', e.target.value)} />

<label>Info Hint JSON</label>
  <textarea     tabIndex={2}
  rows={4}
  style={styles.textarea} onChange={(e) => handleJsonInput('infoHint', e.target.value)} />

<label>Cross Field Validation</label>
  <textarea
  rows={1}
  style={styles.textarea} />

<label>Back-End Based Validation</label>
  <textarea
  rows={1}
  style={styles.textarea} />

<label>Special Validation</label>
  <textarea
  rows={1}
  style={styles.textarea} />


<div style={styles.dividerContainer}>
  <div style={styles.dividerLine}></div>
  <span style={styles.dividerText}>✦</span>
  <div style={styles.dividerLine}></div>
</div>
    <h2>{t.previewTitle}</h2>
    <h3>Preview Language Selection</h3>
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
      <input
      tabIndex={1}
    type="text"
    placeholder={fieldData.placeholder[selectedPreviewLang] || ''}
    value={inputValue}
    onChange={(e) => {
      const val = e.target.value;
      const masked = isInputMaskEnabled ? applyInputMask(val, inputMaskPattern) : val;
      setInputValue(masked);
      validateInput(masked);
    }}
    onPaste={pasteGuard ? (e) => e.preventDefault() : undefined}
    // onCopy={copyPasteGuard ? (e) => e.preventDefault() : undefined}
    style={{
      ...styles.input,
      width: '100%',
      paddingRight: language === 'ar' ? '30px' : '60px',
      paddingLeft: language === 'ar' ? '60px' : '30px',
      boxSizing: 'border-box',
      borderColor: isValid === true ? 'green' : isValid === false ? 'red' : '#ccc',
    }}
  />
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
<InfoTooltip
  tooltipText={[...getCustomConstraints(), ...parseConstraints(regexInput)].join('\n')}
/>
      </div>

      {errorMessage && (
        <div style={styles.errorBox}>
          {errorMessage.split('\n').map((line, idx) => (
            <div key={idx}>{fieldData.labelText[selectedPreviewLang] || '-'} {line}</div>
          ))}
        </div>
      )}

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

export default App;
