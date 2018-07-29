<style lang="less">
    @import '../../styles/common.less';

    .link {
        padding: 5px;
        background: white;
        border-radius: 5px;
    }
</style>

<template>
    <div>
        <Row>
            <Button type="success" @click="save">Сохранить</Button>
        </Row>
        <BackTop></BackTop>
        <Row v-for="parent_link in settings.menu" :key="parent_link.id">
            <div class="margin-top-10">
            <Card>
                <Row>
                    <Col span="24" class="margin-left-10">
                    <b>{{parent_link.title}}</b> ({{parent_link.url}})
                    <Button type="error" shape="circle" icon="ios-trash" @click="deleteParent(parent_link.id)"></Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="8" v-for="col in parent_link.cols" :key="col.id">
                    <Card class="margin-left-10 margin-top-10" style="background: #ccc">
                        <Button type="error" shape="circle" icon="ios-trash" @click="deleteCol(col.id)"></Button>
                        <div class="link margin-top-10" v-for="link in col.child" :key="link.id">
                            <p class="title ">
                                <label for="">Название пункта меню</label>
                                <Input v-model="link.title" placeholder="Название пункта меню">
                                <Button slot="append" icon="ios-trash" @click="deleteLink(col.id, link.title)"></Button>
                                </Input>
                            </p>
                            <p class="url ">
                                <label for="">Ссылка</label>
                                <Input v-model="link.url" placeholder="Url ссылки">
                                <Button slot="append" icon="link"></Button>
                                </Input>
                            </p>
                        </div>

                        <div class="margin-top-10">
                            <Button long @click="addChildMenu(col.id)">Добавить пункт меню</Button>
                        </div>
                    </Card>
                    </Col>
                    <Col span="8">
                    <Button type="ghost" shape="circle" icon="ios-plus-empty" @click="addCol(parent_link.id)"
                            class="margin-left-10 margin-top-10">Добавить колонку
                    </Button>
                    </Col>
                </Row>
            </Card>
            </div>
        </Row>

        <Row>
            <Button @click="showParentMenu" class="margin-top-10 margin-left-10">Добавить родительский пункт меню
            </Button>
        </Row>

        <Modal v-model="showModalParent">
            <p slot="header" style="color:#4caf50;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>Создание нового пункта меню</span>
            </p>
            <div>
                <p class="title margin-top-10">
                <p>Введите название пункта меню</p>
                <Input v-model="newParentTitle" placeholder="Название пункта меню">
                <Button slot="append" icon="ios-edit"></Button>
                </Input>
                </p>
                <p class="url margin-top-10">
                <p>Если пункт меню должен только расскрывать вложенное меню оставьте знак <b>#</b>, либо же напишите
                    ссылку</p>
                <Input v-model="newParentUrl" placeholder="Url ссылки" value="#">
                <Button slot="append" icon="link"></Button>
                </Input>
                </p>
            </div>
            <div slot="footer">
                <Button type="success" @click="addParentMenu">Добавить</Button>
            </div>
        </Modal>

        <!--<Modal v-model="showModaldMenu">-->
        <!--<p slot="header" style="color:#4caf50;text-align:center">-->
        <!--<Icon type="information-circled"></Icon>-->
        <!--<span>Создание нового пункта меню</span>-->
        <!--</p>-->
        <!--<div>-->
        <!--<p class="title margin-top-10">-->
        <!--<p>Введите название пункта меню</p>-->
        <!--<Input v-model="newChildTitle" placeholder="Название пункта меню">-->
        <!--<Button slot="append" icon="ios-edit"></Button>-->
        <!--</Input>-->
        <!--</p>-->
        <!--<p class="url margin-top-10">-->
        <!--<p>Добавьте ссылку </p>-->
        <!--<Input v-model="newChildUrl" placeholder="Url ссылки" value="#">-->
        <!--<Button slot="append" icon="link"></Button>-->
        <!--</Input>-->
        <!--</p>-->
        <!--</div>-->
        <!--<div slot="footer">-->
        <!--<Button type="success" @click="addChildMenu">Добавить</Button>-->
        <!--</div>-->
        <!--</Modal>-->

        <div class="margin-top-10">
            <Button type="success" @click="save">Сохранить</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'menu_settings',
        data() {
            return {
                // menu: [
                //     {
                //     id: 0,
                //     title: 'blog',
                //     url: '/blog',
                //     cols: [
                //         {
                //             id: '1_col_1',
                //             child: [
                //                 {title: 'post 1 ', url: '/post1'},
                //                 {title: 'post 2 ', url: '/post2'}
                //             ]
                //         },
                //         {
                //             id: '1_col_2',
                //             child: [
                //                 {title: 'post 4 ', url: '/post4'},
                //                 {title: 'post 5 ', url: '/post5'}
                //             ]
                //         },
                //         {
                //             id: '1_col_3',
                //             child: [
                //                 {title: 'post 6 ', url: '/post4'},
                //                 {title: 'post 7 ', url: '/post5'}
                //             ]
                //         }
                //     ]
                // },
                //     {
                //         id: 1,
                //         title: 'courses',
                //         url: '/courses',
                //         cols: [
                //             {
                //                 id: '2_col_1',
                //                 child: [
                //                     {title: 'course 1 ', url: '/course1'},
                //                     {title: 'course 2 ', url: '/course2'}
                //                 ]
                //             },
                //             {
                //                 id: '2_col_2',
                //                 child: [
                //                     {title: 'course 4 ', url: '/course4'},
                //                     {title: 'course 5 ', url: '/course5'}
                //                 ]
                //             }
                //         ]
                //     },
                //     {
                //         id: 2,
                //         title: 'courses',
                //         url: '/courses',
                //         cols: [
                //             {
                //                 id: '2_col_1',
                //                 child: [
                //                     {title: 'course 1 ', url: '/course1'},
                //                     {title: 'course 2 ', url: '/course2'}
                //                 ]
                //             },
                //             {
                //                 id: '2_col_2',
                //                 child: [
                //                     {title: 'course 4 ', url: '/course4'},
                //                     {title: 'course 5 ', url: '/course5'}
                //                 ]
                //             }
                //         ]
                //     },
                //     {
                //         id: 3,
                //         title: 'courses',
                //         url: '/courses',
                //         cols: [
                //             {
                //                 id: '2_col_1',
                //                 child: [
                //                     {title: 'course 1 ', url: '/course1'},
                //                     {title: 'course 2 ', url: '/course2'}
                //                 ]
                //             },
                //             {
                //                 id: '2_col_2',
                //                 child: [
                //                     {title: 'course 4 ', url: '/course4'},
                //                     {title: 'course 5 ', url: '/course5'}
                //                 ]
                //             }
                //         ]
                //     }
                // ],
                settings: {
                    menu: [],
                },
                showModalParent: false,
                showModaldMenu: false,
                newParentTitle: '',
                newParentUrl: ''
                // newChildTitle: '',
                // newChildUrl: '',
                // newChildIdParent: null,
            }
        },
        created: function () {
             this.init();
        },
        methods: {
            init(){

                // id  = 0  это условно для получения menu-json;
                this.axios.get('/api/settings/' + 2 + '/edit',).then((response) => {
                    console.log(response.data);
                    this.settings = response.data;
                });
            },
            save() {
                console.log(this.settings);
                this.axios.put('/api/settings/' + 2, this.settings).then((response) => {
                    console.log(response.data);
                    this.$Notice.success({
                        title: 'Успешно сохранено',
                        desc: 'Меню успешно сохранено'
                    });
                });
            },
            deleteParent(id) {
                for (let i = 0; i < this.settings.menu.length; i++) {
                    if (this.settings.menu[i].id == id) {
                        this.settings.menu.splice(i, 1);
                        return;
                    }
                }
            },
            deleteCol(id) {
                for (let i = 0; i < this.settings.menu.length; i++) {
                    for (let k = 0; k < this.settings.menu[i].cols.length; k++) {
                        if (this.settings.menu[i].cols[k].id == id) {
                            this.settings.menu[i].cols.splice(k, 1);
                            return;
                        }
                    }
                }
            },
            deleteLink(id, title) {
                for (let i = 0; i < this.settings.menu.length; i++) {
                    for (let k = 0; k < this.settings.menu[i].cols.length; k++) {
                        if (this.settings.menu[i].cols[k].id == id) {
                            for (let j = 0; j < this.settings.menu[i].cols[k].child.length; j++) {
                                if (this.settings.menu[i].cols[k].child[j]['title'] == title) {
                                    this.settings.menu[i].cols[k].child.splice(j, 1);
                                    return;
                                }
                            }
                        }
                    }
                }
            },
            addCol(id) {

                for (let i = 0; i <= this.settings.menu.length; i++) {
                    if (this.settings.menu[i].id == id) {
                        let date = new Date();
                        let new_col_id = this.settings.menu[i].id + '_col_' + date.getTime();
                        let new_col = {
                            id: new_col_id,
                            child: []
                        };
                        this.settings.menu[i].cols.push(new_col);
                    }
                }
            },
            showParentMenu() {
                this.showModalParent = true;
            },
            showChildMenu(id) {
                this.showModaldMenu = true;
                this.newChildIdParent = id;
            },
            addParentMenu() {
                let date = new Date();
                let new_menu_id = date.getTime();
                this.showModalParent = false;
                let new_menu = {
                    id: new_menu_id,
                    title: this.newParentTitle,
                    url: this.newParentUrl,
                    cols: []
                };
                console.log(new_menu);
                this.settings.menu.push(new_menu);
                this.newParentTitle = null;
                this.newParentUrl = null;
            },
            addChildMenu(id) {
                for (let i = 0; i <= this.settings.menu.length; i++) {
                    for (let k = 0; k < this.settings.menu[i].cols.length; k++) {
                        if (this.settings.menu[i].cols[k].id == id) {
                            this.settings.menu[i].cols[k].child.push({title: '', url: ''});
                            return;
                        }
                    }
                }
            },
        }
    };
</script>
