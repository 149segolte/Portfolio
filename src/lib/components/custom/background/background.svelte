<script lang="ts" module>
    import {
        CustomCard,
        type CustomCardFormat,
    } from "$lib/components/custom/card/index.js";
    import type { SvelteHTMLElements } from "svelte/elements";

    export type BackgroundProps = SvelteHTMLElements["div"] & {
        experiences: CustomCardFormat[];
        education: CustomCardFormat[];
    };
</script>

<script lang="ts">
    let { experiences, education, ...rest }: BackgroundProps = $props();
</script>

<div id="background" {...rest}>
    <div class="container mx-auto">
        <h2
            class="text-center text-balance text-2xl font-semibold md:text-3xl lg:text-4xl pb-8"
        >
            Experience
        </h2>

        <div class="flex flex-col gap-8 px-4">
            {#each experiences as exp, index}
                {#if index % 2 === 0}
                    <CustomCard orientation="left" data={exp} />
                {:else}
                    <CustomCard orientation="right" data={exp} />
                {/if}
            {/each}
        </div>

        <h2
            class="text-center text-balance text-2xl font-semibold md:text-3xl lg:text-4xl pt-16 pb-8"
        >
            Education
        </h2>

        <div class="flex flex-col gap-8 px-4">
            {#each education as edu, index}
                {#if index % 2 === 0}
                    <CustomCard orientation="left" data={edu} />
                {:else}
                    <CustomCard orientation="right" data={edu} />
                {/if}
            {/each}
        </div>
    </div>
</div>
