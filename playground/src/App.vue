<script setup lang="ts">
  import { ref } from 'vue';

  import { Button, IconButton } from '@/features/buttons';
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
} from '@/features/data-display';
import {
  Alert,
  AlertDescription,
  AlertTitle,
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
import {
  Calendar,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
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
} from '@/features/forms';
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

  const clicks = ref(0);
  const progress = ref(60);
  const dialogOpen = ref(false);
  const drawerOpen = ref(false);
  const fruit = ref('');
  const date = ref<Date | undefined>(new Date());
  const commandDialogOpen = ref(false);
  const inputValue = ref('');
  const textareaValue = ref('');
  const checked = ref(false);
  const switched = ref(false);
  const sliderValue = ref(50);
  const radioValue = ref('a');
  const toggleOn = ref(false);
  const toggleGroup = ref<string[]>([]);

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
  <div
    :class="[theme, { dark }]"
    class="playground-shell"
  >
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
        <h2>Button</h2>
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
        <h2>Badge</h2>
        <div class="playground-row">
          <Badge>Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="solid">Solid</Badge>
          <Badge variant="surface">Surface</Badge>
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
          <div class="flex items-center justify-center w-1/2">
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
          <div class="flex items-center justify-between gap-6">
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
        </div>
      </section>

      <section class="playground-section">
        <h2>Overlays</h2>
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
                class="border-border flex h-24 w-48 items-center justify-center border-2 border-dashed text-sm"
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
          <Checkbox v-model="checked">Accept terms</Checkbox>
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
        <h2>Calendar</h2>
        <Calendar v-model="date" />
        <p class="playground-muted">Selected: {{ date?.toLocaleDateString() ?? 'none' }}</p>
      </section>

      <section class="playground-section">
        <h2>Toaster</h2>
        <Button @click="notify">Show toast</Button>
      </section>
    </main>
    <Toaster />
  </div>
</template>
