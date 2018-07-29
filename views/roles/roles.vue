<style lang="less">
    @import '../../styles/common.less';
    @import 'roles.less';


</style>

<template>
    <div>
        <Row>
            <Col span="24"  class="margin-bottom-10">
            <Card>
                <Form :label-width="80">
                    <FormItem label="Название ">
                        <Input v-model="new_role.title" placeholder="Название роли"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="addRole">Добавить</Button>
                    </FormItem>
                </Form>
            </Card>
            </Col>
            <Col span="24">
            <Card>
                <div class="ivu-table-wrapper">
                    <div class="ivu-table ivu-table-stripe">
                        <table class="table_roles" style="width: 100% !important;     table-layout: auto !important;">
                            <thead>
                            <tr>
                                <th>Привилегии</th>
                                <th v-for="role in arr.roles">{{role.name }}</th>
                            </tr>
                            </thead>
                            <tbody class="ivu-table-tbody">
                            <tr v-for="perm in arr.permissions" class="ivu-table-row">
                                <td>{{perm.name }}</td>
                                <td v-for="role in  arr.roles">
                                    <input checked type="checkbox" v-model="arr.current_perm[role.id][perm.id]"
                                           :value="arr.current_perm[role.id][perm.id]"
                                           v-if="arr.current_perm[role.id][perm.id] == true"/>
                                    <input type="checkbox" v-model="arr.current_perm[role.id][perm.id]"
                                           :value="arr.current_perm[role.id][perm.id]" v-else/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="margin-top-10">
                    <Button type="primary" @click="updateRoles">Обновить</Button>
                </div>
            </Card>
            </Col>
           
        </Row>
    </div>
</template>

<script>
    import tinymce from 'tinymce';

    export default {
        name: 'roles',
        data() {
            return {
                arr: [],
                new_role: {}
            };
        },
        computed: {},
        mounted() {

        },
        destroyed() {

        },
        created: function () {
            this.getRoles();
        },
        methods: {
            addRole() {

            },
            roleUpdate(role_id) {
                this.$router.push({
                    name: 'role-update',
                    params: {
                        id: role_id
                    }
                });
            },
            getRoles() {
                this.axios.get('/api/permissions').then((response) => {
                    this.arr = response.data;
                    console.log(this.arr);
                });
            },
            updateRoles() {
                var request = {
                    current_perm: this.arr.current_perm
                };

                this.axios.post('/api/permissions', request).then((response) => {
                    console.log(response);

                    this.getRoles();
                    this.$Notice.success({
                        title: 'Успешно',
                        desc: 'Привилегии пользователей обновлены!'
                    });
                });
            }
        }
    };
</script>
