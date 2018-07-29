<style lang="less">
    @import '../../styles/common.less';
    @import './post_create.less';
</style>

<template>
    <div class="post_list">
        <Row>
            <Col span="24">
            <Card>
                <Table border :columns="columns" :data="posts.data"></Table>

                <div class="pagination margin-top-10" v-if="posts.total > posts.per_page">
                    <ButtonGroup>
                        <Button type="primary" icon="ios-skipbackward" @click.prevent="getPosts(posts.prev_page_url)"
                                v-if="posts.prev_page_url === null ? false : true"></Button>
                        <Button type="primary" icon="ios-skipforward" @click.prevent="getPosts(posts.next_page_url)"
                                v-if="posts.next_page_url === null ? false : true"></Button>
                    </ButtonGroup>
                </div>
            </Card>
            </Col>
        </Row>
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>Подтверждение удаления</span>
            </p>
            <div style="text-align:center">
                <p>Вы действительно хотите удалить <b>{{ delpost.title}}</b> ? </p>
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
        name: 'posts',
        data() {
            return {
                posts: {},
                delpost: {
                    title: '',
                    id: null
                },
                modal2: false,
                columns: [
                    {
                        title: 'Изображение',
                        key: 'img',
                        render: (h, params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row.img,
                                },
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                    height: '75px',
                                    objectFit: 'cover'
                                },
                            })
                        }
                    },
                    {
                        title: 'Название статьи',
                        key: 'title'
                    },
                    {
                        title: 'Статус',
                        key: 'post_status',
                        render: (h, params) => {
                            return h('div', [
                                h('Tag', {
                                    props: {
                                        color: params.row.post_status === 'published' ? 'green' : 'yellow',
                                        type:"dot"
                                    },
                                }, params.row.post_status === 'published' ? 'Опубликовано' : 'Черновик' )
                            ]);
                        }
                    },
                    {
                        title: 'Обновлено',
                        width: 105,
                        key: 'updated_at'
                    },
                    {
                        title: 'Посмотреть',
                        key: 'action',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        icon: 'share',
                                        shape:'circle'
                                    },
                                    on: {
                                        click: () => {
                                            this.ToSite(params.row.url);
                                        }
                                    }
                                }, ''),


                            ]);
                        }
                    },
                    {
                        title: 'Действие',
                        key: 'action',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small',
                                        icon: 'edit'
                                    },
                                    on: {
                                        click: () => {
                                            this.postUpdate(params.row.id);
                                        }
                                    }
                                }, ''),

                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        icon: 'trash-b'
                                    },
                                    on: {
                                        click: () => {
                                            this.showModal(params.row);
                                        }
                                    }
                                }, ''),

                            ]);
                        }
                    }
                ]
            }
        },
        created: function () {
            this.getPosts('/api/posts');
        }
        ,
        methods: {
            getPosts(uri) {
                this.axios.get(uri).then((response) => {
                    this.posts = response.data;
                    console.log(this.posts);
                });
            },
            postUpdate(post_id) {
                this.$router.push({
                    name: 'post_update',
                    params: {
                        id: post_id
                    }
                });
            },
            showModal(post) {
                this.delpost = post;
                this.modal2 = true;
            },
            deletePost(id) {
                this.axios.delete('/api/posts/' + id).then((response) => {
                    this.getPosts('/api/posts');
                    this.modal2 = false;
                });
            },
            ToSite(url){
                window.open('/post/'+ url);
            }
        }
    }
</script>