<script lang="ts" module>
    import type { SvelteHTMLElements } from "svelte/elements";

    import Icon from "$lib/components/custom/Icon.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { AutoScroll } from "$lib/components/custom/autoscroll/index.js";

    import ArrowRight from "@lucide/svelte/icons/arrow-right";

    export type HeroProps = SvelteHTMLElements["section"] & {
        tagline: string;
        resume_url: string;
        grid_items: { icon: string; color: string }[];
        marquee_items: string[];
    };
</script>

<script lang="ts">
    let { tagline, resume_url, grid_items, marquee_items, ...rest }: HeroProps =
        $props();
</script>

{#snippet GridItem(item: { icon: string; color: string })}
    <Button
        size="icon"
        variant="outline"
        style="--custom-color: {item.color}"
        class={[
            "size-full aspect-square bg-background/90! text-secondary-foreground/90 last:md:hidden last:lg:inline-flex hover:text-custom-var *:size-7/12!",
        ]}
    >
        <Icon icon={item.icon} />
    </Button>
{/snippet}

<section id="hero" {...rest}>
    <div
        class="container mx-auto pt-12 flex flex-col items-center text-center gap-4"
    >
        <div
            class="mx-auto flex flex-col px-8 md:px-16 lg:px-32 xl:px-48 md:grid md:grid-cols-2 md:gap-12"
        >
            <div
                class="items-center justify-center order-last mt-6 flex flex-col gap-6 md:order-first"
            >
                <h2
                    class="text-balance text-2xl font-medium md:text-3xl lg:text-4xl 2xl:text-5xl font-contrail-one"
                >
                    {tagline}
                </h2>
                <div
                    class="flex gap-4 items-center justify-center *:rounded-full"
                >
                    <Button href={resume_url} size="lg">Resume</Button>
                    <Button href="/#contact" size="lg" variant="secondary">
                        Get In Touch
                        <ArrowRight />
                    </Button>
                </div>
            </div>
            <div
                class="w-full [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)] mx-auto px-8"
            >
                <div
                    class="w-full from-primary/20 bg-linear-to-bl rounded-2xl border to-transparent p-2 shadow-lg md:pb-10"
                >
                    <div
                        class="w-full grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2"
                    >
                        {#each grid_items as item, index}
                            {#if index < 8}
                                {@render GridItem(item)}
                            {/if}
                        {/each}
                        {@render GridItem(grid_items[8])}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
