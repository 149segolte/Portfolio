<script lang="ts" module>
    import { type SvelteHTMLElements } from "svelte/elements";

    import {
        CustomCard,
        type CustomCardFormat,
    } from "$lib/components/custom/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";

    export type SmallCardEntry = {
        title: string;
        description: string;
        tags: { name: string; color: string }[];
        link: string;
    };

    export type ProjectProps = {
        projects: CustomCardFormat[];
        small_entries?: SmallCardEntry[];
        notice: {
            text: string;
            label: string;
            link: string;
        };
        skills: {
            title: string;
            subtitle: string;
            description: string;
        }[];
    } & SvelteHTMLElements["div"];
</script>

<script lang="ts">
    let { projects, small_entries, notice, skills, ...rest }: ProjectProps =
        $props();
</script>

{#snippet SmallCard(details: SmallCardEntry)}
    <div class="relative p-4 size-full flex flex-col">
        <div class="flex items-center justify-between">
            <h3 class="text-xl font-medium">{details.title}</h3>
            <Button size="icon" variant="secondary" href={details.link}>
                <ArrowUpRight />
            </Button>
        </div>
        <div class="space-y-2 py-4 grow">
            <p class="text-muted-foreground line-clamp-2 text-sm">
                {details.description}
            </p>
        </div>
        <div class="flex flex-wrap gap-3 border-t border-dashed pt-6">
            {#each details.tags as tag}
                <Badge
                    variant="secondary"
                    class="text-custom-var bg-secondary-foreground/80 dark:bg-secondary"
                    style="--custom-color: {tag.color}"
                >
                    {tag.name}
                </Badge>
            {/each}
        </div>
    </div>
{/snippet}

<div id="projects" {...rest}>
    <div class="container mx-auto">
        <h2
            class="text-center text-balance text-2xl font-semibold md:text-3xl lg:text-4xl pb-8"
        >
            Projects
        </h2>

        <div class="flex flex-col gap-8 px-4 max-w-4xl mx-auto">
            {#each projects as proj, index}
                {#if index % 2 === 0}
                    <CustomCard orientation="right" data={proj} />
                {:else}
                    <CustomCard orientation="left" data={proj} />
                {/if}
            {/each}
            {#if small_entries && small_entries.length > 0}
                <div
                    class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                >
                    {#each small_entries as en}
                        <CustomCard
                            padding={false}
                            body={SmallCard}
                            data={en}
                        />
                    {/each}
                </div>
            {/if}
        </div>

        <h3 class="text-center text-lg font-medium my-4">
            {notice.text.split("{link}")[0]}
            <a href={notice.link} class="underline text-primary">
                {notice.label}
            </a>
            {notice.text.split("{link}")[1]}
        </h3>

        <h2
            class="text-center text-balance text-2xl font-semibold md:text-3xl lg:text-4xl pt-12 pb-8"
        >
            Skills
        </h2>

        <div class="mx-auto w-full max-w-6xl px-3">
            <dl class="grid grid-cols-4 gap-10">
                {#each skills as skill}
                    <div
                        class="text-center col-span-full sm:col-span-2 lg:col-span-1"
                    >
                        <Badge variant="secondary">
                            {skill.title}
                        </Badge>
                        <dt
                            class="mt-2 font-semibold text-gray-900 dark:text-gray-50"
                        >
                            {skill.subtitle}
                        </dt>
                        <dd
                            class="mt-2 leading-7 text-gray-600 dark:text-gray-400"
                        >
                            {skill.description}
                        </dd>
                    </div>
                {/each}
            </dl>
        </div>
    </div>
</div>
