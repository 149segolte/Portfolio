<script lang="ts">
    import FileWarning from "@lucide/svelte/icons/file-warning";

    export async function get_icon(icon: string) {
        return (await fetch(`/icons/${icon}.svg`)).text();
    }

    export let icon: string;
</script>

{#await get_icon(icon)}
    {icon}
{:then svg}
    {#if svg.startsWith("<svg")}
        {@html svg}
    {:else}
        <FileWarning />
    {/if}
{/await}
