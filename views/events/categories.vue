<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Row>
            <Col span="12">
            <Card>
                <p slot="title">
                    <Icon type="pound"></Icon>
                    Добавление новой категории
                </p>
                <Form :model="formItem" :label-width="80">
                    <FormItem label="Название ">
                        <Input v-model="category.title" placeholder="Категория" maxlength=256></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="addCategory">Добавить</Button>
                        <Button type="ghost" style="margin-left: 8px" @click="clearForm">Очистить</Button>
                    </FormItem>
                </Form>
            </Card>
            <p class="margin-top-10">
                <Card>
            <p slot="title">
                <Icon type="information-circled"></Icon>
                Информация
            </p>
            <p>
                Категории в структуре сайта просто необходимы, ведь они выполнят важную работу: группируют ваши материалы по разным критериям.
            </p>
            <p>
                Категории будут выводиться в меню, и соответственно сортировать материал. Независимо от категории пост будет опубликован в блоге.
            </p>
            </Card>
            </p>
            </Col>
            <Col span="12" class="padding-left-10">
            <Card>
                <Table border :columns="columns" :data="categories"></Table>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'categories',
        data() {
            return {
                columns: [
                    {
                        title: 'Название категории',
                        key: 'title'
                    },
                    {
                        title: 'URL категории',
                        key: 'url'
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
                                            this.deleteCategory(params.row.id)
                                        }
                                    }
                                }, 'Удалить')
                            ]);
                        }
                    }
                ],
                categories: [],
                category: {}
            }
        },
        created: function () {
            this.getCategories();
        },
        methods: {
            getCategories() {
                this.axios.get('/api/get_categories/' + 'event').then((response) => {
                    this.categories = response.data;
                });
            },
            addCategory() {
                this.category.type = 'event';
                this.axios.post('/api/categories', this.category).then((response) => {
                    console.log(response.data);
                    if (response.data == 0) {
                        this.publishLoading = false;
                        this.$Notice.warning({
                            title: 'Внимание!',
                            desc: 'Уже есть категория с таким названием!'
                        });

                    }
                    else {
                        this.publishLoading = false;
                        this.$Notice.success({
                            title: 'Успешно сохранено',
                            desc: 'Добавлена новая категория'
                        });
                        this.category.title = '';
                    }
                    this.getCategories();
                });
            },
            deleteCategory(id) {
                this.axios.delete('/api/categories/' + id).then((response) => {
                    this.getCategories();
                });
            },
            clearForm() {
                this.category.title = '';
            }
        }
    }
</script>