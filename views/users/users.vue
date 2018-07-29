<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Row>
            <Col span="12" class="padding-left-10">
            <Card>
                <Table border :columns="columns" :data="users"></Table>
            </Card>
            </Col>

        </Row>

    </div>
</template>


<script>
    export default {
        name: 'users',
        data() {
            return {
                columns: [
                    {
                        title: 'Имя пользователя',
                        key: 'name'
                    },
                    {
                        title: 'Почта пользователя',
                        key: 'email'
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.userUpdate(params.row.id)
                                        }
                                    }
                                }, 'Редактировать')
                            ]);
                        }
                    }
                ],
                users: [],
                user: {}
            }
        },
        created: function () {
            this.getUsers();
        },
        methods: {
            getUsers() {
                this.axios.get('/api/all_users').then((response) => {
                    this.users = response.data;
                });
            },
            addUser() {
                this.axios.post('/api/users', this.user).then((response) => {
                    console.log(response.data);
                    if (response.data == 0) {
                        this.publishLoading = false;
                        this.$Notice.warning({
                            title: 'Внимание!',
                            desc: 'Уже существует такой пользователь!'
                        });
                    }
                    else {
                        this.publishLoading = false;
                        this.$Notice.success({
                            title: 'Успешно сохранено',
                            desc: 'Добавлен новый пользователь'
                        });
                    }
                    this.getTags();
                });
            },
            userUpdate(role_id){
                this.$router.push({
                    name: 'user_update',
                    params: {
                        id:role_id
                    }
                });
            }
        }
    }
</script>