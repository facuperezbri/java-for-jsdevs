'use client';

import { Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CodeBlockProps {
  code: string;
  language: 'javascript' | 'java' | 'bash' | 'xml';
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<React.ComponentType<{
    language: string;
    style: object;
    showLineNumbers?: boolean;
    customStyle?: object;
    codeTagProps?: object;
    children: React.ReactNode;
  }> | null>(null);
  const [style, setStyle] = useState<object>({});
  const { t } = useTranslation();

  useEffect(() => {
    Promise.all([
      import('react-syntax-highlighter').then((mod) => mod.Prism),
      import('react-syntax-highlighter/dist/cjs/styles/prism').then((mod) => mod.vscDarkPlus),
    ]).then(([Highlighter, vscDarkPlus]) => {
      setSyntaxHighlighter(() => Highlighter as React.ComponentType<{
        language: string;
        style: object;
        showLineNumbers?: boolean;
        customStyle?: object;
        codeTagProps?: object;
        children: React.ReactNode;
      }>);
      setStyle(vscDarkPlus);
    });
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!SyntaxHighlighter || Object.keys(style).length === 0) {
    return (
      <div className="relative rounded-lg overflow-hidden border border-border-subtle p-4" style={{ background: 'var(--color-code-bg)' }}>
        <pre className="text-sm font-mono text-[#d4d4d4] overflow-x-auto m-0">
          <code>{code.trim()}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border-subtle hover:border-border transition-colors">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-surface-3/80 text-text-secondary hover:text-text-primary hover:bg-surface-3 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
        aria-label={t('aria.copyCode', 'Copy code')}
      >
        {copied ? <Check size={13} className="text-module-green" /> : <Copy size={13} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={style}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'var(--color-code-bg)',
          fontSize: '0.8125rem',
          lineHeight: '1.6',
          fontFamily: "var(--font-jetbrains), 'Fira Code', monospace",
        }}
        codeTagProps={{ style: { fontFamily: 'inherit' } }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
