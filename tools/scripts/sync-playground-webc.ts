/**
 * Generates missing *.webc.ts wrappers for playground composition
 * and regenerates playground/webc-loader.ts import list.
 */
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const FEATURES = join(ROOT, 'src/features');

const COMPONENT_IMPORTS: Array<{ name: string; from: string; file: string }> = [
  {
    name: 'CommandEmpty',
    from: '@/features/command',
    file: 'command/components/Command/CommandEmpty.vue',
  },
  {
    name: 'CommandGroup',
    from: '@/features/command',
    file: 'command/components/Command/CommandGroup.vue',
  },
  {
    name: 'CommandInput',
    from: '@/features/command',
    file: 'command/components/Command/CommandInput.vue',
  },
  {
    name: 'CommandItem',
    from: '@/features/command',
    file: 'command/components/Command/CommandItem.vue',
  },
  {
    name: 'CommandList',
    from: '@/features/command',
    file: 'command/components/Command/CommandList.vue',
  },
  {
    name: 'CommandShortcut',
    from: '@/features/command',
    file: 'command/components/Command/CommandShortcut.vue',
  },
  {
    name: 'AvatarFallback',
    from: '@/features/data-display',
    file: 'data-display/components/Avatar/AvatarFallback.vue',
  },
  {
    name: 'AvatarImage',
    from: '@/features/data-display',
    file: 'data-display/components/Avatar/AvatarImage.vue',
  },
  {
    name: 'CardContent',
    from: '@/features/data-display',
    file: 'data-display/components/Card/CardContent.vue',
  },
  {
    name: 'CardDescription',
    from: '@/features/data-display',
    file: 'data-display/components/Card/CardDescription.vue',
  },
  {
    name: 'CardHeader',
    from: '@/features/data-display',
    file: 'data-display/components/Card/CardHeader.vue',
  },
  {
    name: 'CardTitle',
    from: '@/features/data-display',
    file: 'data-display/components/Card/CardTitle.vue',
  },
  {
    name: 'EmptyContent',
    from: '@/features/data-display',
    file: 'data-display/components/Empty/EmptyContent.vue',
  },
  {
    name: 'EmptyDescription',
    from: '@/features/data-display',
    file: 'data-display/components/Empty/EmptyDescription.vue',
  },
  {
    name: 'EmptyIcon',
    from: '@/features/data-display',
    file: 'data-display/components/Empty/EmptyIcon.vue',
  },
  {
    name: 'EmptyTitle',
    from: '@/features/data-display',
    file: 'data-display/components/Empty/EmptyTitle.vue',
  },
  {
    name: 'TableBody',
    from: '@/features/data-display',
    file: 'data-display/components/Table/TableBody.vue',
  },
  {
    name: 'TableCaption',
    from: '@/features/data-display',
    file: 'data-display/components/Table/TableCaption.vue',
  },
  {
    name: 'TableCell',
    from: '@/features/data-display',
    file: 'data-display/components/Table/TableCell.vue',
  },
  {
    name: 'TableHead',
    from: '@/features/data-display',
    file: 'data-display/components/Table/TableHead.vue',
  },
  {
    name: 'TableHeader',
    from: '@/features/data-display',
    file: 'data-display/components/Table/TableHeader.vue',
  },
  {
    name: 'TableRow',
    from: '@/features/data-display',
    file: 'data-display/components/Table/TableRow.vue',
  },
  {
    name: 'AlertDescription',
    from: '@/features/feedback',
    file: 'feedback/components/Alert/AlertDescription.vue',
  },
  {
    name: 'AlertTitle',
    from: '@/features/feedback',
    file: 'feedback/components/Alert/AlertTitle.vue',
  },
  {
    name: 'DialogBody',
    from: '@/features/feedback',
    file: 'feedback/components/Dialog/DialogBody.vue',
  },
  {
    name: 'DialogContent',
    from: '@/features/feedback',
    file: 'feedback/components/Dialog/DialogContent.vue',
  },
  {
    name: 'DialogDescription',
    from: '@/features/feedback',
    file: 'feedback/components/Dialog/DialogDescription.vue',
  },
  {
    name: 'DialogFooter',
    from: '@/features/feedback',
    file: 'feedback/components/Dialog/DialogFooter.vue',
  },
  {
    name: 'DialogHeader',
    from: '@/features/feedback',
    file: 'feedback/components/Dialog/DialogHeader.vue',
  },
  {
    name: 'DialogTitle',
    from: '@/features/feedback',
    file: 'feedback/components/Dialog/DialogTitle.vue',
  },
  {
    name: 'DialogTrigger',
    from: '@/features/feedback',
    file: 'feedback/components/Dialog/DialogTrigger.vue',
  },
  {
    name: 'DrawerClose',
    from: '@/features/feedback',
    file: 'feedback/components/Drawer/DrawerClose.vue',
  },
  {
    name: 'DrawerContent',
    from: '@/features/feedback',
    file: 'feedback/components/Drawer/DrawerContent.vue',
  },
  {
    name: 'DrawerDescription',
    from: '@/features/feedback',
    file: 'feedback/components/Drawer/DrawerDescription.vue',
  },
  {
    name: 'DrawerFooter',
    from: '@/features/feedback',
    file: 'feedback/components/Drawer/DrawerFooter.vue',
  },
  {
    name: 'DrawerHeader',
    from: '@/features/feedback',
    file: 'feedback/components/Drawer/DrawerHeader.vue',
  },
  {
    name: 'DrawerTitle',
    from: '@/features/feedback',
    file: 'feedback/components/Drawer/DrawerTitle.vue',
  },
  {
    name: 'DrawerTrigger',
    from: '@/features/feedback',
    file: 'feedback/components/Drawer/DrawerTrigger.vue',
  },
  {
    name: 'PopoverContent',
    from: '@/features/feedback',
    file: 'feedback/components/Popover/PopoverContent.vue',
  },
  {
    name: 'PopoverDescription',
    from: '@/features/feedback',
    file: 'feedback/components/Popover/PopoverDescription.vue',
  },
  {
    name: 'PopoverHeader',
    from: '@/features/feedback',
    file: 'feedback/components/Popover/PopoverHeader.vue',
  },
  {
    name: 'PopoverTitle',
    from: '@/features/feedback',
    file: 'feedback/components/Popover/PopoverTitle.vue',
  },
  {
    name: 'PopoverTrigger',
    from: '@/features/feedback',
    file: 'feedback/components/Popover/PopoverTrigger.vue',
  },
  {
    name: 'TooltipContent',
    from: '@/features/feedback',
    file: 'feedback/components/Tooltip/TooltipContent.vue',
  },
  {
    name: 'TooltipProvider',
    from: '@/features/feedback',
    file: 'feedback/components/Tooltip/TooltipProvider.vue',
  },
  {
    name: 'TooltipTrigger',
    from: '@/features/feedback',
    file: 'feedback/components/Tooltip/TooltipTrigger.vue',
  },
  {
    name: 'FieldDescription',
    from: '@/features/forms',
    file: 'forms/components/Field/FieldDescription.vue',
  },
  { name: 'FieldError', from: '@/features/forms', file: 'forms/components/Field/FieldError.vue' },
  { name: 'FieldLabel', from: '@/features/forms', file: 'forms/components/Field/FieldLabel.vue' },
  {
    name: 'SelectContent',
    from: '@/features/forms',
    file: 'forms/components/Select/SelectContent.vue',
  },
  {
    name: 'SelectGroup',
    from: '@/features/forms',
    file: 'forms/components/Select/SelectGroup.vue',
  },
  { name: 'SelectItem', from: '@/features/forms', file: 'forms/components/Select/SelectItem.vue' },
  {
    name: 'SelectLabel',
    from: '@/features/forms',
    file: 'forms/components/Select/SelectLabel.vue',
  },
  {
    name: 'SelectSeparator',
    from: '@/features/forms',
    file: 'forms/components/Select/SelectSeparator.vue',
  },
  {
    name: 'SelectTrigger',
    from: '@/features/forms',
    file: 'forms/components/Select/SelectTrigger.vue',
  },
  {
    name: 'SelectValue',
    from: '@/features/forms',
    file: 'forms/components/Select/SelectValue.vue',
  },
  {
    name: 'CarouselContent',
    from: '@/features/media',
    file: 'media/components/Carousel/CarouselContent.vue',
  },
  {
    name: 'CarouselItem',
    from: '@/features/media',
    file: 'media/components/Carousel/CarouselItem.vue',
  },
  {
    name: 'CarouselNext',
    from: '@/features/media',
    file: 'media/components/Carousel/CarouselNext.vue',
  },
  {
    name: 'CarouselPrevious',
    from: '@/features/media',
    file: 'media/components/Carousel/CarouselPrevious.vue',
  },
  {
    name: 'AccordionContent',
    from: '@/features/navigation',
    file: 'navigation/components/Accordion/AccordionContent.vue',
  },
  {
    name: 'AccordionHeader',
    from: '@/features/navigation',
    file: 'navigation/components/Accordion/AccordionHeader.vue',
  },
  {
    name: 'AccordionItem',
    from: '@/features/navigation',
    file: 'navigation/components/Accordion/AccordionItem.vue',
  },
  {
    name: 'TabsContent',
    from: '@/features/navigation',
    file: 'navigation/components/Tabs/TabsContent.vue',
  },
  {
    name: 'TabsList',
    from: '@/features/navigation',
    file: 'navigation/components/Tabs/TabsList.vue',
  },
  {
    name: 'TabsTrigger',
    from: '@/features/navigation',
    file: 'navigation/components/Tabs/TabsTrigger.vue',
  },
  {
    name: 'BreadcrumbItem',
    from: '@/features/navigation',
    file: 'navigation/components/Breadcrumb/BreadcrumbItem.vue',
  },
  {
    name: 'BreadcrumbLink',
    from: '@/features/navigation',
    file: 'navigation/components/Breadcrumb/BreadcrumbLink.vue',
  },
  {
    name: 'BreadcrumbList',
    from: '@/features/navigation',
    file: 'navigation/components/Breadcrumb/BreadcrumbList.vue',
  },
  {
    name: 'BreadcrumbPage',
    from: '@/features/navigation',
    file: 'navigation/components/Breadcrumb/BreadcrumbPage.vue',
  },
  {
    name: 'BreadcrumbSeparator',
    from: '@/features/navigation',
    file: 'navigation/components/Breadcrumb/BreadcrumbSeparator.vue',
  },
  {
    name: 'ContextMenuContent',
    from: '@/features/navigation',
    file: 'navigation/components/ContextMenu/ContextMenuContent.vue',
  },
  {
    name: 'ContextMenuItem',
    from: '@/features/navigation',
    file: 'navigation/components/ContextMenu/ContextMenuItem.vue',
  },
  {
    name: 'ContextMenuLabel',
    from: '@/features/navigation',
    file: 'navigation/components/ContextMenu/ContextMenuLabel.vue',
  },
  {
    name: 'ContextMenuSeparator',
    from: '@/features/navigation',
    file: 'navigation/components/ContextMenu/ContextMenuSeparator.vue',
  },
  {
    name: 'ContextMenuTrigger',
    from: '@/features/navigation',
    file: 'navigation/components/ContextMenu/ContextMenuTrigger.vue',
  },
  {
    name: 'MenuContent',
    from: '@/features/navigation',
    file: 'navigation/components/Menu/MenuContent.vue',
  },
  {
    name: 'MenuItem',
    from: '@/features/navigation',
    file: 'navigation/components/Menu/MenuItem.vue',
  },
  {
    name: 'MenuTrigger',
    from: '@/features/navigation',
    file: 'navigation/components/Menu/MenuTrigger.vue',
  },
];

const toKebab = (name: string): string =>
  name
    .replaceAll(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');

let created = 0;
for (const { name, from, file } of COMPONENT_IMPORTS) {
  const vuePath = join(FEATURES, file);
  const webcPath = vuePath.replace('.vue', '.webc.ts');
  if (existsSync(webcPath)) continue;
  const tag = toKebab(name);
  const body = `import { ${name} } from '${from}';\nimport { defineVetroElement } from '@/features/shared/lib/utils/define-webc.util';\n\ndefineVetroElement('${tag}', ${name});\n`;
  writeFileSync(webcPath, body);
  created += 1;
}

const walkWebc = (dir: string): string[] => {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walkWebc(full));
    else if (entry.endsWith('.webc.ts')) files.push(full);
  }
  return files;
};

const bundleList = walkWebc(FEATURES).map((file) => {
  const base = file.split('/').pop()?.replace('.webc.ts', '') ?? '';
  return toKebab(base);
});
bundleList.sort((a, b) => a.localeCompare(b));
const bundles = bundleList;

const loaderImports = bundles.map((b) => `import '../dist/webc/${b}.js';`).join('\n');

const loader = `${loaderImports}
`;

writeFileSync(join(ROOT, 'playground/webc-loader.ts'), loader);

process.stdout.write(`Created ${created} webc wrappers; ${bundles.length} bundles in loader\n`);
