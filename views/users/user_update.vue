<style lang="less">
    @import '../../styles/common.less';

    #userImage {
        width: 150px;
        height: 150px;
        object-fit: cover;
    }

    .user_img {
        text-align: center
    }
</style>

<template>
    <div>
        <Row>
            <Col span="24">
            <Card style="width: 300px">
                <p slot="title">
                    <Icon type="person"></Icon>
                    {{user.name}}
                </p>
                <p slot="extra" @click="showDeleteModal = !showDeleteModal" style="cursor: pointer">
                    <Icon type="trash-b"></Icon>
                    Удалить
                </p>
                <div class="user_img">
                    <img id="userImage" :src="user.img" alt="" @click="setUserImage"/>
                </div>

                <div class="margin-top-10">
                    <p> Имя пользователя </p>
                    <Input v-model="user.name" placeholder="Имя пользователя"></Input>
                </div>
                <div class="margin-top-10">
                    <p>Email пользователя</p>
                    <Input v-model="user.email" placeholder="Email"></Input>
                </div>

                <div class="margin-top-10">
                    <p>Пароль пользователя</p>
                    <Input v-model="user.password" placeholder="Пароль"></Input>
                </div>
                <div class="margin-top-10">
                    <p>Привилегии пользователя</p>

                    <Select v-model="user.roles[0].id">
                        <Option v-for="item in arr.roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="margin-top-10">
                    <Button type="primary" icon="ios-checkmark" :loading="publishLoading" @click="userUpdate">Обновить
                    </Button>
                </div>
            </Card>
            </Col>
        </Row>
        <Modal v-model="showDeleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>Внимание</span>
            </p>
            <div>
                <p>Кому передать записи пользователя <b>{{user.name}}</b>?</p>
                <p class="margin-top-10">
                    <Select v-model="save_user_id">
                        <Option v-for="item in users" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="del">Удалить</Button>
            </div>
        </Modal>
    </div>
</template>


<script>
    export default {
        name: 'user_update',
        data() {
            return {
                user: {
                    password: null
                },
                users: [],
                arr: [],
                publishLoading: false,
                showDeleteModal: false,
                save_user_id: 1,
            }
        },
        created: function () {
            this.getUser();
            this.getUsers();
            this.getRoles();
        },
        methods: {
            getUser() {
                this.axios.get('/api/users/' + this.$route.params.id + '/edit').then((response) => {
                    this.user = response.data;
                });
            },
            del() {
                this.axios.post('/api/user_del',  { delete_user_id: this.user.id, save_user_id: this.save_user_id}).then((response) => {
                    console.log(response);
                    this.showDeleteModal = false;
                    this.$Notice.success({
                        title: 'Удалено',
                        desc: 'Пользователь успешно удален'
                    });
                    this.$router.push({
                        name: 'users',
                    });
                });
            },
            getUsers() {
                this.axios.get('/api/all_users').then((response) => {
                    this.users = response.data;
                });
            },
            getRoles() {
                this.axios.get('/api/permissions').then((response) => {
                    this.arr = response.data;
                });
            },
            setUserImage() {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById("userImage").src = path;

                });
            },
            userUpdate() {
                this.user.img = document.getElementById("userImage").src;
                console.log(this.user);
                this.publishLoading = true;
                this.axios.patch('/api/users/' + this.$route.params.id, this.user).then((response) => {
                    console.log(response);
                    this.publishLoading = false;
                    this.$Notice.success({
                        title: 'Успешно сохранено',
                        desc: 'Данные пользователя обновлены'
                    });
                    this.$router.push({
                        name: 'users',
                    });
                });
            },
            addUser() {

            }
        }
    }
</script>