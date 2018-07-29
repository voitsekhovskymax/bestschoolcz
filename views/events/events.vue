<template>
    <div class="post_list">
        <Row>
            <Col span="24">
            <Card>
                <Table border :columns="columns" :data="events.data"></Table>

                <div class="pagination" v-if="events.total > events.per_page">
                    <div class="pagination__left">
                        <Button v-if="events.prev_page_url != null" @click.prevent="getPosts(events.prev_page_url)">
                            <Icon type="chevron-left"></Icon>
                        </Button>
                    </div>
                    <div class="pagination__right">
                        <Button v-if="events.next_page_url != null" @click.prevent="getPosts(events.next_page_url)">
                            <Icon type="chevron-right"></Icon>
                        </Button>
                    </div>
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
                <Button type="error" size="large" long @click="deleteEvent(delpost.id)">Удалить</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'events',
        data() {
            return {
                events: {},
                modal2:false,
                delpost: {
                    title: '',
                    id: null
                },
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
                        title: 'Название события',
                        key: 'title'
                    },
                    {
                        title: 'Дата события',
                        key: 'date_event'
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
                                        type: 'success',
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
                        title: 'Action',
                        key: 'action',
                        width: 150,
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
                                            this.eventUpdate(params.row.id);
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
            this.getEvents('/api/events');
        },
        methods: {
            getEvents(uri) {
                this.axios.get(uri).then((response) => {
                    this.events = response.data;
                    console.log(this.events);
                });
            },
            eventUpdate(event_id) {
                this.$router.push({
                    name: 'event_update',
                    params: {
                        id: event_id
                    }
                });
            },
            showModal(post) {
                this.delpost = post;
                this.modal2 = true;
            },
            deleteEvent(id) {
                this.axios.delete('/api/events/' + id).then((response) => {
                    this.getEvents('/api/events');
                    this.modal2 = false;
                });
            },
            ToSite(url){
                window.open('/event/'+ url);
            }
        }
    }
</script>