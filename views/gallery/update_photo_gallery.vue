<style lang="less">
    @import "./gallery.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="post_list">
        <Row>
            <Col span="18">
            <Card>
                <Form :label-width="100">
                    <FormItem label="Заголовок галереи">
                        <Input v-model="gallery.title" @on-blur="titleBlur"></Input>
                    </FormItem>
                    <FormItem label="Ссылка галереи">
                        <Input v-model="gallery.url">
                        <span slot="prepend">{{fixedLink}}</span>
                        <span slot="append"><Icon type="link" size="22"></Icon></span>
                        </Input>
                    </FormItem>
                </Form>
            </Card>
            <Card class="margin-top-10">
                <div class="photo_container" v-for="item in gallery.items">
                    <Row>
                        <Col span="12">
                        <div class="item_link">
                            <img v-bind:id="item.local_name" :src="item.link" alt="Фото"
                                 title="Нажмите для добавления фото"
                                 @click="imgCreate(item)">
                        </div>
                        </Col>
                        <Col span="12" class="padding-left-10">
                        <div class="item_meta">
                            <Tabs value="item.local_name">
                                <TabPane label="Основное" :name="item.local_name + 1">
                                    <Form label-position="top">
                                        <FormItem label="Заголовок фотографии">
                                            <Input v-model="item.title" ></Input>
                                        </FormItem>
                                        <FormItem label="Краткое описание фотографии">
                                            <Input v-model="item.description" type="textarea" :autosize="true"></Input>
                                        </FormItem>
                                    </Form>
                                </TabPane>
                                <TabPane label="SEO" :name="item.local_name + 2 ">
                                    <p>SEO заголовок</p>
                                    <Input v-model="item.seo_title"></Input>
                                    <p>SEO описание</p>
                                    <Input v-model="item.seo_alt" type="textarea" :autosize="true"></Input>
                                </TabPane>
                            </Tabs>

                            <Row type="flex" justify="space-between">
                                <Col span="12">
                                <!--<Checkbox v-model="item.is_approve">Опубликовать?</Checkbox>-->

                                </Col>
                                <Col span="2">
                                <Button type="error" shape="circle" icon="ios-trash"
                                        @click="deleteSlide(item.local_name)"></Button>
                                </Col>
                            </Row>
                        </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Button type="success" shape="circle" long @click="addPhoto">Добавить фото</Button>
                </Row>
            </Card>
            </Col>

            <Col span="6" class="padding-left-10">
            <Card>
                <p slot="title">
                    <Icon type="paper-airplane"></Icon>
                    Изображение галереи
                </p>
                <p class="margin-top-10">
                <div class="imgpost">
                    <img id="urlIMG" :src="gallery.preview_img" alt="Превью галлереи" @click="imgPost('urlIMG')">
                </div>
                </p>
            </Card>
            
            <Card class="margin-top-10">
                <p slot="title">
                    <Icon type="navicon-round"></Icon>
                    Категория
                </p>
                <Row>
                    <Col span="24">
                    <CheckboxGroup v-model="gallery.categories">
                        <p v-for="item in categories" :key="item.title">
                            <Checkbox :label="item.title">{{ item.title }}</Checkbox>
                        </p>
                    </CheckboxGroup>
                    </Col>
                    <Col span="24" class="margin-top-10">
                    <Button v-show="!addingNewCategory" @click="handleAddNewCategory" type="ghost" shape="circle"
                            size="small"
                            icon="plus"></Button>
                    </Col>
                </Row>
                <div v-show="addingNewCategory" class="add-new-tag-con">
                    <Col span="24" class="margin-bottom-10">
                    <Input v-model="category.title" placeholder="Введите название категории"/></Input>
                    </Col>
                    <Col span="24">
                    <ButtonGroup>
                        <Button @click="addCategory" type="primary">
                            <Icon type="ios-plus-outline"></Icon>
                            Новая категория
                        </Button>
                        <Button @click="cancelCreateNewCategory" type="ghost">
                            <Icon type="android-cancel"></Icon>
                            Отмена
                        </Button>
                    </ButtonGroup>
                    </Col>
                </div>
            </Card>
       
            <Card class="margin-top-10">
                <p slot="title">
                    <Icon type="paper-airplane"></Icon>
                    Публикация
                </p>
                <Row class="margin-top-20 publish-button-con">
                    <span class="publish-button"><Button @click="publish" :loading="publishLoading"
                                                         icon="ios-checkmark" style=""
                                                         type="primary">Опубликовать</Button></span>
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    var count_photos = 0;
    export default {
        name: 'update_photo_gallery',
        data() {
            return {
                gallery: {

                },
                fixedLink: '',
                publishLoading: false,
                categories: [],
                addingNewCategory: false,
                category: {},
            }
        },
        created: function () {
            this.fixedLink = window.location.host + '/gallery/';
            this.getGallery();
            this.getCategories();
        },
        methods: {
            deleteSlide(name) {
                for (var i = 0; i < this.gallery.items.length; i++) {
                    if (this.gallery.items[i]['local_name'] == name) {
                        this.gallery.items.splice(i, 1);
                    }
                }
            },
            addCategory() {
                this.category.type = 'gallery';
                this.axios.post('/api/categories', this.category).then((response) => {
                    console.log(response.data);
                    if (response.data == 0) {
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
                        this.addingNewCategory = false;
                        this.category.title = "";
                    }
                    this.getCategories();
                });
            },
            handleAddNewCategory() {
                this.addingNewCategory = !this.addingNewCategory;
            },
            cancelCreateNewCategory() {
                this.addingNewCategory = false;
            },
            getCategories() {
                this.axios.get('/api/get_categories/gallery').then((response) => {
                    this.categories = response.data;
                    console.log(this.categories);
                });
            },
            getGallery(){
                this.axios.get('/api/galleries/'+ this.$route.params.id + '/edit').then((response) => {
                    this.gallery = response.data;
                    console.log(response.data);
                    for (var i = 0; i < this.gallery.items.length; i++) {
                        this.gallery.items[i]['local_name'] = 'photo_'+count_photos;
                        count_photos++;
                    }
                });
            },
            titleBlur() {
                if (this.gallery.title.length !== 0) {
                    this.gallery.url = this.translit(this.gallery.title);
                    this.gallery.seo_title = this.gallery.title;

                } else {
                    this.$Message.error('Заголовок галереи не может быть пустым');
                }
            },
            addPhoto() {
                var newPhoto = {
                    local_name: 'photo_' + count_photos,
                    title: '',
                    link: '/assets/images/no-image.png',
                    description: '',
                    source_code: '',
                    is_approve: true,
                    seo_title: '',
                    seo_alt: ''
                };
                this.gallery.items.push(newPhoto);
                count_photos++;
            },
            imgCreate(item) {

                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById(item.local_name).src = path;
                    item.link = path;
                });

            },
            imgPost(item) {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById(item).src = path;
                });

            },
            publish() {
                console.log('THIS');
                this.gallery.preview_img = document.getElementById("urlIMG").src;
                for (var i = 0; i < this.gallery.items.length; i++) {
                    let img_slide = this.gallery.items[i]['local_name'];
                    this.gallery.items[i].link = document.getElementById(img_slide).src;
                    if (this.gallery.items[i]['seo_title'] == "") {
                        this.gallery.items[i]['seo_title'] = this.gallery.items[i]['title']
                    }
                    if (this.gallery.items[i]['seo_alt'] == "") {
                        this.gallery.items[i]['seo_alt'] = this.gallery.items[i]['description']
                    }
                }
                
                console.log(this.gallery);
                this.axios.patch('/api/galleries/'+ this.$route.params.id, this.gallery).then((response) => {
                    console.log(response.data);
                    if (response.data == 0) {
                        this.publishLoading = false;
                        this.$Notice.warning({
                            title: 'Внимание!',
                            desc: 'Уже есть галерея с таким названием!'
                        });
                    }
                    else {
                        this.publishLoading = false;
                        this.$Notice.success({
                            title: 'Успешно сохранено',
                            desc: 'Галерея успешно сохранена'
                        });
                        this.$router.push({
                            name: 'galleries'
                        });
                    }
                });
            },
            translit(url) {
// Символ, на который будут заменяться все спецсимволы
                var space = '-';
// Берем значение из нужного поля и переводим в нижний регистр
                var text = url.toLowerCase();

// Массив для транслитерации
                var transl = {
                    'а': 'a',
                    'б': 'b',
                    'в': 'v',
                    'г': 'g',
                    'д': 'd',
                    'е': 'e',
                    'ё': 'e',
                    'ж': 'zh',
                    'з': 'z',
                    'и': 'i',
                    'й': 'j',
                    'к': 'k',
                    'л': 'l',
                    'м': 'm',
                    'н': 'n',
                    'о': 'o',
                    'п': 'p',
                    'р': 'r',
                    'с': 's',
                    'т': 't',
                    'у': 'u',
                    'ф': 'f',
                    'х': 'h',
                    'ц': 'c',
                    'ч': 'ch',
                    'ш': 'sh',
                    'щ': 'sh',
                    'ъ': space,
                    'ы': 'y',
                    'ь': space,
                    'э': 'e',
                    'ю': 'yu',
                    'я': 'ya',
                    ' ': space,
                    '_': space,
                    '`': space,
                    '~': space,
                    '!': space,
                    '@': space,
                    '#': space,
                    '$': space,
                    '%': space,
                    '^': space,
                    '&': space,
                    '*': space,
                    '(': space,
                    ')': space,
                    '-': space,
                    '\=': space,
                    '+': space,
                    '[': space,
                    ']': space,
                    '\\': space,
                    '|': space,
                    '/': space,
                    '.': space,
                    ',': space,
                    '{': space,
                    '}': space,
                    '\'': space,
                    '"': space,
                    ';': space,
                    ':': space,
                    '?': space,
                    '<': space,
                    '>': space,
                    '№': space
                }

                var result = '';
                var curent_sim = '';

                for (var i = 0; i < text.length; i++) {
                    // Если символ найден в массиве то меняем его
                    if (transl[text[i]] != undefined) {
                        if (curent_sim != transl[text[i]] || curent_sim != space) {
                            result += transl[text[i]];
                            curent_sim = transl[text[i]];
                        }
                    }
                    // Если нет, то оставляем так как есть
                    else {
                        result += text[i];
                        curent_sim = text[i];
                    }
                }
                result = this.trim(result);
                return result;
            },
            trim(s) {
                s = s.replace(/^-/, '');
                return s.replace(/-$/, '');
            }
        }
    }
</script>