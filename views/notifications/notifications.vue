<style lang="less">
    @import './notifications.less';
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showList" class="message-title-list-con">
                    <Table size="large" ref="messageList" :columns="notificationsColumns" :data="notifications.data" :row-class-name="rowClassName" :no-data-text="noDataText"></Table>
                    <div class="pagination margin-top-10" v-if="notifications.total > notifications.per_page">
                        <ButtonGroup>
                            <Button type="primary" icon="ios-skipbackward" @click.prevent="getNotifications(notifications.prev_page_url)"
                                    v-if="notifications.prev_page_url === null ? false : true"></Button>
                            <Button type="primary" icon="ios-skipforward" @click.prevent="getNotifications(notifications.next_page_url)"
                                    v-if="notifications.next_page_url === null ? false : true"></Button>
                        </ButtonGroup>
                    </div>
                </div>
            </transition>
            <transition name="back-message-list">
                <div v-if="!showList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="back"><Icon type="chevron-left"></Icon>&nbsp;&nbsp;Назад</Button></span>
                        <h3 class="mes-title">{{ singleNotification.title }}</h3>
                    </div>
                    <p class="mes-time-con"><Icon type="android-time"></Icon>&nbsp;&nbsp;{{ singleNotification.created_at }}</p>
                    <div class="message-content-body">
                        <p class="message-content">{{ singleNotification.content }}</p>
                    </div>
                </div>
            </transition>
        </div>
        <Modal v-model="showModal" width="360">
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
        name: 'notifications',
        data() {
            return {
                notifications: [],
                notificationsColumns: [
                    {
                        title: 'Заголовок',
                        key: 'title',
                        align: 'left',
                        ellipsis: true,
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.getSingleNotifications(params.row.id); 
                                        this.showList = false;
                                    }
                                }
                            }, params.row.title);
                        }
                    },

                    {
                        title: 'Сообщение',
                        key: 'content',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: 'Дата',
                        key: 'created_at',
                        align: 'right',
                        width: 190,
                        render: (h, params) => {
                            return h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'android-time',
                                        size: 12
                                    },
                                    style: {
                                        margin: '0 5px'
                                    }
                                }),
                                h('span', {
                                    props: {
                                        type: 'android-time',
                                        size: 12
                                    }
                                }, params.row.created_at)
                            ]);
                        }
                    },
                    {
                        title: 'Действие',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, 'Удалить')
                            ]);
                        }
                    }

                ],
                noDataText: 'Нет новых уведомлений',
                singleNotification: {},
                showList: true,
                showModal:false,
                delpost:{}
            };
        },
        methods: {
            rowClassName (row, index) {
                if (row.is_read === true) {
                    return 'viewed_notifications';
                } else  {
                    return 'new_notifications';
                }
                return '';
            },
            getSingleNotifications(id) {
                console.log('send id ' + id);
                this.axios.put('/api/notifications/' + id ).then((response) => {
                    console.log(response);
                });
                this.axios.get('/api/notifications/' + id + '/edit' ).then((response) => {
                    console.log(this.response);
                    this.singleNotification = response.data;
                });
            },
            getNotifications(uri) {
                this.axios.get(uri).then((response) => {
                    this.notifications = response.data;
                    console.log(this.notifications);
                });
            },
            back(){
                this.showList = true;
                this.getNotifications('/api/notifications');
            },
            remove(post){
                this.delpost = post;
                this.showModal = true;
            },
            deletePost(id) {
                this.axios.delete('/api/notifications/' + id).then((response) => {
                    this.getNotifications('/api/notifications');
                    console.log(response);
                    this.showModal = false;
                });
            },
        },
        mounted() {
            this.getNotifications('/api/notifications');
        },
        watch: {}
    };
</script>

