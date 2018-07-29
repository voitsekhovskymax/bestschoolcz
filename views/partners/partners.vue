<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div class="post_list">
        <Row>
            <Col span="24">
            <Card>
                <Table border :columns="columns" :data="partners.data"></Table>

                <div class="pagination margin-top-10" v-if="partners.total > partners.per_page">
                    <ButtonGroup>
                        <Button type="primary" icon="ios-skipbackward" @click.prevent="getPartners(partners.prev_page_url)"
                                v-if="partners.prev_page_url === null ? false : true"></Button>
                        <Button type="primary" icon="ios-skipforward" @click.prevent="getPartners(partners.next_page_url)"
                                v-if="partners.next_page_url === null ? false : true"></Button>
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
        name: 'partners',
        data() {
            return {
                partners: {},
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
                        title: 'Партнер',
                        key: 'title'
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
                                            this.partnerUpdate(params.row.id);
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
            this.getPartners('/api/partners');
        }        ,
        methods: {
            getPartners(uri) {
                this.axios.get(uri).then((response) => {
                    this.partners = response.data;
                    console.log(this.partners);
                });
            },
            partnerUpdate(partner_id) {
                this.$router.push({
                    name: 'partner_update',
                    params: {
                        id: partner_id
                    }
                });
            },
            showModal(post) {
                this.delpost = post;
                this.modal2 = true;
            },
            deletePost(id) {
                this.axios.delete('/api/partners/' + id).then((response) => {
                    this.getPartners('/api/partners');
                    this.modal2 = false;
                });
            }
        }
    }
</script>