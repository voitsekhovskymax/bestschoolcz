<style lang="less">
    @import '../../../../styles/loading.less';
</style>

<template>
    <div>
        <Card shadow>
            <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
        </Card>
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Загрузка...</div>
        </Spin>
    </div>
</template>

<script>
import tinymce from 'tinymce';
import theme  from 'tinymce/themes/modern/theme';
export default {
    name: 'text-editor',
    data () {
        return {
            spinShow: true
        };
    },
    methods: {
        init () {
            this.$nextTick(() => {
                let vm = this;
                let height = document.body.offsetHeight - 300;
                tinymce.init({
                    selector: '#tinymceEditer',
                    branding: false,
                    elementpath: false,
                    height: height,
                    language: 'ru',
                    menubar: 'edit insert view format table tools',
                    plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                        'searchreplace visualblocks visualchars code fullpage',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                    ],
                    toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                    autosave_interval: '20s',
                    image_advtab: true,
                    table_default_styles: {
                        width: '100%',
                        borderCollapse: 'collapse'
                    },
                    setup: function (editor) {
                        editor.on('init', function (e) {
                            vm.spinShow = false;
                            if (localStorage.editorContent) {
                                tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
                            }
                        });
                        editor.on('keydown', function (e) {
                            localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
                        });
                    },
                    file_browser_callback : function(field_name, url, type, win) {
                        console.log("file_browser_callback open !");
                        let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
                        let y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
                        let cmsURL = '/laravel-filemanager?field_name=' + field_name;
                        if (type == 'image') {
                            cmsURL = cmsURL + "&type=Images";
                        } else {
                            cmsURL = cmsURL + "&type=Files";
                        }
                        tinyMCE.activeEditor.windowManager.open({
                            file : cmsURL,
                            title : 'Filemanager',
                            width : x ,
                            height : y ,
                            resizable : "yes",
                            close_previous : "no"
                        });
                        console.log(field_name);
                        console.log(url);
                        console.log(type);
                    }
                });
            });
        }
    },
    mounted () {
        this.init();
    },
    destroyed () {
        tinymce.get('tinymceEditer').destroy();
    }
};
</script>

<style>

</style>
