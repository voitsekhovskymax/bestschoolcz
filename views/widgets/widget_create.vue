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
                <p class="margin-bottom-10">
                    <RadioGroup v-model="widget_type" type="button" size="large">
                        <Radio label="image">
                            <Icon type="image"></Icon>
                            <span>Изображение</span>
                        </Radio>
                        <Radio label="code">
                            <Icon type="code"></Icon>
                            <span>Код</span>
                        </Radio>
                    </RadioGroup>
                </p>
                <Form label-position="top" v-if="widget_type == 'image'">
                    <FormItem label="Заголовок виджета">
                        <Input v-model="widget.title" placeholder="Краткий заголовок"></Input>
                    </FormItem>
                    <FormItem label="Ссылка">
                        <Input v-model="widget.url" placeholder="https://example.com"></Input>
                    </FormItem>
                    <FormItem label="Изображение">
                        <img id="urlIMG" :src="widget.img" title="Нажмите чтобы выбрать изображение"
                             alt="Нажмите чтобы выбрать изображение" @click="imgPost"/>
                    </FormItem>
                </Form>

                <Form label-position="top" v-else>
                    <FormItem label="Заголовок виджета">
                        <Input v-model="widget.title" placeholder="Краткий заголовок"></Input>
                    </FormItem>
                    <FormItem label="Код виджета">
                        <Input v-model="widget.content" placeholder="<iframe></iframe>" type="textarea" :rows="4"></Input>
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
            <p v-if="widget_type == 'image'">
                <img src="/assets/images/type_image.png" alt="type_image">
            </p>
            <p v-else>
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
                    type: [],
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
        methods: {
            publish() {
                let new_content = null;

                if (this.widget_type == 'image') {
                    new_content = '<a href="' + this.widget.url + '"><img src="' + document.getElementById("urlIMG").src + '" alt="' + this.widget.title + '"/></a>';
                } else {
                    new_content = this.widget.content;
                }

                let new_widget = {
                    title: this.widget.title,
                    content: new_content,
                    type: this.widget.type,
                };
                console.log(new_widget);
                this.axios.post('/api/widgets', new_widget).then((response) => {
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
            },
            imgPost() {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById("urlIMG").src = path;

                });
            },
        }
    };
</script>
