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
                    <Button type="primary" icon="ios-checkmark" :loading="publishLoading" @click="userUpdate">Обновить
                    </Button>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>


<script>
    export default {
        name: 'own_space',
        data() {
            return {
                user: {
                    password: null
                },
              
                publishLoading: false,
            }
        },
        created: function () {
            this.getUser();
        },
        methods: {
            getUser() {
                this.axios.get('/api/cur_user').then((response) => {
                    this.user = response.data;
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
                this.publishLoading = true;
                this.user.img = document.getElementById("userImage").src;
                console.log(this.user);
                this.axios.patch('/api/users/' + this.user.id, this.user).then((response) => {
                    console.log(response);
                  
                    this.$Notice.success({
                        title: 'Успешно сохранено',
                        desc: 'Данные пользователя обновлены'
                    });
                    this.publishLoading = false;
                });
            },
            addUser() {

            }
        }
    }
</script>