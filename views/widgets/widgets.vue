<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div class="post_list">
        <Row>
            <Col span="24">
            <Card>
                <Table border :columns="columns" :data="widgets.data"></Table>

                <div class="pagination margin-top-10" v-if="widgets.total > widgets.per_page">
                    <ButtonGroup>
                        <Button type="primary" icon="ios-skipbackward" @click.prevent="getWidgets(widgets.prev_page_url)"
                                v-if="widgets.prev_page_url === null ? false : true"></Button>
                        <Button type="primary" icon="ios-skipforward" @click.prevent="getWidgets(widgets.next_page_url)"
                                v-if="widgets.next_page_url === null ? false : true"></Button>
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
        name: 'widgets',
        data() {
            return {
                widgets: {},
                delpost: {
                    title: '',
                    id: null
                },
                modal2: false,
                columns: [
                    {
                        title: 'Название',
                        key: 'title'
                    },
                    {
                        title: 'Действие',
                        key: 'action',
                        width: 220,
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
                                            this.widgetUpdate(params.row.id);
                                        }
                                    }
                                }, 'Редактировать'),

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
            this.getWidgets('/api/widgets');
        }        ,
        methods: {
            getWidgets(uri) {
                this.axios.get(uri).then((response) => {
                    this.widgets = response.data;
                    console.log(this.widgets);
                });
            },
            widgetUpdate(widget_id) {
                this.$router.push({
                    name: 'widget_update',
                    params: {
                        id: widget_id
                    }
                });
            },
            showModal(post) {
                this.delpost = post;
                this.modal2 = true;
            },
            deletePost(id) {
                this.axios.delete('/api/widgets/' + id).then((response) => {
                    this.getWidgets('/api/widgets');
                    this.modal2 = false;
                });
            }
        }
    }
</script>