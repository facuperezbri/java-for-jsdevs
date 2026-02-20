import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CodeBlockProps {
  code: string;
  language: 'javascript' | 'java' | 'bash' | 'xml';
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        style={vscDarkPlus}
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
