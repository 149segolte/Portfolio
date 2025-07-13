<script lang="ts" module>
    import type { SvelteHTMLElements } from "svelte/elements";
    import type { Snippet } from "svelte";

    import * as Card from "$lib/components/ui/card/index.js";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";

    export type CardFormat = {
        top_subtitle: string;
        title: string;
        tasks: {
            header: string;
            description: string[];
        }[];
    } & (
        | {
              bottom_subtitle: string;
              external?: never;
          }
        | {
              external: {
                  link: string;
                  label: string;
              };
              bottom_subtitle?: never;
          }
    ) &
        (
            | {
                  description: string;
                  tags: { name: string; color: string }[];
                  image?: never;
              }
            | {
                  image: {
                      url: string;
                      alt: string;
                  };
                  description?: never;
                  tags?: never;
              }
        );

    export type CardProps = {
        orientation?: "left" | "right";
        padding?: boolean;
        body?: Snippet<[any]>;
        data: CardFormat | any;
    } & SvelteHTMLElements["div"];
</script>

<script lang="ts">
    let {
        orientation = "left",
        padding = true,
        body = Body,
        data,
        ...rest
    }: CardProps = $props();
</script>

{#snippet Body(details: CardFormat)}
    <div class="flex gap-2 sm:gap-12 overflow-hidden max-sm:flex-col">
        <div
            class={[
                "sm:flex-1 flex flex-col gap-2 justify-center",
                orientation == "left"
                    ? "sm:order-first text-left items-start"
                    : "sm:order-last text-right items-end",
            ]}
        >
            <h3
                class="font-mono text-sm font-semibold tracking-widest text-accent-foreground"
            >
                {details.top_subtitle}
            </h3>
            <h2
                class="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl"
            >
                {details.title}
            </h2>

            {#if details.bottom_subtitle}
                <h3
                    class="font-mono text-sm font-semibold tracking-widest text-accent-foreground"
                >
                    {details.bottom_subtitle}
                </h3>
            {:else if details.external}
                <Button
                    variant="secondary"
                    size="sm"
                    href={details.external.link}
                    class="w-max"
                >
                    {details.external.label}
                    <ArrowUpRight class="size-5 ml-1" />
                </Button>
            {/if}

            {#if details.description}
                <span class="text-muted-foreground">{details.description}</span>
                <div
                    class={[
                        "flex flex-wrap gap-3 border-t border-dashed pt-4 mt-2 w-full",
                        orientation == "left" ? "justify-start" : "justify-end",
                    ]}
                >
                    {#each details.tags as tag}
                        <Badge
                            variant="secondary"
                            class="text-custom-var"
                            style="--custom-color: {tag.color}"
                        >
                            {tag.name}
                        </Badge>
                    {/each}
                </div>
            {:else if details.image}
                <img
                    alt={details.image.alt}
                    class="w-full aspect-video rounded-2xl shadow-xl"
                    src={details.image.url}
                />
            {/if}
        </div>

        <div class="flex-1 flex flex-col justify-center">
            <Accordion.Root type="single" class="w-full" value="item-1">
                {#each details.tasks as task, index}
                    <Accordion.Item value={"item-" + (index + 1)}>
                        <Accordion.Trigger class="text-xl font-bold">
                            {task.header}
                        </Accordion.Trigger>
                        <Accordion.Content
                            class="flex flex-col gap-4 text-balance text-muted-foreground font-medium leading-relaxed max-sm:px-5"
                        >
                            {#each task.description as desc}
                                <p>{desc}</p>
                            {/each}
                        </Accordion.Content>
                    </Accordion.Item>
                {/each}
            </Accordion.Root>
        </div>
    </div>
{/snippet}

<Card.Root
    class={[
        "rounded-3xl border from-primary/20 to-transparent w-full max-w-4xl mx-auto",
        orientation == "left" ? "bg-linear-to-bl" : "bg-linear-to-br",
        padding ? "py-5 md:p-6 lg:p-8" : "p-0",
    ]}
    {...rest}
>
    <Card.Content class={[!padding && "p-0"]}>
        {@render body(data)}
    </Card.Content>
</Card.Root>
