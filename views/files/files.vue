<style>
    #filemanager_frame {
        width: 100%;
        height: calc(100vh - 100px);
        border: 1px solid #ccc;
        box-shadow: 0 0 5px #ccc;
    }
</style>
<template>
    <div class="files">
        <iframe src="/laravel-filemanager" frameborder="0" id="filemanager_frame"></iframe>
    </div>
</template>

<script>
    export default {
        name: 'filemanager',
        data() {
            return {};
        },
        computed: {},
        created: function () {
           
        },
        methods: {
           
        }
    };
</script>
