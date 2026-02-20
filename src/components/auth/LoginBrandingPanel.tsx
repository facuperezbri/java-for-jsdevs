'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../lib/motion';
import { Badge } from '../ui/Badge';

export function LoginBrandingPanel() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-12 py-16">
      {/* Atmospheric blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-java/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-js/5 blur-3xl" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-lg"
      >
        {/* Headline */}
        <motion.h1
          variants={staggerItem}
          className="font-display text-display-xl font-bold text-text-primary"
        >
          Think in Java, build like a pro.
        </motion.h1>

        {/* Decorative gradient rule */}
        <motion.div
          variants={staggerItem}
          className="mt-6 h-0.5 w-20 rounded-full bg-gradient-to-r from-java to-js/40"
        />

        {/* Subtitle */}
        <motion.p
          variants={staggerItem}
          className="mt-6 text-base leading-relaxed text-text-secondary"
        >
          Master Java by building on what you already know from JavaScript.
          Every concept, side by side.
        </motion.p>

        {/* Module badges */}
        <motion.div variants={staggerItem} className="mt-6 flex flex-wrap gap-2">
          <Badge variant="blue" size="sm">Types &amp; Syntax</Badge>
          <Badge variant="purple" size="sm">OOP</Badge>
          <Badge variant="green" size="sm">Collections</Badge>
          <Badge variant="red" size="sm">Error Handling</Badge>
        </motion.div>

        {/* Decorative code preview */}
        <motion.div
          variants={staggerItem}
          className="mt-10 grid grid-cols-2 gap-3 opacity-60"
        >
          {/* JavaScript side */}
          <div className="overflow-hidden rounded-xl border border-border-subtle">
            <div className="flex items-center gap-2 border-b border-js/20 bg-js-muted px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-js" />
              <span className="text-xs font-semibold uppercase tracking-wider text-js-dark">
                JavaScript
              </span>
            </div>
            <div className="bg-code-bg p-3 font-mono text-xs leading-relaxed text-text-secondary">
              <div>
                <span className="text-module-purple">const</span>{' '}
                <span className="text-module-blue">greet</span>{' '}
                <span className="text-text-muted">=</span>{' '}
                <span className="text-text-muted">(</span>
                <span className="text-text-primary">name</span>
                <span className="text-text-muted">)</span>{' '}
                <span className="text-module-purple">=&gt;</span>{' '}
                <span className="text-text-muted">{'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-module-purple">return</span>{' '}
                <span className="text-module-green">{`\`Hello, \${`}</span>
                <span className="text-text-primary">name</span>
                <span className="text-module-green">{`}\``}</span>
                <span className="text-text-muted">;</span>
              </div>
              <div>
                <span className="text-text-muted">{'}'}</span>
                <span className="text-text-muted">;</span>
              </div>
            </div>
          </div>

          {/* Java side */}
          <div className="overflow-hidden rounded-xl border border-border-subtle">
            <div className="flex items-center gap-2 border-b border-java/20 bg-java-glow px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-java" />
              <span className="text-xs font-semibold uppercase tracking-wider text-java">
                Java
              </span>
            </div>
            <div className="bg-code-bg p-3 font-mono text-xs leading-relaxed text-text-secondary">
              <div>
                <span className="text-module-purple">String</span>{' '}
                <span className="text-module-blue">greet</span>
                <span className="text-text-muted">(</span>
                <span className="text-module-purple">String</span>{' '}
                <span className="text-text-primary">name</span>
                <span className="text-text-muted">)</span>{' '}
                <span className="text-text-muted">{'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-module-purple">return</span>{' '}
                <span className="text-module-green">&quot;Hello, &quot;</span>{' '}
                <span className="text-text-muted">+</span>{' '}
                <span className="text-text-primary">name</span>
                <span className="text-text-muted">;</span>
              </div>
              <div>
                <span className="text-text-muted">{'}'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
