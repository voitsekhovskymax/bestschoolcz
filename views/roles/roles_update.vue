<style lang="less">
    @import '../../styles/common.less';
    @import 'roles.less';


</style>

<template>
    <div>
        <Row>
            <Col span="18">
            <Card>
                <Form :label-width="80">
                    <!--<FormItem label="Input">-->
                    <!--<Input v-model="permissions.input" placeholder="Название привилегии"></Input>-->
                    <!--</FormItem>-->
                    <FormItem label="Привилегии">
                        <CheckboxGroup>
                            <!--<div v-for="perm in  arr.perm" >-->
                                <!--<Checkbox value="checked" :label="perm.id" v-if="perm">checked</Checkbox>-->
                                <!--<Checkbox value="unchecked" :label="perm.id" v-else>uncheked</Checkbox>-->
                            <!--</div>-->

                        </CheckboxGroup>
                    </FormItem>
                    <FormItem>
                        <Button type="primary">Обновить</Button>
                    </FormItem>
                </Form>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import tinymce from 'tinymce';

    export default {
        name: 'privileges_update',
        data() {
            return {
                arr: [],
            };
        },
        computed: {},
        mounted() {

        },
        destroyed() {

        },
        created: function () {
            this.getAllPermissions();
            this.select();
        },
        methods: {
            getAllPermissions() {
                this.axios.get('/api/permissions').then((response) => {
                    this.arr = response.data;
                    console.log(this.arr);
                });
            },
            select(){
                
            }
        }
    };
</script>
