<script lang="ts" module>
    import { type SvelteHTMLElements } from "svelte/elements";

    import { CustomCard } from "$lib/components/custom/card/index.js";
    import Icon from "$lib/components/custom/Icon.svelte";

    export type ContactProps = {
        primary_links: {
            twitter: string;
            linkedin: string;
            github: string;
        };
        email: string;
        extra_links?: {
            icon: string;
            link: string;
        }[];
    } & SvelteHTMLElements["div"];
</script>

<script lang="ts">
    let { primary_links, email, extra_links, ...rest }: ContactProps = $props();
</script>

{#snippet Body()}
    <div
        class="flex flex-col items-center justify-center p-0 text-lg font-medium"
    >
        <div class="w-full grid grid-cols-1 md:grid-cols-2 *:py-6">
            <div
                class="flex flex-col gap-4 justify-center md:pr-8 border-b md:border-b-0 md:border-r *:flex *:flex-row *:gap-4 *:justify-center *:md:justify-end *:items-center *:hover:underline *:[&_svg]:hover:scale-90"
            >
                <a href={primary_links.twitter}>
                    <span class="order-last md:order-first">
                        Drop a DM on Twitter
                    </span>
                    <div class="*:size-8">
                        <Icon icon="TwitterX" />
                    </div>
                </a>
                <a href={primary_links.linkedin}>
                    <span class="order-last md:order-first">
                        Connect on LinkedIn
                    </span>
                    <div class="*:size-8">
                        <Icon icon="Linkedin" />
                    </div>
                </a>
                <a href={primary_links.github}>
                    <span class="order-last md:order-first">
                        Help out on GitHub
                    </span>
                    <div class="*:size-8">
                        <Icon icon="Github" />
                    </div>
                </a>
            </div>
            <div class="justify-center flex flex-col gap-4 pl-8 md:pr-12">
                <span>
                    Have a question, idea, or just want to connect? Just shoot
                    me an email at
                    <a href={"mailto:" + email} class="text-primary underline">
                        {email}
                    </a>
                </span>
            </div>
        </div>
        {#if extra_links && extra_links.length > 0}
            <div
                class="w-full border-t py-6 flex flex-wrap gap-4 justify-center *:hover:scale-90 *:cursor-pointer"
            >
                {#each extra_links as ex}
                    <a
                        href={ex.link}
                        class="flex items-center justify-center *:size-8"
                    >
                        <Icon icon={ex.icon} />
                    </a>
                {/each}
            </div>
        {/if}
    </div>
{/snippet}

<div id="contact" {...rest}>
    <div class="container mx-auto">
        <h2
            class="text-center text-balance text-2xl font-semibold md:text-3xl lg:text-4xl pb-8"
        >
            Get In Touch
        </h2>

        <div class="px-4">
            <CustomCard padding={false} body={Body} data={{}} />
        </div>
    </div>
</div>
