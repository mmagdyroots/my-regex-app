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
  },
};

const App = () => {
  const [language, setLanguage] = useState('en');
  const t = translations[language];
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


  // const getCustomConstraints = () => {
  //   return customConstraintsText
  //     .split('\n')
  //     .map(line => line.trim())
  //     .filter(line => line.length > 0)
  //     .map(line => `⚠️ ${line}`);
  // };
  const getCustomConstraints = () => {
    const list = [];
    if (isRequired) list.push('⚠️ '+ t.fieldRequiredError);
    if (customConstraintsText.trim()) {
      customConstraintsText
        .split('\n')
        .filter((line) => line.trim() !== '')
        .forEach((line) => list.push(line.trim()));
    }
    return list;
  };
  const getLabelHints = () => {
    return labelHintsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `- ${line}`);
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
        if (/a-z/i.test(chars)) readable.push(language === 'ar' ? '✅ يجب أن يحتوي على أحرف (a–z، A–Z)' : '✅ Must contain letters (a–z, A–Z)');
        if (/0-9/.test(chars)) readable.push(language === 'ar' ? '✅ يجب أن يحتوي على أرقام (0–9)' : '✅ Must include digits (0–9)');
        if (/[!@#$%^&*._%+-]/.test(chars)) {
          const specials = chars.replace(/[a-z0-9]/gi, '').split('').join(' ');
          readable.push(language === 'ar'
            ? `✅ يمكن أن يحتوي على رموز خاصة (${specials})`
            : `✅ May include special characters (${specials})`
          );
        }
      });
  
      const quantifierMatches = [...pattern.matchAll(/\{(\d+),?(\d+)?\}/g)];
      quantifierMatches.forEach((match) => {
        const [, min, max] = match;
        if (min && max) readable.push(language === 'ar'
          ? `✅ كرر العنصر السابق من ${min} إلى ${max} مرة`
          : `✅ Repeat previous element between ${min} and ${max} times`
        );
        else if (min) readable.push(language === 'ar'
          ? `✅ كرر العنصر السابق على الأقل ${min} مرات`
          : `✅ Repeat previous element at least ${min} times`
        );
      });
  
      if (pattern.includes('^')) readable.push(language === 'ar' ? '✅ يجب أن يبدأ من البداية' : '✅ Must start from the beginning');
      if (pattern.includes('$')) readable.push(language === 'ar' ? '✅ يجب أن يتطابق حتى النهاية' : '✅ Must match to the end');
      if (pattern.includes('@')) readable.push(language === 'ar' ? '✅ يجب أن يحتوي على الرمز "@"' : '✅ Must contain "@" symbol');
      if (pattern.includes('\\.')) readable.push(language === 'ar' ? '✅ يجب أن يحتوي على النقطة "."' : '✅ Must include dot "."');
  
      if (readable.length === 0)
        readable.push(language === 'ar' ? 'ℹ️ لا يمكن تحويل النمط إلى قيود مفهومة.' : 'ℹ️ No human-readable constraints could be parsed.');
    } catch {
      readable.push(language === 'ar' ? '⚠️ لا يمكن تحليل قيود التعبير النمطي.' : '⚠️ Could not parse regex constraints.');
    }
  
    return readable;
  };

  const generateErrorHints = (value, regex) => {
    let hints = [];

    const patternStr = regex.toString();
  
    if (/\[.*a-z.*\]/i.test(patternStr) && !/[a-zA-Z]/.test(value))
      hints.push(language === 'ar'
        ? 'يجب أن يحتوي على حرف واحد على الأقل (a–z، A–Z).'
        : 'Should contain at least one letter (a–z, A–Z).'
      );
  
    if (/\[.*0-9.*\]/.test(patternStr) && !/[0-9]/.test(value))
      hints.push(language === 'ar'
        ? 'يجب أن يحتوي على رقم واحد على الأقل (0–9).'
        : 'Should include at least one digit (0–9).'
      );
  
    if (/\[.*[!@#$%^&*._%+-]+.*\]/.test(patternStr) && !/[!@#$%^&*._%+-]/.test(value))
      hints.push(language === 'ar'
        ? 'يجب أن يحتوي على أحد الرموز الخاصة المستخدمة.'
        : 'Should include one of the special characters used.'
      );
  
    if (patternStr.includes('@') && !/@/.test(value))
      hints.push(language === 'ar' ? 'الرمز "@" مفقود.' : 'Missing "@" symbol.');
  
    if (patternStr.includes('\\.') && !/\./.test(value))
      hints.push(language === 'ar' ? 'النقطة "." مفقودة.' : 'Missing dot "."');
  
    const quantMatch = patternStr.match(/\{(\d+),?(\d+)?\}/);
    if (quantMatch) {
      const [, min, max] = quantMatch;
      if (min && value.length < parseInt(min))
        hints.push(language === 'ar'
          ? `يجب أن يكون الإدخال على الأقل ${min} حرفًا.`
          : `Input must be at least ${min} characters.`
        );
      if (max && value.length > parseInt(max))
        hints.push(language === 'ar'
          ? `يجب ألا يتجاوز الإدخال ${max} حرفًا.`
          : `Input must not exceed ${max} characters.`
        );
    }
  
    if (!regex.test(value))
      hints.push(language === 'ar'
        ? 'الإدخال لا يتطابق مع النمط الكامل.'
        : 'Input does not match the full pattern.'
      );
  
    return hints.length ? hints.join('\n') : '';
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

      <label>{t.inputLabel}</label>
      <input
        type="text"
        value={myLabel}
        onChange={(e) => setMyLabel(e.target.value)}
        style={styles.input}
        placeholder={t.enterLabelText}
      />
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
      <label>{t.inputPlaceholder}</label>
      <input
        type="text"
        value={myPlaceholder}
        onChange={(e) => setMyPlaceholder(e.target.value)}
        style={styles.input}
        placeholder={t.inputPlaceholderHolder}
      />

<label>{t.customConstraintLabel}</label>
<textarea
  value={customConstraintsText}
  onChange={(e) => setCustomConstraintsText(e.target.value)}
  rows={4}
  style={styles.textarea}
  placeholder={t.customConstraintPlaceholder}
/>

<label>{t.labelInfoLabel}</label>
<textarea
  value={labelHintsText}
  onChange={(e) => setLabelHintsText(e.target.value)}
  rows={4}
  style={styles.textarea}
  placeholder={t.labelInfoPlaceholder}
/>

<div style={styles.dividerContainer}>
  <div style={styles.dividerLine}></div>
  <span style={styles.dividerText}>✦</span>
  <div style={styles.dividerLine}></div>
</div>
    <h2>{t.previewTitle}</h2>

      <div style={styles.constraintHeader}>
        <div>
        <span style={{ fontSize: '1.2em', marginRight: 6 }}>{myIcon}</span>
      <label style={{ marginRight: 8 }}>{myLabel}</label>

        <label style={{ marginRight: 8 }}>
          {isRequired ? '*' : ''}:
        </label>
        </div>
        <div  style={{marginInlineStart:'35px'}}>
        <InfoTooltip tooltipText={getLabelHints().join('\n')} />
        </div>

      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          placeholder={myPlaceholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            validateInput(e.target.value);
          }}
          style={{
            ...styles.input,
            width: '100%',
            paddingRight: '30px',
            boxSizing: 'border-box',
            borderColor: isValid === true ? 'green' : isValid === false ? 'red' : '#ccc',
          }}
        />
<InfoTooltip
  tooltipText={[...getCustomConstraints(), ...parseConstraints(regexInput)].join('\n')}
/>
      </div>

      {errorMessage && (
        <div style={styles.errorBox}>
          {errorMessage.split('\n').map((line, idx) => (
            <div key={idx}>{myLabel} {line}</div>
          ))}
        </div>
      )}

      {isValid && <div style={styles.successBox}>{t.validInput}</div>}
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
