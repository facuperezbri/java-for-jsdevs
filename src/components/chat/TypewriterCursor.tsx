export function TypewriterCursor() {
  return (
    <span
      className="inline-block w-0.5 h-4 ml-0.5 align-middle bg-current"
      style={{ animation: 'cursor-blink 1s step-end infinite' }}
      aria-hidden
    />
  );
}
