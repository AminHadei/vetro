<script setup lang="ts">
  import { ref, useTemplateRef, watch } from 'vue';

  import BrandedHeroLayout from './modal-layouts/BrandedHeroLayout.vue';
import ConfirmLayout from './modal-layouts/ConfirmLayout.vue';
import DrawerLayout from './modal-layouts/DrawerLayout.vue';
import { Button, IconButton, PrimaryButton } from '@/features/buttons';
import { AreaChart, BarChart, LineChart, PieChart } from '@/features/charts';
import {
  Command,
  CommandDialog,
  CommandDisplay,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/features/command';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BaseBadge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  Loader,
  Progress,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Countdown,
} from '@/features/data-display';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  BaseDialog,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Modal,
  createTypedModal,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Toaster,
  toast,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/features/feedback';
import type { ModalClasses } from '@/features/feedback';
import {
  Calendar,
  Checkbox,
  CheckInput,
  DateInput,
  DatePicker,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  InputNumber,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  BaseDropdown,
  CountryDropdown,
  PhoneNumberInput,
} from '@/features/forms';
import type { BaseDropdownItem } from '@/features/forms';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/features/media';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TableOfContents,
} from '@/features/navigation';

  const { playgroundTitle = 'Vetro UI — Playground' } = defineProps<{
    playgroundTitle?: string;
  }>();

  const theme = ref<'' | 'theme-purple' | 'theme-lime' | 'theme-red' | 'theme-green'>('');
  const dark = ref(false);

  const themeClassNames = ['theme-purple', 'theme-lime', 'theme-red', 'theme-green'] as const;

  watch(
    [theme, dark],
    () => {
      const root = document.documentElement;
      for (const className of themeClassNames) {
        root.classList.remove(className);
      }
      root.classList.remove('dark');
      if (theme.value !== '') {
        root.classList.add(theme.value);
      }
      if (dark.value) {
        root.classList.add('dark');
      }
    },
    { immediate: true },
  );

  const clicks = ref(0);
  const progress = ref(60);
  const dialogOpen = ref(false);
  const baseDialogOpen = ref(false);
  const drawerOpen = ref(false);
  const fruit = ref('');
  const date = ref<Date | undefined>(new Date());
  const commandDialogOpen = ref(false);
  const inputValue = ref('');
  const textareaValue = ref('');
  const checked = ref(false);
  const checkInputChecked = ref(false);
  const switched = ref(false);
  const sliderValue = ref(50);
  const radioValue = ref('a');
  const toggleOn = ref(false);
  const toggleGroup = ref<string[]>([]);
  const ConfirmModal = createTypedModal(ConfirmLayout);
  const defaultModalRef = useTemplateRef('defaultModal');
  const fullscreenOpen = ref(false);
  const bottomSheetOpen = ref(false);
  const persistentOpen = ref(false);
  const persistentTriedToClose = ref(0);
  const themedOpen = ref(false);
  const stackedOuter = ref(false);
  const stackedInner = ref(false);
  const heroOpen = ref(false);
  const modalDrawerOpen = ref(false);
  const confirmOpen = ref(false);
  const lastConfirmAction = ref('');

  const themedClasses: ModalClasses = {
    backdrop: 'bg-black/60 backdrop-blur-md',
    body: 'border-border border-2 bg-card',
    header: 'bg-muted',
  };

  const datePickerValue = ref<Date | undefined>();
  const dateInputValue = ref<Date | null>(null);
  const inputNumberValue = ref<string | null>(null);
  const dropdownItem = ref<BaseDropdownItem | null>(null);
  const countryCode = ref<string | null>('us');
  const phoneNumber = ref('');
  const countdownStart = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();

  const dropdownItems: BaseDropdownItem[] = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Settings' },
    { id: 3, label: 'Logout' },
  ];

  const chartData = [
    { month: 'Jan', desktop: 186, mobile: 80 },
    { month: 'Feb', desktop: 305, mobile: 200 },
    { month: 'Mar', desktop: 237, mobile: 120 },
    { month: 'Apr', desktop: 73, mobile: 190 },
  ];

  const pieData = [
    { name: 'Chrome', value: 275 },
    { name: 'Safari', value: 200 },
    { name: 'Firefox', value: 187 },
  ];

  const tocItems = [
    { id: 'intro', title: 'Introduction', depth: 1 },
    { id: 'setup', title: 'Setup', depth: 2 },
    { id: 'usage', title: 'Usage', depth: 2 },
  ];

  const notify = (): void => {
    toast('Event created', { description: 'Your changes have been saved.' });
  };
</script>

<template>
  <div class="playground-shell">
    <main class="playground-main">
      <header class="playground-header">
        <h1>{{ playgroundTitle }}</h1>
        <p>Neo-brutalist Vue components, ported from RetroUI.</p>
      </header>

      <section class="playground-theme">
        <label>Theme:</label>
        <select
          v-model="theme"
          class="border-border bg-input border-2 px-2 py-1"
        >
          <option value="">Default</option>
          <option value="theme-purple">Purple</option>
          <option value="theme-lime">Lime</option>
          <option value="theme-red">Red</option>
          <option value="theme-green">Green</option>
        </select>
        <label class="playground-row">
          <input
            v-model="dark"
            type="checkbox"
          />
          Dark
        </label>
      </section>

      <section class="playground-section">
        <h2>Button &amp; PrimaryButton</h2>
        <h3 class="m-0 text-base font-semibold text-neutral-800">PrimaryButton</h3>
        <div class="playground-row">
          <PrimaryButton @click="clicks++">Primary</PrimaryButton>
          <PrimaryButton variant="outline">Outline</PrimaryButton>
          <PrimaryButton variant="text">Text</PrimaryButton>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </div>
        <h3 class="m-0 text-base font-semibold text-neutral-800">Button</h3>
        <div class="playground-row">
          <Button @click="clicks++">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="link">Link</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div class="playground-row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <p class="playground-muted">Clicked {{ clicks }} times</p>
      </section>

      <section class="playground-section">
        <h2>Icon Button</h2>
        <div class="playground-row">
          <IconButton variant="primary"><span class="i-search size-5" /></IconButton>
          <IconButton variant="outline"><span class="i-search size-5" /></IconButton>
          <IconButton variant="link"><span class="i-search size-5" /></IconButton>
          <IconButton disabled><span class="i-search size-5" /></IconButton>
        </div>
      </section>

      <section class="playground-section">
        <h2>Typography</h2>
        <Text as="h3">A neo-brutalist heading</Text>
        <Text as="p">Body copy rendered through the polymorphic Text component.</Text>
      </section>

      <section class="playground-section">
        <h2>Badge &amp; BaseBadge</h2>
        <h3 class="m-0 text-sm font-semibold">Badge</h3>
        <div class="playground-row">
          <Badge>Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="solid">Solid</Badge>
          <Badge variant="surface">Surface</Badge>
        </div>
        <h3 class="m-0 text-sm font-semibold">BaseBadge</h3>
        <div class="playground-row">
          <BaseBadge>Default</BaseBadge>
          <BaseBadge color="green">Success</BaseBadge>
          <BaseBadge color="red">Error</BaseBadge>
        </div>
      </section>

      <section class="playground-section">
        <h2>Card &amp; Avatar</h2>
        <div class="flex flex-wrap items-start gap-6">
          <Card class="max-w-xs">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>A short description for the card.</CardDescription>
            </CardHeader>
            <CardContent>Any content can live inside the card body.</CardContent>
          </Card>
          <div class="px-6">
            <Avatar>
              <AvatarImage
                src="https://i.pravatar.cc/150?img=12"
                alt="Avatar"
              />
              <AvatarFallback>VT</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>

      <section class="playground-section">
        <h2>Progress &amp; Loader</h2>
        <div class="flex max-w-md flex-col gap-4">
          <Progress :value="progress" />
          <input
            v-model.number="progress"
            type="range"
            min="0"
            max="100"
          />
          <div class="flex items-center justify-between">
            <Loader size="sm" />
            <Loader size="md" />
            <Loader
              size="lg"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <section class="playground-section">
        <h2>Empty</h2>
        <Empty class="max-w-sm">
          <EmptyContent>
            <EmptyIcon />
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>Try adjusting your filters or search terms.</EmptyDescription>
          </EmptyContent>
        </Empty>
      </section>

      <section class="playground-section">
        <h2>Alert</h2>
        <div class="flex max-w-md flex-col gap-3">
          <Alert status="info">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>An informational message.</AlertDescription>
          </Alert>
          <Alert status="error">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
          <Alert status="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes were saved.</AlertDescription>
          </Alert>
          <Alert status="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Please review before continuing.</AlertDescription>
          </Alert>
        </div>
      </section>

      <section class="playground-section">
        <h2>Overlays (Dialog &amp; BaseDialog)</h2>
        <div class="playground-row">
          <Dialog v-model:open="dialogOpen">
            <DialogTrigger>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <DialogDescription>Make changes to your profile here.</DialogDescription>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="outline"
                  @click="dialogOpen = false"
                >
                  Cancel
                </Button>
                <Button @click="dialogOpen = false">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button @click="baseDialogOpen = true">BaseDialog</Button>
          <BaseDialog
            v-model:visible="baseDialogOpen"
            header="Base dialog"
            width="480px"
          >
            <p class="m-0">Legacy shared dialog shell — kept alongside Dialog.</p>
          </BaseDialog>

          <Drawer v-model:open="drawerOpen">
            <DrawerTrigger>
              <Button variant="secondary">Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer title</DrawerTitle>
                <DrawerDescription>A side panel that slides into view.</DrawerDescription>
              </DrawerHeader>
              <div class="flex-1 p-4">Drawer body content.</div>
              <DrawerFooter>
                <DrawerClose>
                  <Button
                    variant="outline"
                    class="w-full"
                  >
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Popover>
            <PopoverTrigger>
              <Button variant="outline">Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Dimensions</PopoverTitle>
                <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>Add to library</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section class="playground-section">
        <h2>Breadcrumb</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section class="playground-section">
        <h2>Accordion</h2>
        <Accordion
          type="single"
          collapsible
          class="max-w-md"
        >
          <AccordionItem value="item-1">
            <AccordionHeader>Is it accessible?</AccordionHeader>
            <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionHeader>Is it styled?</AccordionHeader>
            <AccordionContent>Yes, with the neo-brutalist theme.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section class="playground-section">
        <h2>Tabs</h2>
        <Tabs
          default-value="account"
          class="max-w-md"
        >
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Manage your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </section>

      <section class="playground-section">
        <h2>Menu &amp; Context Menu</h2>
        <div class="playground-row">
          <Menu>
            <MenuTrigger>
              <Button variant="outline">Open menu</Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuContent>
          </Menu>

          <ContextMenu>
            <ContextMenuTrigger>
              <div
                class="flex h-24 w-48 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-600"
              >
                Right-click here
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem>Copy</ContextMenuItem>
              <ContextMenuItem>Paste</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </section>

      <section class="playground-section">
        <h2>Select</h2>
        <Select
          v-model="fruit"
          placeholder="Pick a fruit"
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectItem value="carrot">Carrot</SelectItem>
          </SelectContent>
        </Select>
        <p class="playground-muted">Selected: {{ fruit || 'none' }}</p>
      </section>

      <section class="playground-section">
        <h2>Table</h2>
        <Table>
          <TableCaption>A list of recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV002</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>$150.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section class="playground-section">
        <h2>Command</h2>
        <Command class="max-w-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="search-emoji">Search Emoji</CommandItem>
              <CommandItem value="calculator">Calculator</CommandItem>
            </CommandGroup>
            <CommandGroup heading="Settings">
              <CommandItem value="profile">
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </section>

      <section class="playground-section">
        <h2>Command Display</h2>
        <div class="max-w-md">
          <CommandDisplay command="pnpm add @vetro/ui" />
        </div>
      </section>

      <section class="playground-section">
        <h2>Forms</h2>
        <div class="grid max-w-md gap-4">
          <div class="flex flex-col gap-2">
            <Label for="demo-input">Input</Label>
            <Input
              id="demo-input"
              v-model="inputValue"
              placeholder="Your name"
            />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="demo-textarea">Textarea</Label>
            <Textarea
              id="demo-textarea"
              v-model="textareaValue"
              placeholder="Notes"
            />
          </div>
          <h3 class="m-0 text-sm font-semibold">Checkbox &amp; CheckInput</h3>
          <Checkbox v-model="checked">Accept terms (Checkbox)</Checkbox>
          <CheckInput v-model="checkInputChecked">Accept terms (CheckInput)</CheckInput>
          <Switch v-model="switched">Notifications</Switch>
          <Slider v-model="sliderValue" />
          <RadioGroup v-model="radioValue">
            <RadioGroupItem value="a">Option A</RadioGroupItem>
            <RadioGroupItem value="b">Option B</RadioGroupItem>
          </RadioGroup>
          <Toggle v-model="toggleOn">Bold</Toggle>
          <ToggleGroup
            v-model="toggleGroup"
            type="multiple"
          >
            <ToggleGroupItem value="bold">B</ToggleGroupItem>
            <ToggleGroupItem value="italic">I</ToggleGroupItem>
          </ToggleGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="you@example.com" />
            <FieldDescription>We never share your email.</FieldDescription>
            <FieldError>Invalid email</FieldError>
          </Field>
        </div>
      </section>

      <section class="playground-section">
        <h2>Charts</h2>
        <div class="playground-charts">
          <div class="playground-chart-host">
            <BarChart
              :data="chartData"
              index="month"
              :categories="['desktop', 'mobile']"
            />
          </div>
          <div class="playground-chart-host">
            <LineChart
              :data="chartData"
              index="month"
              :categories="['desktop', 'mobile']"
              :smooth="true"
            />
          </div>
          <div class="playground-chart-host">
            <AreaChart
              :data="chartData"
              index="month"
              :categories="['desktop', 'mobile']"
            />
          </div>
          <div class="playground-chart-host">
            <PieChart
              :data="pieData"
              data-key="value"
              name-key="name"
            />
          </div>
        </div>
      </section>

      <section class="playground-section">
        <h2>Command Dialog</h2>
        <Button @click="commandDialogOpen = true">Open command palette (⌘K style)</Button>
        <CommandDialog v-model:open="commandDialogOpen">
          <CommandInput placeholder="Type a command…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="search">Search</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </section>

      <section class="playground-section">
        <h2>Table of Contents</h2>
        <TableOfContents :data="tocItems" />
      </section>

      <section class="playground-section">
        <h2>Carousel</h2>
        <div class="px-12">
          <Carousel class="max-w-xs">
            <CarouselContent>
              <CarouselItem
                v-for="n in 5"
                :key="n"
              >
                <div
                  class="border-border bg-card font-head flex aspect-square items-center justify-center border-2 text-4xl"
                >
                  {{ n }}
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section class="playground-section">
        <h2>Modal</h2>
        <p class="playground-muted">
          Built-in layouts, custom layouts via <code>:layout</code>, and
          <code>createTypedModal</code>.
        </p>

        <h3 class="m-0 text-sm font-semibold">Built-in layouts</h3>
        <div class="playground-row">
          <Button @click="defaultModalRef?.open()">Default (with footer)</Button>
          <Button @click="fullscreenOpen = true">Fullscreen</Button>
          <Button @click="bottomSheetOpen = true">Responsive bottom sheet</Button>
          <Button @click="persistentOpen = true">Persistent (not closable)</Button>
          <Button @click="themedOpen = true">Themed (custom classes)</Button>
          <Button @click="stackedOuter = true">Stacked modals</Button>
        </div>

        <h3 class="m-0 text-sm font-semibold">Custom layouts</h3>
        <div class="playground-row">
          <Button @click="heroOpen = true">Branded hero</Button>
          <Button @click="modalDrawerOpen = true">Right drawer</Button>
          <Button @click="confirmOpen = true">Confirm dialog (danger)</Button>
        </div>
        <p
          v-if="lastConfirmAction"
          class="playground-muted"
        >
          Last confirm action: <strong>{{ lastConfirmAction }}</strong>
        </p>
      </section>

      <section class="playground-section">
        <h2>Calendar</h2>
        <Calendar v-model="date" />
        <p class="playground-muted">Selected: {{ date?.toLocaleDateString() ?? 'none' }}</p>
      </section>

      <section class="playground-section">
        <h2>Date &amp; number inputs</h2>
        <div class="playground-stack">
          <div>
            <Label class="block">DatePicker (v-calendar):</Label>
            <DatePicker v-model="datePickerValue" />
            <p class="playground-muted">Selected: {{ datePickerValue?.toLocaleDateString() ?? 'none' }}</p>
          </div>
          <div>
            <Label>DateInput</Label>
            <DateInput v-model="dateInputValue" />
            <p class="playground-muted">Value: {{ dateInputValue?.toLocaleDateString() ?? 'none' }}</p>
          </div>
          <div>
            <Label>InputNumber</Label>
            <InputNumber v-model="inputNumberValue" />
            <p class="playground-muted">Value: {{ inputNumberValue }}</p>
          </div>
        </div>
      </section>

      <section class="playground-section">
        <h2>BaseDropdown &amp; phone</h2>
        <div class="playground-stack">
          <BaseDropdown
            v-model="dropdownItem"
            :items="dropdownItems"
          >
            <Button>{{ dropdownItem?.label ?? 'Pick an action' }}</Button>
          </BaseDropdown>
          <CountryDropdown v-model="countryCode">
            <Button variant="outline">Country: {{ countryCode ?? 'none' }}</Button>
          </CountryDropdown>
          <PhoneNumberInput
            v-model="phoneNumber"
            :country-code="countryCode"
            label="Phone"
          />
          <p class="playground-muted">Phone: {{ phoneNumber || 'none' }}</p>
        </div>
      </section>

      <section class="playground-section">
        <h2>Countdown</h2>
        <Countdown :start-date="countdownStart" />
      </section>

      <section class="playground-section">
        <h2>Toaster &amp; Toast</h2>
        <Button @click="notify">Show toast</Button>
      </section>
    </main>

    <Modal
      ref="defaultModal"
      title="Confirm action"
    >
      <p class="m-0">Are you sure you want to proceed?</p>
      <template #footer>
        <div class="flex justify-end gap-2">
          <Button
            variant="outline"
            @click="defaultModalRef?.close()"
          >
            Cancel
          </Button>
          <Button @click="defaultModalRef?.close()">Confirm</Button>
        </div>
      </template>
    </Modal>

    <Modal
      v-model:visible="fullscreenOpen"
      layout="fullscreen"
      title="Fullscreen Modal"
    >
      <p>Edge-to-edge layout for immersive content like onboarding flows.</p>
    </Modal>

    <Modal
      v-model:visible="bottomSheetOpen"
      title="Adaptive Modal"
      :modal-only="false"
    >
      <p>
        Resize below 768px — this slides up from the bottom as a mobile-friendly sheet. Above the
        breakpoint it renders as a centered modal.
      </p>
    </Modal>

    <Modal
      v-model:visible="persistentOpen"
      title="Persistent"
      :closable="false"
      @tried-close="persistentTriedToClose += 1"
    >
      <p>Backdrop click and Escape are intercepted — the parent is notified instead of closing.</p>
      <p class="playground-muted">Tried to close: {{ persistentTriedToClose }} time(s)</p>
      <Button
        class="mt-4"
        @click="persistentOpen = false"
      >
        Close programmatically
      </Button>
    </Modal>

    <Modal
      v-model:visible="themedOpen"
      title="Themed"
      :classes="themedClasses"
    >
      <p>
        Every zone — backdrop, wrapper, body, header, content, footer, close button — accepts class
        overrides via the <code>classes</code> prop.
      </p>
    </Modal>

    <Modal
      v-model:visible="stackedOuter"
      title="Outer Modal"
    >
      <p>Open another modal on top.</p>
      <template #footer>
        <Button @click="stackedInner = true">Open inner</Button>
      </template>
    </Modal>
    <Modal
      v-model:visible="stackedInner"
      title="Inner Modal"
    >
      <p>Escape only closes the topmost modal. Body scroll lock is ref-counted.</p>
    </Modal>

    <Modal
      v-model:visible="heroOpen"
      title="Welcome aboard"
      :layout="BrandedHeroLayout"
    >
      A custom layout receives the modal context and renders whatever it wants — no structural
      assumptions from the shell.
    </Modal>

    <Modal
      v-model:visible="modalDrawerOpen"
      title="Settings"
      :layout="DrawerLayout"
    >
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium">Display name</label>
          <input
            type="text"
            class="border-border mt-1 w-full border-2 px-3 py-2"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Email</label>
          <input
            type="email"
            class="border-border mt-1 w-full border-2 px-3 py-2"
            placeholder="jane@example.com"
          />
        </div>
      </div>
    </Modal>

    <ConfirmModal
      v-model:visible="confirmOpen"
      title="Delete this project?"
      tone="danger"
      confirm-label="Delete"
      cancel-label="Keep it"
      @confirm="lastConfirmAction = 'Deleted'"
      @cancel="lastConfirmAction = 'Cancelled'"
    >
      This action cannot be undone. All associated data will be permanently removed from our
      servers.
    </ConfirmModal>

    <Toaster />
  </div>
</template>
