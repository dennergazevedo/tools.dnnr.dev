export type RegexToken = {
  type: string;
  value: string;
  description: string;
};

export function explainRegex(regexString: string): RegexToken[] {
  const tokens: RegexToken[] = [];
  let i = 0;

  while (i < regexString.length) {
    const char = regexString[i];
    
    // Anchors
    if (char === '^') {
      tokens.push({ type: 'Anchor', value: '^', description: 'Asserts position at the start of a line/string.' });
      i++;
      continue;
    }
    if (char === '$') {
      tokens.push({ type: 'Anchor', value: '$', description: 'Asserts position at the end of a line/string.' });
      i++;
      continue;
    }

    // Escaped characters and shorthands
    if (char === '\\') {
      const nextChar = regexString[i + 1];
      if (nextChar) {
        let desc = `Escaped character: \\${nextChar}`;
        switch (nextChar) {
          case 'd': desc = 'Matches any digit (equivalent to [0-9]).'; break;
          case 'D': desc = 'Matches any non-digit.'; break;
          case 'w': desc = 'Matches any word character (alphanumeric & underscore).'; break;
          case 'W': desc = 'Matches any non-word character.'; break;
          case 's': desc = 'Matches any whitespace character (spaces, tabs, line breaks).'; break;
          case 'S': desc = 'Matches any non-whitespace character.'; break;
          case 'b': desc = 'Asserts position at a word boundary.'; break;
          case 'B': desc = 'Asserts position not at a word boundary.'; break;
        }
        tokens.push({ type: 'Escaped/Shorthand', value: `\\${nextChar}`, description: desc });
      } else {
        tokens.push({ type: 'Literal', value: '\\', description: 'Literal backslash' });
      }
      i += 2;
      continue;
    }

    // Quantifiers
    if (char === '*') {
      tokens.push({ type: 'Quantifier', value: '*', description: 'Matches between zero and unlimited times, as many times as possible.' });
      i++;
      continue;
    }
    if (char === '+') {
      tokens.push({ type: 'Quantifier', value: '+', description: 'Matches between one and unlimited times, as many times as possible.' });
      i++;
      continue;
    }
    if (char === '?') {
      tokens.push({ type: 'Quantifier', value: '?', description: 'Matches zero or one time.' });
      i++;
      continue;
    }
    if (char === '{') {
      const closingBracketIndex = regexString.indexOf('}', i);
      if (closingBracketIndex !== -1) {
        const value = regexString.slice(i, closingBracketIndex + 1);
        const inner = value.slice(1, -1);
        const parts = inner.split(',');
        let desc = '';
        if (parts.length === 1) {
          desc = `Matches exactly ${parts[0]} times.`;
        } else if (parts.length === 2) {
          if (parts[1] === '') {
            desc = `Matches ${parts[0]} or more times.`;
          } else {
            desc = `Matches between ${parts[0]} and ${parts[1]} times.`;
          }
        } else {
          desc = 'Custom quantifier.';
        }
        tokens.push({ type: 'Quantifier', value, description: desc });
        i = closingBracketIndex + 1;
        continue;
      }
    }

    // Character Classes
    if (char === '[') {
      const closingBraceIndex = regexString.indexOf(']', i);
      if (closingBraceIndex !== -1) {
        const value = regexString.slice(i, closingBraceIndex + 1);
        const inverted = value.startsWith('[^');
        let desc = inverted ? 'Matches any character NOT in the list:' : 'Matches any single character in the list:';
        
        let inner = inverted ? value.slice(2, -1) : value.slice(1, -1);
        const ranges = [];
        const chars = [];
        
        // rudimentary parsing of ranges
        for (let j = 0; j < inner.length; j++) {
           if (inner[j+1] === '-' && j+2 < inner.length) {
             ranges.push(`${inner[j]} to ${inner[j+2]}`);
             j += 2;
           } else {
             chars.push(inner[j]);
           }
        }
        
        if (ranges.length > 0) desc += ` Ranges (${ranges.join(', ')}).`;
        if (chars.length > 0) desc += ` Chars (${chars.join('')}).`;

        tokens.push({ type: 'Character Class', value, description: desc.trim() });
        i = closingBraceIndex + 1;
        continue;
      }
    }

    // Groups
    if (char === '(') {
       // Lookarounds and non-capturing
       let isCapturing = true;
       let groupType = 'Capturing Group';
       let length = 1;
       
       if (regexString.substring(i, i+3) === '(?:') {
         isCapturing = false;
         groupType = 'Non-capturing Group';
         length = 3;
       } else if (regexString.substring(i, i+3) === '(?=') {
         isCapturing = false;
         groupType = 'Positive Lookahead';
         length = 3;
       } else if (regexString.substring(i, i+3) === '(?!') {
         isCapturing = false;
         groupType = 'Negative Lookahead';
         length = 3;
       } else if (regexString.substring(i, i+4) === '(?<=') {
         isCapturing = false;
         groupType = 'Positive Lookbehind';
         length = 4;
       } else if (regexString.substring(i, i+4) === '(?<!') {
         isCapturing = false;
         groupType = 'Negative Lookbehind';
         length = 4;
       }

       tokens.push({ 
         type: 'Group Start', 
         value: regexString.substring(i, i+length), 
         description: `Starts a ${groupType.toLowerCase()}.`
       });
       i += length;
       continue;
    }
    
    if (char === ')') {
      tokens.push({ type: 'Group End', value: ')', description: 'Ends a group.' });
      i++;
      continue;
    }

    if (char === '|') {
       tokens.push({ type: 'Alternation', value: '|', description: 'Acts like a boolean OR. Matches the expression before or after the |.' });
       i++;
       continue;
    }
    
    if (char === '.') {
      tokens.push({ type: 'Dot', value: '.', description: 'Matches any single character except line terminators.' });
      i++;
      continue;
    }

    // Literal
    tokens.push({ type: 'Literal', value: char, description: `Matches the literal character "${char}".` });
    i++;
  }

  // Combine adjacent literals for a cleaner output
  const combinedTokens: RegexToken[] = [];
  for (const token of tokens) {
    if (token.type === 'Literal' && combinedTokens.length > 0 && combinedTokens[combinedTokens.length - 1].type === 'Literal') {
      const lastToken = combinedTokens[combinedTokens.length - 1];
      lastToken.value += token.value;
      lastToken.description = `Matches the literal string "${lastToken.value}".`;
    } else {
      combinedTokens.push(token);
    }
  }

  return combinedTokens;
}
