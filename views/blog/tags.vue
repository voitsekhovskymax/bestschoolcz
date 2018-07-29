<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Row>
            <Col span="12">
            <Card>
                <p slot="title">
                    <Icon type="pricetag"></Icon>
                    Добавление нового тега
                </p>
                <Form :model="formItem" :label-width="80">
                    <FormItem label="Название ">
                        <Input v-model="tag.title" placeholder="Тег"  maxlength=256></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="addTag">Добавить</Button>
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
                В качестве тегов используются так называемые ключевые слова, набор которых кратко характеризует публикацию (допустим, для этого сайта подошел бы такой набор тегов: курсы чешского языка, высшее образование в чехии, подготовка к вузу чехии, студенческая виза в чехию).
            </p>
            <p>
                С помощью этих слов можно будет однозначно определить, о чем была эта статья. Но их главная ценность в том, что посетитель может кликнуть по любому тегу и увидеть список всех статей на сайте, в которых  встречался этот тег. По сути, это мощный инструмент классификации информации.            </p>
            </Card>
            </p>
            </Col>
            <Col span="12" class="padding-left-10">
            <Card>
                <Table border :columns="columns" :data="tags"></Table>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'tags',
        data() {
            return {
                columns: [
                    {
                        title: 'Название тега',
                        key: 'title'
                    },
                    {
                        title: 'URL тега',
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
                                            this.deleteTag(params.row.id)
                                        }
                                    }
                                }, 'Удалить')
                            ]);
                        }
                    }
                ],
                tags: [],
                tag:{}
            }
        },
        created: function () {
            this.getTags();
        },
        methods: {
            getTags() {
                this.axios.get('/api/post_tags').then((response) => {
                    this.tags = response.data;
                });
            },
            addTag() {
                this.tag.type = 'post';
                console.log(this.tag);
                this.axios.post('/api/tags', this.tag).then((response) => {
                    console.log(response.data);
                    if(response.data == 0) {
                        this.publishLoading = false;
                        this.$Notice.warning({
                            title: 'Внимание!',
                            desc: 'Уже есть тег с таким названием!'
                        });
                    }
                    else{
                        this.publishLoading = false;
                        this.$Notice.success({
                            title: 'Успешно сохранено',
                            desc: 'Добавлен новый тег'
                        });
                        this.tag.title = '';
                    }
                    this.getTags();
                });
            },
            deleteTag(id) {
                this.axios.delete('/api/tags/'+id ).then((response) => {
                    this.getTags();
                });
            },
            clearForm() {
                this.tag.title = '';
            }
        }
    }
</script>