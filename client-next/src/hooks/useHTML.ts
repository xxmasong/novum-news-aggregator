 'use client';

import { useCallback, useState } from "react";

export function isHTMLString(input: string): boolean {
  const element = document.createElement('div');
  element.innerHTML = input;
  return element.childElementCount > 0;
}

export function validateAndCorrectHTMLString(input: string): string {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  const isValidHTML = Array.from(doc.body.childNodes).some(
    (node) => node.nodeType === Node.ELEMENT_NODE
  );

  if (isValidHTML) {
    return doc.documentElement.outerHTML;
  } else {
    const p = document.createElement('p');
    p.textContent = input;
    return p.outerHTML;
  }
}

export function capString(input: string, maxLength: number): string {
  const ellipsis = " ...";

  if ((input?.length > maxLength) 
    && (input?.length > (5 * maxLength / 4))) {
    const htmlTags = input?.match(/<[^>]+>/g) || [];
    const textContent = input?.replace(/<[^>]+>/g, "") || "";
    const cappedText = textContent.substring(0, maxLength - ellipsis.length);
    
    let result = cappedText + ellipsis;
    let i = 0;
    while (htmlTags && i < htmlTags.length) {
      result += htmlTags[i++];
    }

    return result;
  }

  return input;
}

export default function useHTML() {
  const [node, setNode] = useState<string>();

  const textToHTML = useCallback((input: string) => {
    if (isHTMLString(input)) {
      const correctedHTMLString = validateAndCorrectHTMLString(input);
      setNode(correctedHTMLString);
    } else {
      const p = document.createElement('p');
      p.textContent = input;
      setNode(p.outerHTML);
    }
  }, []);

  return [node, textToHTML] as [string, typeof textToHTML];
}
