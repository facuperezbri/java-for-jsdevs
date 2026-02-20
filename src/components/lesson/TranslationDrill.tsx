'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CheckCircle2, XCircle, ArrowRightLeft } from 'lucide-react';
import type { TranslationDrill } from '../../types';
import { CodeBlock } from './CodeBlock';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface TranslationDrillExerciseProps {
  drill: TranslationDrill;
  index: number;
  isComplete: boolean;
  onComplete: (id: string) => void;
}

function DraggableToken({ id, label, disabled }: { id: string; label: string; disabled: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id, disabled });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      disabled={disabled}
      className={cn(
        'px-3 py-1.5 rounded-lg text-sm font-mono border transition-all select-none',
        isDragging && 'opacity-30',
        disabled
          ? 'bg-surface-2 text-text-muted border-border-subtle cursor-not-allowed'
          : 'bg-module-blue/10 text-module-blue border-module-blue/20 hover:bg-module-blue/15 cursor-grab active:cursor-grabbing shadow-sm'
      )}
    >
      {label}
    </button>
  );
}

function DroppableSlot({
  id,
  value,
  isCorrect,
  isWrong,
  submitted,
  onClick,
}: {
  id: string;
  value: string | null;
  isCorrect: boolean;
  isWrong: boolean;
  submitted: boolean;
  onClick: () => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <button
      ref={setNodeRef}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center min-w-[5rem] px-2 py-0.5 mx-1 rounded border text-sm font-mono transition-all',
        value
          ? submitted && isCorrect
            ? 'bg-module-green/10 border-module-green/30 text-module-green'
            : submitted && isWrong
              ? 'bg-module-red/10 border-module-red/30 text-module-red'
              : 'bg-module-blue/10 border-module-blue/20 text-module-blue hover:bg-module-blue/15 cursor-pointer'
          : isOver
            ? 'bg-module-blue/10 border-module-blue/30 border-dashed'
            : 'bg-surface-2 border-border border-dashed text-text-muted'
      )}
    >
      {value ?? '___'}
    </button>
  );
}

export function TranslationDrillExercise({ drill, index, isComplete, onComplete }: TranslationDrillExerciseProps) {
  const [slotValues, setSlotValues] = useState<Record<string, string | null>>(
    () => Object.fromEntries(drill.slots.map((s) => [s.id, null]))
  );
  const [usedTokens, setUsedTokens] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const { t } = useTranslation();

  const tokensWithIds = useMemo(
    () => drill.tokenBank.map((label, i) => ({ id: `${drill.id}-t${i}`, label })),
    [drill.id, drill.tokenBank]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const allCorrect = submitted && drill.slots.every((s) => results[s.id]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const tokenId = active.id as string;
    const slotId = over.id as string;

    // Must drop on a valid slot
    if (!drill.slots.find((s) => s.id === slotId)) return;

    // If slot already has a value, return it to the bank
    const existing = slotValues[slotId];
    if (existing) {
      setUsedTokens((prev) => {
        const next = new Set(prev);
        next.delete(existing);
        return next;
      });
    }

    // If token is already in a different slot, clear it from that slot
    setSlotValues((prev) => {
      const next = { ...prev };
      for (const [key, val] of Object.entries(next)) {
        if (val === tokenId) next[key] = null;
      }
      next[slotId] = tokenId;
      return next;
    });

    setUsedTokens((prev) => {
      const next = new Set(prev);
      next.add(tokenId);
      return next;
    });

    if (submitted) {
      setSubmitted(false);
      setResults({});
    }
  }, [drill.slots, slotValues, submitted]);

  // Click-to-place accessibility fallback
  function handleTokenClick(tokenId: string) {
    if (usedTokens.has(tokenId)) return;

    if (selectedToken === tokenId) {
      setSelectedToken(null);
      return;
    }

    // Find first empty slot
    const emptySlot = drill.slots.find((s) => !slotValues[s.id]);
    if (emptySlot) {
      setSlotValues((prev) => ({ ...prev, [emptySlot.id]: tokenId }));
      setUsedTokens((prev) => new Set([...prev, tokenId]));
      setSelectedToken(null);
      if (submitted) {
        setSubmitted(false);
        setResults({});
      }
    } else {
      setSelectedToken(tokenId);
    }
  }

  function handleSlotClick(slotId: string) {
    const val = slotValues[slotId];
    if (!val) {
      // If a token is selected, place it here
      if (selectedToken) {
        setSlotValues((prev) => ({ ...prev, [slotId]: selectedToken }));
        setUsedTokens((prev) => new Set([...prev, selectedToken]));
        setSelectedToken(null);
        if (submitted) {
          setSubmitted(false);
          setResults({});
        }
      }
      return;
    }
    // Return token to bank
    setSlotValues((prev) => ({ ...prev, [slotId]: null }));
    setUsedTokens((prev) => {
      const next = new Set(prev);
      next.delete(val);
      return next;
    });
    if (submitted) {
      setSubmitted(false);
      setResults({});
    }
  }

  function handleCheck() {
    const newResults: Record<string, boolean> = {};
    for (const slot of drill.slots) {
      const placedId = slotValues[slot.id];
      const placedLabel = placedId ? tokensWithIds.find((t) => t.id === placedId)?.label : null;
      newResults[slot.id] = placedLabel === slot.expected;
    }
    setResults(newResults);
    setSubmitted(true);

    if (drill.slots.every((s) => newResults[s.id])) {
      onComplete(drill.id);
    }
  }

  const done = isComplete || allCorrect;

  // Parse Java template and render with drop zones
  function renderTemplate() {
    const parts = drill.javaTemplate.split(/(___SLOT_\d+___)/g);
    return parts.map((part, i) => {
      const match = part.match(/___SLOT_(\d+)___/);
      if (match) {
        const slotIndex = parseInt(match[1], 10) - 1;
        const slot = drill.slots[slotIndex];
        if (!slot) return <span key={i}>{part}</span>;

        const rawVal = slotValues[slot.id];
        const finalValue = done ? slot.expected : (rawVal ? tokensWithIds.find((t) => t.id === rawVal)?.label ?? null : null);

        return (
          <DroppableSlot
            key={i}
            id={slot.id}
            value={finalValue}
            isCorrect={submitted && results[slot.id] === true}
            isWrong={submitted && results[slot.id] === false}
            submitted={submitted}
            onClick={() => !done && handleSlotClick(slot.id)}
          />
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  const allSlotsFilled = drill.slots.every((s) => slotValues[s.id]);

  return (
    <div
      className={cn(
        'rounded-xl border p-5 space-y-4 transition-all animate-fade-in',
        done
          ? 'bg-module-green/5 border-module-green/20 shadow-editorial'
          : 'bg-surface-1 border-border-subtle shadow-editorial'
      )}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-module-purple/10 border border-module-purple/20 flex items-center justify-center">
          <ArrowRightLeft size={14} className="text-module-purple" />
        </div>
        <div>
          <div className="text-xs text-text-tertiary mb-1 uppercase tracking-wider font-medium">{t('drill.title', 'Translation Drill')} {index + 1}</div>
          <p className="text-sm text-text-primary">{t('drill.subtitle', 'Translate the JavaScript code to Java by dragging tokens into the correct slots.')}</p>
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* JS side */}
          <div className="rounded-xl border border-border-subtle overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-js-muted border-b border-js/20">
              <span className="w-2 h-2 rounded-full bg-js" />
              <span className="text-xs font-semibold text-js-dark uppercase tracking-wider">{t('codeLabels.javascript', 'JavaScript')}</span>
            </div>
            <CodeBlock code={drill.jsCode} language="javascript" />
          </div>

          {/* Java side with drop zones */}
          <div className="rounded-xl border border-border-subtle overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-java-glow border-b border-java/20">
              <span className="w-2 h-2 rounded-full bg-java" />
              <span className="text-xs font-semibold text-java uppercase tracking-wider">{t('codeLabels.java', 'Java')}</span>
            </div>
            <div className="overflow-x-auto">
              <pre
                className="p-4 text-sm leading-relaxed whitespace-pre-wrap"
                style={{
                  background: 'var(--color-code-bg)',
                  fontFamily: "var(--font-jetbrains), 'Fira Code', monospace",
                  color: '#d4d4d4',
                }}
              >
                {renderTemplate()}
              </pre>
            </div>
          </div>
        </div>

        {/* Token bank */}
        {!done && (
          <div className="space-y-2">
            <p className="text-xs text-text-tertiary font-medium">{t('drill.tokenBank', 'Token Bank — drag or click to place:')}</p>
            <div className="flex flex-wrap gap-2">
              {tokensWithIds.map((t) => (
                <div
                  key={t.id}
                  onClick={() => !usedTokens.has(t.id) && handleTokenClick(t.id)}
                >
                  <DraggableToken
                    id={t.id}
                    label={t.label}
                    disabled={usedTokens.has(t.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <DragOverlay>
          {activeId ? (
            <div className="px-3 py-1.5 rounded-lg text-sm font-mono bg-module-blue/15 text-module-blue border border-module-blue/30 shadow-editorial-lg">
              {tokensWithIds.find((t) => t.id === activeId)?.label ?? activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {!done && (
        <div className="flex justify-end">
          <Button size="sm" onClick={handleCheck} disabled={!allSlotsFilled}>
            {t('common.check', 'Check')}
          </Button>
        </div>
      )}

      {submitted && !allCorrect && !done && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-module-red/5 border border-module-red/20 animate-fade-in">
          <XCircle size={14} className="text-module-red flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary">{t('drill.incorrect', 'Some slots are incorrect. Click wrong tokens to return them and try again.')}</p>
        </div>
      )}

      {done && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-module-green/5 border border-module-green/20 animate-fade-in">
          <CheckCircle2 size={14} className="text-module-green flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary leading-relaxed">{drill.explanation}</p>
        </div>
      )}
    </div>
  );
}
