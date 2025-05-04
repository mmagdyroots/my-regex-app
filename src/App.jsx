import React, { useState, useEffect } from 'react';

const App = () => {
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
    if (isRequired) list.push('⚠️ This field is required.');
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
      setErrorMessage('❌ Invalid regex pattern syntax.');
    }
  }, [regexInput]);

  const parseConstraints = (pattern) => {
    const readable = [];

    try {
      const charClassMatches = [...pattern.matchAll(/\[([^\]]+)\]/g)];
      charClassMatches.forEach((match) => {
        const chars = match[1];
        if (/a-z/i.test(chars)) readable.push('✅ Must contain letters (a–z, A–Z)');
        if (/0-9/.test(chars)) readable.push('✅ Must include digits (0–9)');
        if (/[!@#$%^&*._%+-]/.test(chars))
          readable.push(`✅ May include special characters (${chars.replace(/[a-z0-9]/gi, '').split('').join(' ')})`);
      });

      const quantifierMatches = [...pattern.matchAll(/\{(\d+),?(\d+)?\}/g)];
      quantifierMatches.forEach((match) => {
        const [, min, max] = match;
        if (min && max) readable.push(`✅ Repeat previous element between ${min} and ${max} times`);
        else if (min) readable.push(`✅ Repeat previous element at least ${min} times`);
      });

      if (pattern.includes('^')) readable.push('✅ Must start from the beginning');
      if (pattern.includes('$')) readable.push('✅ Must match to the end');
      if (pattern.includes('@')) readable.push('✅ Must contain "@" symbol');
      if (pattern.includes('\\.')) readable.push('✅ Must include dot "."');

      if (readable.length === 0) readable.push('ℹ️ No human-readable constraints could be parsed.');
    } catch {
      readable.push('⚠️ Could not parse regex constraints.');
    }

    return readable;
  };

  const generateErrorHints = (value, regex) => {
    let hints = [];

    const patternStr = regex.toString();

    if (/\[.*a-z.*\]/i.test(patternStr) && !/[a-zA-Z]/.test(value))
      hints.push('Should contain at least one letter (a–z, A–Z).');

    if (/\[.*0-9.*\]/.test(patternStr) && !/[0-9]/.test(value))
      hints.push('Should include at least one digit (0–9).');

    if (/\[.*[!@#$%^&*._%+-]+.*\]/.test(patternStr) && !/[!@#$%^&*._%+-]/.test(value))
      hints.push('Should include one of the special characters used.');

    if (patternStr.includes('@') && !/@/.test(value)) hints.push('Missing "@" symbol.');
    if (patternStr.includes('\\.') && !/\./.test(value)) hints.push('Missing dot "."');

    const quantMatch = patternStr.match(/\{(\d+),?(\d+)?\}/);
    if (quantMatch) {
      const [, min, max] = quantMatch;
      if (min && value.length < parseInt(min)) hints.push(`Input must be at least ${min} characters.`);
      if (max && value.length > parseInt(max)) hints.push(`Input must not exceed ${max} characters.`);
    }

    if (!regex.test(value)) hints.push('Input does not match the full pattern.');

    return hints.length ? hints.join('\n') : '';
  };

  const validateInput = (val, pattern = regexObj) => {
    if (!val.trim()) {
      if (isRequired) {
        setIsValid(false);
        setErrorMessage(`:This field is required.`);
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
    <div style={styles.container}>
      <h2>🎛️ Creator</h2>

      <label>Regex Pattern:</label>
      <input
        type="text"
        value={regexInput}
        onChange={(e) => setRegexInput(e.target.value)}
        style={styles.input}
        placeholder="Enter regex pattern"
      />

      <label>Input Label Text:</label>
      <input
        type="text"
        value={myLabel}
        onChange={(e) => setMyLabel(e.target.value)}
        style={styles.input}
        placeholder="Enter label text"
      />
      <label>Icon Before Label:</label>
      <input
        type="text"
        value={myIcon}
        onChange={(e) => setMyIcon(e.target.value)}
        style={styles.input}
        placeholder="e.g. ✉️"
      />
      <label>
      <input
        type="checkbox"
        checked={isRequired}
        onChange={(e) => setIsRequired(e.target.checked)}
        style={{ marginRight: 8 }}
      />
      Field is Required
    </label>
      <br></br>
      <label>Input Placeholder Text:</label>
      <input
        type="text"
        value={myPlaceholder}
        onChange={(e) => setMyPlaceholder(e.target.value)}
        style={styles.input}
        placeholder="Enter placeholder"
      />

      <label>Custom Constraint Hints (one per line):</label>
      <textarea
        value={customConstraintsText}
        onChange={(e) => setCustomConstraintsText(e.target.value)}
        rows={4}
        style={styles.textarea}
        placeholder="e.g. must be lowercase&#10;must include year"
      />

      <label>Label Info Hints (one per line):</label>
      <textarea
        value={labelHintsText}
        onChange={(e) => setLabelHintsText(e.target.value)}
        rows={4}
        style={styles.textarea}
        placeholder="e.g. This is my Test Hint&#10;Another Hint"
      />

<div style={styles.dividerContainer}>
  <div style={styles.dividerLine}></div>
  <span style={styles.dividerText}>✦</span>
  <div style={styles.dividerLine}></div>
</div>
      <h2>🧪 Preview</h2>

      <div style={styles.constraintHeader}>
      <span style={{ fontSize: '1.2em', marginRight: 6 }}>{myIcon}</span>
      <label style={{ marginRight: 8 }}>{myLabel}</label>
        <span style={styles.infoIcon} title={getLabelHints().join('\n')}>ℹ️</span>
        <label style={{ marginRight: 8 }}>
          {isRequired ? '*' : ''}:
        </label>
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
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#999',
            fontSize: '16px',
          }}
          title={[...getCustomConstraints(), ...parseConstraints(regexInput)].join('\n')}
        >
          ℹ️
        </span>
      </div>

      {errorMessage && (
        <div style={styles.errorBox}>
          {errorMessage.split('\n').map((line, idx) => (
            <div key={idx}>{myLabel} {line}</div>
          ))}
        </div>
      )}

      {isValid && <div style={styles.successBox}>✅ Input is valid!</div>}
    </div>
  );
};

const styles = {

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
