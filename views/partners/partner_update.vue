<style lang="less">
    @import '../../styles/common.less';
    #urlIMG {
        height: 150px;
        width: 100%;
        border: 2px dashed #ccc;
        object-fit: cover;
        max-width: 100%;
        cursor: pointer
    }
</style>

<template>
    <div>
        <Row>
            <Card style="width: 300px">
                <div class="margin-top-10">
                    <div class="imgpost">
                        <img id="urlIMG" :src="partner.img" alt="" @click="imgPost">
                    </div>
                </div>
                <div class="margin-top-10">
                    <Input v-model="partner.title"/></Input>
                </div>
                <div class="margin-top-10">
                    <Input v-model="partner.description"/></Input>
                </div>
                <p class="margin-top-10">
                    <Checkbox v-model="partner.is_index_page">Вывести на главной</Checkbox>
                </p>
                <div class="margin-top-20">
                    <Button @click="publish" icon="ios-checkmark" type="primary">Опубликовать</Button>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'partner_update',
        data() {
            return {
                partner: {
                    img: '/images/blog/blog-large-01.jpg',
                    title: '',
                    description: '',
                    is_index_page: false
                }
            };
        },

        created: function () {
            this.axios.get('/api/partners/' + this.$route.params.id + '/edit').then((response) => {
                this.partner = response.data;
            });
        },
        methods: {
            imgPost() {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById("urlIMG").src = path;
                });
            },

            publish() {
                this.partner.img = document.getElementById("urlIMG").src;
                console.log(this.partner);
                this.axios.patch('/api/partners/' + this.$route.params.id, this.partner).then((response) => {
                    console.log(response.data);
                    if (response.data == 0) {
                        this.publishLoading = false;
                        this.$Notice.warning({
                            title: 'Внимание!',
                            desc: 'Уже есть статья с таким названием!'
                        });
                    }
                    else {
                        this.publishLoading = false;
                        this.$Notice.success({
                            title: 'Успешно сохранено',
                            desc: 'Статья успешно сохранена'
                        });
                        this.$router.push({
                            name: 'partners'
                        });
                    }

                });
            }
        }
    };
</script>
