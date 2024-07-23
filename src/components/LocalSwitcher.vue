<template>
    <div>
        <select id="locale" v-model="$i18n.locale" style="    background-color: rgb(73, 105, 144);border-color: rgb(73, 105, 144);padding: 1px 3px;color: white;border-radius: 4px;">
            <option v-for="locale in locales" :key="locale.key" :value="locale.key">
                {{locale.label}}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    data: () => ({
        locales:[
            {key: "en", label: "English"},
            {key: "es", label: "Spanish"},
            {key: "fr", label: "French"},
            {key: "pt", label: "Portuguese"},
            {key: "ru", label: "Russian"}
        ]
    }),
}
</script>

<style>

</style>