<script lang="ts">
    import type { PageProps } from "./$types";

    import { Hero } from "$lib/components/custom/hero/index.js";
    import { Background } from "$lib/components/custom/background/index.js";
    import { Projects } from "$lib/components/custom/projects/index.js";
    import { Contact } from "$lib/components/custom/contact/index.js";

    let { data }: PageProps = $props();
</script>

<div class="flex flex-col w-full *:py-16 *:border-b">
    <Hero {...data.hero_props} />
    <Background {...data.background_props} />
    <Projects {...data.project_props} />
    <Contact {...data.contact_props} />
</div>
