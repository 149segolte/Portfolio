<script lang="ts" module>
    import { cn } from "$lib/utils";
    import type { SvelteHTMLElements } from "svelte/elements";

    import { Marquee } from "$lib/components/custom/autoscroll/index.js";
    import Icon from "$lib/components/custom/Icon.svelte";

    export const GRADIENT_ANGLES = {
        top: 0,
        right: 90,
        bottom: 180,
        left: 270,
    };

    type ProgressiveBlurProps = {
        direction?: keyof typeof GRADIENT_ANGLES;
        blurLayers?: number;
        class?: string;
        blurIntensity?: number;
    };

    export type AutoScrollProps = SvelteHTMLElements["section"] & {
        items: string[];
    };
</script>

<script lang="ts">
    let { items, ...rest }: AutoScrollProps = $props();
</script>

{#snippet MarqueeItem(item: string)}
    <div class="flex *:mx-auto *:h-5 *:w-fit *:text-foreground">
        <Icon icon={item} />
    </div>
{/snippet}

<section class="overflow-hidden" {...rest}>
    <div class="group relative m-auto px-6">
        <div class="flex flex-col items-center justify-center md:flex-row">
            <div class="md:max-w-44 md:border-r md:pr-6">
                <p class="text-end text-sm">Worked with</p>
            </div>
            <div class="relative py-6 md:w-[calc(100%-11rem)]">
                <Marquee>
                    {#each items as item}
                        {@render MarqueeItem(item)}
                    {/each}
                </Marquee>
                <div
                    class="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"
                ></div>
                <div
                    class="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"
                ></div>
                {@render progressiveBlur({
                    direction: "left",
                    blurIntensity: 1,
                    class: "pointer-events-none absolute left-0 top-0 h-full w-20",
                })}
                {@render progressiveBlur({
                    direction: "right",
                    blurIntensity: 1,
                    class: "pointer-events-none absolute right-0 top-0 h-full w-20",
                })}
            </div>
        </div>
    </div>
</section>

{#snippet progressiveBlur({
    direction = "bottom",
    blurLayers = 8,
    class: _class = "",
    blurIntensity = 0.25,
}: ProgressiveBlurProps)}
    {@const layers = Math.max(blurLayers, 2)}
    {@const segmentSize = 1 / (blurLayers + 1)}
    <div class={cn("relative", _class)}>
        {#each { length: layers } as _, index}
            {@const angle = GRADIENT_ANGLES[direction]}
            {@const gradientStops = [
                index * segmentSize,
                (index + 1) * segmentSize,
                (index + 2) * segmentSize,
                (index + 3) * segmentSize,
            ].map(
                (pos, posIndex) =>
                    `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
            )}
            {@const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
                ", ",
            )})`}
            <div
                class="pointer-events-none absolute inset-0 rounded-[inherit]"
                style="mask-image: {gradient};
  -webkit-mask-image: {gradient};
  backdrop-filter: blur({index * blurIntensity}px); z-index: {index * 2};"
            ></div>
        {/each}
    </div>
{/snippet}
