/**
 * Fix mistaken :uno: prefixes and apply :uno: only to utility strings (class attrs + createVariants values).
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '../../src/features');

const COMPONENT_TAGS = new Set([
  'a',
  'button',
  'div',
  'span',
  'input',
  'label',
  'table',
  'thead',
  'tbody',
  'tr',
  'td',
  'th',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'li',
  'ol',
  'form',
  'select',
  'option',
  'textarea',
  'svg',
  'router-link',
  'nuxt-link',
  'component',
  'slot',
  'template',
]);

const shouldPrefixUtility = (value: string): boolean => {
  const trimmed = value.trim();
  if (trimmed === '' || trimmed.includes(':uno:')) {
    return false;
  }
  if (COMPONENT_TAGS.has(trimmed)) {
    return false;
  }
  if (/^(?:data-slot|aria-|slot=)/.test(trimmed)) {
    return false;
  }
  if (/^[A-Z][A-Za-z0-9]*$/.test(trimmed)) {
    return false;
  }
  if (trimmed.startsWith('./') || trimmed.startsWith('@/') || trimmed.startsWith('../')) {
    return false;
  }
  if (/^[\w@./:-]+$/.test(trimmed) && !trimmed.includes(' ') && !trimmed.startsWith('[')) {
    return false;
  }
  return (
    trimmed.includes(' ') ||
    trimmed.includes('-') ||
    trimmed.includes(':') ||
    trimmed.startsWith('i-') ||
    trimmed.startsWith('[') ||
    trimmed.startsWith('&')
  );
};

const prefixUtility = (value: string): string => {
  if (!shouldPrefixUtility(value)) {
    return value;
  }
  return `:uno: ${value.trim()}`;
};

const fixScriptSection = (code: string): string => {
  let next = code;

  next = next.replaceAll(/data-slot=":uno: ([^"]+)"/g, 'data-slot="$1"');

  next = next.replaceAll(
    /^(\s+[A-Za-z0-9_-]+:\s*)'([^']*)'/gm,
    (match: string, lead: string, value: string) => {
      const prefixed = prefixUtility(value);
      return prefixed === value ? match : `${lead}'${prefixed}'`;
    },
  );

  next = next.replaceAll(/\n(\s+)'([^']+)'/g, (match: string, indent: string, value: string) => {
    const prefixed = prefixUtility(value);
    return prefixed === value ? match : `\n${indent}'${prefixed}'`;
  });

  return next;
};

const fixTemplateSection = (template: string): string => {
  let next = template;

  next = next.replaceAll(
    /(^|[\s>])class="([^"]*)"/g,
    (_match: string, lead: string, cls: string) => `${lead}class="${prefixUtility(cls)}"`,
  );

  next = next.replaceAll(/\?\s*'([^']*)'/g, (match: string, value: string) => {
    const prefixed = prefixUtility(value);
    return prefixed === value ? match : `? '${prefixed}'`;
  });

  next = next.replaceAll(/:\s*'([^']*)'/g, (match: string, value: string) => {
    const prefixed = prefixUtility(value);
    return prefixed === value ? match : `: '${prefixed}'`;
  });

  next = next.replaceAll(/\{\s*'([^']+)':/g, (match: string, value: string) => {
    const prefixed = prefixUtility(value);
    return prefixed === value ? match : `{ '${prefixed}':`;
  });

  next = next.replaceAll(/:class="\['([^']+)'/g, (match: string, value: string) => {
    const prefixed = prefixUtility(value);
    return prefixed === value ? match : `:class="['${prefixed}'`;
  });

  return next;
};

const fixFile = (code: string, isVue: boolean): string => {
  if (!isVue) {
    return fixScriptSection(code);
  }

  const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/);
  if (templateMatch === null) {
    return fixScriptSection(code);
  }

  const fixedTemplate = fixTemplateSection(templateMatch[1] ?? '');
  let next = code.replace(templateMatch[0], `<template>${fixedTemplate}</template>`);

  const scriptMatch = next.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/);
  if (scriptMatch !== null) {
    const fixedScript = fixScriptSection(scriptMatch[1] ?? '');
    next = next.replace(scriptMatch[1] ?? '', fixedScript);
  }

  return next;
};

const walk = (dir: string): string[] => {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      files.push(...walk(path));
      continue;
    }
    if (!/\.(vue|ts)$/.test(entry) || /\.(test|stories|webc)\./.test(entry)) {
      continue;
    }
    files.push(path);
  }
  return files;
};

let changed = 0;
for (const file of walk(ROOT)) {
  const original = readFileSync(file, 'utf8');
  const next = fixFile(original, file.endsWith('.vue'));
  if (next !== original) {
    writeFileSync(file, next);
    changed += 1;
  }
}

process.stdout.write(`Fixed/prefixed ${changed} files\n`);
