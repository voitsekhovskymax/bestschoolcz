<style lang="less">
    @import '../../styles/common.less';
    @import './courses.less';
</style>
<template>
    
    <div class="courses_list">
        <Row>
            <Col span="24">
            <Card>
                <Table border :columns="columns" :data="courses.data"></Table>

                <div class="pagination margin-top-10" v-if="courses.total > courses.per_page">
                    <ButtonGroup>
                        <Button type="primary" icon="ios-skipbackward" @click.prevent="getCourses(courses.prev_page_url)"
                                v-if="courses.prev_page_url === null ? false : true"></Button>
                        <Button type="primary" icon="ios-skipforward" @click.prevent="getCourses(courses.next_page_url)"
                                v-if="courses.next_page_url === null ? false : true"></Button>
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
        name: 'courses',
        data() {
            return {
                courses: {},
                modal2:false,
                delpost: {
                    title: '',
                    id: null
                },
                columns:[
                    {
                        title: 'Изображение',
                        key: 'img',
                        render:(h,params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row.img,
                                },
                                style: {
                                    display:'inline-block',
                                    width: '100%',
                                    height: '75px',
                                    objectFit: 'cover'
                                },
                            })
                        }
                    },
                    {
                        title: 'Название курса',
                        key: 'title'
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
                        title: 'Тип курса',
                        key: 'type',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Tag', {
                                    props: {
                                        color: params.row.type_course === 'year' ? 'green' : 'blue',
                                    },
                                }, params.row.type_course === 'year' ? 'Годовой' : 'Семестровый' )
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
            this.getCourses('/api/courses');
        },
        methods: {
            getCourses(uri) {
                this.axios.get(uri).then((response) => {
                    this.courses = response.data;
                    console.log(this.courses);
                });
            },
            postUpdate(course_id) {
                this.$router.push({
                    name: 'course_update',
                    params: {
                        id: course_id
                    }
                });
            },
            showModal(post) {
                this.delpost = post;
                this.modal2 = true;
            },
            deletePost(id) {
                this.axios.delete('/api/courses/' + id).then((response) => {
                    this.getCourses('/api/courses');
                    this.modal2 = false;
                });
            },
            ToSite(url){
                window.open('/course/'+ url);
            }
        }
    }
</script>