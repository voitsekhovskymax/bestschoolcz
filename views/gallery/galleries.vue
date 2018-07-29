<style lang="less">
    @import "./gallery.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="post_list" style="background:#eee;padding: 20px">
        <Row>
            <div class="" v-if="galleries.length > 0">
                <template v-for="item  in galleries">
                    <Col span="6">
                    <Card class="margin-left-10 margin-top-10">
                        <p slot="title">
                            <template v-if="item.type == 'photo'">
                                <Icon type="ios-camera-outline"></Icon>
                            </template>
                            <template v-else>
                                <Icon type="ios-videocam-outline"></Icon>
                            </template>
                            {{item.title}}
                        </p>
                        <template v-if="item.type == 'photo'">
                            <router-link :to="{ name: 'update_photo_gallery', params: { id: item.id }}">
                                <img :src="item.preview_img" alt="item.title" title="Редактировать" class="photo_item">
                            </router-link>
                        </template>
                        <template v-else>
                            <router-link :to="{ name: 'update_video_gallery', params: { id: item.id }}">
                                <img :src="item.preview_img" alt="item.title" title="Редактировать" class="photo_item">
                            </router-link>
                        </template>
                        <div class="card-footer">
                            <Button type="primary" shape="circle" icon="ios-share" @click="ToSite(item.url)">Посмотреть
                                на сайте
                            </Button>
                            <Button type="ghost" shape="circle" icon="ios-trash" @click="showModal(item)"></Button>

                        </div>
                    </Card>
                    </Col>
                </template>
            </div>
            <div v-else>
                <Content>
                    <h2>Создайте новую галерею</h2>
                    <router-link :to="{ name: 'create_photo_gallery'}">
                        <Button type="success">Фотогалерея</Button>
                    </router-link>
                    <router-link :to="{ name: 'create_video_gallery'}">
                        <Button type="success">Видеогалерея</Button>
                    </router-link>
                </Content>
            </div>
        </Row>
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>Подтверждение удаления</span>
            </p>
            <div style="text-align:center">
                <p>Вы действительно хотите удалить галерею <b>{{ delpost.title}}</b> ? </p>
                <p>Вы уверенны в этом?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="deletePost(delpost.id)">Удалить</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'galleries',
        data() {
            return {
                galleries: {},
                modal2: false,
                delpost: {
                    title: '',
                    id: null
                },

            }
        },
        created: function () {
            this.getGalleries();
        },
        methods: {
            getGalleries() {
                this.axios.get('/api/galleries').then((response) => {
                    this.galleries = response.data;
                });
            },
            showModal(post) {
                this.delpost = post;
                this.modal2 = true;
            },
            deletePost(id) {
                this.axios.delete('/api/galleries/' + id).then((response) => {
                    this.getGalleries('/api/galleries');
                    this.modal2 = false;
                });
            },
            ToSite(url) {
                window.open('/gallery/' + url);
            }
        }
    }
</script>