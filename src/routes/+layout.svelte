<script lang="ts">
    import "../app.css";
    import { ModeWatcher } from "mode-watcher";

    import {
        Navigation,
        type NavigationItem,
    } from "$lib/components/custom/navigation/index.js";

    let links: NavigationItem[] = [
        {
            title: "Introduction",
            href: "/",
        },
        {
            title: "Background",
            href: "/#background",
        },
        {
            title: "Projects",
            href: "/#projects",
        },
        {
            title: "Contact",
            href: "/#contact",
        },
    ];

    let { children } = $props();
</script>

<ModeWatcher />
<div class="flex flex-col w-full">
    <Navigation {links} />
    <main>
        {@render children()}
    </main>
    <footer class="mt-2 p-2">
        <div class="container mx-auto p-2 flex">
            <span class="text-muted-foreground text-center text-sm mx-auto"
                >© {new Date().getFullYear()}
                <a
                    class="underline text-primary"
                    href="https://github.com/149segolte"
                >
                    149segolte
                </a>, All rights reserved
            </span>
        </div>
    </footer>
</div>
