<script lang="ts" module>
    import { cn } from "$lib/utils";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { resetMode, setMode } from "mode-watcher";

    import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import Button from "$lib/components/ui/button/button.svelte";

    import Menu from "@lucide/svelte/icons/menu";
    import X from "@lucide/svelte/icons/x";
    import SunMoon from "@lucide/svelte/icons/sun-moon";

    export type NavigationItem = {
        title: string;
        href: string;
    };
</script>

<script lang="ts">
    let { links }: { links: NavigationItem[] } = $props();
    let menu_state = $state(false);
</script>

{#snippet brand()}
    <!-- <div class="w-48 h-48 bg-[url(/gradient.svg)]"></div> -->
    <div
        class="z-100 bg-foreground bg-cover hover:bg-[url(/gradient.svg)] bg-clip-text text-2xl font-bold text-transparent select-none transition-all duration-200"
    >
        <span>Shreyansh Nayak</span>
    </div>
{/snippet}

{#snippet lead_buttons(classes?: string)}
    <div class={cn([classes, "flex items-center gap-2"])}>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                class={buttonVariants({ variant: "outline", size: "icon" })}
            >
                <SunMoon />
                <span class="sr-only">Toggle theme</span>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item onclick={() => setMode("light")}
                    >Light</DropdownMenu.Item
                >
                <DropdownMenu.Item onclick={() => setMode("dark")}
                    >Dark</DropdownMenu.Item
                >
                <DropdownMenu.Item onclick={() => resetMode()}
                    >System</DropdownMenu.Item
                >
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
{/snippet}

{#snippet navbar(direction: "horizontal" | "vertical" = "horizontal")}
    <NavigationMenu.Root
        viewport={false}
        orientation={direction}
        class={{
            "w-full max-w-full justify-start *:w-full": direction == "vertical",
        }}
    >
        <NavigationMenu.List
            class={{ "flex-col items-start": direction == "vertical" }}
        >
            {#each links as link}
                <NavigationMenu.Item
                    class={{ "w-full": direction == "vertical" }}
                >
                    <NavigationMenu.Link href={link.href}>
                        <span> {link.title} </span>
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
            {/each}
        </NavigationMenu.List>
    </NavigationMenu.Root>
{/snippet}

<header
    class="sticky top-0 z-50 w-full p-4 border-b bg-background/50 backdrop-blur-lg"
>
    <div
        class="relative container mx-auto flex items-center gap-2 justify-between w-full"
    >
        {@render brand()}
        <!-- Normal Navigation Bar -->
        <div
            class="hidden md:flex lg:absolute lg:top-0 lg:left-0 lg:w-full items-center justify-center"
        >
            {@render navbar()}
        </div>
        <div class="flex items-center gap-2 z-100">
            {@render lead_buttons()}
            <div class="flex md:hidden">
                <Button
                    onclick={() => (menu_state = !menu_state)}
                    aria-label={menu_state == true ? "Close Menu" : "Open Menu"}
                    variant="ghost"
                    size="icon"
                    class="relative"
                >
                    <Menu
                        class={[
                            "size-6 duration-200",
                            menu_state && "rotate-180 scale-0 opacity-0",
                        ]}
                    />
                    <X
                        class={[
                            "absolute size-6 -rotate-180 scale-0 opacity-0 duration-200",
                            menu_state && "rotate-0 scale-100 opacity-100",
                        ]}
                    />
                    <span class="sr-only">Toggle Menu</span>
                </Button>
            </div>
        </div>
    </div>
    <!-- Mobile Navigation Bar -->
    <div class="flex md:hidden justify-center">
        <div
            class={[
                "bg-background w-full rounded-2xl border p-2 mt-4",
                menu_state ? "flex" : "hidden",
            ]}
        >
            {@render navbar("vertical")}
        </div>
    </div>
</header>
