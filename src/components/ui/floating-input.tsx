"use client";

import { useState, useRef, useEffect } from "react";

interface FloatingInputProps {
  label: string;
  required?: boolean;
  isTextarea?: boolean;
  className?: string;
  id?: string;
  name?: string;
  type?: string;
  rows?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  [key: string]: unknown;
}

export default function FloatingInput({
  label,
  required = false,
  isTextarea = false,
  className = "",
  rows,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      setHasValue(input.value.length > 0);
    }
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const input = inputRef.current;
    if (input) {
      setHasValue(input.value.length > 0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const isFloating = isFocused || hasValue;

  const baseInputClasses =
    "w-full border-b border-white bg-transparent px-0 text-white placeholder:text-transparent focus:border-white focus:outline-none transition-colors";
  const inputPaddingClasses = "pt-5 pb-2";
  const textareaClasses = isTextarea ? "resize-none" : "";

  const inputElement = isTextarea ? (
    <textarea
      {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      rows={rows}
      className={`${baseInputClasses} ${inputPaddingClasses} ${textareaClasses} ${className}`}
    />
  ) : (
    <input
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      ref={inputRef as React.RefObject<HTMLInputElement>}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      className={`${baseInputClasses} ${inputPaddingClasses} ${className}`}
    />
  );

  return (
    <div className="relative">
      <label
        htmlFor={props.id}
        className={`pointer-events-none absolute left-0 text-white/50 transition-all duration-300 ${
          isFloating
            ? "-top-1 text-xs"
            : "top-2 text-base"
        }`}
      >
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      {inputElement}
    </div>
  );
}
