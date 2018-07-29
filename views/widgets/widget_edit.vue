<style lang="less">
    @import '../../styles/common.less';

    #urlIMG {
        height: 150px;
        width: 100%;
        border: 2px dashed #ccc;
        object-fit: cover;
        max-width: 100%;
        cursor: pointer
    }

</style>

<template>
    <div>
        <Row>
            <Col span="12">
            <Card style="width: 300px">
                <Form label-position="top" >
                    <FormItem label="Заголовок виджета">
                        <Input v-model="widget.title"></Input>
                    </FormItem>
                    <FormItem label="Код виджета">
                        <Input v-model="widget.content" type="textarea" :rows="4"></Input>
                    </FormItem>
                </Form>

                <p class="margin-bottom-10">
                    <Select v-model="widget.type" filterable multiple>
                        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </p>
                <p class="margin-bottom-10">
                    <Checkbox v-model="widget.is_approve">Показывать на сайте?</Checkbox>
                </p>
                <p class="margin-bottom-10">
                    <Button type="success" @click="publish">Сохранить</Button>
                </p>

            </Card>
            </Col>
            <Col span="12">
            <p>
                <img src="/assets/images/type_code.png" alt="type_code">
            </p>
            </Col>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                widget_type: 'image',
                widget: {
                    title: '',
                    url: '',
                    img: '/images/blog/blog-large-01.jpg',
                    content: '',
                    is_approve: true,
                    type: []
                },
                typeList: [
                    {
                        value: 'courses',
                        label: 'Все курсы'
                    },
                    {
                        value: 'single_course',
                        label: 'Сингл курс'
                    },
                    {
                        value: 'events',
                        label: 'События школы'
                    },
                    {
                        value: 'single_event',
                        label: 'Сингл события'
                    },
                    {
                        value: 'posts',
                        label: 'Блог'
                    },
                    {
                        value: 'single_post',
                        label: 'Синг пост '
                    }
                ],
            };
        },
        created:function(){
            this.getWidget();
        },
        methods: {
            getWidget(){
                this.axios.get('/api/widgets/' + this.$route.params.id + '/edit').then((response) => {
                    this.widget = response.data;
                });
            },
            publish() {
                console.log( this.widget);
                this.axios.patch('/api/widgets/' + this.$route.params.id,  this.widget).then((response) => {
                    console.log(response);
                    if (response.data == 0) {
                        this.publishLoading = false;
                        this.$Notice.warning({
                            title: 'Внимание!',
                            desc: 'Произошла ошибка'
                        });
                    }
                    else {
                        this.publishLoading = false;
                        this.$Notice.success({
                            title: 'Успешно сохранено',
                            desc: 'Виджет сохранен'
                        });
                        this.$router.push({
                            name: 'widgets'
                        });
                    }
                });
            }
        }
    };
</script>
